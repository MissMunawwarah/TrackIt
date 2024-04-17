import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mysql from 'mysql2';
const app = express();

import Order from '../models/orderModel.js';

const orderController = {
    // Create a new order
    createOrder: async (req, res) => {
        try {
            const { userId, deliveryAddress, totalAmount, paymentStatus, orderStatus, trackingNumber, estimatedDeliveryDate, notes } = req.body;
            const newOrder = new Order(userId, deliveryAddress, totalAmount, paymentStatus, orderStatus, trackingNumber, estimatedDeliveryDate, notes);
            // saving the order to a database
            res.status(201).json({ message: 'Order created successfully', order: newOrder });
        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).json({ message: 'Error creating order' });
        }
    },

    // Get an order by ID
    getOrderById: async (req, res) => {
        try {
            const orderId = req.params.id;
            // fetching the order from the database by ID
            const order = new Order("dummyUserId", "123 Main St", 100.0, "paid", "pending", "123456789", "2024-04-18", "Please deliver ASAP");
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json({ order });
        } catch (error) {
            console.error('Error getting order by ID:', error);
            res.status(500).json({ message: 'Error getting order' });
        }
    },

    // Update an order
    updateOrder: async (req, res) => {
        try {
            const orderId = req.params.id;
            const { userId, deliveryAddress, totalAmount, paymentStatus, orderStatus, trackingNumber, estimatedDeliveryDate, notes } = req.body;
            // updating the order in the database
            res.status(200).json({ message: 'Order updated successfully' });
        } catch (error) {
            console.error('Error updating order:', error);
            res.status(500).json({ message: 'Error updating order' });
        }
    },

    // Delete an order
    deleteOrder: async (req, res) => {
        try {
            const orderId = req.params.id;
            // deleting the order from the database
            res.status(200).json({ message: 'Order deleted successfully' });
        } catch (error) {
            console.error('Error deleting order:', error);
            res.status(500).json({ message: 'Error deleting order' });
        }
    }
};


export default orderController;
