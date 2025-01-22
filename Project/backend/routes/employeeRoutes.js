// backend/routes/employeeRoutes.js
const express = require('express');
const { Employee } = require('../models/Employee');

const router = express.Router();

// Lấy tất cả nhân viên
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Thêm nhân viên mới
router.post('/employees', async (req, res) => {
  try {
    const { fullName, dateOfBirth, hireDay, email, phone, address, city, gender, departmentID, headOfDepartmentID, roleID } = req.body;
    const employee = await Employee.create({
      fullName,
      dateOfBirth,
      hireDay,
      email,
      phone,
      address,
      city,
      gender,
      departmentID,
      headOfDepartmentID,
      roleID
    });
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
