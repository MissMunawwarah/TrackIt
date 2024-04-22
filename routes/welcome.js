require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');

const app = express();
const router = express.Router();

app.get("/welcome", (req, res) => {
    res.status(200).send("Welcome to my API");
});

module.exports = app;