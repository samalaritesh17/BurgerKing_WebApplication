# BurgerKing Restaurant Management System

A full-stack Restaurant Management System built with **React (Vite)**, **Spring Boot**, and **MySQL**.

It provides three operational portals:

- **Admin**: manage staff, dishes, discounts, and monitor orders/KPIs
- **Billing (Counter)**: login, build cart, place customer orders
- **Kitchen**: accept orders, update cooking status, mark ready

## Tech Stack

- Frontend: React (Vite), React Router, Axios
- Backend: Java Spring Boot, Spring Web MVC, Spring Data JPA (Hibernate), Spring Security (JWT code present)
- Database: MySQL
- Build Tool: Maven (wrapper included)

## Local URLs

When running locally:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8080`

Portals:

- Admin Dashboard: `http://localhost:5173/admin`
- Billing Portal: `http://localhost:5173/billing`
- Kitchen Dashboard: `http://localhost:5173/kitchen`

## Prerequisites

- Java: **JDK 25** (as configured in `burgerking-backend/pom.xml`)
- Node.js: **20+** recommended
- MySQL: **8.0+**

## Setup

### 1) Database

Create schema and tables first (the backend uses `ddl-auto=validate`).

```bash
mysql -u root -p < burgerking_schema.sql
```

Optional sample data (roles/users/dishes) is included at the bottom of `burgerking_schema.sql`.

### 2) Backend (Spring Boot)

```bash
cd burgerking-backend
./mvnw spring-boot:run
```

Windows:

```bat
cd burgerking-backend
mvnw.cmd spring-boot:run
```

Backend runs at: `http://localhost:8080`

Configuration:

- See `application.properties.example` for a production-friendly template.
- The real config lives in `burgerking-backend/src/main/resources/application.properties`.

### 3) Frontend (React)

```bash
cd burgerking-frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

## Security Note

JWT utilities exist in the backend, but **endpoint protection is currently disabled**:

- `burgerking-backend/src/main/java/com/burgerking/config/SecurityConfig.java` uses `permitAll()`.

This is convenient for development but must be tightened for production (enable JWT filter and role-based authorization rules).

## Documentation

- Full project documentation: `PROJECT_DOCUMENTATION.md`
- Database schema: `burgerking_schema.sql`
- Environment template: `.env.example`
