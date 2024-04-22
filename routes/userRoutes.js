const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const app = express();


const router = express.Router();
const userController = require('../controllers/userController');


// Routes for user management
router.post('/users', userController.createUser)
router.post('/login', userController.authenticateUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
