# 🧾 Retail Billing Web App (Admin Mode)

A full-stack **Retail Billing System** built with **Spring Boot**, **React**, and **PostgreSQL**. This application is designed for **administrators** to handle product management, customer billing, and invoice generation with secure authentication using **JWT**.

---

## 🚀 Features (Admin Mode)

- 🛍️ Add, update, or delete products
- 🧾 Generate customer invoices with tax and total
- 📦 Manage customer purchases
- 📄 View and filter purchase history
- 🔐 Secure login with JWT-based authentication
- 🧑‍💼 Enter customer details and process payments (Cash/Online)
- 📤 Generate and export invoices as PDF
- 📬 Tested with Postman for API verification

---

## 🧱 Tech Stack

### 🔹 Frontend
- **React.js**
- **TailwindCSS** for styling
- **React Router DOM**
- **FontAwesome** for icons

### 🔹 Backend
- **Spring Boot (Java)**
- **JWT** for secure authentication
- **RESTful APIs**
- **Lombok** and **Spring Data JPA**

### 🔹 Database
- **PostgreSQL**

### 🔹 Tools
- **Postman** for API testing
- **npm** for frontend dependency management
- **Maven** for backend builds

---

## 📦 Project Structure

```bash
RetailBilling/
├── backend/
│   ├── controller/
│   ├── model/
│   ├── repository/
│   ├── service/
│   ├── security/         # JWT config
│   └── RetailBillingApplication.java
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── public/
└── README.md

## ⚙️ How to Run

### ✅ Prerequisites

- Java 17+
- PostgreSQL
- Node.js and npm
- Maven

---

### ▶️ Backend Setup

1. **Configure `application.properties`:**

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/retaildb
spring.datasource.username=your_username
spring.datasource.password=your_password
jwt.secret=your_jwt_secret

## ⚙️ How to Run

### ▶️ Backend Setup

Run the backend server:

```bash
cd backend
mvn spring-boot:run

### ▶️ Frontend Setup

```bash
cd frontend
npm install
npm start

## 📄 Sample API Endpoints

| Method | Endpoint                     | Description                      |
|--------|------------------------------|----------------------------------|
| POST   | `/auth/login`                | Admin login (returns JWT token)  |
| POST   | `/auth/register`             | Register new admin               |
| POST   | `/api/createBill`            | Create bill and store purchase   |
| GET    | `/api/getPurchases`          | Retrieve all purchases           |
| GET    | `/api/getPurchasedItems`     | Retrieve all purchased items     |
| POST   | `/api/addProducts`           | Add a new product                |
| GET    | `/api/getProducts`           | Fetch all products               |
| GET    | `/api/getCategory/{name}`    | Fetch products by category       |
| GET    | `/api/getProducts/{name}`    | Fetch products by name           |
| DELETE | `/api/deleteProducts`        | Delete a product                 |
| POST   | `/api/addCategory`           | Add a product category           |
| GET    | `/api/categories`            | Get all categories               |
