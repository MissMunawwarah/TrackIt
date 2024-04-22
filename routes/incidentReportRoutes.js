const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const app = express();
const router = express.Router();

const incidentReportController = require('../controllers/incidentReportController');

router.post('/riders/:riderId/incident-reports', incidentReportController.createIncidentReport);
router.get('/riders/:riderId/incident-reports', incidentReportController.getIncidentReportsForRider);
router.put('/incident-reports/:id', incidentReportController.updateIncidentReport);
router.delete('/incident-reports/:id', incidentReportController.deleteIncidentReport);

module.exports = router;