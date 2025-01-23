// backend/app.js
const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes'); // Import routes
const departmentRoutes = require('./routes/departmentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/employees', employeeRoutes);
app.use('/department', departmentRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Staff Management!');
});



module.exports = app; // Xuất đối tượng app để server.js sử dụng