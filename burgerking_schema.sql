-- BurgerKing Restaurant Management System
-- MySQL schema + optional seed data

CREATE DATABASE IF NOT EXISTS burgerking_db
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE burgerking_db;

-- 1) Roles
CREATE TABLE IF NOT EXISTS roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- 2) Users
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role_id INT NOT NULL,
  active TINYINT(1) DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_users_role_id
    FOREIGN KEY (role_id) REFERENCES roles(id)
) ENGINE=InnoDB;

-- 3) Dishes
CREATE TABLE IF NOT EXISTS dishes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255),
  price DECIMAL(10,2) NOT NULL,
  -- Discount is treated as a percentage in the UI (e.g., 10 = 10%)
  discount DECIMAL(5,2) DEFAULT 0.00,
  available TINYINT(1) DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4) Dish Images (1:1)
CREATE TABLE IF NOT EXISTS dish_images (
  dish_id INT PRIMARY KEY,
  image_url VARCHAR(512),
  CONSTRAINT fk_dish_images_dish_id
    FOREIGN KEY (dish_id) REFERENCES dishes(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5) Orders
CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_number VARCHAR(50) UNIQUE,
  status VARCHAR(20) NOT NULL DEFAULT 'PLACED',
  total_amount DECIMAL(10,2),
  created_by INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_orders_created_by
    FOREIGN KEY (created_by) REFERENCES users(id)
) ENGINE=InnoDB;

-- 6) Order Items
CREATE TABLE IF NOT EXISTS order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  dish_id INT NULL,
  dish_name VARCHAR(255),
  quantity INT NOT NULL,
  -- In current backend usage, this is a line total (discountedPrice * quantity)
  price DECIMAL(10,2) NOT NULL,
  CONSTRAINT fk_order_items_order_id
    FOREIGN KEY (order_id) REFERENCES orders(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_order_items_dish_id
    FOREIGN KEY (dish_id) REFERENCES dishes(id)
    ON DELETE SET NULL
) ENGINE=InnoDB;

-- 7) Order Status History
CREATE TABLE IF NOT EXISTS order_status_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  status VARCHAR(20) NOT NULL,
  changed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_order_status_history_order_id
    FOREIGN KEY (order_id) REFERENCES orders(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_order_status_history_order_id ON order_status_history(order_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);

-- ===============================
-- OPTIONAL SEED DATA
-- ===============================

-- Roles (IDs are important because backend maps role_id -> role name)
INSERT INTO roles (id, name) VALUES
  (1, 'ADMIN'),
  (2, 'USER'),
  (3, 'KITCHEN')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Sample users (plaintext passwords are accepted once and upgraded to bcrypt
-- on successful login by backend services).
INSERT INTO users (username, password, role_id, active) VALUES
  ('admin', 'Admin@123', 1, 1),
  ('billing1', 'Billing@123', 2, 1),
  ('kitchen1', 'Kitchen@123', 3, 1)
ON DUPLICATE KEY UPDATE role_id = VALUES(role_id), active = VALUES(active);

-- Sample dishes
INSERT INTO dishes (name, category, price, discount, available) VALUES
  ('Whopper', 'Burgers', 199.00, 10.00, 1),
  ('Veg Burger', 'Burgers', 149.00, 0.00, 1),
  ('French Fries', 'Sides', 99.00, 5.00, 1),
  ('Coke', 'Beverages', 59.00, 0.00, 1)
ON DUPLICATE KEY UPDATE price = VALUES(price), discount = VALUES(discount), available = VALUES(available);
