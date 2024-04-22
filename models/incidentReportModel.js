
const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const Rider = require('../models/riderModel.js');

const IncidentReport = sequelize.define('IncidentReport', {
  incident_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  description: {
    type: DataTypes.TEXT,
  },
  photos: {
    type: DataTypes.BLOB,
  },
});

IncidentReport.belongsTo(Rider);

module.exports = IncidentReport;
