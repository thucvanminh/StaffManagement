// backend/config/database.js

const { Sequelize } = require('sequelize');

// Khởi tạo Sequelize
const sequelize = new Sequelize('staffmanagement', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize; // Sử dụng module.exports
