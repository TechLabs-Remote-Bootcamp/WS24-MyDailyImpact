![logo](mdi-react/src/images/MDI_logo.png "MyDailyImpact")

## Summary

MyDailyImpact is an app where users can track their impact for every time they eat a plant-based meal. The app has a smooth UI that utilizes user authentication, CRUD operations, and API endpoints to log and view meals and impact metrics in four areas (animals, CO2, water, and forestland saved). It also has a plant-based recipe recommending chatbot that uses RAG (retrieval-augmented generation) architecture with custom neural network reranking.

## Demos

### App demo: https://drive.google.com/file/d/1fzXw7727m7eS1qdScomGzaXF_Ih1CL3d/view?usp=sharing

### AI chatbot demo: 

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TechLabs-Remote-Bootcamp/WS24-MyDailyImpact
   cd WS24-MyDailyImpact
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   APP_PORT=5001
   MONGODB_URI=mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
   Note: Contact the project maintainer for the MongoDB connection string.

4. Start backend server:
   ```bash
   npm run server
   ```

5. Open a  new terminal, navigate to the `mdi-react` directory and install frontend dependencies:
    ```bash
    cd mdi-react
    npm install
    ````

6. Start Vite development server:
   ```bash
   npm run dev
   ```

7. Open your browser and navigate to `http://localhost:5173`
