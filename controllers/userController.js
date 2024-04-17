import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mysql from 'mysql2';
const app = express();

import User from '../models/userModel.js';


const userController = {
    // Create a new user
    createUser: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const newUser = new User(username, email, password);
            // saving the user to a database
            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Error creating user' });
        }
    },

    // Get a user by ID
    getUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            // fetching the user from the database by ID
            const user = new User("dummyUser", "dummy@example.com", "dummyPassword");
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ user });
        } catch (error) {
            console.error('Error getting user by ID:', error);
            res.status(500).json({ message: 'Error getting user' });
        }
    },

    // Update a user
    updateUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const { username, email, password } = req.body;
            // updating the user in the database
            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ message: 'Error updating user' });
        }
    },

    // Delete a user
    deleteUser: async (req, res) => {
        try {
            const userId = req.params.id;
            // deleting the user from the database
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ message: 'Error deleting user' });
        }
    }
};

export default userController;
