
# MyDailyImpact - Recipe Generator (Deep Learning)

## Table of Contents
1. [Summary](#1-summary)
2. [Technologies Used](#2-technologies-used)
3. [Installation](#3-installation)
4. [Running the Application](#4-running-the-application)
5. [API Endpoints](#5-api-endpoints)
6. [API Keys (Development Only)](#6-api-keys-development-only)


## 1. Summary
The Recipe Generator is a plant-based recipe recommendation system that uses Retrieval-Augmented Generation (RAG) combined with a custom neural network reranker to provide personalized vegan recipes. Users can input available ingredients and dietary preferences to receive relevant, high-quality plant-based recipe suggestions from our chatbot "Planty".

## 2. Technologies Used
- **Python**: Core programming language
- **FastAPI**: API framework for integration with the main application
- **Haystack**: For building the RAG pipeline
- **Mistral LLM**: Natural language understanding and response generation
- **Qdrant**: Vector database for efficient recipe retrieval
- **DistilBERT**: For generating embeddings
- **PyTorch**: Framework for custom neural network reranker
- **UV**: Package manager for dependency management

## 3. Installation

### Prerequisites
- Python 3.9+
- UV package manager

### Setup Instructions

#### 3.1 Clone the Repository

#### 3.2 Setup Virtual Environment:
Install UV Package Manager: 
This project uses UV as its package manager. Ensure you have the UV package manager installed on your system. If not, please refer to the [official UV documentation](https://docs.astral.sh/uv/getting-started/) for installation instructions.

Navigate to the deeplearning directory:
``` 
cd deeplearning
```

Synchronize dependencies:
``` 
uv sync
```

#### 3.3 API Key Setup
The RAG pipeline requires a Mistral API key to function properly.

1. Create a Mistral API key by registering at Mistral AI Platform 
2. Navigate to the deeplearning directory:
``` 
cd deeplearning
```
3. Save the Mistral API key in a `.env` file
```
MISTRAL_API_KEY=your_api_key_here
```
Note: The .env file is already included in the .gitignore to prevent accidentally sharing the API key.


#### 3.4 Qdrant Setup
The Qdrant vector database is used for storing and retrieving recipe embeddings:


## 4. Running the Application

### 4.1 Start the FastAPI Server
Navigate to the app directory:
``` 
cd deeplearning/rag_pipeline/app/
```

Start the FastAPI development server:
``` 
uv run fastapi dev
```
Note: The virtual environment is automatically activated by UV, so no separate activation step is required.


### 4.2 Run the Gradio Chat Interface
The project includes a Gradio-based chat interface for **testing the API**:
```
cd deeplearning/rag_pipeline/

uv run --with gradio gradio_chat.py
```

The Gradio interface provides a user-friendly way to:
- Create new conversations
- Send messages to the recipe generator
- View conversation history
- Delete conversations

### 4.3 Access Points


## 5. API Endpoints


## 6. API Keys and connection to Database (Development Only)
For development purposes only:
- Mistral API Key: Obtain from Mistral AI Platform or ask Ella
- Qdrant database

## Project Structure
The deeplearning-folder is organized into several directories:

## Responsible Team Members
- Kate
- Ella