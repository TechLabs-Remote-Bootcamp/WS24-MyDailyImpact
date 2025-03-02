from contextlib import asynccontextmanager
from typing import Dict, List
from uuid import uuid4
from datetime import datetime

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from pipeline import (
   setup_environment,
   setup_document_store,
   ConversationStore
)


class MessageRequest(BaseModel):
   content: str


class MessageResponse(BaseModel):
   content: str
   metadata: dict


class ConversationResponse(BaseModel):
   conversation_id: str
   messages: List[Dict[str, str]]
   created_at: datetime


@asynccontextmanager
async def lifespan(app: FastAPI):
   # Startup: Initialize document store and conversation store
   api_key = setup_environment()
   document_store = setup_document_store("100.107.35.86","recipe_test")
   app.state.conversation_store = ConversationStore(document_store, api_key)
   
   yield


app = FastAPI(lifespan=lifespan)


@app.post("/v1/conversations")
async def create_conversation() -> dict:
   conversation_id = str(uuid4())
   app.state.conversation_store.create_conversation(conversation_id)
   return {"conversation_id": conversation_id}


@app.delete("/v1/conversations/{conversation_id}", status_code=204)
async def delete_conversation(conversation_id: str) -> None:
   try:
       app.state.conversation_store.delete_conversation(conversation_id)
   except KeyError:
       raise HTTPException(status_code=404, detail="Conversation not found")


@app.post("/v1/conversations/{conversation_id}/messages")
async def send_message(conversation_id: str, message: MessageRequest) -> MessageResponse:
   try:
       conversation = app.state.conversation_store.get_conversation(conversation_id)
       result = conversation.send_message(message.content)
       
       return MessageResponse(
           content=result["assistant_message"],
           metadata={
               "rewritten_query": result["rewritten_query"]
           }
       )
   
   except KeyError:
       raise HTTPException(status_code=404, detail="Conversation not found")


@app.get("/v1/conversations/{conversation_id}")
async def get_conversation(conversation_id: str) -> ConversationResponse:
   try:
       conversation = app.state.conversation_store.get_conversation(conversation_id)
       return ConversationResponse(
           conversation_id=conversation_id,
           messages=[
               {
                   "role": msg.role,
                   "content": msg.text
               } for msg in conversation.get_history()
           ],
           created_at=app.state.conversation_store.get_created_at(conversation_id)
       )
   except KeyError:
       raise HTTPException(status_code=404, detail="Conversation not found")


@app.get("/v1/health")
async def health_check() -> dict:
   return {"status": "ok"}