import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mysql from 'mysql2';
const app = express();

class Order {
    constructor(userId, deliveryAddress, totalAmount, paymentStatus, orderStatus, trackingNumber, estimatedDeliveryDate, notes) {
        this.userId = userId;
        this.deliveryAddress = deliveryAddress;
        this.totalAmount = totalAmount;
        this.paymentStatus = paymentStatus;
        this.orderStatus = orderStatus;
        this.trackingNumber = trackingNumber;
        this.estimatedDeliveryDate = estimatedDeliveryDate;
        this.notes = notes;
    }
}

export default Order;