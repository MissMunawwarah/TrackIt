const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();


const app = express();

const RiderPayment = require('../models/riderPaymentModel');

const riderPaymentController = {
    createRiderPayment: async (req, res) => {
        try {
            const { payment_amount, payment_method } = req.body;

            const newRiderPayment = await RiderPayment.create({
                payment_amount,
                payment_method,
                payment_date: new Date(),
                RiderId: req.params.riderId
            });

            res.status(201).json({ message: 'Payment created successfully', riderPayment: newRiderPayment });
        } catch (error) {
            console.error('Error creating payment:', error);
            res.status(500).json({ message: 'Error creating payment' });
        }
    },

    getRiderPayments: async (req, res) => {
        try {
            const riderId = req.params.riderId;

            const riderPayments = await RiderPayment.findAll({ where: { RiderId: riderId } });

            res.status(200).json({ riderPayments });
        } catch (error) {
            console.error('Error getting payments:', error);
            res.status(500).json({ message: 'Error getting payments' });
        }
    },

    updateRiderPayment: async (req, res) => {
        try {
            const riderPaymentId = req.params.id;
            const { payment_amount, payment_method } = req.body;

            await RiderPayment.update({ payment_amount, payment_method }, { where: { id: riderPaymentId } });

            res.status(200).json({ message: 'Payment updated successfully' });
        } catch (error) {
            console.error('Error updating payment:', error);
            res.status(500).json({ message: 'Error updating payment' });
        }
    },

    deleteRiderPayment: async (req, res) => {
        try {
            const riderPaymentId = req.params.id;

            await RiderPayment.destroy({ where: { id: riderPaymentId } });

            res.status(200).json({ message: 'Payment deleted successfully' });
        } catch (error) {
            console.error('Error deleting payment:', error);
            res.status(500).json({ message: 'Error deleting payment' });
        }
    }
};

module.exports = riderPaymentController;
