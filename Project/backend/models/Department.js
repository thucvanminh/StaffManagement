// backend/models/Department.js

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Employee = require('./Employee');

const Department = sequelize.define('Department', {
  departmentID: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  departmentName: DataTypes.STRING,
  HeadOfDepartmentID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Employee', //sequelize trỏ thẳng đến dữ liệu trong db
      key: 'employeeID',  // Khóa chính của Employee
    },
    allowNull: true
  }
}, {
  tableName: 'department',
  timestamps: false
});

module.exports = Department;