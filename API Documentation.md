# 📌 API Documentation

## 📌 Base URL

```plaintext
http://localhost:8000/api/
```

---

# 📝 **Authentication**

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

# 📝 Users Management

This API allows **admin users** (users with `role = "admin"`) to **manage users** in the system.  
Admin users can **view, update, delete, and suspend/unsuspend other users**.

---

## **🔐 Authentication & Permissions**

-   **Authentication:** Required (`Token Authentication`)
-   **Access:** Only users with `role = "admin"`

---

## **📌 API Endpoints**

### **1️⃣ Get All Users**

🔹 **Endpoint:** `GET /api/users/`  
🔹 **Description:** Retrieves a list of all users.  
🔹 **Permissions:** Requires `role = "admin"`

#### **👥 Request Example**

```sh
curl -X GET http://localhost:8000/api/users/ \
     -H "Authorization: Token your_admin_token_here"
```

#### **📈 Response Example (`200 OK`)**

```json
[
    {
        "id": 1,
        "username": "admin",
        "email": "admin@example.com",
        "first_name": "John",
        "last_name": "Doe",
        "phone": "123456789",
        "role": "admin",
        "profile_image_url": "https://example.com/profile.jpg",
        "is_suspended": false,
        "last_login": "2024-02-17 14:30:00"
    },
    {
        "id": 2,
        "username": "testuser",
        "email": "testuser@example.com",
        "first_name": "Jane",
        "last_name": "Doe",
        "phone": "987654321",
        "role": "user",
        "profile_image_url": null,
        "is_suspended": false,
        "last_login": "2024-02-16 10:15:00"
    }
]
```

#### **❌ Error Response (`403 Forbidden`)**

```json
{ "error": "Permission denied" }
```

---

### **2️⃣ Get User by ID**

🔹 **Endpoint:** `GET /api/users/<user_id>/`  
🔹 **Description:** Retrieves details of a specific user by `user_id`.  
🔹 **Permissions:** Requires `role = "admin"`

#### **👥 Request Example**

```sh
curl -X GET http://localhost:8000/api/users/2/ \
     -H "Authorization: Token your_admin_token_here"
```

#### **📈 Response Example (`200 OK`)**

```json
{
    "id": 2,
    "username": "testuser",
    "email": "testuser@example.com",
    "first_name": "Jane",
    "last_name": "Doe",
    "phone": "987654321",
    "role": "user",
    "profile_image_url": null,
    "is_suspended": false,
    "last_login": "2024-02-16 10:15:00"
}
```

#### **❌ Error Response (`404 Not Found`)**

```json
{ "error": "User not found" }
```

---

### **3️⃣ Update User**

🔹 **Endpoint:** `PUT /api/users/<user_id>/update/`  
🔹 **Description:** Updates user details. **Partial updates allowed.**  
🔹 **Permissions:** Requires `role = "admin"`

#### **👥 Request Example**

```sh
curl -X PUT http://localhost:8000/api/users/2/update/ \
     -H "Authorization: Token your_admin_token_here" \
     -H "Content-Type: application/json" \
     -d '{
           "first_name": "Updated",
           "last_name": "User",
           "phone": "555123456"
         }'
```

#### **📈 Response Example (`200 OK`)**

```json
{
    "id": 2,
    "username": "testuser",
    "email": "testuser@example.com",
    "first_name": "Updated",
    "last_name": "User",
    "phone": "555123456",
    "role": "user",
    "profile_image_url": null,
    "is_suspended": false,
    "last_login": "2024-02-16 10:15:00"
}
```

#### **❌ Error Response (`403 Forbidden`)**

```json
{ "error": "Permission denied" }
```

---

### **🛡️ Delete User**

🔹 **Endpoint:** `DELETE /api/users/<user_id>/delete/`  
🔹 **Description:** Deletes a user by `user_id`.  
🔹 **Permissions:** Requires `role = "admin"`

#### **👥 Request Example**

```sh
curl -X DELETE http://localhost:8000/api/users/2/delete/ \
     -H "Authorization: Token your_admin_token_here"
```

#### **📈 Response Example (`204 No Content`)**

```json
{ "message": "User deleted successfully" }
```

#### **❌ Error Response (`404 Not Found`)**

```json
{ "error": "User not found" }
```

---

### **🛡️ Suspend/Unsuspend User**

🔹 **Endpoint:** `PATCH /api/users/<user_id>/toggle-suspend/`  
🔹 **Description:** Toggles the `is_suspended` status of a user.  
🔹 **Permissions:** Requires `role = "admin"`

#### **👥 Request Example**

```sh
curl -X PATCH http://localhost:8000/api/users/2/toggle-suspend/ \
     -H "Authorization: Token your_admin_token_here"
```

#### **📈 Response Example (`200 OK` - Suspended)**

```json
{ "message": "User suspended successfully" }
```

#### **📈 Response Example (`200 OK` - Unsuspended)**

```json
{ "message": "User unsuspended successfully" }
```

#### **❌ Error Response (`403 Forbidden`)**

```json
{ "error": "Permission denied" }
```

---

# 📝 **City Management**

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

# 📝 **Locations Management**

This API allows users to **view and manage locations**. Admins and business users can **create, update, delete locations and manage gallery images**.

---

## 🔒 **Authentication & Permissions**

-   **Authentication:** Required (`Token Authentication`)
-   **Access:**
    -   `GET` endpoints: Open to all users
    -   `POST`, `PUT`, `DELETE`: Restricted to users with `role = "admin"` or `role = "business"`

---

## 📌 **API Endpoints**

### **1️⃣ Get All Locations**

📍 **Endpoint:** `GET /api/locations/`  
📍 **Description:** Retrieves a list of all locations, with optional filtering.  
📍 **Permissions:** Open to all users

#### **📩 Request Example**

```sh
curl -X GET http://localhost:8000/api/locations/
```

#### **🔎 Query Parameters (Optional)**

| Parameter  | Type  | Description                                  |
| ---------- | ----- | -------------------------------------------- |
| user       | int   | Filter by user ID                            |
| city       | int   | Filter by city ID                            |
| type       | str   | Filter by type (`restaurant` or `activity`)  |
| search     | str   | Search locations by title only               |
| min_rating | float | Filter locations with rating `>= min_rating` |

#### **✅ Response Example (`200 OK`)**

```json
[
    {
        "id": 1,
        "title": "Best Pizza Place",
        "city_id": 5,
        "type": "restaurant",
        "avg_rating": 4.5,
        "gallery": [
            { "id": 1, "image_url": "https://example.com/image1.jpg" },
            { "id": 2, "image_url": "https://example.com/image2.jpg" }
        ]
    }
]
```

---

### **2️⃣ Get Location by ID**

📍 **Endpoint:** `GET /api/locations/<id>/`  
📍 **Description:** Retrieves details of a specific location.  
📍 **Permissions:** Open to all users

#### **📩 Request Example**

```sh
curl -X GET http://localhost:8000/api/locations/1/
```

#### **✅ Response Example (`200 OK`)**

```json
{
    "id": 1,
    "title": "Best Pizza Place",
    "city_id": 5,
    "type": "restaurant",
    "avg_rating": 4.5,
    "gallery": [
        { "id": 1, "image_url": "https://example.com/image1.jpg" },
        { "id": 2, "image_url": "https://example.com/image2.jpg" }
    ]
}
```

---

### **3️⃣ Create Location**

📍 **Endpoint:** `POST /api/locations/create/`  
📍 **Description:** Creates a new location.  
📍 **Permissions:** **Admin or Business users only**

#### **📩 Request Example**

```sh
curl -X POST http://localhost:8000/api/locations/create/ \
     -H "Authorization: Token your_token_here" \
     -H "Content-Type: application/json" \
     -d '{
           "title": "New Cafe",
           "city_id": 3,
           "type": "restaurant",
           "avg_rating": 4.2
         }'
```

#### **✅ Response Example (`201 Created`)**

```json
{
    "id": 10,
    "title": "New Cafe",
    "city_id": 3,
    "type": "restaurant",
    "avg_rating": 4.2,
    "gallery": []
}
```

#### **⛔ Error Response (`403 Forbidden`)**

```json
{ "error": "Permission denied" }
```

---

### **4️⃣ Update Location**

📍 **Endpoint:** `PUT /api/locations/<id>/update/`  
📍 **Description:** Updates details of a location.  
📍 **Permissions:** **Admin or Business users only**

#### **📩 Request Example**

```sh
curl -X PUT http://localhost:8000/api/locations/1/update/ \
     -H "Authorization: Token your_token_here" \
     -H "Content-Type: application/json" \
     -d '{ "title": "Updated Name" }'
```

#### **✅ Response Example (`200 OK`)**

```json
{
    "id": 1,
    "title": "Updated Name",
    "city_id": 5,
    "type": "restaurant",
    "avg_rating": 4.5,
    "gallery": []
}
```

---

### **5️⃣ Delete Location**

📍 **Endpoint:** `DELETE /api/locations/<id>/delete/`  
📍 **Description:** Deletes a location.  
📍 **Permissions:** **Admin or Business users only**

#### **📩 Request Example**

```sh
curl -X DELETE http://localhost:8000/api/locations/1/delete/ \
     -H "Authorization: Token your_token_here"
```

#### **✅ Response Example (`204 No Content`)**

```json
{ "message": "Location deleted successfully" }
```

---

### **6️⃣ Get Gallery by Location**

📍 **Endpoint:** `GET /api/locations/<id>/gallery/`  
📍 **Description:** Retrieves all images of a location.  
📍 **Permissions:** Open to all users

#### **📩 Request Example**

```sh
curl -X GET http://localhost:8000/api/locations/1/gallery/
```

---

### **7️⃣ Add Image to Location**

📍 **Endpoint:** `POST /api/locations/gallery/add/`  
📍 **Description:** Adds an image to a location.  
📍 **Permissions:** **Admin or Business users only**

#### **📩 Request Example**

```sh
curl -X POST http://localhost:8000/api/locations/gallery/add/ \
     -H "Authorization: Token your_token_here" \
     -H "Content-Type: application/json" \
     -d '{ "location": 1, "image_url": "https://example.com/image.jpg" }'
```

---

### **8️⃣ Delete Image from Gallery**

📍 **Endpoint:** `DELETE /api/locations/gallery/<image_id>/delete/`  
📍 **Description:** Deletes an image from a location.  
📍 **Permissions:** **Admin or Business users only**

#### **📩 Request Example**

```sh
curl -X DELETE http://localhost:8000/api/locations/gallery/5/delete/ \
     -H "Authorization: Token your_token_here"
```

#### **✅ Response Example (`204 No Content`)**

```json
{ "message": "Image deleted successfully" }
```

---

# 📝 **Review Management**

## **1. Get Reviews**

```http
GET /api/reviews/
```

### **Query Parameters**

| Parameter  | Type | Description                                                     |
| ---------- | ---- | --------------------------------------------------------------- |
| `user`     | int  | Filter reviews by user ID.                                      |
| `location` | int  | Filter reviews by location ID.                                  |
| `city`     | int  | Filter reviews by city ID.                                      |
| `limit`    | int  | Number of reviews to return (sorted by newest first). Optional. |

### **Example Requests:**

#### **1️⃣ Get All Reviews (Sorted by Newest)**

```http
GET /api/reviews/
```

#### **2️⃣ Filter by User ID**

```http
GET /api/reviews/?user=1
```

#### **3️⃣ Filter by Location ID**

```http
GET /api/reviews/?location=2
```

#### **4️⃣ Filter by City ID**

```http
GET /api/reviews/?city=3
```

#### **5️⃣ Get the Latest 5 Reviews**

```http
GET /api/reviews/?limit=5
```

#### **6️⃣ Get the Latest 3 Reviews for a Specific Location**

```http
GET /api/reviews/?location=2&limit=3
```

### **Response Example (200 OK)**

```json
[
    {
        "id": 1,
        "user": 1,
        "location": 2,
        "review": "Amazing experience!",
        "rating": 5,
        "created_at": "2024-02-10T15:30:00Z"
    }
]
```

---

## **2. Create a Review**

```http
POST /api/reviews/create/
```

### **Request Body**

```json
{
    "user": 1,
    "location": 2,
    "review": "Amazing experience!",
    "rating": 5
}
```

### **Response Example (201 Created)**

```json
{
    "id": 2,
    "user": 1,
    "location": 2,
    "review": "Amazing experience!",
    "rating": 5,
    "created_at": "2024-02-10T16:00:00Z"
}
```

## **Response Codes:**

| Status Code       | Description                     |
| ----------------- | ------------------------------- |
| `200 OK`          | Successfully retrieved reviews. |
| `201 Created`     | Review successfully created.    |
| `400 Bad Request` | Invalid request data.           |

---

# 📝 **Newsletter Subscribe Management**

## **1. Subscribe to Newsletter**

```http
POST /api/newsletter/subscribe/
```

### **Request Body**

```json
{
    "email": "user@example.com"
}
```

### **Response Example (201 Created)**

```json
{
    "message": "Subscription successful!"
}
```

---

## **2. Unsubscribe from Newsletter**

```http
POST /api/newsletter/unsubscribe/
```

### **Request Body**

```json
{
    "email": "user@example.com"
}
```

### **Response Example (200 OK)**

```json
{
    "message": "Successfully unsubscribed!"
}
```

### **Response Example (404 Not Found)**

```json
{
    "error": "Email not found in the subscription list."
}
```

---

## **3. List All Subscribers** _(Admin Use)_

```http
GET /api/newsletter/list/
```

### **Response Example (200 OK)**

```json
[
    {
        "id": 1,
        "email": "user1@example.com",
        "subscribed_at": "2024-02-10T12:00:00Z"
    },
    {
        "id": 2,
        "email": "user2@example.com",
        "subscribed_at": "2024-02-10T13:00:00Z"
    }
]
```

---

## **Response Codes:**

| Status Code       | Description                             |
| ----------------- | --------------------------------------- |
| `200 OK`          | Successfully retrieved or unsubscribed. |
| `201 Created`     | Successfully subscribed.                |
| `400 Bad Request` | Invalid request data.                   |
| `404 Not Found`   | Email not found in subscription list.   |

---

## 🎯 **Notes**

-   Ensure that the **Authorization token** is included in protected API requests.
-   The API currently does **not require API Key Authentication** (this can be added later).
-   Use tools like **Postman** or `curl` to test API endpoints.
