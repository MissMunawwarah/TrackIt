const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const app = express();

const { InsurancePurchase } = require('../models/insurancePurchaseModel');

const insurancePurchaseController = {
    createInsurancePurchase: async (req, res) => {
        try {
            const { purchase_date, coverage_level, payment_details } = req.body;

            const newInsurancePurchase = await InsurancePurchase.create({
                purchase_date,
                coverage_level,
                payment_details,
                CustomerId: req.params.customerId 
            });

            res.status(201).json({ message: 'Insurance created successfully', insurancePurchase: newInsurancePurchase });
        } catch (error) {
            console.error('Error creating insurance:', error);
            res.status(500).json({ message: 'Error creating insurance' });
        }
    },

    getInsurancePurchasesForCustomer: async (req, res) => {
        try {
            const customerId = req.params.customerId;

            const insurancePurchases = await InsurancePurchase.findAll({ where: { CustomerId: customerId } });

            res.status(200).json({ insurancePurchases });
        } catch (error) {
            console.error('Error getting insurance for customer:', error);
            res.status(500).json({ message: 'Error getting insurance for customer' });
        }
    },

    updateInsurancePurchase: async (req, res) => {
        try {
            const insurancePurchaseId = req.params.id;
            const { purchase_date, coverage_level, payment_details } = req.body;

            await InsurancePurchase.update({
                purchase_date,
                coverage_level,
                payment_details
            }, { where: { id: insurancePurchaseId } });

            res.status(200).json({ message: 'Insurance updated successfully' });
        } catch (error) {
            console.error('Error updating insurance:', error);
            res.status(500).json({ message: 'Error updating insurance ' });
        }
    },

    deleteInsurancePurchase: async (req, res) => {
        try {
            const insurancePurchaseId = req.params.id;

            await InsurancePurchase.destroy({ where: { id: insurancePurchaseId } });

            res.status(200).json({ message: 'Insurance deleted successfully' });
        } catch (error) {
            console.error('Error deleting insurance:', error);
            res.status(500).json({ message: 'Error deleting insurance' });
        }
    }
};

module.exports = insurancePurchaseController;