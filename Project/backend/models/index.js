const Employee = require('./Employee');
const Roles = require('./Roles');
const Department = require('./Department');
const Admin = require('./Admin');
const Status = require('./Status');

// Define relationships
Employee.belongsTo(Department, { foreignKey: 'departmentID' });
Employee.belongsTo(Employee, { as: 'HeadOfDepartment', foreignKey: 'headOfDepartmentID' });
Employee.belongsTo(Roles, { foreignKey: 'roleID' });
Department.belongsTo(Employee, { as: 'HeadOfDepartment', foreignKey: 'HeadOfDepartmentID' });

module.exports = {
  Employee,
  Roles,
  Department,
  Admin,
  Status
};
