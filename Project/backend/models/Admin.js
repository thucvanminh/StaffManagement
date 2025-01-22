const { DataTypes } = require('sequelize');

const Admin = sequelize.define('Admin', {
  adminID: { type: DataTypes.INTEGER, primaryKey: true }
  // Add additional fields as necessary
}, {
  tableName: 'Admin',
  timestamps: false
});


