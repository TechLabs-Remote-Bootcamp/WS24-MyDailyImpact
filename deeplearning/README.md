# Recipe Generator - Deep Learning Feature

## Overview
This repository contains the deep learning feature of our project - a Recipe Generator. The system uses RAG (Retrieval-Augmented Generation) and a reranker to generate vegan recipes based on available ingredients.

## Features
- RAG-based recipe generation
- Reranking for improved recipe relevance


## Input/Output Specification

### Input Format
```python
input_text = "Carrots, Mushrooms, Tofu"
```

### Output Format
The system generates a JavaScript object containing:
```javascript
{
    "recipeName": "Stir-Fried Tofu with Carrots and Mushrooms",
    "ingredients": [
        "200g spaghetti",
        "2 cloves garlic, minced",
        "2 tablespoons olive oil",
        "1 Carrot", 
        "5 Mushrooms", 
        "100g Tofu"
    ],
    "category": "Main Course"
}
```

        
   
## Setup and Installation

## Usage

## Integration with Frontend

## Testing
