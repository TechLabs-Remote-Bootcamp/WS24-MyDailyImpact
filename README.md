# WS24-MyDailyImpact

## Summary

A simple app to track your contribution to a sustainable plant-based lifestyle.
**WILL ADD MORE TO THIS**


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
