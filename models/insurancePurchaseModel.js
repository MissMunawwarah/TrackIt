

const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const Customer = require('./customerModel.js');

const InsurancePurchase = sequelize.define('InsurancePurchase', {
  purchase_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  coverage_level: {
    type: DataTypes.ENUM('basic', 'standard', 'premium'),
    allowNull: false,
  },
  payment_details: {
    type: DataTypes.TEXT,
  },
});

InsurancePurchase.belongsTo(Customer);

module.exports = InsurancePurchase;
