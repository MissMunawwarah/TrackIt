import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mysql from 'mysql2';
import { query } from './db.js';

const app = express();

const Customer = {};

// Function to get customer by ID
Customer.getCustomerById = (customerId, callback) => {
  query('SELECT * FROM customers WHERE customer_id = ?', [customerId], (err, results) => {
    if (err) throw err;
    callback(results[0]);
  });
};

// Function to create a new customer
Customer.createCustomer = (customerData, callback) => {
  query('INSERT INTO customers SET ?', customerData, (err, results) => {
    if (err) throw err;
    callback(results.insertId);
  });
};


export default Customer;
