const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Status = sequelize.define('Status', {
  statusID: { type: DataTypes.INTEGER, primaryKey: true },
  statusName: DataTypes.STRING
}, {
  tableName: 'Status',
  timestamps: false
});

module.exports = Status;
