#!/usr/bin/env python3
# visualization_pipeline_script.py

import os
import sys


# Add app directory to path so Python can find the pipeline module
current_dir = os.path.dirname(os.path.abspath(__file__))  # visualization_pipeline directory
parent_dir = os.path.dirname(current_dir)  # root directory
app_dir = os.path.join(parent_dir, "app")  # app directory
sys.path.append(app_dir)

from dotenv import load_dotenv
from pipeline import Conversation, setup_document_store

def main():
    # Load environment variables
    load_dotenv()
    api_key = os.getenv("MISTRAL_API_KEY")
    if not api_key:
        raise ValueError("MISTRAL_API_KEY not found in environment variables")
    
    # Set up document store
    document_store = setup_document_store("100.107.35.86", "recipe_test")
    
    # Create conversation with pipeline
    conversation = Conversation(api_key, document_store)
    
    # Get the pipeline
    pipeline = conversation.pipeline
    
    # Create output directory if it doesn't exist
    output_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(output_dir, "visualization_pipeline.png")
    
    # Save pipeline visualization as PNG
    pipeline.draw(path=output_path)
    print(f"Pipeline visualization saved to: {output_path}")

if __name__ == "__main__":
    main()