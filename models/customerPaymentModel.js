const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const Customer = require('./customerModel.js');

const CustomerPayment = sequelize.define('CustomerPayment', {
  payment_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  payment_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  payment_confirmation_code: {
    type: DataTypes.STRING,
  },
  receipt_url: {
    type: DataTypes.STRING,
  },
});

CustomerPayment.belongsTo(Customer);

module.exports = CustomerPayment;
