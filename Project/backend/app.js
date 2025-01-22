const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database'); // Kết nối database
const Employee = require('./models/Employee'); // Model Employee

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Staff Management API!');
});

app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees); // Trả về danh sách nhân viên ở dạng JSON
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
