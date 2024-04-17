import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mysql from 'mysql2';
const app = express();

class Rider {
    constructor(userId, name, vehicleType) {
        this.userId = userId;
        this.name = name;
        this.vehicleType = vehicleType;
        this.rating = 0; // Default rating
    }
}

export default Rider;