const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const padApplicationRoutes = require('./routes/padApplicationRoutes');
const sponsorRoutes = require('./routes/sponsorRoutes');
const adminRoutes = require('./routes/adminRoutes');


dotenv.config();

const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/applications', padApplicationRoutes);
app.use('/api/sponsors', sponsorRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

module.exports = app;
