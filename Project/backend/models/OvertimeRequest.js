// src/models/OvertimeRequest.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class OvertimeRequest extends Model {}

OvertimeRequest.init({
    overtimeRequestID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    employeeID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'employees',
            key: 'employeeID',
        }
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    hours: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    statusID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'statuses',
            key: 'statusID'
        }
    },
    approvedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'employees',
            key: 'employeeID',
        }
    }
}, {
    sequelize,
    modelName: 'OvertimeRequest',
    tableName: 'overtime_requests',
    timestamps: true,
});

module.exports = OvertimeRequest;
