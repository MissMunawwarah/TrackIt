const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const app = express();
const router = express.Router();

const riderRatingController = require('../controllers/riderRatingController');

router.post('/ratings', riderRatingController.createRiderRating);
router.get('/ratings/:id', riderRatingController.getRiderRatingById);
router.put('/ratings/:id', riderRatingController.updateRiderRating);
router.delete('/ratings/:id', riderRatingController.deleteRiderRating);

module.exports = router;