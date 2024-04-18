-- Active: 1712522728048@@127.0.0.1@3306@user_app
CREATE DATABASE user_app;
USE user_app;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE riders (
    rider_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    vehicle_type VARCHAR(50) NOT NULL,
    rating FLOAT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivery_address VARCHAR(255) NOT NULL,
    pickup_address VARCHAR(255),
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_status ENUM('paid', 'pending') NOT NULL,
    order_status ENUM('pending', 'processing', 'delivered', 'cancelled') NOT NULL,
    tracking_number VARCHAR(50),
    estimated_delivery_date DATE,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

SELECT * from riders;
DROP DATABASE user_app

DROP TABLE orders


