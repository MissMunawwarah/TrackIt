const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const app = express();

const CustomerPayment = require('../models/assignedRequestModel.js');
const Customer = require('../models/customerModel.js');

const customerPaymentController = {
   
    createCustomerPayment: async (req, res) => {
        try {
            const { payment_amount, payment_method, payment_confirmation_code, receipt_url } = req.body;

            const newCustomerPayment = await CustomerPayment.create({
                payment_amount,
                payment_method,
                payment_confirmation_code,
                receipt_url,
                CustomerId: req.params.customerId 
            });

            res.status(201).json({ message: 'Payment created successfully', customerPayment: newCustomerPayment });
        } catch (error) {
            console.error('Error creating payment:', error);
            res.status(500).json({ message: 'Error creating payment' });
        }
    },

    getCustomerPaymentsForCustomer: async (req, res) => {
        try {
            const customerId = req.params.customerId;

            const customerPayments = await CustomerPayment.findAll({ where: { CustomerId: customerId } });

            res.status(200).json({ customerPayments });
        } catch (error) {
            console.error('Error getting payments for customer:', error);
            res.status(500).json({ message: 'Error getting payments for customer' });
        }
    },

    updateCustomerPayment: async (req, res) => {
        try {
            const customerPaymentId = req.params.id;
            const { payment_amount, payment_method, payment_confirmation_code, receipt_url } = req.body;

            await CustomerPayment.update({
                payment_amount,
                payment_method,
                payment_confirmation_code,
                receipt_url
            }, { where: { id: customerPaymentId } });

            res.status(200).json({ message: 'Payment updated successfully' });
        } catch (error) {
            console.error('Error updating payment:', error);
            res.status(500).json({ message: 'Error updating payment' });
        }
    },

    deleteCustomerPayment: async (req, res) => {
        try {
            const customerPaymentId = req.params.id;

            await CustomerPayment.destroy({ where: { id: customerPaymentId } });

            res.status(200).json({ message: 'Payment deleted successfully' });
        } catch (error) {
            console.error('Error deleting payment:', error);
            res.status(500).json({ message: 'Error deleting payment' });
        }
    }
};

module.exports = customerPaymentController;