# 📌 API Documentation

## 📌 Base URL

```plaintext
http://localhost:8000/api/
```

---

## 📝 **1. Authentication**

### **1️⃣ User Registration**

```http
POST /api/register/
```

#### **Request Body**

```json
{
    "username": "testuser",
    "email": "test@example.com",
    "password": "securepassword"
}
```

#### **Response (201 Created)**

```json
{
    "message": "User registered successfully. A confirmation email has been sent."
}
```

### **2️⃣ User Login**

```http
POST /api/login/
```

#### **Request Body**

```json
{
    "username": "testuser",
    "password": "securepassword"
}
```

#### **Response (200 OK)**

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

### **3️⃣ User Logout**

```http
POST /api/logout/
```

#### **Response (200 OK)**

```json
{
    "message": "Logged out successfully"
}
```

### **4️⃣ Password Reset Request**

```http
POST /api/password-reset-request/
```

#### **Request Body**

```json
{
    "email": "test@example.com"
}
```

#### **Response (200 OK)**

```json
{
    "message": "Password reset email sent"
}
```

### **5️⃣ Password Reset Confirm**

```http
POST /api/password-reset-confirm/
```

#### **Request Body**

```json
{
    "reset_token": "your-reset-token",
    "new_password": "newsecurepassword"
}
```

#### **Response (200 OK)**

```json
{
    "message": "Password has been reset successfully"
}
```

---

## 📝 **2. City Management**

### **1️⃣ Get All Cities**

```http
GET /api/cities/
```

#### **Response (200 OK)**

```json
[
    {
        "id": 1,
        "title": "Bangkok",
        "description": "Capital city of Thailand",
        "image_url": "https://example.com/bangkok.jpg",
        "is_active": true,
        "rating": 4.5
    }
]
```

### **2️⃣ Get One City**

```http
GET /api/cities/{city_id}/
```

#### **Response (200 OK)**

```json
{
    "id": 1,
    "title": "Bangkok",
    "description": "Capital city of Thailand",
    "image_url": "https://example.com/bangkok.jpg",
    "is_active": true,
    "rating": 4.5
}
```

### **3️⃣ Create a City**

```http
POST /api/cities/create/
```

#### **Request Body**

```json
{
    "title": "Chiang Mai",
    "description": "A beautiful city in northern Thailand",
    "image_url": "https://example.com/chiangmai.jpg",
    "is_active": true,
    "rating": 4.0
}
```

#### **Response (201 Created)**

```json
{
    "id": 2,
    "title": "Chiang Mai",
    "description": "A beautiful city in northern Thailand",
    "image_url": "https://example.com/chiangmai.jpg",
    "is_active": true,
    "rating": 4.0
}
```

### **4️⃣ Update a City**

```http
PUT /api/cities/{city_id}/update/
```

#### **Request Body**

```json
{
    "title": "Bangkok Updated",
    "rating": 4.8
}
```

#### **Response (200 OK)**

```json
{
    "id": 1,
    "title": "Bangkok Updated",
    "description": "Capital city of Thailand",
    "image_url": "https://example.com/bangkok.jpg",
    "is_active": true,
    "rating": 4.8
}
```

### **5️⃣ Delete a City**

```http
DELETE /api/cities/{city_id}/delete/
```

#### **Response (204 No Content)**

```json
{
    "message": "City deleted successfully"
}
```

---

## 📝 **3. Location Management**

### **1️⃣ Get All Locations**

```http
GET /api/locations/
```

### **Query Parameters**

-   `user` (int) - Filter locations by user ID
-   `city` (int) - Filter locations by city ID
-   `type` (str) - Filter locations by type (`restaurant` or `activity`)

### **Response (200 OK)**

```json
[
    {
        "id": 1,
        "user": 1,
        "city": 1,
        "type": "restaurant",
        "title": "Pizza Palace",
        "description": "The best pizza in town",
        "contact_email": "info@pizzapalace.com",
        "contact_phone": "123-456-7890",
        "cover_image_url": "https://example.com/pizza.jpg",
        "open_hour_detail": "Mon-Fri: 10am - 10pm",
        "location_url": "https://maps.example.com/location",
        "menu_url": "https://example.com/menu",
        "price_per_person": 15.99,
        "avg_rating": 4.5,
        "is_active": true
    }
]
```

---

### **2️⃣ Get One Location**

```http
GET /api/locations/{location_id}/
```

### **Response (200 OK)**

```json
{
    "id": 1,
    "user": 1,
    "city": 1,
    "type": "restaurant",
    "title": "Pizza Palace",
    "description": "The best pizza in town",
    "contact_email": "info@pizzapalace.com",
    "contact_phone": "123-456-7890",
    "cover_image_url": "https://example.com/pizza.jpg",
    "open_hour_detail": "Mon-Fri: 10am - 10pm",
    "location_url": "https://maps.example.com/location",
    "menu_url": "https://example.com/menu",
    "price_per_person": 15.99,
    "avg_rating": 4.5,
    "is_active": true
}
```

---

### **3️⃣ Create a Location**

```http
POST /api/locations/create/
```

### **Request Body**

```json
{
    "user": 1,
    "city": 1,
    "type": "restaurant",
    "title": "Pizza Palace",
    "description": "The best pizza in town",
    "contact_email": "info@pizzapalace.com",
    "contact_phone": "123-456-7890",
    "cover_image_url": "https://example.com/pizza.jpg",
    "open_hour_detail": "Mon-Fri: 10am - 10pm",
    "location_url": "https://maps.example.com/location",
    "menu_url": "https://example.com/menu",
    "price_per_person": 15.99,
    "avg_rating": 4.5,
    "is_active": true
}
```

### **Response (201 Created)**

```json
{
    "id": 2,
    "user": 1,
    "city": 1,
    "type": "restaurant",
    "title": "Pizza Palace",
    "description": "The best pizza in town",
    "contact_email": "info@pizzapalace.com",
    "contact_phone": "123-456-7890",
    "cover_image_url": "https://example.com/pizza.jpg",
    "open_hour_detail": "Mon-Fri: 10am - 10pm",
    "location_url": "https://maps.example.com/location",
    "menu_url": "https://example.com/menu",
    "price_per_person": 15.99,
    "avg_rating": 4.5,
    "is_active": true
}
```

---

### **4️⃣ Update a Location**

```http
PUT /api/locations/{location_id}/update/
```

### **Request Body**

```json
{
    "title": "Updated Pizza Palace",
    "avg_rating": 4.8
}
```

### **Response (200 OK)**

```json
{
    "id": 1,
    "title": "Updated Pizza Palace",
    "avg_rating": 4.8
}
```

---

### **5️⃣ Delete a Location**

```http
DELETE /api/locations/{location_id}/delete/
```

### **Response (204 No Content)**

```json
{
    "message": "Location deleted successfully"
}
```

---

## 🎯 **Notes**

-   Ensure that the **Authorization token** is included in protected API requests.
-   The API currently does **not require API Key Authentication** (this can be added later).
-   Use tools like **Postman** or `curl` to test API endpoints.
