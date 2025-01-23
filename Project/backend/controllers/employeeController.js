// backend/controllers/employeeController.js

const Employee = require('../models/Employee');
const Department = require('../models/Department');
const Roles = require('../models/Roles');

// Lấy danh sách tất cả nhân viên
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      include: [{
        model: Department,
        as: 'departmentIDQuerry',
        attributes: ['departmentName'], // Dùng mảng
      },
      {
        model : Roles,
        as : 'roleIDQuerry',
        attributes: ['roleName']
      }]
    });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy nhân viên theo ID
exports.getEmployeeByID = async (req, res) => {
  try {
    const { id } = req.params;
    const employeeByID = await Employee.findOne({
      where: { employeeID: id },
      include: [{
        model: Department,
        as: 'departmentIDQuerry',
        attributes: ['departmentName'], // Dùng mảng
      },
      {
        model : Roles,
        as : 'roleIDQuerry',
        attributes: ['roleName']
      }]
    });
    if (!employeeByID) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employeeByID);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm nhân viên mới
exports.addEmployee = async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Sửa thông tin nhân viên
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = await Employee.update(req.body, {
      where: { employeeID: id }
    });
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa nhân viên
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.destroy({ where: { employeeID: id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
