const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Department = sequelize.define('Department', {
  departmentID: { type: DataTypes.INTEGER, primaryKey: true },
  departmentName: DataTypes.STRING,
  HeadOfDepartmentID: DataTypes.INTEGER
}, {
  tableName: 'Department',
  timestamps: false
});

module.exports = Department;
