// backend/app.js
const express = require('express');
const cors = require('cors');


const employeeRoutes = require('./routes/employeeRoutes'); // Import routes
const departmentRoutes = require('./routes/departmentRoutes');
const authRoutes = require('./routes/authRoutes');
const testFunction = require('./routes/testFunction');
const accountRoutes = require('./routes/accountRoutes'); // Import route account


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Staff Management!');
});
app.use('/accounts', accountRoutes);
app.use('/auth', authRoutes);
app.use('/employees', employeeRoutes);
app.use('/departments', departmentRoutes);
app.use('/test', testFunction);



module.exports = app; // Xuất đối tượng app để server.js sử dụng