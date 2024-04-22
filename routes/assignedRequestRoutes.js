const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const app = express();
const router = express.Router();

const assignedRequestController = require('../controllers/assignedRequestController');

router.post('/', assignedRequestController.createAssignedRequest);
router.get('/', assignedRequestController.getAllAssignedRequests);
router.put('/:id', assignedRequestController.updateAssignedRequest);
router.delete('/:id', assignedRequestController.deleteAssignedRequest);

module.exports = router;
