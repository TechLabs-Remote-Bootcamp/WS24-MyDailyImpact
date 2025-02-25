import qdrant_client
import torch
import torch.nn as nn
from transformers import BertTokenizer, BertModel
from torch.utils.data import DataLoader, Dataset
from sklearn.model_selection import train_test_split
from sentence_transformers import util

client = qdrant_client.QdrantClient(host="100.107.35.86", port=6333)
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
model = BertModel.from_pretrained("bert-base-uncased")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

class RankingModel(nn.Module):
    def __init__(self, input_dim):
        super(RankingModel, self).__init__()
        self.fc1 = nn.Linear(input_dim, 128)
        self.fc2 = nn.Linear(128, 1)  # Output single value for relevance score

    def forward(self, query_embedding, doc_embedding):
        combined = torch.cat((query_embedding, doc_embedding), dim=1)  # Concatenate query and doc embeddings
        x = torch.relu(self.fc1(combined))
        return self.fc2(x)

def get_embeddings(texts):
    encoded_input = tokenizer(texts, padding=True, truncation=True, return_tensors="pt").to(device)
    with torch.no_grad():
        output = model(**encoded_input)
    embeddings = output.last_hidden_state.mean(dim=1)  
    return embeddings

class RankingDataset(Dataset):
    def __init__(self, queries, docs, scores):
        self.queries = queries
        self.docs = docs
        self.scores = scores

    def __len__(self):
        return len(self.queries)

    def __getitem__(self, idx):
        return self.queries[idx], self.docs[idx], self.scores[idx]
    
columns = ["Review", "RecipeCategory", "Keywords", "Description"]

weights = {
    "Review": 0.2,
    "RecipeCategory": 0.3,
    "Keywords": 0.3,
    "Description": 0.2
}

metadata_samples = []
batch_size = 1000
total_samples = 3000

while len(metadata_samples) < total_samples:
    response = client.scroll(
        collection_name="metadata",
        limit=batch_size,
        with_payload=True,
        timeout=60  
    )
    
    metadata_samples.extend(response[0])  
    
    if len(metadata_samples) >= total_samples:
        break

queries = []
documents = []
cosine_scores = []

for metadata_sample in metadata_samples:
    embeddings = []

    for col in columns:
        if col in metadata_sample.payload:
            column_embedding = torch.tensor(metadata_sample.payload[col])
            embeddings.append(weights.get(col, 1) * column_embedding)

    query_vector = torch.mean(torch.stack(embeddings), dim=0)

    recipe_results = client.search(
        collection_name="recipes",
        query_vector=query_vector.tolist(),
        limit=10,  # Get top 10 results
        with_vectors=True  # Ensure that vectors are returned
    )

    for recipe in recipe_results:
        doc_vector = torch.tensor(recipe.vector)
        similarity = util.pytorch_cos_sim(query_vector, doc_vector).item()
        queries.append(query_vector)
        documents.append(doc_vector)
        cosine_scores.append(similarity)

queries_tensor = torch.stack(queries).detach().clone()
documents_tensor = torch.stack(documents).detach().clone()
cosine_scores_tensor = torch.tensor(cosine_scores, dtype=torch.float32)

train_queries, val_queries, train_docs, val_docs, train_scores, val_scores = train_test_split(
    queries_tensor, documents_tensor, cosine_scores_tensor, test_size=0.2, random_state=42
)

train_queries = train_queries.detach().clone().requires_grad_(True)
train_docs = train_docs.detach().clone().requires_grad_(True)

train_dataset = RankingDataset(train_queries, train_docs, train_scores)
val_dataset = RankingDataset(val_queries, val_docs, val_scores)

train_loader = DataLoader(train_dataset, batch_size=16, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=16, shuffle=False)

input_dim = queries_tensor.shape[1] + documents_tensor.shape[1]  
ranking_model = RankingModel(input_dim).to(device)
optimizer = torch.optim.Adam(ranking_model.parameters(), lr=1e-4)
criterion = nn.MSELoss()  

num_epochs = 1  # Number of epochs
for epoch in range(num_epochs):
    ranking_model.train()
    total_loss = 0

    for batch_idx, (query_batch, doc_batch, score_batch) in enumerate(train_loader):
        query_batch, doc_batch, score_batch = query_batch.to(device), doc_batch.to(device), score_batch.to(device)

        optimizer.zero_grad()

        predicted_scores = ranking_model(query_batch, doc_batch)

        loss = criterion(predicted_scores.squeeze(), score_batch)
        loss.backward()
        optimizer.step()

        total_loss += loss.item()

        if (batch_idx + 1) % 100 == 0:
            avg_batch_loss = loss.item()
            print(f"Epoch {epoch+1}/{num_epochs}, Batch {batch_idx+1}/{len(train_loader)}, Loss: {avg_batch_loss:.4f}")

    avg_epoch_loss = total_loss / len(train_loader)
    print(f"Epoch {epoch+1}/{num_epochs}, Training Loss: {avg_epoch_loss:.4f}")

    ranking_model.eval()  # Switch to evaluation mode
    val_loss = 0.0
    with torch.no_grad():  # Disable gradient tracking for validation
        for val_batch in val_loader:
            query_batch, doc_batch, score_batch = val_batch
            query_batch, doc_batch, score_batch = query_batch.to(device), doc_batch.to(device), score_batch.to(device)

            predicted_scores = ranking_model(query_batch, doc_batch)

            loss = criterion(predicted_scores.squeeze(), score_batch)
            val_loss += loss.item()

    avg_val_loss = val_loss / len(val_loader)
    print(f"Epoch {epoch+1}/{num_epochs}, Validation Loss: {avg_val_loss:.4f}")

    ranking_model.train() 

model.eval() 

reranked_results = []
for recipe in recipe_results:
    doc_vector = torch.tensor(recipe.vector).unsqueeze(0).to(device)  # Add batch dimension

    query_embedding = torch.tensor(query_vector).unsqueeze(0).to(device)  # Add batch dimension

    with torch.no_grad():
        rerank_score = ranking_model(query_embedding, doc_vector).squeeze().item()

    reranked_results.append((recipe, rerank_score))

torch.save(model.state_dict(), "trained_model.pth")