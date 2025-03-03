
# MyDailyImpact - Recipe Generator (Deep Learning)

## Table of Contents
1. [Summary](#1-summary)
2. [Technologies Used](#2-technologies-used)
3. [Installation](#3-installation)
   - [Project Structure](#project-structure)
   - [Prerequisites](#prerequisites)
   - [Setup Instructions](#setup-instructions)
4. [Running the Application](#4-running-the-application)
5. [API Endpoints](#5-api-endpoints)
6. [API Keys and Connection to Database (Development Only)](#6-api-keys-and-connection-to-database-development-only)
7. [Current Deployment Status](#7-current-deployment-status)
8. [Responsible Team Members](#8-responsible-team-members)
 
 

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

### Project Structure
The deeplearning-folder is organized into several directories:
``` 
deeplearning/
├── .venv/                                    # Virtual environment
├── data/                                     # Recipe data and datasets
├── rag_pipeline/                             # Main RAG implementation
│   ├── app/                                  # FastAPI application
│   │   ├── main.py                           # Main application entry point
│   │   └── pipeline.py                       # Core RAG pipeline implementation
│   ├── visualization_pipeline/               # Pipeline visualization tools
│   │   └── visualization_pipeline_script.py  # Script for generating pipeline visualizations
│   └── gradio_chat.py                        # Gradio chat interface for testing
├── reranker/                                 # Neural network reranker components
│   ├── similarity_nn.pth                     # Trained neural network model
│   └── trained_reranker.py                   # Reranker implementation
├── .env                                      # Environment API keys
├── .python-version                           # Python version specification
├── pyproject.toml                            # Project dependencies 
├── uv.lock                                   # UV lock file for dependencies
└── README.md                                 # Project documentation of the deeplearning-team
```


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

   - The application is already configured to use a Qdrant instance at `100.107.35.86`
   - This server is accessible via Tailscale only
   - Contact T.V. from the Backend team to get Tailscale access
   - The database contains ~16000 vegan recipes with their embeddings
   - Data is stored in the `recipe_test` collection

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

### 5.1 Create Conversation
- **Endpoint**: `/v1/conversations`
- **Method**: POST
- **Description**: Creates a new conversation session
- **Response Example**:
```json
{
  "conversation_id": "12345-67890-abcde"
}
```

### 5.2 Delete Conversation
- **Endpoint**: `/v1/conversations/{conversation_id}`
- **Method**: DELETE
- **Description**: Deletes a conversation
- **Response**: 204 No Content


### 5.3 Send Message
- **Endpoint**: `/v1/conversations/{conversation_id}/messages`
- **Method**: POST
- **Request Body**:
```json
{
  "content": "What can I make with tomatoes, basil, and pasta?"
}
```
- **Response Example**:
```json
{
  "content": "I'd recommend a simple Tomato Basil Pasta. Here's how to make it:\n\nIngredients:\n- 8 oz pasta\n- 2 cups cherry tomatoes, halved\n- 1/4 cup fresh basil, chopped\n- 2 cloves garlic, minced\n- 2 tbsp olive oil\n- Salt and pepper to taste\n\nInstructions:\n1. Cook pasta according to package directions.\n2. In a pan, heat olive oil and sauté garlic until fragrant.\n3. Add tomatoes and cook until slightly softened.\n4. Toss with cooked pasta, fresh basil, salt, and pepper.\n5. Serve immediately.\n\nWould you like to try something else with these ingredients?",
  "metadata": {
    "rewritten_query": "vegan pasta recipes with tomatoes and basil"
  }
}
```

### 5.4 Get Conversation History
- **Endpoint**: `/v1/conversations/{conversation_id}`
- **Method**: GET
- **Description**: Retrieves the full conversation history
- **Response Example**:
```json
{
  "conversation_id": "12345-67890-abcde",
  "messages": [
    {
      "role": "user",
      "content": "What can I make with tomatoes, basil, and pasta?"
    },
    {
      "role": "assistant",
      "content": "I'd recommend a simple Tomato Basil Pasta. Here's how to make it:..."
    }
  ],
  "created_at": "2025-03-02T14:30:45.123456"
}
```

### 5.5 Health Check
- **Endpoint**: `/v1/health`
- **Method**: GET
- **Description**: Checks if the API is running properly
- **Response Example**:
```json
{
  "status": "ok"
}
```

## 6. API Keys and Connection to Database (Development Only)
For development purposes only:
- Obtain **Mistral API Key**: ask Team-Member Ella or Obtain from Mistral AI Platform
- **Qdrant Database Connection**:
  - The Qdrant server is hosted on T.V.'s server at `100.107.35.86`
  - You need Tailscale access to connect to this server
  - Contact T.V. from the Backend team to request access credentials
  - The recipe data is stored in the `recipe_test` collection with 768-dimensional embeddings


## 7. Current Deployment Status

**Note:** The application is currently in development and not yet publicly hosted. If you would like to test the application:

1. Contact Team-Member T. V. from the Backend team to get Tailscale access to the development server
2. Once you have Tailscale access, you can connect to the Qdrant database at `100.107.35.86`

### 7.1 Qdrant Database Setup

The recipe data is stored in the Qdrant vector database. We've processed and stored approximately 16000 vegan recipes with their embeddings. Here's a simplified overview of how the data was prepared and stored:

```python
# Data loading
vegan_recipes = pd.read_csv("data/before_embedding_vegan_recipes.csv")

# Load embeddings
with open("data/recipes_data.json", "r") as f:
    vector_recipes = json.load(f)
vector_recipes_dict = {elem['RecipeId']: elem['VectorData'] for elem in vector_recipes}

# Connect to Qdrant
document_store = QdrantDocumentStore(
    "100.107.35.86",
    index="recipe_test",
    embedding_dim=768,
    recreate_index=True,
    return_embedding=True,
    wait_result_from_api=True,
)

# Prepare and store documents
list_documents = []
for i in range(len(vegan_recipes)):
    recipe_id = vegan_recipes.iloc[i]["RecipeId"]
    recipe_text = vegan_recipes.iloc[i]["merged_text"]
    recipe_vector = vector_recipes_dict[recipe_id]

    list_documents.append(Document(content=recipe_text, embedding=recipe_vector))

document_store.write_documents(list_documents)
```

## 8. Responsible Team Members
- Kate
- Ella