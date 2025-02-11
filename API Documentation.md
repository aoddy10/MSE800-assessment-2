# 📌 API Documentation

## 📌 Base URL

```plaintext
http://localhost:8000/api/
```

---

## 📝 **1. User Registration**

### **Endpoint:**

```http
POST /api/register/
```

### **Description:**

Registers a new user in the system.

### **Request Body:**

```json
{
    "username": "testuser",
    "email": "test@example.com",
    "password": "securepassword"
}
```

### **Response (Success - 201 Created):**

```json
{
    "message": "User registered successfully"
}
```

### **Response (Error - 400 Bad Request):**

```json
{
    "error": "Username already exists"
}
```

```json
{
    "error": "Email already registered"
}
```

---

## 📝 **2. User Login**

### **Endpoint:**

```http
POST /api/login/
```

### **Description:**

Logs in a user and returns an authentication token.

### **Request Body:**

```json
{
    "username": "testuser",
    "password": "securepassword"
}
```

### **Response (Success - 200 OK):**

```json
{
    "token": "your-generated-token"
}
```

### **Response (Error - 400 Bad Request):**

```json
{
    "error": "Invalid credentials"
}
```

---

## 📝 **3. User Logout**

### **Endpoint:**

```http
POST /api/logout/
```

### **Description:**

Logs out the user by invalidating their authentication token.

### **Headers:**

```http
Authorization: Token your-generated-token
```

### **Response (Success - 200 OK):**

```json
{
    "message": "Logged out successfully"
}
```

### **Response (Error - 401 Unauthorized):**

```json
{
    "error": "Invalid token or missing authentication"
}
```

---

## 🔹 **Authentication Mechanism**

-   **Login API** returns a token that must be included in the `Authorization` header as:

```http
Authorization: Token your-generated-token
```

-   **Logout API** requires a valid token to invalidate the session.

---

## 🎯 **Notes**

-   Ensure that the **Authorization token** is included in protected API requests.
-   The API currently does **not require API Key Authentication** (this can be added later).
-   Use tools like **Postman** or `curl` to test API endpoints.
