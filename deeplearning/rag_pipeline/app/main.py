from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, List
from uuid import uuid4
import os
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
api_key = os.getenv("MISTRAL_API_KEY")
if not api_key:
    raise ValueError("MISTRAL_API_KEY not found in environment variables")

# Import the Mistral client
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage

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
            ChatMessage(role="system", content="You are Planty, a helpful recipe assistant that specializes in plant-based recipes. Your goal is to suggest creative and delicious vegan recipes based on the ingredients users have available.")
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