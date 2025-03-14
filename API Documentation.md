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

# 📝 **Reviews Management**

## **1. Get Reviews**

### **Endpoint:**

```
GET /api/reviews/
```

### **Description:**

Retrieve a list of reviews with optional filters and sorting.

### **Query Parameters:**

| Parameter    | Type    | Required | Description                                                                      |
| ------------ | ------- | -------- | -------------------------------------------------------------------------------- |
| `user`       | `int`   | No       | Filter reviews by user ID                                                        |
| `location`   | `int`   | No       | Filter reviews by location ID                                                    |
| `city`       | `int`   | No       | Filter reviews by city ID                                                        |
| `min_rating` | `float` | No       | Filter reviews with a rating greater than or equal to this value                 |
| `limit`      | `int`   | No       | Number of reviews to return (default: all)                                       |
| `sort_order` | `str`   | No       | Sorting order (`asc` for oldest first, `desc` for newest first, default: `desc`) |

### **Example Request:**

```
GET /api/reviews/?limit=5&sort_order=desc&min_rating=4.0
```

### **Example Response:**

```json
[
    {
        "id": 1,
        "user": {
            "first_name": "John",
            "last_name": "Doe"
        },
        "location": 5,
        "review": "Great experience!",
        "rating": 4.5,
        "created_at": "2024-02-21T12:00:00Z"
    },
    {
        "id": 2,
        "user": {
            "first_name": "Jane",
            "last_name": "Smith"
        },
        "location": 3,
        "review": "Food was amazing.",
        "rating": 5.0,
        "created_at": "2024-02-20T15:30:00Z"
    }
]
```

---

## **2. Create a Review**

### **Endpoint:**

```
POST /api/reviews/create/
```

### **Description:**

Create a new review for a location. This action is only available for **authenticated users**.

### **Headers:**

| Key           | Value                |
| ------------- | -------------------- |
| Authorization | `Token <your_token>` |

### **Request Body (JSON):**

| Field      | Type    | Required | Description                              |
| ---------- | ------- | -------- | ---------------------------------------- |
| `location` | `int`   | Yes      | ID of the location being reviewed        |
| `review`   | `str`   | Yes      | The text content of the review           |
| `rating`   | `float` | Yes      | The rating score (between `1.0` - `5.0`) |

### **Example Request:**

```json
{
    "location": 5,
    "review": "Amazing place, great service!",
    "rating": 4.8
}
```

### **Example Response:**

```json
{
    "id": 3,
    "user": {
        "first_name": "Alice",
        "last_name": "Johnson"
    },
    "location": 5,
    "review": "Amazing place, great service!",
    "rating": 4.8,
    "created_at": "2024-02-22T14:10:00Z"
}
```

---

## **Permissions:**

-   **`GET /api/reviews/`** - Publicly accessible.
-   **`POST /api/reviews/create/`** - Requires authentication.

---

## **Errors & Status Codes:**

| Status Code        | Description                                               |
| ------------------ | --------------------------------------------------------- |
| `200 OK`           | Successfully retrieved reviews                            |
| `201 Created`      | Successfully created a review                             |
| `400 Bad Request`  | Invalid data (e.g., missing fields, invalid rating range) |
| `401 Unauthorized` | User is not authenticated (for `POST` requests)           |
| `403 Forbidden`    | Action not allowed                                        |

---

### **📌 Notes:**

-   Ratings should be between **1.0 and 5.0**.
-   Sorting defaults to `desc` (newest first).
-   User's `first_name` and `last_name` are included in responses.
-   System logs track all review creations.

---

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

# 📝 **Contact API Documentation**

## **Contact Form Submission**

This API endpoint allows users to submit a contact form inquiry. The submitted form data is validated, stored in the database, and emails are sent to both the user and the administrator.

---

### **📌 Endpoint**

`POST /api/contact/submit/`

---

### **📥 Request Body (JSON)**

| Parameter           | Type     | Required | Description                     |
| ------------------- | -------- | -------- | ------------------------------- |
| `name`              | `string` | ✅ Yes   | Full name of the sender         |
| `email`             | `string` | ✅ Yes   | Contact email address           |
| `organization_name` | `string` | ✅ Yes   | Organization name of the sender |
| `subject`           | `string` | ✅ Yes   | Subject of the message          |
| `message`           | `string` | ✅ Yes   | Detailed message content        |

#### **📝 Example Request**

```json
{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "organization_name": "Doe Inc.",
    "subject": "Inquiry about your services",
    "message": "Hello, I would like to know more about your services. Please get in touch!"
}
```

---

### **📤 Response**

#### **✅ Success Response (`201 Created`)**

```json
{
    "message": "Contact request submitted successfully"
}
```

#### **❌ Error Responses (`400 Bad Request`)**

-   If any required field is missing:

```json
{
    "name": ["This field is required."]
}
```

-   If email format is invalid:

```json
{
    "email": ["Enter a valid email address."]
}
```

---

### **🔐 Permissions**

-   **Public Access**: No authentication required.

---

### **📧 Email Notifications**

-   A confirmation email is sent to the user.
-   An admin notification email is sent to the administrator.

**Email Example Sent to User:**

```
Subject: Your contact request has been received
Hello John Doe,

Thank you for reaching out. We have received your message:

"Hello, I would like to know more about your services. Please get in touch!"

We will get back to you as soon as possible.

Best Regards,
Kiwi Explorer Team
```

---

### **📝 System Logging**

-   Every contact form submission is logged in the **System Log**.
-   Example log entry:
    ```
    New contact request from John Doe (johndoe@example.com)
    ```

---

### **💻 Notes**

-   This API ensures **data validation** before storing.
-   Emails are sent using Django’s `send_mail()` function.
-   Admin email should be set in `settings.ADMIN_EMAIL`.

---

### **📼 Example cURL Request**

```sh
curl -X POST "https://yourdomain.com/api/contact/submit/" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "John Doe",
           "email": "johndoe@example.com",
           "organization_name": "Doe Inc.",
           "subject": "Inquiry about your services",
           "message": "Hello, I would like to know more about your services. Please get in touch!"
         }'
```

---

# 📝 **System Logs API Documentation**

## Overview

The **System Logs API** provides access to system logs with filtering, sorting, and pagination capabilities. It allows retrieving logs based on user, location, and date range, with control over the number of logs returned and sorting order.

## Endpoints

### 1. **Get System Logs**

#### `GET /api/system-logs/`

Retrieve system logs with optional filters.

#### **Query Parameters**

| Parameter     | Type   | Required | Description                                                                      |
| ------------- | ------ | -------- | -------------------------------------------------------------------------------- |
| `limit`       | int    | No       | Number of logs to retrieve.                                                      |
| `sort_order`  | string | No       | Sorting order: `asc` (oldest first) or `desc` (newest first). Default is `desc`. |
| `user_id`     | int    | No       | Filter logs by user ID.                                                          |
| `location_id` | int    | No       | Filter logs by location ID.                                                      |
| `date_range`  | string | No       | Filter logs by time period. Allowed values: `today`, `week`, `month`.            |

#### **Example Requests**

1. **Get the last 10 logs sorted by newest first:**
    ```http
    GET /api/system-logs/?limit=10&sort_order=desc
    ```
2. **Get logs for user ID 5 from today:**
    ```http
    GET /api/system-logs/?user_id=5&date_range=today
    ```
3. **Get logs for location ID 10 from the last month:**
    ```http
    GET /api/system-logs/?location_id=10&date_range=month
    ```
4. **Get logs sorted from oldest to newest:**
    ```http
    GET /api/system-logs/?sort_order=asc
    ```

#### **Example Response**

```json
[
    {
        "id": 1,
        "user": {
            "id": 5,
            "username": "admin_user"
        },
        "module": "Location",
        "relate_id": 10,
        "description": "Updated location details",
        "created_at": "2024-02-21T12:00:00Z"
    },
    {
        "id": 2,
        "user": {
            "id": 3,
            "username": "business_owner"
        },
        "module": "User",
        "relate_id": 3,
        "description": "Suspended user: john_doe",
        "created_at": "2024-02-20T15:30:00Z"
    }
]
```

### 2. **Create a System Log**

#### `POST /api/system-logs/`

Create a new system log entry.

#### **Request Body**

| Field         | Type   | Required | Description                                                     |
| ------------- | ------ | -------- | --------------------------------------------------------------- |
| `module`      | string | Yes      | The module related to the log entry (e.g., `User`, `Location`). |
| `relate_id`   | int    | Yes      | The ID of the related object.                                   |
| `description` | string | Yes      | Description of the activity.                                    |

#### **Example Request**

```json
{
    "module": "User",
    "relate_id": 3,
    "description": "User logged in successfully"
}
```

#### **Example Response**

```json
{
    "id": 15,
    "user": {
        "id": 2,
        "username": "admin"
    },
    "module": "User",
    "relate_id": 3,
    "description": "User logged in successfully",
    "created_at": "2024-02-21T13:45:00Z"
}
```

## Authentication

-   All endpoints **require authentication** using a valid token.
-   Provide the token in the `Authorization` header:
    ```http
    Authorization: Token your-auth-token
    ```

## Error Handling

| Status Code       | Meaning                                                    |
| ----------------- | ---------------------------------------------------------- |
| `400` Bad Request | Invalid request format (e.g., invalid `date_range` value). |
| `403` Forbidden   | User does not have permission.                             |
| `404` Not Found   | Requested resource does not exist.                         |

## Notes

-   `date_range` supports only `today`, `week`, and `month`.
-   Only **admin** or **authorized users** can create system logs.
-   Logs **cannot be updated or deleted**.

---

### **🚀 Summary**

-   **Retrieve system logs** with filters for **user, location, sorting, and time range**.
-   **Create system logs** to track user activities.
-   **Secure endpoints** requiring authentication.
-   **No updates or deletions allowed** for logs.

This documentation provides all necessary details to interact with the **System Logs API** efficiently. 🚀

## 🎯 **Notes**

-   Ensure that the **Authorization token** is included in protected API requests.
-   The API currently does **not require API Key Authentication** (this can be added later).
-   Use tools like **Postman** or `curl` to test API endpoints.
