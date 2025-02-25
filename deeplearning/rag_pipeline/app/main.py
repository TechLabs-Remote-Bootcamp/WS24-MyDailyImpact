# Simplified version of the main.py file in the RAG pipeline application.

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, List
from uuid import uuid4
import os
from datetime import datetime
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
from dotenv import load_dotenv


# Load environment variables
load_dotenv()
api_key = os.getenv("MISTRAL_API_KEY")
if not api_key:
    raise ValueError("MISTRAL_API_KEY not found in environment variables")


# Initialize Mistral client
mistral_client = MistralClient(api_key=api_key)


# FastAPI models
class MessageRequest(BaseModel):
    content: str


class MessageResponse(BaseModel):
    content: str
    metadata: Dict[str, Any]


# Store conversations in memory
conversations = {}


# Create FastAPI app
app = FastAPI()


# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your React app's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/v1/conversations")
async def create_conversation() -> Dict[str, str]:
    conversation_id = str(uuid4())
    conversations[conversation_id] = {
        "created_at": datetime.utcnow(),
        "messages": []
    }
    return {"conversation_id": conversation_id}


@app.post("/v1/conversations/{conversation_id}/messages")
async def send_message(conversation_id: str, message: MessageRequest) -> MessageResponse:
    if conversation_id not in conversations:
        raise HTTPException(status_code=404, detail="Conversation not found")
   
    try:
        # Store user message
        conversations[conversation_id]["messages"].append(
            {"role": "user", "content": message.content}
        )
       
        # Create message list for Mistral API
        messages = [
            ChatMessage(role="system", content="You are Planty, a helpful recipe assistant that specializes in plant-based recipes. Your goal is to suggest creative and delicious vegan recipes based on the ingredients users have available."),
        ]
       
        # Add conversation history
        for msg in conversations[conversation_id]["messages"][-5:]:  # Just use last 5 messages
            messages.append(ChatMessage(role=msg["role"], content=msg["content"]))
           
        # Call Mistral API
        response = mistral_client.chat(
            model="mistral-large-latest",
            messages=messages,
            temperature=0.7,
            max_tokens=1000
        )
       
        # Extract response content
        assistant_message = response.choices[0].message.content
       
        # Store assistant message
        conversations[conversation_id]["messages"].append(
            {"role": "assistant", "content": assistant_message}
        )
       
        return MessageResponse(
            content=assistant_message,
            metadata={"simple_version": True}
        )
   
    except Exception as e:
        print(f"Error processing message: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing message: {str(e)}")


@app.get("/v1/health")
async def health_check() -> Dict[str, str]:
    return {"status": "ok"}


# from contextlib import asynccontextmanager
# from typing import Dict, List
# from uuid import uuid4
# from datetime import datetime
# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel


# from pipeline import (
#    setup_environment,
#    setup_document_store,
#    ConversationStore
# )




# class MessageRequest(BaseModel):
#    content: str




# class MessageResponse(BaseModel):
#    content: str
#    metadata: dict




# class ConversationResponse(BaseModel):
#    conversation_id: str
#    messages: List[Dict[str, str]]
#    created_at: datetime




# @asynccontextmanager
# async def lifespan(app: FastAPI):
#    # Startup: Initialize document store and conversation store
#    api_key = setup_environment()
#    document_store = setup_document_store("100.107.35.86","recipe_test")
#    app.state.conversation_store = ConversationStore(document_store, api_key)
   
#    yield




# app = FastAPI(lifespan=lifespan)


# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# @app.post("/v1/conversations")
# async def create_conversation() -> dict:
#    conversation_id = str(uuid4())
#    app.state.conversation_store.create_conversation(conversation_id)
#    return {"conversation_id": conversation_id}




# @app.delete("/v1/conversations/{conversation_id}", status_code=204)
# async def delete_conversation(conversation_id: str) -> None:
#    try:
#        app.state.conversation_store.delete_conversation(conversation_id)
#    except KeyError:
#        raise HTTPException(status_code=404, detail="Conversation not found")




# @app.post("/v1/conversations/{conversation_id}/messages")
# async def send_message(conversation_id: str, message: MessageRequest) -> MessageResponse:
#    try:
#        conversation = app.state.conversation_store.get_conversation(conversation_id)
#        result = conversation.send_message(message.content)
       
#        return MessageResponse(
#            content=result["assistant_message"],
#            metadata={
#                "rewritten_query": result["rewritten_query"]
#            }
#        )
   
#    except Exception as e:
#        print(f"Error in send_message: {e}")  # Add this line for logging
#        raise HTTPException(status_code=500, detail=str(e))




# @app.get("/v1/conversations/{conversation_id}")
# async def get_conversation(conversation_id: str) -> ConversationResponse:
#    try:
#        conversation = app.state.conversation_store.get_conversation(conversation_id)
#        return ConversationResponse(
#            conversation_id=conversation_id,
#            messages=[
#                {
#                    "role": msg.role,
#                    "content": msg.text
#                } for msg in conversation.get_history()
#            ],
#            created_at=app.state.conversation_store.get_created_at(conversation_id)
#        )
#    except KeyError:
#        raise HTTPException(status_code=404, detail="Conversation not found")




# @app.get("/v1/health")
# async def health_check() -> dict:
#    return {"status": "ok"}


# @app.post("/v1/test/conversations")
# async def create_test_conversation() -> dict:
#     """Test endpoint that creates a conversation ID without using Mistral API"""
#     conversation_id = str(uuid4())
#     return {"conversation_id": conversation_id}


# @app.post("/v1/test/conversations/{conversation_id}/messages")
# async def test_message(conversation_id: str, message: MessageRequest) -> MessageResponse:
#     """Test endpoint that echoes messages without using Mistral API"""
#     return MessageResponse(
#         content=f"Echo from server: '{message.content}'",
#         metadata={"test": True, "conversation_id": conversation_id}
#     )
