-- Active: 1712522728048@@127.0.0.1@3306@TrackIt
CREATE DATABASE TrackIt;
USE TrackIt;

-- Create the users table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('business_owner', 'rider', 'customer') NOT NULL,
    name VARCHAR(255) NOT NULL,
    contact_details VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the business_owners table
CREATE TABLE business_owners (
    businessowner_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    business_name VARCHAR(255) NOT NULL,
    business_type VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    business_license VARCHAR(255) NOT NULL,
    tax_identification_number VARCHAR(255) NOT NULL,
    approved BOOLEAN DEFAULT false,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Create the riders table
CREATE TABLE riders (
    rider_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    vehicle_type VARCHAR(255) NOT NULL,
    license_details VARCHAR(255) NOT NULL,
    background_check_results VARCHAR(255) NOT NULL,
    vehicle_registration VARCHAR(255) NOT NULL,
    approved BOOLEAN DEFAULT false,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Create the customers table
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    preferred_delivery_location VARCHAR(255) NOT NULL,
    payment_gateway_id INT,
    preferred_language VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Create the systemAdmin table
CREATE TABLE systemAdmin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,  -- Foreign key reference to the users table
    access_level ENUM('admin', 'superadmin') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Create the orders table
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Create the assigned_requests table
CREATE TABLE assigned_requests (
    assignment_id INT AUTO_INCREMENT PRIMARY KEY,
    rider_id INT NOT NULL,
    order_id INT NOT NULL,
    status ENUM('pending', 'accepted', 'delivered') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rider_id) REFERENCES riders(rider_id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders (order_id) ON DELETE CASCADE
);

-- Create the insurance_purchases table
CREATE TABLE insurance_purchases (
    purchase_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    coverage_level ENUM('basic', 'standard', 'premium') NOT NULL,
    payment_details TEXT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);

-- Create the incident_reports table
CREATE TABLE incident_reports (
    incident_id INT AUTO_INCREMENT PRIMARY KEY,
    rider_id INT NOT NULL,
    incident_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    photos BLOB,
    FOREIGN KEY (rider_id) REFERENCES riders(rider_id) ON DELETE CASCADE
);

-- Create the customer_payments table
CREATE TABLE customer_payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    payment_amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_confirmation_code VARCHAR(50),
    receipt_url VARCHAR(255),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);

-- Create the rider_payments table
CREATE TABLE rider_payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    rider_id INT NOT NULL,
    payment_amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rider_id) REFERENCES riders(rider_id) ON DELETE CASCADE
);

-- Create the rider_ratings table
CREATE TABLE rider_ratings (
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    rider_id INT NOT NULL,
    customer_id INT NOT NULL,
    rating INT NOT NULL,
    comment TEXT,
    rating_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rider_id) REFERENCES riders(rider_id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);


ALTER TABLE riders ADD COLUMN average_rating DECIMAL(3, 2) DEFAULT 0.00;
ALTER TABLE riders ADD COLUMN total_ratings INT DEFAULT 0;
ALTER TABLE riders ADD COLUMN friendly_rating INT DEFAULT 0;
ALTER TABLE riders ADD COLUMN communication_rating INT DEFAULT 0;
ALTER TABLE riders ADD COLUMN punctuality_rating INT DEFAULT 0;

ALTER TABLE users
MODIFY role ENUM('business_owner', 'rider', 'customer', 'systemadmin');


SHOW TABLES