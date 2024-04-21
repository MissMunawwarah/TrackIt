// riderPaymentModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const Rider = require('../riderModel.js');

const RiderPayment = sequelize.define('RiderPayment', {
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
});

RiderPayment.belongsTo(Rider);

module.exports = RiderPayment;
