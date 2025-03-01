# WS24-MyDailyImpact

A simple app to track your contribution to a sustainable plant-based lifestyle.

Mid-semester presentation slide deck: https://docs.google.com/presentation/d/19eviPtRrXohpU70myDsvSQLJWN2Gb-aLzX_i8klLoLE/edit?usp=sharing

# Git Workflow Guidelines

## Always Create a New Branch ➡️

Never commit directly to the main branch.🚨⚠️

Always create a new `feature`, `fix`, `docs`, `test`, `design`, or `refactor` branch off the main before starting any work. This ensures that the main branch remains stable and production-ready.

```bash
git checkout -b feature/short_description
```

[Read more about branch naming conventions](https://medium.com/@abhay.pixolo/naming-conventions-for-git-branches-a-cheatsheet-8549feca2534)

---

## Commit Message Format 🫂

### Structure:

Commit messages must strictly follow this format:

```
 <type>: <Message>
```

### Components:

- **<type>**: The type of change. Options:
  - `feature`: For new features or functionalities.
  - `fix`: For bug fixes.
  - `docs`: For documentation updates.
  - `test`: For test cases or testing updates.
  - `refactor`: For refactoring code.
- **<Message>**: A short, clear description of the change made.

### Examples:

- ` feature: add user authentication`
- ` fix: resolve login issue on empty password`
- ` docs: update API documentation for user endpoints`
- ` test: add test cases for payment module`
- ` refactor: optimize database queries in reports`

---

## Clean up 🧹

After you have merged your code to the main branch, **please delete that branch**.

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
