const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
require('dotenv').config();

// const cors = require("cors");
const router = express.Router();

const userRoutes = require('./routes/userRoutes.js');
const customerPaymentRoutes = require('./routes/customerPaymentRoutes.js');
const assignedRequestRoutes = require('./routes/assignedRequestRoutes.js');
const welcomeRoutes = require('./routes/welcome.js');
const incidentReportRoutes = require('./routes/incidentReportRoutes.js');
const insurancePurchaseRoutes = require('./routes/insurancePurchaseRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const riderPaymentRoutes = require('./routes/riderPaymentRoutes.js');
const riderRatingRoutes = require('./routes/riderRatingRoutes.js');


// Define routes
const PORT = process.env.PORT || 5000;

// app.use(cors({
//   origin: ""
// }));

app.use(express.json())

app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json())

// Use user routes
app.use('/api/users', userRoutes);
app.use('/api/customerPayments', customerPaymentRoutes);
app.use('/api/assignedRequests', assignedRequestRoutes);
app.use('/api/welcome', welcomeRoutes);
app.use('/api/incidentReports', incidentReportRoutes);
app.use('/api/insurancePurchases', insurancePurchaseRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/riderPayments', riderPaymentRoutes);
app.use('/api/riderRatings', riderRatingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});