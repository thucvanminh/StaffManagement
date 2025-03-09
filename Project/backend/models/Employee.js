// backend/models/Employee.js

const TABLE_NAME = 'employees';

const COLUMNS = {
    employeeID: 'employeeID',
    fullName: 'fullName',
    dateOfBirth: 'dateOfBirth',
    hireDay: 'hireDay',
    email: 'email',
    phone: 'phone',
    address: 'address',
    city: 'city',
    gender: 'gender',
    departmentID: 'departmentID',
    roleID: 'roleID',
    headOfDepartmentID: 'headOfDepartmentID'
};

const DEFAULT_SELECT = `
    SELECT 
        e.*,
        d.departmentID, d.departmentName,
        r.roleID, r.roleName,
        hod.employeeID as hodID, hod.fullName as hodName
    FROM ${TABLE_NAME} e
    LEFT JOIN departments d ON e.departmentID = d.departmentID
    LEFT JOIN roles r ON e.roleID = r.roleID
    LEFT JOIN employees hod ON e.headOfDepartmentID = hod.employeeID
`;

const INSERT_COLUMNS = [
    COLUMNS.fullName,
    COLUMNS.dateOfBirth,
    COLUMNS.hireDay,
    COLUMNS.email,
    COLUMNS.phone,
    COLUMNS.address,
    COLUMNS.city,
    COLUMNS.gender,
    COLUMNS.departmentID,
    COLUMNS.roleID,
    COLUMNS.headOfDepartmentID
].join(', ');

const UPDATE_SET = [
    `${COLUMNS.fullName} = ?`,
    `${COLUMNS.dateOfBirth} = ?`,
    `${COLUMNS.hireDay} = ?`,
    `${COLUMNS.email} = ?`,
    `${COLUMNS.phone} = ?`,
    `${COLUMNS.address} = ?`,
    `${COLUMNS.city} = ?`,
    `${COLUMNS.gender} = ?`,
    `${COLUMNS.departmentID} = ?`,
    `${COLUMNS.roleID} = ?`,
    `${COLUMNS.headOfDepartmentID} = ?`
].join(', ');

module.exports = {
    TABLE_NAME,
    COLUMNS,
    DEFAULT_SELECT,
    INSERT_COLUMNS,
    UPDATE_SET
};
