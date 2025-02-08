# Git Best Practices for Collaborative Development

## 📌 Overview

This document defines the best practices for using Git in a collaborative development environment. It covers branch naming conventions, commit message guidelines, workflow strategies, and the use of Pull Requests (PRs) to ensure high-quality and maintainable code.

---

## 🚀 Git Workflow Strategy

### 1. **Branching Model**

We follow a Git Flow-inspired workflow:

-   **`main`** → Stable, production-ready code.
-   **`develop`** → Integration branch for features.
-   **`feature/{feature-name}`** → New features or enhancements.
-   **`bugfix/{bug-name}`** → Fixes for non-production bugs.
-   **`release/{version}`** → Preparation for releases.
-   **`hotfix/{hotfix-name}`** → Critical production bug fixes.

### 2. **Branch Creation**

Use the following command to create a new branch:

```sh
# Create and switch to a new branch
$ git checkout -b feature/new-login

# Push to remote
$ git push -u origin feature/new-login
```

---

## 📌 Commit Message Guidelines

We use **Conventional Commits** to maintain consistency:

### **Commit Message Format:**

```
<type>(<scope>): <subject>

<body> (optional)
<footer> (optional)
```

### **Common Types:**

-   **feat**: New feature
-   **fix**: Bug fix
-   **docs**: Documentation changes
-   **style**: Code style changes (formatting, whitespace, etc.)
-   **refactor**: Code restructuring without changing functionality
-   **test**: Adding or updating tests
-   **chore**: Maintenance tasks (build, CI, dependencies, etc.)

### **Example Commits:**

```sh
$ git commit -m "feat(auth): add OAuth login support"
$ git commit -m "fix(cart): resolve issue with incorrect item count"
```

---

## 🔄 Pull Request (PR) Workflow

### **1. Creating a PR**

-   PRs must be created before merging any branch into `develop` or `main`.
-   PRs should include a clear description, screenshots (if applicable), and testing steps.
-   Assign at least **one reviewer** before merging.

### **2. PR Review Process**

-   Code must pass all automated tests (CI/CD pipeline).
-   Reviewers should provide constructive feedback and request changes if necessary.
-   Changes should be made before approval.

### **3. Merging Strategy**

-   Use **Squash & Merge** to keep a clean commit history.
-   Ensure all comments are resolved before merging.
-   Delete the feature branch after merging.

#### **Example PR Title:**

```
✨ feat(auth): Implement OAuth login system
```

#### **Example PR Template:**

```markdown
## 📌 What does this PR do?

-   Adds OAuth authentication for Google login.

## 🔍 Related Issues

-   Closes #123

## 🎯 How to Test

1. Checkout branch `feature/auth-login`
2. Run `npm start`
3. Try logging in with Google OAuth

## ✅ Checklist

-   [x] Implement feature
-   [x] Add unit tests
-   [x] Update documentation
```

---

## 🚧 Best Practices for Collaboration

1. **Never push directly to `main` or `develop`** – Always create a PR.
2. **Sync your branch with the latest changes** using `git rebase` or `git pull --rebase`.
3. **Write meaningful commit messages** that describe the changes clearly.
4. **Keep PRs small and focused** – Avoid mixing unrelated changes.
5. **Use feature flags for incomplete features** instead of merging unfinished work.

---

## 🎯 Summary

| Task            | Command Example                          |
| --------------- | ---------------------------------------- |
| Create a branch | `git checkout -b feature/new-feature`    |
| Commit changes  | `git commit -m "feat: add new feature"`  |
| Push branch     | `git push -u origin feature/new-feature` |
| Rebase develop  | `git rebase develop`                     |
| Create PR       | GitHub/GitLab UI                         |
| Merge PR        | Squash & Merge                           |
| Delete branch   | `git branch -d feature/new-feature`      |

Following these best practices ensures a clean, scalable, and maintainable codebase for all developers. 🚀
