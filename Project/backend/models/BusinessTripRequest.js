// src/models/BusinessTripRequest.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class BusinessTripRequest extends Model {}

BusinessTripRequest.init({
    businessTripID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    employeeID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : {
            model: 'employees',
            key: 'employeeID'
        }
    },
    destination: {
        type: DataTypes.STRING,
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
        allowNull: true,
        references : {
            model: 'employees',
            key: 'employeeID'
        }
    }
}, {
    sequelize,
    modelName: 'BusinessTripRequest',
    tableName: 'business_trip_requests',
    timestamps: true
});

module.exports = BusinessTripRequest;
