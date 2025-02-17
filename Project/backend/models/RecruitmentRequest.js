// src/models/RecruitmentRequest.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class RecruitmentRequest extends Model {}

RecruitmentRequest.init({
    recruitmentRequestID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    applicantName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position: {
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
    modelName: 'RecruitmentRequest',
    tableName: 'recruitment_requests',
    timestamps: true
});

module.exports = RecruitmentRequest;
