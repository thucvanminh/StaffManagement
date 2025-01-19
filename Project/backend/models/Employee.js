const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('Employee', {
  employeeID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fullName: DataTypes.STRING,
  dateOfBirth: DataTypes.DATE,
  hireDay: DataTypes.DATE,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  address: DataTypes.STRING,
  city: DataTypes.STRING,
  gender: DataTypes.STRING,
  departmentID: DataTypes.INTEGER,
  headOfDepartmentID: DataTypes.INTEGER,
  roleID: DataTypes.INTEGER
}, {
  tableName: 'employee',
  timestamps: false
});

module.exports = Employee;
