const { Sequelize, DataTypes } = require('sequelize');

const Roles = sequelize.define('Role', {
  roleID: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  roleName: DataTypes.STRING
}, {
  tableName: 'role',
  timestamps: false
});
