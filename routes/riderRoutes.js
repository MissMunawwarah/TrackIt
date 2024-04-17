import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mysql from 'mysql2';
const app = express();

const router = express.Router();
import riderController from '../controllers/riderController.js';

// router.post('/riders', (req, res) => {
//     // to create a new rider
// });

// router.get('/riders/:userId', (req, res) => {
//     // to get rider details
// });

// export default router;

router.post('/riders', riderController.createRider);
router.get('/riders/:id', riderController.getRiderById);
router.put('/riders/:id', riderController.updateRider);
router.delete('/riders/:id', riderController.deleteRider);

export default router;