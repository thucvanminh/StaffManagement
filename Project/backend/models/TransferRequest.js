// src/models/TransferRequest.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class TransferRequest extends Model {}

TransferRequest.init({
    transferRequestID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    departmentHeadID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    employeeID: { // Thêm trường mới cho nhân viên được chuyển
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'employees',
            key: 'employeeID'
        }
    },
    targetDepartmentHeadID: { // Thêm trường mới cho trưởng phòng đích
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'employees',
            key: 'employeeID'
        }
    },
    requestType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
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
    modelName: 'TransferRequest',
    tableName: 'transfer_requests',
    timestamps: true
});

module.exports = TransferRequest;