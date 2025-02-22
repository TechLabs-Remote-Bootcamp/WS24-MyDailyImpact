# Recipe Generator - Deep Learning Feature

## Overview
This repository contains the deep learning feature of our project - a Recipe Generator. The system uses RAG (Retrieval-Augmented Generation) and a reranker to generate vegan recipes based on available ingredients.

## Features
- RAG-based recipe generation
- Reranking for improved recipe relevance

## setup for frontend
1. you need to choose the right branch in git
2. install uv

3. go to the folder `deeplearning`. depending on your folder-structure it might be
```
cd deeplearning
``` 

4. Syncing your virtual environment aligned with your project's dependency requirements with pyproject.toml
``` 
uv sync
``` 


5. go to the folder rag_pipeline/app
```
cd rag_pipeline/app
``` 

6. run the API (you don't need the extra step to Activate your environment)
``` 
uv run fastapi dev
```

## responsible Team Members
- Kate
- Ella