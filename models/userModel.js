import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mysql from 'mysql2';
const app = express();

export default class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
};