const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const app = express();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const Rider = require('./models/riderModel.js');
const BusinessOwner = require('../models/businessOwnerModel.js');
const Customer = require('../models/customerModel.js');

const userController = {
    // Creating a new usercleare
    createUser: async (req, res) => {
        try {
            const { username, email, password, role } = req.body;

            // Checking if the role is valid
            if (role !== 'rider' && role !== 'business_owner' && role !== 'customer') {
                return res.status(400).json({ message: 'Invalid role' });
            }

            // Hashing the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Creating the user based on the role
            let newUser;
            if (role === 'rider') {
                newUser = new Rider(username, email, hashedPassword);
            } else if (role === 'business_owner') {
                newUser = new BusinessOwner(username, email, hashedPassword);
            } else if (role === 'customer') {
                newUser = new Customer(username, email, hashedPassword);
            }

            // Saving the user to the database
            await newUser.save();

            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Error creating user' });
        }
    },

    // Authenticating user
    authenticateUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Finding user by email
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Comparing passwords
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Incorrect email or password' });
            }

            // Passwords match, generate token
            const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Respond with token
            res.status(200).json({ message: 'Authentication successful', token });
        } catch (error) {
            console.error('Error authenticating user:', error);
            res.status(500).json({ message: 'Error authenticating user' });
        }
    },

    // Getting user by ID
    getUserById: async (req, res) => {
        try {
            const userId = req.params.id;

            // Finding user by ID
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Responding with user data
            res.status(200).json({ user });
        } catch (error) {
            console.error('Error getting user by ID:', error);
            res.status(500).json({ message: 'Error getting user' });
        }
    },

    // Updating user
    updateUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const { username, email, password } = req.body;

            // Updating user in the database
            await User.update(userId, { username, email, password });

            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ message: 'Error updating user' });
        }
    },

    // Deleting user
    deleteUser: async (req, res) => {
        try {
            const userId = req.params.id;

            // Deleting user from the database
            await User.delete(userId);

            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ message: 'Error deleting user' });
        }
    }
};

module.exports = userController;
