const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const User = require('./userModel.js');


const SystemAdmin = sequelize.define('SystemAdmin', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
