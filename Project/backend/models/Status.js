const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Status extends Model {
    getDisplayName() {
        return this.statusName; // Sửa để dùng statusName thay vì fullName
    }
}

Status.init({
    statusID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true // Thêm để ID tự tăng
    },
    statusName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Status',
    tableName: 'statuses',
    timestamps: false
});

module.exports = Status;