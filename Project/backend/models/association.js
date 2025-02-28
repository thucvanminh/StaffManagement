// // backend/models/association.js
const Employee = require('./Employee');
const Department = require('./Department');
const Roles = require('./Roles');
const Account = require('./Account');
Employee.belongsTo(Department, {
  foreignKey: "departmentID",
  targetKey: "departmentID",
  as: 'department'
});
Employee.belongsTo(Roles, {
  foreignKey: 'roleID',
  targetKey: 'roleID',
  as: 'role'
});
// Trưởng phòng (headOfDepartmentID) cũng là một nhân viên
Employee.belongsTo(Employee, {
  foreignKey: 'headOfDepartmentID',
  targetKey: 'employeeID',
  as: 'headOfDepartment'
});

Department.belongsTo(Employee, {
  foreignKey: 'HeadOfDepartmentID',
  targetKey: 'employeeID',
  as: 'DepartmentHead',
onDelete: 'SET NULL'
});
Account.belongsTo(Employee, {
  foreignKey: 'employeeID',
  targetKey: 'employeeID',
  as: 'employee'
});

Employee.hasOne(Account, {
  foreignKey: 'employeeID',
  as: 'account'
});
