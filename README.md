# 🚀 Kiwi Explorer

This project is the part of assessment in MSE800 Professional Software Engineering at Yoobee College. This project consists of a **React (client)** frontend, a **Django REST API (api)** backend, and a **PostgreSQL (db)** database, all managed using Docker Compose for development.

---

## 📌 **Project Structure**

```plaintext
my_project/
│── api/              # Django API Server
│── client/           # React + Tailwind Frontend
│── docker-compose.yml
│── .env              # Environment variables
│── seeds/            # Seed data files
│── README.md
```

---

## 🛠 **Setup and Run the Project**

### **1️⃣ Prerequisites**

Make sure you have **Docker** and **Docker Compose** installed:

-   [Install Docker](https://docs.docker.com/get-docker/)
-   [Install Docker Compose](https://docs.docker.com/compose/install/)

### **2️⃣ Create an `.env` File**

Before running the project, create a `.env` file in the root directory and add the following variables:

```ini
POSTGRES_DB=mydatabase
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=db
POSTGRES_PORT=5432
DEBUG=True
```

### **3️⃣ Run the Project using Docker Compose**

To start all services (API, Client, and Database), run:

```sh
docker-compose up --build
```

This will:

-   Build and start **Django API (api)** at `http://localhost:8000`
-   Build and start **React Client (client)** at `http://localhost:3000`
-   Start **PostgreSQL Database (db)** on port `5432`

> **To stop the services**, press `CTRL+C` or run:

```sh
docker-compose down
```

---

## 🔍 **Verify Everything is Running**

Check running containers:

```sh
docker ps
```

Test API endpoint:

```sh
curl http://localhost:8000/api/
```

Test React client:
Open **http://localhost:3000/** in your browser.

Test database connection:

```sh
docker exec -it postgres_db psql -U postgres -d mydatabase
```

---

## 🌱 **Seeding the Database**

If you need to seed the database with initial data, run the following command:

```sh
docker exec -it django_api python manage.py load_seed_data
```

This will load seed data from the `seeds/` directory into the database.

To verify that the data has been successfully seeded, you can check the database:

```sh
docker exec -it django_api python manage.py dumpdata city.City
```

---

## 🎯 **Common Commands**

### **Start the Project**

```sh
docker-compose up -d
```

### **Rebuild the Containers**

```sh
docker-compose up --build
```

### **Stop the Project**

```sh
docker-compose down
```

### **View Logs**

```sh
docker logs django_api
```

### **Enter Django Container**

```sh
docker exec -it django_api bash
```

### **Run Migrations in Django**

```sh
docker exec -it django_api python manage.py migrate
```

---

## 💡 **Notes**

-   The `client` container is running in development mode (`npm start`).
-   The `api` container will automatically restart if the database container starts late.
-   The database data is persisted using a Docker volume (`pg_data`).

---
