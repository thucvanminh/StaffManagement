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
        model: Roles,
        as: 'roleIDQuerry',
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
    const employeeID = req.params.id;

    const employeeByID = await Employee.findOne({
      where: { employeeID },
      include: [{
        model: Department,
        as: 'departmentIDQuerry',
        attributes: ['departmentName'],
      },
      {
        model: Roles,
        as: 'roleIDQuerry',
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
    const employeeID = req.params.id;
    const updatedEmployee = await Employee.update(req.body, {
      where: { employeeID }
    });
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa nhân viên
exports.deleteEmployee = async (req, res) => {
  try {
    const employeeID = req.params.id;
    await Employee.destroy({ where: { employeeID } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




exports.queryEmployee = async (req, res) => {
  try {
    const inputDepartmentID = req.query.departmentID ? Number(req.query.departmentID) : null;
    const inputRoleID = req.query.roleID ? Number(req.query.roleID) : null;
    const inputCity = req.query.city ? req.query.city : null;
    const intputBirthday = req.body.birthday ? req.query.birthday : null;


    const queryCondition = {};
    if (inputDepartmentID) {
      queryCondition.departmentID = inputDepartmentID;
    }
    if (inputRoleID) {
      queryCondition.roleID = inputRoleID;
    }
    if (inputCity) {
      queryCondition.city = inputCity;
    }
    if (intputBirthday) {
      queryCondition.birthday = intputBirthday;
    }
    if (Object.keys(queryCondition).length == 0) {
      return res.status(404).json({ message: 'No employees found for the provided parameters' });
    }


    const employees = await Employee.findAll({ where: queryCondition });


    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
