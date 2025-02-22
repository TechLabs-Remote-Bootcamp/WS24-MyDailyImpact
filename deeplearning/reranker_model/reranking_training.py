import qdrant_client
import torch
import numpy as np
from sentence_transformers import SentenceTransformer, util
from torch.utils.data import DataLoader, TensorDataset
from sklearn.model_selection import train_test_split

# Initialize Qdrant Client
client = qdrant_client.QdrantClient(host="100.107.35.86", port=6333)

# Load Sentence Transformer Model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Define columns to use for query embedding
columns = ["Review", "RecipeCategory", "Keywords", "Description"]

# Optional: Define weights for different columns
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
        timeout=60  # You can adjust timeout as necessary
    )
    
    metadata_samples.extend(response[0])  # Append fetched metadata
    
    if len(metadata_samples) >= total_samples:
        break

# Now, process each metadata sample and fetch corresponding recipes
queries = []
documents = []
cosine_scores = []

for metadata_sample in metadata_samples:
    embeddings = []

    # Collect embeddings from all columns
    for col in columns:
        if col in metadata_sample.payload:
            column_embedding = torch.tensor(metadata_sample.payload[col])
            
            # Apply weight for the column if provided
            embeddings.append(weights.get(col, 1) * column_embedding)

    # Compute final query embedding as a weighted average
    query_vector = torch.mean(torch.stack(embeddings), dim=0)

    # Retrieve relevant documents from Qdrant using the query_vector
    recipe_results = client.search(
        collection_name="recipes",
        query_vector=query_vector.tolist(),  # Ensure it's the right format for Qdrant
        limit=25,  # You can limit the number of recipe results as needed
        with_vectors=True  # Include vectors in search results
    )

    # Process search results
    for recipe in recipe_results:
        doc_vector = torch.tensor(recipe.vector)  # Convert to tensor

        # Compute cosine similarity between the query and recipe
        similarity = util.pytorch_cos_sim(query_vector, doc_vector).item()

        # Store data for training (pairs of queries and their most relevant recipes)
        queries.append(query_vector)
        documents.append(doc_vector)
        cosine_scores.append(similarity)

queries_tensor = torch.stack(queries).detach().clone().requires_grad_(True)
documents_tensor = torch.stack(documents).detach().clone().requires_grad_(True)
cosine_scores_tensor = torch.tensor(cosine_scores, dtype=torch.float32)

dataset = TensorDataset(queries_tensor, documents_tensor, cosine_scores_tensor)
train_loader = DataLoader(dataset, batch_size=8, shuffle=True)

criterion = torch.nn.MSELoss()  
optimizer = torch.optim.Adam([queries_tensor, documents_tensor], lr=2e-5)
num_epochs = 3  

train_queries, val_queries, train_docs, val_docs, train_scores, val_scores = train_test_split(
    queries_tensor, documents_tensor, cosine_scores_tensor, test_size=0.2, random_state=42
)

# Define DataLoaders for both training and validation sets
train_dataset = TensorDataset(train_queries, train_docs, train_scores)
val_dataset = TensorDataset(val_queries, val_docs, val_scores)

train_loader = DataLoader(train_dataset, batch_size=8, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=8, shuffle=False)

# Training Loop with Validation Loss
import qdrant_client
import torch
import numpy as np
from sentence_transformers import SentenceTransformer, util
from torch.utils.data import DataLoader, TensorDataset
from sklearn.model_selection import train_test_split

# Initialize Qdrant Client
client = qdrant_client.QdrantClient(host="100.107.35.86", port=6333)

# Load Sentence Transformer Model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Define columns to use for query embedding
columns = ["Review", "RecipeCategory", "Keywords", "Description"]

# Optional: Define weights for different columns
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
        timeout=60  # You can adjust timeout as necessary
    )
    
    metadata_samples.extend(response[0])  # Append fetched metadata
    
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
        limit=25,  
        with_vectors=True  
    )

    for recipe in recipe_results:
        doc_vector = torch.tensor(recipe.vector)
        similarity = util.pytorch_cos_sim(query_vector, doc_vector).item()
        queries.append(query_vector)
        documents.append(doc_vector)
        cosine_scores.append(similarity)

queries_tensor = torch.stack(queries).detach().clone().requires_grad_(True)
documents_tensor = torch.stack(documents).detach().clone().requires_grad_(True)
cosine_scores_tensor = torch.tensor(cosine_scores, dtype=torch.float32)

train_queries, val_queries, train_docs, val_docs, train_scores, val_scores = train_test_split(
    queries_tensor, documents_tensor, cosine_scores_tensor, test_size=0.2, random_state=42
)

train_dataset = TensorDataset(train_queries, train_docs, train_scores)
val_dataset = TensorDataset(val_queries, val_docs, val_scores)

dataset = TensorDataset(queries_tensor, documents_tensor, cosine_scores_tensor)
train_loader = DataLoader(dataset, batch_size=16, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=16, shuffle=False)

# ✅ Define Training Components
criterion = torch.nn.MSELoss()  # Loss function for similarity scores
optimizer = torch.optim.Adam(model.parameters(), lr=1e-4)
num_epochs = 3  # Number of epochs

# ✅ Training Loop
for epoch in range(num_epochs): 
    model.train()
    epoch_loss = 0.0
    
    for batch_idx, batch in enumerate(train_loader):
        queries_batch, docs_batch, scores_batch = batch
        
        optimizer.zero_grad()
        
        # Compute cosine similarity
        pred_sim = util.pytorch_cos_sim(queries_batch, docs_batch).squeeze()

        # Compute loss using cosine similarity
        loss = criterion(pred_sim, scores_batch)
        loss.backward()
        optimizer.step()

        # Print loss every 100 batches
        if (batch_idx + 1) % 100 == 0:
            print(f"Epoch {epoch+1}/{num_epochs}, Batch {batch_idx+1}/{len(train_loader)}, Loss: {loss.item():.4f}")
        
        epoch_loss += loss.item()
    
    # Average loss for the epoch
    avg_epoch_loss = epoch_loss / len(train_loader)
    print(f"Epoch {epoch+1}/{num_epochs} - Training Loss: {avg_epoch_loss:.4f}")
    
    # Validation Phase
    model.eval()  # Switch to evaluation mode
    val_loss = 0.0  # Track the validation loss
    with torch.no_grad():  # Disable gradient tracking for validation
        for val_batch in val_loader:
            queries_batch, docs_batch, scores_batch = val_batch
            # Forward pass for validation
            query_embeddings = queries_batch
            doc_embeddings = docs_batch
            pred_sim = util.pytorch_cos_sim(query_embeddings, doc_embeddings).squeeze()

            # Compute validation loss
            loss = criterion(pred_sim, scores_batch)
            val_loss += loss.item()

    # Average loss for validation
    avg_val_loss = val_loss / len(val_loader)
    print(f"Epoch {epoch+1}/{num_epochs} - Validation Loss: {avg_val_loss:.4f}")

    model.train()  # Switch back to training mode 

# ✅ Save Model
model.save_pretrained('./reranker_model')