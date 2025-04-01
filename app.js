const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const crimeRoutes = require('./routes/crimeRoutes');
app.use('/api/crime', crimeRoutes);

const missingPersonRoutes = require('./routes/missingPersonRoutes');
app.use('/api/missing', missingPersonRoutes);

module.exports = app;
