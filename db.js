import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mysql from 'mysql2';
const app = express();

const db = mysql.createConnection({
   host: process.env.MYSQL_HOST,
   user: process.env.MYSQL_USER,
   password: process.env.MYSQL_PASSWORD,
   database: process.env.MYSQL_DATABASE
});

db.connect((err) => {
   if (err) {
       console.error('Error connecting to database: ' + err.stack);
       return;
   }
   console.log('Connected to database as id ' + db.threadId);
})

export default db;