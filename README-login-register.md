# Login/Register Feature with Authentication System

A secure authentication system built with React, Node.js, and MongoDB, featuring user registration and login functionality.

## Features

- **User Registration:** Create new accounts with:
  - Full name
  - Email
  - Password
  - Birthday
  - Gender selection

- **User Login:** Secure authentication with:
  - Email/password login
  - Remember me option
  - JWT-based authentication
  - Session management

- **Security Features:**
  - Password hashing
  - JWT token authentication
  - Protected routes
  - Input validation

## Tech Stack

- Frontend:
  - React
  - TailwindCSS
  - Lucide Icons
  - JWT handling

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Bcrypt for password hashing

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TechLabs-Remote-Bootcamp/WS24-MyDailyImpact
   cd WS24-MyDailyImpact
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start backend server:
   ```bash
   npm run server
   ```

5. Start Vite development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login existing user

## Environment Variables

- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation

## Contributing

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```

2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

3. Push to your branch:
   ```bash
   git push origin feature-name
   ```

4. Create a Pull Request from your branch to main