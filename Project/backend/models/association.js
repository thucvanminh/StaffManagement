// // backend/models/association.js
const Employee = require('./Employee');
const Department = require('./Department');
const Roles = require('./Roles');
const Account = require('./Account');
const BusinessTripRequest = require('./BusinessTripRequest');
const OvertimeRequest = require('./OvertimeRequest');
const ResignRequest = require('./ResignRequest');
const LeaveRequest = require('./LeaveRequest');
const TransferRequest = require('./TransferRequest');
const RecruitmentRequest = require('./RecruitmentRequest');
const Notification = require('./Notification');
const Status = require('./Status');
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

BusinessTripRequest.belongsTo(Employee, {foreignKey: 'employeeID', as: 'employee'});
BusinessTripRequest.belongsTo(Employee, {foreignKey: 'approvedByDept', as: 'deptApproval'});
BusinessTripRequest.belongsTo(Employee, {foreignKey: 'approvedBy', as: 'hrApproval'});
BusinessTripRequest.belongsTo(Status, {foreignKey: 'statusID', as: 'status'});

// OvertimeRequest
OvertimeRequest.belongsTo(Employee, {foreignKey: 'employeeID', as: 'employee'});
OvertimeRequest.belongsTo(Employee, {foreignKey: 'approvedByDept', as: 'deptApproval'});
OvertimeRequest.belongsTo(Employee, {foreignKey: 'approvedBy', as: 'hrApproval'});
OvertimeRequest.belongsTo(Status, {foreignKey: 'statusID', as: 'status'});

// ResignRequest
ResignRequest.belongsTo(Employee, {foreignKey: 'employeeID', as: 'employee'});
ResignRequest.belongsTo(Employee, {foreignKey: 'approvedByDept', as: 'deptApproval'});
ResignRequest.belongsTo(Employee, {foreignKey: 'approvedBy', as: 'hrApproval'});
ResignRequest.belongsTo(Status, {foreignKey: 'statusID', as: 'status'});

// LeaveRequest
LeaveRequest.belongsTo(Employee, {foreignKey: 'employeeID', as: 'employee'});
LeaveRequest.belongsTo(Employee, {foreignKey: 'approvedByDept', as: 'deptApproval'});
LeaveRequest.belongsTo(Employee, {foreignKey: 'approvedBy', as: 'hrApproval'});
LeaveRequest.belongsTo(Status, {foreignKey: 'statusID', as: 'status'});

// TransferRequest
TransferRequest.belongsTo(Employee, {foreignKey: 'departmentHeadID', as: 'deptHead'});
TransferRequest.belongsTo(Employee, {foreignKey: 'employeeID', as: 'employee'});
TransferRequest.belongsTo(Employee, {foreignKey: 'targetDepartmentHeadID', as: 'targetDeptHead'});
TransferRequest.belongsTo(Status, {foreignKey: 'statusID', as: 'status'});

// RecruitmentRequest (không liên kết Employee, chỉ Status)
RecruitmentRequest.belongsTo(Status, {foreignKey: 'statusID', as: 'status'});

// Notification (liên kết với Employee nếu recipientID là employee)
Notification.belongsTo(Employee, {foreignKey: 'recipientID', as: 'recipient', constraints: false}); // constraints: false vì có thể là guest
