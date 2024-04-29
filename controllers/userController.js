const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const app = express();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const Rider = require('../models/riderModel.js');
const BusinessOwner = require('../models/businessOwnerModel.js');
const Customer = require('../models/customerModel.js');
const SystemAdmin = require('../models/systemAdminModel.js');



const userController = {
    createUser: async (req, res) => {
        console.log({ body: req.body });
        try {
            const { email, password, role, name, contact_details } = req.body;

            if (!email || !password || !role || !name || !contact_details) {
                return res.status(400).json({ message: 'Missing required fields' });
              }
        
              // Check if user already exists
              const existingUser = await User.findOne({ where: { email } });
              if (existingUser) {
                return res.status(409).json({ message: 'Email address already in use' });
              }
        


            // Hashing the password
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                email,
                password: hashedPassword,
                role,
                name,
                contact_details
            });

            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Error creating user' });
        }
    },


    createRider: async (req, res) => {
        try {
            const { userId } = req.params; // Assuming userId is passed as a URL parameter
            const { vehicle_type, license_details, background_check_results, vehicle_registration, approved, average_rating, total_ratings, friendly_rating, communication_rating, punctuality_rating } = req.body;

            // Create the rider profile
            const newRider = await Rider.create({
                user_id: userId,
                vehicle_type,
                license_details,
                background_check_results,
                vehicle_registration,
                approved,
                average_rating,
                total_ratings,
                friendly_rating,
                communication_rating,
                punctuality_rating
            });

            res.status(201).json({ message: 'Rider profile created successfully', rider: newRider });
        } catch (error) {
            console.error('Error creating rider profile:', error);
            res.status(500).json({ message: 'Error creating rider profile' });
        }
    },

    createBusinessOwner: async (req, res) => {
        try {
            const { userId } = req.params; // Assuming userId is passed as a URL parameter
            const { business_name, business_type, location, business_license, tax_identification_number, approved } = req.body;
    
            // Create the business owner profile
            const newBusinessOwner = await BusinessOwner.create({
                user_id: userId,
                business_name,
                business_type,
                location,
                business_license,
                tax_identification_number,
                approved
            });
    
            res.status(201).json({ message: 'Business owner profile created successfully', businessOwner: newBusinessOwner });
        } catch (error) {
            console.error('Error creating business owner profile:', error);
            res.status(500).json({ message: 'Error creating business owner profile' });
        }
    },
    

    createCustomer: async (req, res) => {
        try {
            const { userId } = req.params; // Assuming userId is passed as a URL parameter
            const { preferred_delivery_location, payment_gateway_id, preferred_language } = req.body;
    
            // Create the customer profile
            const newCustomer = await Customer.create({
                user_id: userId,
                preferred_delivery_location,
                payment_gateway_id,
                preferred_language
            });
    
            res.status(201).json({ message: 'Customer profile created successfully', customer: newCustomer });
        } catch (error) {
            console.error('Error creating customer profile:', error);
            res.status(500).json({ message: 'Error creating customer profile' });
        }
    },

    createSystemAdmin: async (req, res) => {
        try {
            const { userId } = req.params; // Assuming userId is passed as a URL parameter
            const { access_level } = req.body;
    
            // Create the system admin profile
            const newSystemAdmin = await SystemAdmin.create({
                user_id: userId,
                access_level
            });
    
            res.status(201).json({ message: 'System admin profile created successfully', systemAdmin: newSystemAdmin });
        } catch (error) {
            console.error('Error creating system admin profile:', error);
            res.status(500).json({ message: 'Error creating system admin profile' });
        }
    },
    

    authenticateUser: async (req, res) => {
    try {
        const { email, password } = req.body;

        // Finding user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Comparing passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        // Passwords match, generate token
        const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1m' });

        // Respond with token
        res.status(200).json({ message: 'Authentication successful', token });
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ message: 'Error authenticating user' });
    }
},

getUserById: async (req, res) => {
    try {
        const userId = req.params.id;

        // Finding user by ID
        const user = await User.findOne(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Responding with user data
        res.status(200).json( user );
    } catch (error) {
        console.error('Error getting user by ID:', error);
        res.status(500).json({ message: 'Error getting user' });
    }
},

updateUser: async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, email, password, contact_details } = req.body;

        // Updating user in the database
        await User.update({ username, email, password, contact_details }, { where: { id: userId } });

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user' });
    }
},

deleteUser: async (req, res) => {
    try {
        const userId = req.params.id;

        // Deleting user from the database
        await User.destroy({ where: { id: userId } });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user' });
    }
},

getAllUsers: async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ['id'] });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ message: 'Error retrieving users' });
    }
}};

module.exports = userController;