// backend/models/association.js

const Employee = require('./Employee');
const Department = require('./Department');
const Role = require('./Role');

Employee.belongsTo(Department, { foreignKey: 'departmentID', as: 'department' });
Employee.belongsTo(Role, { foreignKey: 'roleID', as: 'role' });
Employee.hasOne(Department, { foreignKey: 'headOfDepartmentID', as: 'department' });


Department.hasMany(Employee, { foreignKey: 'departmentID' });
Department.belongsTo(Employee, { foreignKey: 'headOfDepartmentID', as: 'headOfDepartment' });
Role.hasMany(Employee, { foreignKey: 'roleID' });

module.exports = { Employee, Department, Role };
