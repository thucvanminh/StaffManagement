// src/models/LeaveRequest.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class LeaveRequest extends Model {}

LeaveRequest.init({
    leaveRequestID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    employeeID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false
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
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'LeaveRequest',
    tableName: 'leave_requests',
    timestamps: true
});

module.exports = LeaveRequest;
