// backend/models/TransferRequest.js

const TABLE_NAME = 'transfer_requests';

const COLUMNS = {
    transferRequestID: 'transferRequestID',
    departmentHeadID: 'departmentHeadID',
    employeeID: 'employeeID',
    targetDepartmentHeadID: 'targetDepartmentHeadID',
    requestType: 'requestType',
    description: 'description',
    statusID: 'statusID',
    approvedBy: 'approvedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};

const DEFAULT_SELECT = `
    SELECT 
        tr.*,
        e.fullName as employeeName,
        dh.fullName as departmentHeadName,
        tdh.fullName as targetDepartmentHeadName,
        s.statusName,
        a.fullName as approverName
    FROM ${TABLE_NAME} tr
    LEFT JOIN employees e ON tr.employeeID = e.employeeID
    LEFT JOIN employees dh ON tr.departmentHeadID = dh.employeeID
    LEFT JOIN employees tdh ON tr.targetDepartmentHeadID = tdh.employeeID
    LEFT JOIN status s ON tr.statusID = s.statusID
    LEFT JOIN employees a ON tr.approvedBy = a.employeeID
`;

const INSERT_COLUMNS = [
    COLUMNS.departmentHeadID,
    COLUMNS.employeeID,
    COLUMNS.targetDepartmentHeadID,
    COLUMNS.requestType,
    COLUMNS.description,
    COLUMNS.statusID,
    COLUMNS.approvedBy,
    COLUMNS.createdAt,
    COLUMNS.updatedAt
].join(', ');

const UPDATE_SET = [
    `${COLUMNS.requestType} = ?`,
    `${COLUMNS.description} = ?`,
    `${COLUMNS.statusID} = ?`,
    `${COLUMNS.approvedBy} = ?`,
    `${COLUMNS.updatedAt} = ?`
].join(', ');

const SPECIAL_QUERIES = {
    GET_BY_EMPLOYEE: `${DEFAULT_SELECT} WHERE tr.employeeID = ?`,
    GET_BY_DEPARTMENT_HEAD: `${DEFAULT_SELECT} WHERE tr.departmentHeadID = ?`,
    GET_BY_TARGET_DEPARTMENT: `${DEFAULT_SELECT} WHERE tr.targetDepartmentHeadID = ?`,
    GET_BY_STATUS: `${DEFAULT_SELECT} WHERE tr.statusID = ?`,
    GET_PENDING: `${DEFAULT_SELECT} WHERE tr.statusID = 1`
};

module.exports = {
    TABLE_NAME,
    COLUMNS,
    DEFAULT_SELECT,
    INSERT_COLUMNS,
    UPDATE_SET,
    SPECIAL_QUERIES
};