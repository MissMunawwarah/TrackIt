const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const User = require('./userModel.js');

const BusinessOwner = sequelize.define('BusinessOwner', {
    business_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    business_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    business_license: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tax_identification_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  
  BusinessOwner.belongsTo(User);
  
  module.exports = BusinessOwner;
