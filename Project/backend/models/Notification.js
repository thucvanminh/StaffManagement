// src/models/Notification.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Notification extends Model {}

Notification.init({
    notificationID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    requestID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    requestType: {
        type: DataTypes.STRING,
        allowNull: false // Ví dụ: 'Recruitment', 'BusinessTrip', 'Leave', v.v.
    },
    recipientID: {
        type: DataTypes.INTEGER,
        allowNull: false // Liên kết với 'employees' hoặc ID của guest nếu cần
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sentAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Notification',
    tableName: 'notifications',
    timestamps: false
});

module.exports = Notification;