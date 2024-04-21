
const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const Rider = require('../riderModel.js');
const Order = require('./orderModel.js');
const AssignedRequest = sequelize.define('AssignedRequest', {
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'delivered'),
    defaultValue: 'pending',
  },
});

AssignedRequest.belongsTo(Rider);
AssignedRequest.belongsTo(Order);

module.exports = AssignedRequest;
