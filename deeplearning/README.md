# Recipe Generator - Deep Learning Feature

## Overview
This repository contains the deep learning feature of our project - a Recipe Generator. The system uses RAG (Retrieval-Augmented Generation) and a reranker to generate vegan recipes based on available ingredients.

## Features
- RAG-based recipe generation
- Reranking for improved recipe relevance

## Setup Guide

### 1. Environment Setup

#### 1.1. Repository Configuration
Switch to the appropriate branch in git

#### 1.2. install uv
This project uses UV as its package manager. Ensure you have the UV package manager installed on your system. If not, please refer to the [official UV documentation](https://docs.astral.sh/uv/getting-started/) for installation instructions.


#### 1.3. Navigate to Project Directory
Navigate to the `deeplearning` project directory:

```
# Verify your current location
pwd

# Access the project directory. Note: The exact path may vary depending on your folder structure.
cd deeplearning
```


#### 1.4. Configure Virtual Environment
Synchronize your virtual environment with the project dependencies specified in pyproject.toml
``` 
uv sync
``` 

### 2. Qdrant Server Connection Setup

### 3. API Usage Setup

#### 3.1. Navigate to Application Directory
Navigate to the API application directory:

```
# Verify your current location
pwd

# Access the application folder. Note: The exact path may vary depending on your folder structure.
cd deeplearning/rag_pipeline/app/
```

#### 3.2. Launch the API Server
Start the FastAPI development server:
``` 
uv run fastapi dev
```
Note: The virtual environment is automatically activated by UV, so no separate activation step is required.


## responsible Team Members
- Kate
- Ella

