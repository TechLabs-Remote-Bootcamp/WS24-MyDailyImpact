#%%
from haystack import Pipeline
from haystack.document_stores.in_memory import InMemoryDocumentStore
from haystack.dataclasses import ChatMessage
from haystack.utils.auth import Secret

from haystack.components.builders import ChatPromptBuilder, PromptBuilder
from haystack.components.converters import TextFileToDocument
from haystack.components.preprocessors import DocumentSplitter
from haystack.components.retrievers.in_memory import InMemoryEmbeddingRetriever
from haystack.components.writers import DocumentWriter
from haystack_integrations.components.embedders.mistral import MistralDocumentEmbedder, MistralTextEmbedder
from haystack_integrations.components.generators.mistral import MistralChatGenerator

from haystack.components.converters import OutputAdapter

from haystack_experimental.chat_message_stores.in_memory import InMemoryChatMessageStore
from haystack_experimental.components.retrievers import ChatMessageRetriever
from haystack_experimental.components.writers import ChatMessageWriter

from itertools import chain
from typing import Any
from typing import List

from haystack import component
from haystack.core.component.types import Variadic

# %% [markdown]
# # RAG-pipeline

# %% [markdown]
# full flow from the BD perspective:
# 1. User Query → Sent to RAG Pipeline (via API Layer).
# 2. RAG Pipeline (in a Container):
#    - Preprocess Query (tokenization, cleaning, etc.).
#    - Embed Query → Convert to vector.
#    - Retrieve Data from Qdrant Vector Database.
#    - Rerank Documents for relevance.
#    - Generate Response using LLM (query + context).
# 3. Response → Return to User (via API Layer).

# %% [markdown]
# ##  Load API-key

# %%
from dotenv import load_dotenv
import os

load_dotenv()  # loads the variable from .env-file
api_key = os.getenv("MISTRAL_API_KEY")

# %% [markdown]
# ## RAG - NOT finishes

# %%
# 1. template is from https://docs.mistral.ai/guides/rag/#rag-with-haystack
# 2. template is from https://docs.haystack.deepset.ai/docs/pipeline-templates

###############################################
# changes in 1. template were made with help of claude.ai
#  1. DynamicChatPromptBuilder replaced by ChatPromptBuilder
#  1.a. ChatPromptBuilder doesn't use runtime_variables or prompt_source parameters
#  1.b. Instead, it takes the messages directly as template
#  1.c. The template variables are passed directly to the run method
#  2.a. Changed the import from DynamicChatPromptBuilder to ChatPromptBuilder
#  2.b. Removed the runtime_variables parameter from the prompt builder initialization
#  2.c. Changed prompt_source to template in the pipeline run parameters
#  2.d. Added documents as a template variable in the run parameters
#  3. Ah, I see the issue. The ChatPromptBuilder doesn't have a documents input socket like DynamicChatPromptBuilder did. Instead, we need to pass the documents through the template_variables. Here's the corrected code:
#  3.a. Removed the connection between retriever and prompt_builder since ChatPromptBuilder doesn't have a documents input
#  3.b. Added the documents directly in the template_variables
#  3.c. Added retriever query parameter in the pipeline run
#  4. Ah, I see the issue. For the InMemoryEmbeddingRetriever, we need to provide the query_embedding, not the raw query. Let me correct the code:
#  4.a. Removed the direct "retriever" input from the pipeline run
#  4.b. In the template_variables, we now get the documents by:
#  4.b.a. First getting the embedding for the question using text_embedder
#  4.b.b. Then using that embedding to retrieve documents from the retriever
#  4.b.c. Passing those retrieved documents to the template_variables
#  5. Ah, I see. There's been an API change in Haystack where we need to use .text instead of .content to access the message content. Here's the corrected code:
###############################################





###############################################
# Data
import requests
response = requests.get('https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt')
text = response.text
f = open('essay.txt', 'w')
f.write(text)
f.close()
###############################################


# Create the document store (this is just for testing purposes)
document_store = InMemoryDocumentStore()
docs = TextFileToDocument().run(sources=["essay.txt"])
split_docs = DocumentSplitter(split_by="passage", split_length=2).run(documents=docs["documents"])
embeddings = MistralDocumentEmbedder(api_key=Secret.from_token(api_key)).run(documents=split_docs["documents"])
DocumentWriter(document_store=document_store).run(documents=embeddings["documents"])

text_embedder = MistralTextEmbedder(api_key=Secret.from_token(api_key))
retriever = InMemoryEmbeddingRetriever(document_store=document_store)
prompt_builder = ChatPromptBuilder(variables=["query", "documents", "memories"], required_variables=["query", "documents", "memories"])
llm = MistralChatGenerator(api_key=Secret.from_token(api_key), 
                          model='mistral-large-latest')

rephrase_llm = MistralChatGenerator(api_key=Secret.from_token(api_key), 
                          model='mistral-large-latest')

#%%
chat_template = """Given the conversation history and the provided documents, give a brief answer to the question.\n
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

user_message = ChatMessage.from_user(chat_template)

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



system_message = ChatMessage.from_system("You are a helpful AI assistant using provided supporting documents and conversation history to assist humans")


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
        return {"messages": [
            ChatMessage.from_user(text)
        ]}

# Set up the in-memory store
memory_store = InMemoryChatMessageStore()
memory_retriever = ChatMessageRetriever(memory_store)
memory_writer = ChatMessageWriter(memory_store)

messages = [ChatMessage.from_user(chat_template)]

rag_pipeline = Pipeline()

# Query rephrasing
rag_pipeline.add_component("query_rephrase_prompt_builder", PromptBuilder(template=QUERY_REPHRASE_TEMPLATE))
rag_pipeline.add_component("message_wrapper", ChatMessageWrapper())
rag_pipeline.add_component("query_rephrase_llm", rephrase_llm)
rag_pipeline.add_component("list_to_str_adapter", OutputAdapter(template="{{ replies[0] }}", output_type=str))

# RAG
rag_pipeline.add_component("text_embedder", text_embedder)
rag_pipeline.add_component("retriever", retriever)
rag_pipeline.add_component("prompt_builder", prompt_builder)
rag_pipeline.add_component("llm", llm)


# Memory
rag_pipeline.add_component("memory_retriever", ChatMessageRetriever(memory_store))
rag_pipeline.add_component("memory_writer", ChatMessageWriter(memory_store))
rag_pipeline.add_component("memory_joiner", ListJoiner(List[ChatMessage]))


# Query rephrasing connections and RAG
# NEED TO ADAPT
rag_pipeline.connect("memory_retriever", "query_rephrase_prompt_builder.memories")
rag_pipeline.connect("query_rephrase_prompt_builder.prompt", "message_wrapper")
rag_pipeline.connect("message_wrapper.messages", "query_rephrase_llm")
rag_pipeline.connect("query_rephrase_llm.replies", "list_to_str_adapter")
# rag_pipeline.connect("list_to_str_adapter", "retriever.query")
rag_pipeline.connect("list_to_str_adapter", "text_embedder")


# connections for RAG
# FROM ELLA
rag_pipeline.connect("text_embedder.embedding", "retriever.query_embedding")
rag_pipeline.connect("retriever.documents", "prompt_builder.documents")
rag_pipeline.connect("prompt_builder.prompt", "llm.messages")

# Memory
rag_pipeline.connect("llm.replies", "memory_joiner")
rag_pipeline.connect("memory_joiner", "memory_writer")
rag_pipeline.connect("memory_retriever", "prompt_builder.memories")

# question = "What were the two main things the author worked on before college?"
# result = rag_pipeline.run(
#     {
#         "text_embedder": {"text": question},
#         "prompt_builder": {
#             "template": messages,
#             "template_variables": {
#                 "query": question,
#                 "documents": retriever.run(query_embedding=text_embedder.run(text=question)["embedding"])["documents"]
#             }
#         },
#         "llm": {"generation_kwargs": {
#             "max_tokens": 225
#             }},
#     }
# )
# print(result["llm"]["replies"][0].text)  # Changed from .content to .text

# %% [markdown]
# ## Visualizing Pipelines

# %%
# rag_pipeline.show()


while True:
    messages = [system_message, user_message]
    question = input("Enter your question or Q to exit.\n🧑 ")
    if question=="Q":
        break

    res = rag_pipeline.run(data={"query_rephrase_prompt_builder": {"query": question},
                             "prompt_builder": {"template": messages, "query": question},
                             "memory_joiner": {"values": [ChatMessage.from_user(question)]}},
                            include_outputs_from=["llm"])
    assistant_resp = res['llm']['replies'][0]
    print(f"🤖 {assistant_resp.text}")
