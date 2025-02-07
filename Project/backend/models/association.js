// // backend/models/association.js
const Employee = require('./Employee');
const Department = require('./Department');
const Roles = require('./Roles');
Employee.belongsTo(Department, {
  foreignKey: "departmentID",
  targetKey: "departmentID",
  as: 'departmentIDQuerry'
});
Employee.belongsTo(Roles, {
  foreignKey: 'roleID',
  targetKey: 'roleID',
  as: 'roleIDQuerry'
});
Employee.belongsTo(Department, {
  foreignKey: 'headOfDepartmentID',
  targetKey: 'HeadOfDepartmentID',
  as: 'headOfDepartmentIDQuerry'  
});

Department.belongsTo(Employee, {
  foreignKey: 'HeadOfDepartmentID',
  targetKey: 'employeeID',
  as: 'DepartmentHead',
  onDelete: 'SET NULL'
});
