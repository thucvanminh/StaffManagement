// backend/config/database.js
// Load biến môi trường từ file .env
require('dotenv').config();

const { Sequelize } = require('sequelize');

// Khởi tạo Sequelize
const sequelize = new Sequelize('staffmanagement', 'root', process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize; // Sử dụng module.exports
