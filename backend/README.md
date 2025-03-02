# MyDailyImpact Backend

This is the backend server for the MyDailyImpact application, a simple app that helps users track their contribution to a sustainable plant-based lifestyle.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [API Endpoints](#api-endpoints)
4. [Environment Variables](#environment-variables)
5. [Database](#database)
6. [Authentication](#authentication)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with the necessary environment variables (see [Environment Variables](#environment-variables) section).

3. Start the server:
   ```bash
   npm run server
   ```

## Project Structure

The backend is organized into several directories:

- `config/`: Contains constants and database configurations
- `controllers/`: Handles the logic for API endpoints
- `middleware/`: Contains middleware functions, including authentication
- `models/`: Defines database models (e.g., User, MealLog)
- `routes/`: Defines API routes
- `scripts/`: Contains utility scripts
- `utils/`: Contains utility functions

## API Endpoints

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

## API Documentation
https://documenter.getpostman.com/view/26399217/2sAYX6p2Qq#intro

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
APP_PORT=5001
MONGODB_URI=mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Note: Contact the project maintainer for the MongoDB connection string.

## Database

This project uses MongoDB as its database. The main models are:

- User: Stores user information
- MealLog: Stores user's meal logs
- ImpactMetrics: Stores user's impact metrics

## Authentication

Authentication is handled using JSON Web Tokens (JWT). The `auth.js` middleware is used to protect routes that require authentication.
