const express = require('express');
const app = express();
const employeeRoutes = require('./routes/employee');

app.use(express.json());

app.use('/api/employees', employeeRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
