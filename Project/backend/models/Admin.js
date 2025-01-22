// backend/models/Admin.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Admin = sequelize.define('Admin', {
  adminID: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
}, {
  tableName: 'admin',
  timestamps: false
});


