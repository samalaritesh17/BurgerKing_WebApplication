# BurgerKing Restaurant Management System - Project Documentation

## 1) Project Overview

### What the project is about
BurgerKing Restaurant Management System is a full-stack restaurant operations platform that covers menu management, staff management, billing (order placement), and kitchen order processing. The frontend is a single-page application (React) communicating with a Spring Boot REST API backed by MySQL.

### Key features

Admin portal:

- Admin login + registration (Admin / Billing / Kitchen)
- Dashboard KPIs (dishes, stock, today orders, staff counts)
- Dish management (add dish with image upload, pricing, discount, availability, delete)
- Staff management (create/update/toggle active/delete users)
- Order monitoring (recent orders, order details, status timeline)

Billing portal:

- Staff login
- View available dishes
- Build cart + checkout
- Place order (creates order + items + status history)

Kitchen dashboard:

- Live polling list of active orders (PLACED + PREPARING)
- Accept order (PLACED -> PREPARING)
- Mark ready (PREPARING -> READY)

### Target users

- Admin/Manager: manage dishes, staff, operations, and KPIs
- Billing/Counter staff: place customer orders
- Kitchen staff: process orders and update status

### System modules

- Admin Dashboard: `/admin`
- Billing Portal: `/billing`
- Kitchen Dashboard: `/kitchen`

## 2) Architecture Overview

### Frontend-backend-database flow

- React (Vite) runs on `http://localhost:5173`
- Spring Boot API runs on `http://localhost:8080`
- MySQL stores persistent data

Flow:

1. React UI triggers API calls using Axios/Fetch.
2. Spring Boot controllers map requests to services.
3. Services use Spring Data JPA repositories (Hibernate) to read/write MySQL.
4. Responses return JSON (or text for register) back to the frontend.

Uploads:

- Dish images are written to `uploads/` (configurable) and served via `/uploads/**`.

### Role-based authentication

Role source of truth:

- `users.role_id` maps to a role name.

Current mapping (backend):

- `1` -> `ADMIN`
- `2` -> `USER` (used as Billing/Counter in current code)
- `3` -> `KITCHEN`

JWT:

- `JwtService` can generate tokens and embeds `userId`, `roleId`, and `role` claims.

Important current behavior:

- Backend security is configured as `permitAll()` in `SecurityConfig`, so endpoints are currently open.

### Order lifecycle

Order statuses currently implemented:

- `PLACED`
- `PREPARING`
- `READY`

Lifecycle:

1. Billing places order -> `PLACED` (+ history entry)
2. Kitchen accepts order -> `PREPARING` (+ history entry)
3. Kitchen marks ready -> `READY` (+ history entry)

If you want a separate "Completed" stage (served/picked up), add `COMPLETED` to `OrderStatus` and extend the kitchen/admin flows.

## 3) Prerequisites

### Software required

- Java: **JDK 25** (configured in `burgerking-backend/pom.xml`)
- Node.js: **20+** recommended
- MySQL: **8.0+**

### Recommended IDEs

- Backend: IntelliJ IDEA / Eclipse / VS Code (Java)
- Frontend: VS Code

### Tools

- Git (recommended)
- MySQL client (MySQL Workbench / DBeaver)

## 4) Installation & Setup Guide

### Backend setup

1. Ensure MySQL is running.
2. Create schema and tables using `burgerking_schema.sql`.
3. Configure backend environment variables or update `application.properties`.
4. Start backend.

Commands:

```bash
cd burgerking-backend
./mvnw spring-boot:run
```

Windows:

```bat
cd burgerking-backend
mvnw.cmd spring-boot:run
```

### Frontend setup

```bash
cd burgerking-frontend
npm install
npm run dev
```

### Database setup

Run:

```bash
mysql -u root -p < burgerking_schema.sql
```

### Environment configuration

Backend reads these env vars (defaults exist):

- `DB_URL` (default: `jdbc:mysql://localhost:3306/burgerking_db`)
- `DB_USERNAME` (default: `root`)
- `DB_PASSWORD` (default: `root`)
- `UPLOAD_DIR` (default: `uploads`)
- `JWT_SECRET` (default: `change-me-change-me-change-me-change-me`)
- `JWT_EXPIRATION_MS` (default: `900000`)

Example (PowerShell):

```powershell
$env:DB_URL="jdbc:mysql://localhost:3306/burgerking_db"
$env:DB_USERNAME="root"
$env:DB_PASSWORD="root"
$env:JWT_SECRET="replace-with-32+bytes-secret-string"
```

### application.properties

The active config is:

- `burgerking-backend/src/main/resources/application.properties`

See `application.properties.example` for a clean template.

## 5) Database Documentation

### Tables

Core tables:

- `roles`
- `users`
- `dishes`
- `dish_images`
- `orders`
- `order_items`
- `order_status_history`

### Relationships

- `users.role_id` -> `roles.id`
- `dish_images.dish_id` -> `dishes.id` (1:1)
- `orders.created_by` -> `users.id`
- `order_items.order_id` -> `orders.id`
- `order_items.dish_id` -> `dishes.id` (nullable, recommended `ON DELETE SET NULL`)
- `order_status_history.order_id` -> `orders.id`

### SQL schema

Use the schema in `burgerking_schema.sql`.

## 6) API Documentation

Base URL: `http://localhost:8080`

Note: security is currently open (`permitAll()`), but JWT generation exists in billing login.

### Meta

- `GET /api/meta`

### Auth (Admin/General)

- `POST /api/auth/register`
- `POST /api/auth/login`

### Billing

- `POST /api/billing/auth/login`
- `GET /api/billing/dishes`
- `POST /api/orders/place?userId={userId}`

### Kitchen

- `GET /api/kitchen/orders`
- `PUT /api/kitchen/orders/{orderId}/accept`
- `PUT /api/kitchen/orders/{orderId}/ready`

### Admin

- `GET /api/admin/dashboard/kpis`
- `GET /api/admin/orders/summary`
- `GET /api/admin/orders?page={page}&size={size}`
- `GET /api/admin/orders/{orderId}/details`
- `GET /api/admin/dishes`
- `POST /api/admin/dishes` (multipart/form-data)
- `PATCH /api/admin/dishes/{id}/availability`
- `PATCH /api/admin/dishes/{id}/pricing`
- `PATCH /api/admin/dishes/{id}/discount-toggle`
- `DELETE /api/admin/dishes/{id}`
- `GET /api/admin/users`
- `POST /api/admin/users`
- `PUT /api/admin/users/{id}`
- `PATCH /api/admin/users/{id}/toggle`
- `DELETE /api/admin/users/{id}`

## 7) Running the Application

### Start backend

```bash
cd burgerking-backend
./mvnw spring-boot:run
```

### Start frontend

```bash
cd burgerking-frontend
npm run dev
```

### URLs

- Admin Dashboard: `http://localhost:5173/admin`
- Billing Portal: `http://localhost:5173/billing`
- Kitchen Dashboard: `http://localhost:5173/kitchen`

## 8) Project Folder Structure

Backend: `burgerking-backend/`

- `src/main/java/com/burgerking/`
  - `config/`
  - `controller/`
  - `billingportal/`
  - `kitchenportal/`
  - `model/`
  - `repository/`
  - `security/`
  - `service/`

Frontend: `burgerking-frontend/`

- `src/`
  - `pages/`
  - `billingportal/`
  - `kitchenportal/`
  - `components/`
  - `services/`
  - `styles/`

## 9) Sample Test Data

You can either:

- Register users via UI at `http://localhost:5173/register`, or
- Insert sample users/dishes from `burgerking_schema.sql`.

Role IDs:

- 1: ADMIN
- 2: USER (Billing/Counter)
- 3: KITCHEN

## 10) Troubleshooting

- Foreign key constraint when deleting dishes:
  - Ensure `order_items.dish_id` uses `ON DELETE SET NULL`.

- Backend fails on startup:
  - `ddl-auto=validate` requires tables exist. Run `burgerking_schema.sql` first.

- Port conflicts:
  - Backend uses `8080`, frontend uses `5173`.

- Duplicate order number:
  - `orders.order_number` is unique; improve generation/retry logic if collisions happen.

## 11) Future Enhancements

- Payment integration
- Enforce JWT authentication + role-based access control
- Docker deployment
- Cloud deployment

## 12) README.md

See `README.md` in the repository root.

## 13) Additional Files

- `burgerking_schema.sql`: database schema + optional seed data
- `.env.example`: environment variable template
- `application.properties.example`: sample Spring Boot config template
