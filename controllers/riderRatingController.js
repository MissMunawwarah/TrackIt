const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const app = express();


const RiderRating = require('../models/riderRatingModel');

const riderRatingController = {
 
  createRiderRating: async (req, res) => {
    try {
      const { rating, comment, riderId, customerId } = req.body;

      const newRiderRating = await RiderRating.create({
        rating,
        comment,
        rating_date: new Date(),
        RiderId: riderId,
        CustomerId: customerId
      });

      res.status(201).json({ message: 'Rating created successfully', riderRating: newRiderRating });
    } catch (error) {
      console.error('Error creating rating:', error);
      res.status(500).json({ message: 'Error creating rating' });
    }
  },

  getRiderRatingById: async (req, res) => {
    try {
      const riderRatingId = req.params.id;

      const riderRating = await RiderRating.findByPk(riderRatingId);
      if (!riderRating) {
        return res.status(404).json({ message: 'Rider rating not found' });
      }

      res.status(200).json({ riderRating });
    } catch (error) {
      console.error('Error getting rider rating by ID:', error);
      res.status(500).json({ message: 'Error getting rider rating' });
    }
  },

  updateRiderRating: async (req, res) => {
    try {
      const riderRatingId = req.params.id;
      const { rating, comment } = req.body;

      await RiderRating.update({ rating, comment }, {
        where: {
          id: riderRatingId
        }
      });

      res.status(200).json({ message: 'Rating updated successfully' });
    } catch (error) {
      console.error('Error updating rating:', error);
      res.status(500).json({ message: 'Error updating rider rating' });
    }
  },

  deleteRiderRating: async (req, res) => {
    try {
      const riderRatingId = req.params.id;

      await RiderRating.destroy({
        where: {
          id: riderRatingId
        }
      });

      res.status(200).json({ message: 'Rider rating deleted successfully' });
    } catch (error) {
      console.error('Error deleting rider rating:', error);
      res.status(500).json({ message: 'Error deleting rider rating' });
    }
  }
};

module.exports = riderRatingController;
