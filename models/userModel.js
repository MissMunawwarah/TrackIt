const { DataTypes } = require('sequelize');
const dotenv = require('dotenv');  
dotenv.config({ path: 'env.default' });

const sequelize = require('../db.js');


const User = sequelize.define('user', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('business_owner', 'rider', 'customer'),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_details: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: { // Change from created_at to createdAt
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

    createdAt: 'created_at', // Customize createdAt field name
    updatedAt: false // Disable updatedAt field
});

module.exports = User;
