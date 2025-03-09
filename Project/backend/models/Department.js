// backend/models/Department.js

const TABLE_NAME = 'departments';

const COLUMNS = {
    departmentID: 'departmentID',
    departmentName: 'departmentName',
    HeadOfDepartmentID: 'HeadOfDepartmentID'
};

const DEFAULT_SELECT = `
    SELECT 
        d.*,
        e.employeeID as headID,
        e.fullName as headName
    FROM ${TABLE_NAME} d
    LEFT JOIN employees e ON d.HeadOfDepartmentID = e.employeeID
`;

const INSERT_COLUMNS = [
    COLUMNS.departmentName,
    COLUMNS.HeadOfDepartmentID
].join(', ');

const UPDATE_SET = [
    `${COLUMNS.departmentName} = ?`,
    `${COLUMNS.HeadOfDepartmentID} = ?`
].join(', ');

module.exports = {
    TABLE_NAME,
    COLUMNS,
    DEFAULT_SELECT,
    INSERT_COLUMNS,
    UPDATE_SET
};