const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const User = require('./userModel.js');

const Rider = sequelize.define('Rider', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},
    vehicle_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    license_details: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    background_check_results: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicle_registration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    average_rating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0.00,
    },
    total_ratings: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    friendly_rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    communication_rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    punctuality_rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    timestamps: false
  });
  
  Rider.belongsTo(User);
  
  module.exports = Rider;
