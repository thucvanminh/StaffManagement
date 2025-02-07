// // backend/models/Employee.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import chính xác


const Employee = sequelize.define('Employee', {
  employeeID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fullName: DataTypes.STRING,
  dateOfBirth: DataTypes.DATEONLY,
  hireDay: DataTypes.DATEONLY,
  email: {
      type: DataTypes.STRING,
      allowNull : false,
      unique : true,
      validate : {
        isEmail: true,
      }
  },
  phone: DataTypes.STRING,
  address: DataTypes.STRING,
  city: DataTypes.STRING,
  gender: DataTypes.STRING,
  departmentID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Department',   //sequelize trỏ thẳng đến dữ liệu trong db
      key: 'departmentID'
    }
  },
  headOfDepartmentID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Department',   //sequelize trỏ thẳng đến dữ liệu trong db
      key: 'HeadOfDepartmentID'
    }
  },
  roleID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'roles',
      key: 'roleID'
    }
  }
}, {
  tableName: 'employee',
  timestamps: false
});



module.exports = Employee;
