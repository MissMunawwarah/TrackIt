const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const app = express();
const router = express.Router();

const riderPaymentController = require('../controllers/riderPaymentController');

router.post('/riders/:riderId/payments', riderPaymentController.createRiderPayment);
router.get('/riders/:riderId/payments', riderPaymentController.getRiderPayments);
router.put('/payments/:id', riderPaymentController.updateRiderPayment);
router.delete('/payments/:id', riderPaymentController.deleteRiderPayment);

module.exports = router;