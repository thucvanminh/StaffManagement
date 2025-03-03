// src/models/ResignRequest.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ResignRequest extends Model {}

ResignRequest.init({
    resignRequestID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    employeeID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'employees',
            key: 'employeeID'
        }
    },
    resignDate: {
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
    approvedByDept: { // Thêm trường mới cho trưởng phòng
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'employees',
            key: 'employeeID'
        }
    },
    approvedBy: { // Dành cho HR
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'employees',
            key: 'employeeID'
        }
    }
}, {
    sequelize,
    modelName: 'ResignRequest',
    tableName: 'resign_requests',
    timestamps: true
});

module.exports = ResignRequest;