// backend/models/Department.js

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

const Department = sequelize.define('Department', {
  departmentID: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  departmentName: DataTypes.STRING,
  HeadOfDepartmentID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Employee', // Tên bảng Employee
      key: 'employeeID'  // Khóa chính của Employee
    }
  }
}, {
  tableName: 'department',
  timestamps: false
});
