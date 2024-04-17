import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mysql from 'mysql2';
const app = express();

import Rider from '../models/riderModel.js';

const riderController = {
    // Create a new rider
    createRider: async (req, res) => {
        try {
            const { userId, name, vehicleType } = req.body;
            const newRider = new Rider(userId, name, vehicleType);
            //  saving the rider to a database
            res.status(201).json({ message: 'Rider created successfully', rider: newRider });
        } catch (error) {
            console.error('Error creating rider:', error);
            res.status(500).json({ message: 'Error creating rider' });
        }
    },

    // Get a rider by ID
    getRiderById: async (req, res) => {
        try {
            const riderId = req.params.id;
            //  fetching the rider from the database by ID
            const rider = new Rider("dummyUserId", "John Doe", "motorcycle");
            if (!rider) {
                return res.status(404).json({ message: 'Rider not found' });
            }
            res.status(200).json({ rider });
        } catch (error) {
            console.error('Error getting rider by ID:', error);
            res.status(500).json({ message: 'Error getting rider' });
        }
    },

    // Update a rider
    updateRider: async (req, res) => {
        try {
            const riderId = req.params.id;
            const { userId, name, vehicleType } = req.body;
            //  updating the rider in the database
            res.status(200).json({ message: 'Rider updated successfully' });
        } catch (error) {
            console.error('Error updating rider:', error);
            res.status(500).json({ message: 'Error updating rider' });
        }
    },

    // Delete a rider
    deleteRider: async (req, res) => {
        try {
            const riderId = req.params.id;
            //  deleting the rider from the database
            res.status(200).json({ message: 'Rider deleted successfully' });
        } catch (error) {
            console.error('Error deleting rider:', error);
            res.status(500).json({ message: 'Error deleting rider' });
        }
    }
};

export default riderController;
