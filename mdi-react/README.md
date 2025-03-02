# MyDailyImpact - Frontend

## Table of Contents

1. [Summary](#1-summary)

2. [Technologies Used](#2-technologies-used)

3. [Installation](#3-installation)

4. [Running the Application](#4-running-the-application)

5. [API Endpoints](#5-api-endpoints)

6. [Team](#6-team)

## 1. Summary

Our MyDailyImpact app allows users to track their contribution to a sustainable plant-based lifestyle, meal by meal. In the frontend, the project was implemented with Vite and React.

## 2. Technologies Used

- **Javascript**: Programming language
- **React**: Javascript library for web user interfaces
- **Vite**: Fast Javascript build tool with out-of-the-box support for common web patterns
- **SCSS**: CSS extension

## 3. Installation

### Prerequisites

1. Clone the repository:

   ```bash
   git clone https://github.com/TechLabs-Remote-Bootcamp/WS24-MyDailyImpact
   cd WS24-MyDailyImpact
   ```

2. Install backend dependencies to have access to the database of the app:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   APP_PORT=5001
   MONGODB_URI=mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

   Note: Contact the project maintainer for the MongoDB connection string. (vivianmargothsandler@gmail.com)

4. Start backend server:

   ```bash
   npm run server
   ```

### Setup Instructions

Open a new terminal, navigate to the `mdi-react` directory and install frontend dependencies:

```bash
cd mdi-react
npm install
```

## 4. Running the Application

1. Start Vite development server:

   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173`. Note, that only port 5173 has access to the database.

## 5. API Endpoints

### User Authentication

- POST `/api/auth/register`: Register a new user
- POST `/api/auth/login`: Log in a user
- GET `/api/auth/current-user`: Get current logged in user
- PUT `/auth/update-profile`: Update user profile

### Impact Metrics

- GET `/api/impact-metrics/:userId`: Get user's impact metrics
- POST `/api/impact-metrics/:userId`: Update user's impact metrics

### Meal Logging

- POST `/api/meal-logs`: Create a new meal log
- GET `/api/meal-logs/:userId`: Get user's meal logs
- PUT `/api/meal-logs/meal/:mealLogId`: Update a meal log
- DELETE `/api/meal-logs/meal/:mealLogId`: Delete a meal log

## 6. Team

- Christine Stockert
- Vivian Sandler
