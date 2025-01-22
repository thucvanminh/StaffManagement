const { Sequelize, DataTypes } = require('sequelize');

const Status = sequelize.define('Status', {
  statusID: { type: DataTypes.INTEGER, primaryKey: true },
  statusName: DataTypes.STRING
}, {
  tableName: 'Status',
  timestamps: false
});

