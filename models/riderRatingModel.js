// riderRatingModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const Rider = require('../riderModel.js');
const Customer = require('./customerModel.js');

const RiderRating = sequelize.define('RiderRating', {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
  },
  rating_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

RiderRating.belongsTo(Rider);
RiderRating.belongsTo(Customer);

module.exports = RiderRating;
