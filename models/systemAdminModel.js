const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const User = require('./userModel.js');


const SystemAdmin = sequelize.define('SystemAdmin', {
    // Defining attributes for the SystemAdmin model
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contactDetails: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    accessLevel: {
        type: DataTypes.ENUM('admin', 'superadmin'),
        allowNull: false,
    },
});

module.exports = SystemAdmin;
