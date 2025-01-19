const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Admin = sequelize.define('Admin', {
  adminID: { type: DataTypes.INTEGER, primaryKey: true }
  // Add additional fields as necessary
}, {
  tableName: 'Admin',
  timestamps: false
});

module.exports = Admin;
