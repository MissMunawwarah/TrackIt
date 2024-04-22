const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const app = express();

const { IncidentReport } = require('../models/incidentReportModel.js');

const incidentReportController = {
    // Create a new incident report
    createIncidentReport: async (req, res) => {
        try {
            const { incident_date, description, photos } = req.body;

         
            const newIncidentReport = await IncidentReport.create({
                incident_date,
                description,
                photos,
                RiderId: req.params.riderId
            });

            res.status(201).json({ message: 'Incident report created successfully', incidentReport: newIncidentReport });
        } catch (error) {
            console.error('Error creating incident report:', error);
            res.status(500).json({ message: 'Error creating incident report' });
        }
    },

    getIncidentReportsForRider: async (req, res) => {
        try {
            const riderId = req.params.riderId;

            const incidentReports = await IncidentReport.findAll({ where: { RiderId: riderId } });

            res.status(200).json({ incidentReports });
        } catch (error) {
            console.error('Error getting incident reports for rider:', error);
            res.status(500).json({ message: 'Error getting incident reports for rider' });
        }
    },

    updateIncidentReport: async (req, res) => {
        try {
            const incidentReportId = req.params.id;
            const { incident_date, description, photos } = req.body;

            await IncidentReport.update({
                incident_date,
                description,
                photos
            }, { where: { id: incidentReportId } });

            res.status(200).json({ message: 'Incident updated successfully' });
        } catch (error) {
            console.error('Error updating incident:', error);
            res.status(500).json({ message: 'Error updating incident' });
        }
    },

    deleteIncidentReport: async (req, res) => {
        try {
            const incidentReportId = req.params.id;

            await IncidentReport.destroy({ where: { id: incidentReportId } });

            res.status(200).json({ message: 'Incident deleted successfully' });
        } catch (error) {
            console.error('Error deleting incident:', error);
            res.status(500).json({ message: 'Error deleting incident' });
        }
    }
};

module.exports = incidentReportController;