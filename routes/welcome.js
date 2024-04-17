import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mysql from 'mysql2';
const app = express();

const router = express.Router();

router.get("/",(req, res)=>{res.status(200).send("welcome to my API")});

export default router;