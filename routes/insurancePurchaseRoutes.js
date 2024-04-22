const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const app = express();
const router = express.Router();

const insurancePurchaseController = require('../controllers/insurancePurchaseController');

router.post('/customers/:customerId/insurance-purchases', insurancePurchaseController.createInsurancePurchase);
router.get('/customers/:customerId/insurance-purchases', insurancePurchaseController.getInsurancePurchasesForCustomer);
router.put('/insurance-purchases/:id', insurancePurchaseController.updateInsurancePurchase);
router.delete('/insurance-purchases/:id', insurancePurchaseController.deleteInsurancePurchase);

module.exports = router;