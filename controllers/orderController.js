const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const app = express();

const { Order, Customer } = require('../models/orderModel.js');

const orderController = {
    createOrder: async (req, res) => {
        try {
            const {
                delivery_address,
                pickup_address,
                total_amount,
                payment_status,
                order_status,
                tracking_number,
                estimated_delivery_date,
                notes
            } = req.body;

            const newOrder = await Order.create({
                delivery_address,
                pickup_address,
                total_amount,
                payment_status,
                order_status,
                tracking_number,
                estimated_delivery_date,
                notes,
                CustomerId: req.params.customerId 
            });

            res.status(201).json({ message: 'Order created successfully', order: newOrder });
        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).json({ message: 'Error creating order' });
        }
    },

    getOrdersForCustomer: async (req, res) => {
        try {
            const customerId = req.params.customerId;

            const orders = await Order.findAll({ where: { CustomerId: customerId } });

            res.status(200).json({ orders });
        } catch (error) {
            console.error('Error getting orders for customer:', error);
            res.status(500).json({ message: 'Error getting orders for customer' });
        }
    },

    updateOrder: async (req, res) => {
        try {
            const orderId = req.params.id;
            const {
                delivery_address,
                pickup_address,
                total_amount,
                payment_status,
                order_status,
                tracking_number,
                estimated_delivery_date,
                notes
            } = req.body;

            await Order.update({
                delivery_address,
                pickup_address,
                total_amount,
                payment_status,
                order_status,
                tracking_number,
                estimated_delivery_date,
                notes
            }, { where: { id: orderId } });

            res.status(200).json({ message: 'Order updated successfully' });
        } catch (error) {
            console.error('Error updating order:', error);
            res.status(500).json({ message: 'Error updating order' });
        }
    },

    deleteOrder: async (req, res) => {
        try {
            const orderId = req.params.id;
            
            await Order.destroy({ where: { id: orderId } });

            res.status(200).json({ message: 'Order deleted successfully' });
        } catch (error) {
            console.error('Error deleting order:', error);
            res.status(500).json({ message: 'Error deleting order' });
        }
    }
};

module.exports = orderController;