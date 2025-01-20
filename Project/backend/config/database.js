// backend/config/database.js

const { Sequelize } = require('sequelize');

// Khởi tạo sequelize với thông tin kết nối database của bạn
const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
