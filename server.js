import express from 'express';
import dotenv from 'dotenv';
import db from './db.js';

dotenv.config();

import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import riderRoutes from './routes/riderRoutes.js';
import welcomeRoutes from './routes/welcome.js';

const app = express();

// Use user routes
app.use('/api', userRoutes);
app.use('/api', orderRoutes);
app.use('/api', welcomeRoutes);
app.use('/api', riderRoutes);


//define routes
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});