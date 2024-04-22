const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const app = express();
const router = express.Router();

const customerPaymentController = require('../controllers/customerPaymentController');

router.post('/:customerId/payments', customerPaymentController.createCustomerPayment);
router.get('/:customerId/payments', customerPaymentController.getCustomerPaymentsForCustomer);
router.put('/payments/:id', customerPaymentController.updateCustomerPayment);
router.delete('/payments/:id', customerPaymentController.deleteCustomerPayment);

module.exports = router;
