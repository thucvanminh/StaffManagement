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
    requestType: {
        type: DataTypes.STRING,
        allowNull: false  // Ví dụ: 'transfer-out' hoặc 'recruitment'
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
