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

# 📝 **Location Management**

## **1️⃣ Get All Locations**

## **Endpoint:**

```http
GET /api/locations/
```

## **Description:**

Retrieve all locations with optional filtering by user, city, type, title search, and minimum rating.

## **Query Parameters:**

| Parameter    | Type   | Description                                                              |
| ------------ | ------ | ------------------------------------------------------------------------ |
| `user`       | int    | Filter locations by user ID.                                             |
| `city`       | int    | Filter locations by city ID.                                             |
| `type`       | string | Filter locations by type (`restaurant` or `activity`).                   |
| `search`     | string | Search locations by `title` only. Case insensitive.                      |
| `min_rating` | float  | Filter locations with a rating greater than or equal to the given value. |

## **Example Requests:**

### Get All Locations

```http
GET /api/locations/
```

### Filter by User ID

```http
GET /api/locations/?user=1
```

### Filter by City ID

```http
GET /api/locations/?city=2
```

### Filter by Type

```http
GET /api/locations/?type=restaurant
```

### Search by Title

```http
GET /api/locations/?search=Pizza
```

### Filter by Minimum Rating

```http
GET /api/locations/?min_rating=4.5
```

### Combine Filters

```http
GET /api/locations/?search=Pizza&min_rating=4.5&city=2&type=restaurant
```

## **Response Example (200 OK):**

```json
[
    {
        "id": 1,
        "user": 1,
        "city": 1,
        "type": "restaurant",
        "title": "Pizza Palace",
        "description": "The best pizza in town",
        "gallery": [
            { "id": 10, "image_url": "https://example.com/image1.jpg" },
            { "id": 11, "image_url": "https://example.com/image2.jpg" }
        ],
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

## **Response Codes:**

| Status Code       | Description                       |
| ----------------- | --------------------------------- |
| `200 OK`          | Successfully retrieved locations. |
| `400 Bad Request` | Invalid request parameters.       |

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
    "gallery": [
        { "id": 10, "image_url": "https://example.com/image1.jpg" },
        { "id": 11, "image_url": "https://example.com/image2.jpg" }
    ],
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
    "gallery": [],
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

# 📝 **Location Gallery Management**

## **1. Get Gallery Images by Location**

```http
GET /api/locations/<location_id>/gallery/
```

### **Path Parameters**

| Parameter     | Type | Description                             |
| ------------- | ---- | --------------------------------------- |
| `location_id` | int  | ID of the location to fetch images for. |

### **Example Request**

```http
GET /api/locations/1/gallery/
```

### **Response Example (200 OK)**

```json
[
    { "id": 10, "image_url": "https://example.com/image1.jpg" },
    { "id": 11, "image_url": "https://example.com/image2.jpg" }
]
```

---

## **2. Add an Image to a Location**

```http
POST /api/locations/gallery/add/
```

### **Request Body**

```json
{
    "location": 1,
    "image_url": "https://example.com/image1.jpg"
}
```

### **Response Example (201 Created)**

```json
{
    "id": 10,
    "location": 1,
    "image_url": "https://example.com/image1.jpg"
}
```

---

## **3. Delete an Image**

```http
DELETE /api/locations/gallery/<image_id>/delete/
```

### **Path Parameters**

| Parameter  | Type | Description                    |
| ---------- | ---- | ------------------------------ |
| `image_id` | int  | ID of the image to be deleted. |

### **Example Request**

```http
DELETE /api/gallery/10/delete/
```

### **Response Example (204 No Content)**

```json
{
    "message": "Image deleted successfully"
}
```

---

## **Response Codes:**

| Status Code       | Description                    |
| ----------------- | ------------------------------ |
| `200 OK`          | Successfully retrieved images. |
| `201 Created`     | Image successfully added.      |
| `204 No Content`  | Image successfully deleted.    |
| `400 Bad Request` | Invalid request data.          |
| `404 Not Found`   | Image or location not found.   |

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
