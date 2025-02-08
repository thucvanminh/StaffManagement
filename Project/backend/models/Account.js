// backend/models/Account.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Employee = require('./Employee'); // Import model Employee để thiết lập quan hệ

const Account = sequelize.define('Account', {
  accountID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true  // Đảm bảo username không trùng lặp
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false  // Lưu ý: bạn nên hash password trước khi lưu
  },
  employeeID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Employees',
      key: 'employeeID'
    }
  }
}, {
  tableName: 'accounts',
  timestamps: false  // Có thể bật timestamps nếu cần
});

module.exports = Account;
