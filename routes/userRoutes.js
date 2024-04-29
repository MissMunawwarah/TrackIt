const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const app = express();


const router = express.Router();
const userController = require('../controllers/userController');


// Routes for user management
router.post('/users', userController.createUser)
router.post('/login', userController.authenticateUser);
router.get('/users/:userId', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.get('/users', userController.getAllUsers);

module.exports = router;
