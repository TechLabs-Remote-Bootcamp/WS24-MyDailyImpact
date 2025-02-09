import os
from typing import Any, List
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

# Constants
CHAT_TEMPLATE = """Given the conversation history and the provided documents, give a brief answer to the question.\n
                Question: {{query}}\n
                
                Conversation history:
                {% for memory in memories %}
                    {{ memory.text }}
                {% endfor %}
                
                Documents: 
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

def setup_environment():
    load_dotenv()
    api_key = os.getenv("MISTRAL_API_KEY")
    return api_key

def load_sample_data():
    if not os.path.exists('essay.txt'):
        response = requests.get('https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt', timeout=10)
        with open('essay.txt', 'w', encoding='utf-8') as f:
            f.write(response.text)

def setup_document_store(api_key: str) -> InMemoryDocumentStore:
    document_store = InMemoryDocumentStore()
    docs = TextFileToDocument().run(sources=["essay.txt"])
    split_docs = DocumentSplitter(split_by="passage", split_length=2).run(documents=docs["documents"])
    embeddings = MistralDocumentEmbedder(api_key=Secret.from_token(api_key)).run(documents=split_docs["documents"])
    DocumentWriter(document_store=document_store).run(documents=embeddings["documents"])
    return document_store

def create_pipeline(api_key: str, document_store: InMemoryDocumentStore) -> Pipeline:
    pipeline = Pipeline()
    memory_store = InMemoryChatMessageStore()
    
    # Initialize components
    text_embedder = MistralTextEmbedder(api_key=Secret.from_token(api_key))
    retriever = InMemoryEmbeddingRetriever(document_store=document_store)
    prompt_builder = ChatPromptBuilder(variables=["query", "documents", "memories"], 
                                     required_variables=["query", "documents", "memories"])
    llm = MistralChatGenerator(api_key=Secret.from_token(api_key), model='mistral-large-latest')
    rephrase_llm = MistralChatGenerator(api_key=Secret.from_token(api_key), model='mistral-large-latest')
    
    # Add components
    pipeline.add_component("query_rephrase_prompt_builder", PromptBuilder(template=QUERY_REPHRASE_TEMPLATE))
    pipeline.add_component("message_wrapper", ChatMessageWrapper())
    pipeline.add_component("query_rephrase_llm", rephrase_llm)
    pipeline.add_component("list_to_str_adapter", OutputAdapter(template="{{ replies[0] }}", output_type=str))
    pipeline.add_component("text_embedder", text_embedder)
    pipeline.add_component("retriever", retriever)
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

    # RAG connections
    pipeline.connect("text_embedder.embedding", "retriever.query_embedding")
    pipeline.connect("retriever.documents", "prompt_builder.documents")
    pipeline.connect("prompt_builder.prompt", "llm.messages")

    # Memory connections
    pipeline.connect("llm.replies", "memory_joiner")
    pipeline.connect("memory_joiner", "memory_writer")
    pipeline.connect("memory_retriever", "prompt_builder.memories")
    
    return pipeline

def chat_loop(pipeline: Pipeline):
    system_message = ChatMessage.from_system("You are a helpful AI assistant using provided supporting documents and conversation history to assist humans")
    user_message = ChatMessage.from_user(CHAT_TEMPLATE)
    messages = [system_message, user_message]

    while True:
        question = input("Enter your question or Q to exit.\n🧑 ")
        if question == "Q":
            break

        res = pipeline.run(
            data={
                "query_rephrase_prompt_builder": {"query": question},
                "prompt_builder": {"template": messages, "query": question},
                "memory_joiner": {"values": [ChatMessage.from_user(question)]}
            },
            include_outputs_from=["llm", "query_rephrase_llm"]
        )
        
        search_query = res['query_rephrase_llm']['replies'][0]
        print(f"🎃 [Rewritten search query: {search_query.text} ]")
        
        assistant_resp = res['llm']['replies'][0]
        print(f"🤖 {assistant_resp.text}")

def main():
    api_key = setup_environment()
    load_sample_data()
    document_store = setup_document_store(api_key)
    pipeline = create_pipeline(api_key, document_store)
    chat_loop(pipeline)

if __name__ == "__main__":
    main()
