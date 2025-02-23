# pipeline.py
import os
from typing import Any, List, Dict
from datetime import datetime
from itertools import chain

import requests
from dotenv import load_dotenv
from haystack import Pipeline, component
from haystack.core.component.types import Variadic
from haystack.dataclasses import ChatMessage
from haystack.document_stores.in_memory import InMemoryDocumentStore
from haystack.utils.auth import Secret
from haystack.components.builders import ChatPromptBuilder, PromptBuilder
from haystack.components.converters import TextFileToDocument, OutputAdapter
from haystack.components.preprocessors import DocumentSplitter
from haystack.components.retrievers.in_memory import InMemoryEmbeddingRetriever
from haystack.components.writers import DocumentWriter
from haystack_integrations.components.embedders.mistral import MistralDocumentEmbedder, MistralTextEmbedder
from haystack_integrations.components.generators.mistral import MistralChatGenerator
from haystack_experimental.chat_message_stores.in_memory import InMemoryChatMessageStore
from haystack_experimental.components.retrievers import ChatMessageRetriever
from haystack_experimental.components.writers import ChatMessageWriter

# for QdrantEmbeddingRetriever
from haystack.document_stores.types import DuplicatePolicy
from haystack import Document
from haystack import Pipeline
from haystack.components.embedders import SentenceTransformersTextEmbedder, SentenceTransformersDocumentEmbedder
from haystack_integrations.components.retrievers.qdrant import QdrantEmbeddingRetriever
from haystack_integrations.document_stores.qdrant import QdrantDocumentStore

# for user-query embedding
from transformers import DistilBertTokenizer, DistilBertModel
import torch
from haystack import component
from typing import List

# for reranking
import torch
import torch.nn as nn
from haystack import component
from typing import List, Dict
from haystack import Document
from transformers import BertTokenizer, BertModel


# Constants
CHAT_TEMPLATE = """your role:
You are a chef. You specialize in creating vegan recipes. 
As a chef you have received countless awards and prizes. 
Your cookbooks top national and international bestseller lists. 
Your colleagues value your expertise. 
You only suggest recipes and meals if they are vegan. 
To eat vegan is an very important value to you and your friends.\n\n

your task
Given the conversation history and the provided Recipes, give a brief answer to the question.\n
                Question: {{query}}\n
                
                Conversation history:
                {% for memory in memories %}
                    {{ memory.text }}
                {% endfor %}
                
                Recipes: 
                {% for document in documents %}
                    {{document.content}}
                {% endfor%}
                """

QUERY_REPHRASE_TEMPLATE = """
        Rewrite the question for search while keeping its meaning and key terms intact.
        If the conversation history is empty, DO NOT change the query.
        Use conversation history only if necessary, and avoid extending the query with your own knowledge.
        If no changes are needed, output the current question as is.

        Conversation history:
        {% for memory in memories %}
            {{ memory.text }}
        {% endfor %}

        User Query: {{query}}
        Rewritten Query:
"""

class RankingModel(nn.Module):
    def __init__(self, input_dim):
        super(RankingModel, self).__init__()
        self.fc1 = nn.Linear(input_dim, 128)
        self.fc2 = nn.Linear(128, 1)

    def forward(self, query_embedding, doc_embedding):
        combined = torch.cat((query_embedding, doc_embedding), dim=1)
        x = torch.relu(self.fc1(combined))
        return self.fc2(x)

@component
class BertReranker:
    def __init__(self, model_path: str):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
        self.bert_model = BertModel.from_pretrained("bert-base-uncased").to(self.device)
        self.ranking_model = RankingModel(input_dim=1536).to(self.device)  # 768 * 2 for query and doc embeddings
        self.ranking_model.load_state_dict(torch.load(model_path))
        self.ranking_model.eval()

    def get_embeddings(self, texts):
        encoded_input = self.tokenizer(texts, padding=True, truncation=True, return_tensors="pt").to(self.device)
        with torch.no_grad():
            output = self.bert_model(**encoded_input)
        embeddings = output.last_hidden_state.mean(dim=1)
        return embeddings

    @component.output_types(documents=List[Document])
    def run(self, query: str, documents: List[Document]) -> Dict[str, List[Document]]:
        query_embedding = self.get_embeddings([query]).squeeze(0)
        reranked_docs = []

        for doc in documents:
            doc_embedding = torch.tensor(doc.embedding).to(self.device)
            with torch.no_grad():
                rerank_score = self.ranking_model(query_embedding, doc_embedding).squeeze().item()
            reranked_docs.append((doc, rerank_score))

        reranked_docs.sort(key=lambda x: x[1], reverse=True)
        top_docs = [doc[0] for doc in reranked_docs[:10]]  # Keep top 10 documents
        
        return {"documents": top_docs}


class Conversation:
    def __init__(self, api_key: str, document_store: InMemoryDocumentStore):
        self.pipeline = self._create_pipeline(api_key, document_store)
        
    def _create_pipeline(self, api_key: str, document_store: InMemoryDocumentStore) -> Pipeline:
        pipeline = Pipeline()
        memory_store = InMemoryChatMessageStore()

        # Initialize components
        prompt_builder = ChatPromptBuilder(variables=["query", "documents", "memories"], 
                                    required_variables=["query", "documents", "memories"])
        llm = MistralChatGenerator(api_key=Secret.from_token(api_key), model='mistral-large-latest')
        rephrase_llm = MistralChatGenerator(api_key=Secret.from_token(api_key), model='mistral-large-latest')

        # Add components
        pipeline.add_component("query_rephrase_prompt_builder", PromptBuilder(template=QUERY_REPHRASE_TEMPLATE))
        pipeline.add_component("message_wrapper", ChatMessageWrapper())
        pipeline.add_component("query_rephrase_llm", rephrase_llm)
        pipeline.add_component("list_to_str_adapter", OutputAdapter(template="{{ replies[0] }}", output_type=str))

        pipeline.add_component("retriever", QdrantEmbeddingRetriever(document_store=document_store))
        pipeline.add_component("text_embedder", CustomDistilBertEmbedder() ) 

        # Add reranker component
        model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../reranker/trained_model.pth')
        pipeline.add_component("reranker", BertReranker(model_path=model_path))
                

        pipeline.add_component("prompt_builder", prompt_builder)
        pipeline.add_component("llm", llm)
        pipeline.add_component("memory_retriever", ChatMessageRetriever(memory_store))
        pipeline.add_component("memory_writer", ChatMessageWriter(memory_store))
        pipeline.add_component("memory_joiner", ListJoiner(List[ChatMessage]))

        # Connect components
        # Query rephrasing connections
        pipeline.connect("memory_retriever", "query_rephrase_prompt_builder.memories")
        pipeline.connect("query_rephrase_prompt_builder.prompt", "message_wrapper")
        pipeline.connect("message_wrapper.messages", "query_rephrase_llm")
        pipeline.connect("query_rephrase_llm.replies", "list_to_str_adapter")
        pipeline.connect("list_to_str_adapter", "text_embedder")


        # RAG connections with reranker
        pipeline.connect("text_embedder.embedding", "retriever.query_embedding")
        pipeline.connect("retriever.documents", "reranker.documents")  # Connect retriever to reranker
        pipeline.connect("list_to_str_adapter", "reranker.query")     # Connect query to reranker
        pipeline.connect("reranker.documents", "prompt_builder.documents")  # Connect reranker to prompt builder


        # Memory connections
        pipeline.connect("llm.replies", "memory_joiner")
        pipeline.connect("memory_joiner", "memory_writer")
        pipeline.connect("memory_retriever", "prompt_builder.memories")

        return pipeline

    def send_message(self, message: str) -> Dict[str, Any]:
        """Send a message to the conversation and get the response."""
        system_message = ChatMessage.from_system(
            "You are a helpful AI assistant using provided supporting documents and conversation history to assist humans"
        )
        template_message = ChatMessage.from_user(CHAT_TEMPLATE)

        result = self.pipeline.run(
            data={
                "query_rephrase_prompt_builder": {"query": message},
                "prompt_builder": {
                    "template": [system_message, template_message],
                    "query": message
                },
                "memory_joiner": {"values": [ChatMessage.from_user(message)]}
            },
            include_outputs_from=["llm", "query_rephrase_llm", "retriever","reranker", "prompt_builder"]
        )

        return {
            "assistant_message": result["llm"]["replies"][0].text,
            "rewritten_query": result["query_rephrase_llm"]["replies"][0].text,
#            "rag_documents": len(result["retriever"]['documents']),
#            "rag_documents": [doc.content.split(';')[0] for doc in result["retriever"]['documents']],
#            "rag_documents": [doc.content.split(';')[0:5] for doc in result["retriever"]['documents']],
#            "rag_documents": [(i+1, doc.content.split(';')[0].replace('Name: ', ''), doc.content.split(';')[4].replace('Description: ', '')) for i, doc in enumerate(result["retriever"]['documents'])],
            "rag_documents": [(i+1, '🔥', doc.content.split(';')[0].replace('Name: ', '')) for i, doc in enumerate(result["retriever"]['documents'])],
            "prompt_bild": result["prompt_builder"],
        }

    def get_history(self) -> List[ChatMessage]:
        """Get the conversation history."""
        memory_retriever = self.pipeline.get_component("memory_retriever")
        return memory_retriever.run()["messages"]



@component
class CustomDistilBertEmbedder:
    def __init__(self):
        # Initialisiere den Tokenizer und das Modell
        self.tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')
        self.model = DistilBertModel.from_pretrained("distilbert-base-uncased")
        self.model.eval()  # Setze das Modell in den Evaluierungsmodus
        
    def embed_text(self, text):
        encoded_input = self.tokenizer(
            text,
            padding=True,
            truncation=True,
            max_length=512,
            return_tensors='pt'
        )
        
        with torch.no_grad():
            output = self.model(**encoded_input)
            
        last_hidden_states = output.last_hidden_state
        attention_mask = encoded_input["attention_mask"]
        input_mask_expanded = attention_mask.unsqueeze(-1).expand(last_hidden_states.size()).float()
        embedding = torch.sum(last_hidden_states * input_mask_expanded, 1) / torch.clamp(
            input_mask_expanded.sum(1), min=1e-9
        )
        
        return embedding.squeeze().numpy()

    @component.output_types(embedding=List[float])
    def run(self, query: str):
        embedding = self.embed_text(query)
        return {"embedding": embedding.tolist()}  


class ConversationStore:
    def __init__(self, document_store: InMemoryDocumentStore, api_key: str):
        self.conversations: Dict[str, Conversation] = {}
        self.created_at: Dict[str, datetime] = {}
        self.document_store = document_store
        self.api_key = api_key
    
    def create_conversation(self, conversation_id: str) -> None:
        self.conversations[conversation_id] = Conversation(self.api_key, self.document_store)
        self.created_at[conversation_id] = datetime.utcnow()
    
    def get_conversation(self, conversation_id: str) -> Conversation:
        if conversation_id not in self.conversations:
            raise KeyError(f"Conversation {conversation_id} not found")
        return self.conversations[conversation_id]

    def delete_conversation(self, conversation_id: str) -> None:
        if conversation_id not in self.conversations:
            raise KeyError(f"Conversation {conversation_id} not found")
        del self.conversations[conversation_id]
        del self.created_at[conversation_id]

    def get_created_at(self, conversation_id: str) -> datetime:
        if conversation_id not in self.created_at:
            raise KeyError(f"Conversation {conversation_id} not found")
        return self.created_at[conversation_id]


@component
class ListJoiner:
    def __init__(self, _type: Any):
        component.set_output_types(self, values=_type)

    def run(self, values: Variadic[Any]):
        result = list(chain(*values))
        return {"values": result}
    
@component
class ChatMessageWrapper:
    def __init__(self):
        component.set_output_types(self, messages=List[ChatMessage])
        
    def run(self, text: str) -> List[ChatMessage]:
        return {"messages": [ChatMessage.from_user(text)]}


def setup_environment() -> str:
    load_dotenv()
    api_key = os.getenv("MISTRAL_API_KEY")
    if not api_key:
        raise ValueError("MISTRAL_API_KEY not found in environment variables")
    return api_key




def setup_document_store(url, index_name ) -> QdrantDocumentStore:

    document_store = QdrantDocumentStore(
        url,
        index=index_name,
        embedding_dim=768,
        recreate_index=False,
        return_embedding=True,
        wait_result_from_api=True,
    )

    return document_store

def chat_loop(conversation: Conversation):
   while True:
       question = input("Enter your question or Q to exit.\n🧑 ")
       if question == "Q":
           break

       result = conversation.send_message(question)
       print(f"🎃 [Rewritten search query: {result['rewritten_query']} ]")
       print(f"🤖 {result['assistant_message']}")
       print(f"🔥 PROVIED RECIPES: {result['rag_documents']}" )
#       print(f"🐦‍ PROMPT: {result['prompt_bild']}" )

       


def main():
   api_key = setup_environment()
   document_store = setup_document_store("100.107.35.86","recipe_test")
   conversation = Conversation(api_key, document_store)
   chat_loop(conversation)


if __name__ == "__main__":
   main()