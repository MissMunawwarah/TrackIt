const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const app = express();

const AssignedRequest = require('../models/assignedRequestModel');
const Rider = require('../models/riderModel');
const Order = require('../models/orderModel')

const assignedRequestController = {
    createAssignedRequest: async (req, res) => {
        try {
            const { status, RiderId, OrderId } = req.body;

            const newAssignedRequest = await AssignedRequest.create({
                status,
                RiderId,
                OrderId
            });

            res.status(201).json({ message: 'Request created successfully', assignedRequest: newAssignedRequest });
        } catch (error) {
            console.error('Error creating request:', error);
            res.status(500).json({ message: 'Error creating request' });
        }
    },

    getAllAssignedRequests: async (req, res) => {
        try {
            const assignedRequests = await AssignedRequest.findAll();

            res.status(200).json({ assignedRequests });
        } catch (error) {
            console.error('Error getting requests:', error);
            res.status(500).json({ message: 'Error getting requests' });
        }
    },

    updateAssignedRequest: async (req, res) => {
        try {
            const assignedRequestId = req.params.id;
            const { status, RiderId, OrderId } = req.body;

            await AssignedRequest.update({
                status,
                RiderId,
                OrderId
            }, { where: { id: assignedRequestId } });

            res.status(200).json({ message: 'Request updated successfully' });
        } catch (error) {
            console.error('Error updating request:', error);
            res.status(500).json({ message: 'Error updating request' });
        }
    },

    deleteAssignedRequest: async (req, res) => {
        try {
            const assignedRequestId = req.params.id;

            await AssignedRequest.destroy({ where: { id: assignedRequestId } });

            res.status(200).json({ message: 'Request deleted successfully' });
        } catch (error) {
            console.error('Error deleting request:', error);
            res.status(500).json({ message: 'Error deleting request' });
        }
    }
};

module.exports = assignedRequestController;