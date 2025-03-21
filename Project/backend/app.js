// backend/app.js
const express = require('express');
const cors = require('cors');

const employeeRoutes = require('./routes/employeeRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const authRoutes = require('./routes/authRoutes');
const testFunction = require('./routes/testFunction');
const accountRoutes = require('./routes/accountRoutes');
const businessTripRoutes = require('./routes/businessTripRoutes');
const statusRoutes = require('./routes/statusRoutes');
const overtimeRoutes = require('./routes/overtimeRoute');
const leaveRoutes = require('./routes/leaveRoute');
const resignRoutes = require('./routes/resignRoutes');
const transferRoutes = require('./routes/transferRoutes');
const recruitmentRoutes = require('./routes/recruitmentRoutes');
const app = express();

// Middleware
// app.use(cors());

app.use(cors({
  origin: 'http://localhost:3000', // URL của frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Staff Management!');
});

app.use('/accounts', accountRoutes);
app.use('/auth', authRoutes);
app.use('/employees', employeeRoutes);
app.use('/departments', departmentRoutes);
app.use('/status', statusRoutes);
app.use('/business-trips', businessTripRoutes);
app.use('/test', testFunction);
app.use('/overtime-requests', overtimeRoutes);
app.use('/leave-requests', leaveRoutes);
app.use('/resign-requests', resignRoutes);
app.use('/transfer-requests', transferRoutes);
app.use('/recruitment-requests', recruitmentRoutes);
module.exports = app;