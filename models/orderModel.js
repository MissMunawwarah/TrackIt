const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const Customer = require('../models/customerModel.js');


const Order = sequelize.define('Order', {
    order_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    delivery_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pickup_address: {
      type: DataTypes.STRING,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.ENUM('paid', 'pending'),
      allowNull: false,
    },
    order_status: {
      type: DataTypes.ENUM('pending', 'processing', 'delivered', 'cancelled'),
      allowNull: false,
    },
    tracking_number: {
      type: DataTypes.STRING,
    },
    estimated_delivery_date: {
      type: DataTypes.DATEONLY,
    },
    notes: {
      type: DataTypes.TEXT,
    },
  });
  
  Order.belongsTo(Customer);
  
  module.exports = Order;