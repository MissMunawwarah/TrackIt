const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const User = require('../models/userModel.js');

const Customer = sequelize.define('Customer', {
    user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    preferred_delivery_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_gateway_id: {
      type: DataTypes.INTEGER,
    },
    preferred_language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
  Customer.belongsTo(User);
  
  module.exports = Customer;