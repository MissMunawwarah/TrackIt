import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mysql from 'mysql2';
const app = express();

const router = express.Router();
import userController from '../controllers/userController.js';

// router.post('/register-user', (req, res) => {
//     // to create a new user
// });
// router.post('/register-rider', (req, res) => {
//     // to create a new user
// });

// router.get('/users/:userId', (req, res) => {
//     // to get user details
// });

// export default router;



// Routes for user management
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

export default router;
