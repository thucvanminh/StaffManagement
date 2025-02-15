const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');



const Roles = sequelize.define('Roles', {
  roleID: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  roleName: DataTypes.STRING
}, {
  tableName: 'roles',
  timestamps: false
});

module.exports = Roles;
