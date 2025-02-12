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

Registers a new user in the system and sends a confirmation email.

### **Request Body:**

```json
{
    "username": "testuser",
    "email": "test@example.com",
    "password": "securepassword"
}
```

### **Validation Rules:**

-   `email`, `username`, and `password` **are required**.
-   `password` must be **at least 8 characters**.
-   `username` must be **at least 3 characters**.

### **Response (Success - 201 Created):**

```json
{
    "message": "User registered successfully. A confirmation email has been sent."
}
```

### **Response (Error - 400 Bad Request):**

```json
{
    "error": "Please provide all the fields"
}
```

```json
{
    "error": "Password must be at least 8 characters"
}
```

```json
{
    "error": "Username must be at least 3 characters"
}
```

```json
{
    "error": "Email already registered"
}
```

```json
{
    "error": "Username already exists"
}
```

---

## 📝 **2. User Login**

### **Endpoint:**

```http
POST /api/login/
```

### **Description:**

Logs in a user and returns an authentication token along with user details.

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
    "token": "your-generated-token",
    "user": {
        "id": 1,
        "username": "testuser",
        "email": "test@example.com",
        "first_name": "Test",
        "last_name": "User",
        "phone": "1234567890",
        "role": "user",
        "profile_image_url": "https://example.com/profile.jpg",
        "is_suspended": false,
        "last_login": "2024-02-05 12:34:56"
    }
}
```

### **Response (Error - 400 Bad Request):**

```json
{
    "error": "Invalid credentials"
}
```

### **Response (Error - 403 Forbidden - Suspended User):**

```json
{
    "error": "Your account is suspended"
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
    "detail": "Invalid token."
}
```

---

## 📝 **4. Password Reset Request**

### **Endpoint:**

```http
POST /api/password-reset-request/
```

### **Description:**

Sends a password reset link to the user's email.

### **Request Body:**

```json
{
    "email": "test@example.com"
}
```

### **Response (Success - 200 OK):**

```json
{
    "message": "Password reset email sent"
}
```

### **Response (Error - 404 Not Found):**

```json
{
    "error": "Email not found"
}
```

---

## 📝 **5. Password Reset Confirm**

### **Endpoint:**

```http
POST /api/password-reset-confirm/
```

### **Description:**

Allows the user to reset their password using the token received via email.

### **Request Body:**

```json
{
    "reset_token": "your-reset-token",
    "new_password": "newsecurepassword"
}
```

### **Response (Success - 200 OK):**

```json
{
    "message": "Password has been reset successfully"
}
```

### **Response (Error - 400 Bad Request):**

```json
{
    "error": "Invalid or expired reset token"
}
```

---

## 🔹 **Authentication Mechanism**

-   **Login API** returns a token that must be included in the `Authorization` header as:

```http
Authorization: Token your-generated-token
```

-   **Logout API** requires a valid token to invalidate the session.
-   **After logging out, the token becomes invalid, and the user must log in again.**

---

## 🎯 **Notes**

-   Ensure that the **Authorization token** is included in protected API requests.
-   The API currently does **not require API Key Authentication** (this can be added later).
-   Use tools like **Postman** or `curl` to test API endpoints.
