const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Roles = sequelize.define('Roles', {
  roleID: { type: DataTypes.INTEGER, primaryKey: true },
  roleName: DataTypes.STRING,
  permissions: DataTypes.STRING
}, {
  tableName: 'Roles',
  timestamps: false
});

module.exports = Roles;
