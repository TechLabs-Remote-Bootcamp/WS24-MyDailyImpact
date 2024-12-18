# WS24-MyDailyImpact

A simple app to track your contribution to a sustainable plant-based lifestyle.

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
