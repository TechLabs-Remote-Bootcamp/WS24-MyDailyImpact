# Loading FastAPI (from AI), backend, and frontend servers to have the old version of the app’s chatbot render correctly

This is the old working version of the chatbot the AI team created before they made their more advanced RAG chatbot.

Note: If you encounter any errors or messages during the setup process in which you need more information (e.g., Mistral API Key, MongoDB connection string), please contact the team lead Vivian (vivianmargothsandler@gmail.com).

## Instructions to create and activate the virtual environment and load the servers:

### 1. Create a virtual environment in the root of the project:


- open bash or terminal
- (Git Bash/Windows) `python -m venv venv`
- (macOS/Linux) `python3 -m venv venv`


### 2. Activate the virtual environment:


In the same bash or terminal:
- (GitBash) `source ./venv/Scripts/activate`
- (Windows) `venv\Scripts\activate`
- (macOS/Linux) `source venv/bin/activate`


### 3. Install dependencies:

In the same bash or terminal:
- `cd deeplearning/rag_pipeline/app`
- `pip install -r requirement.txt`


### 4. Start the FastAPI server: 

In the same bash or terminal (you should be in deeplearning/rag_pipeline/app):
- `uvicorn main:app --host 0.0.0.0 --port 8000 --reload`

### 5. Start the backend server:

- open new bash or new terminal
- `cd backend`
- `npm run server`

### 6. Start the frontend/React development server:

- open new bash or new terminal
- `cd mdi-react`
- `npm run dev`

---

### Viewing the app in the browser

The app will be working at the address http://localhost:5173/

If your browser doesn’t open automatically, type that address in your browser.
