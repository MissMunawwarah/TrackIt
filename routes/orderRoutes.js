const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const app = express();
const router = express.Router();

const orderController = require('../controllers/orderController');

router.post('/customers/:customerId/orders', orderController.createOrder);
router.get('/customers/:customerId/orders', orderController.getOrdersForCustomer);
router.put('/orders/:id', orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router;