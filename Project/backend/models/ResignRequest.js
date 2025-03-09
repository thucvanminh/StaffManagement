// backend/models/ResignRequest.js

const TABLE_NAME = 'resign_requests';

const COLUMNS = {
    resignRequestID: 'resignRequestID',
    employeeID: 'employeeID',
    resignDate: 'resignDate',
    reason: 'reason',
    statusID: 'statusID',
    approvedByDept: 'approvedByDept',
    approvedBy: 'approvedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};

const DEFAULT_SELECT = `
    SELECT 
        rr.*,
        e.fullName as employeeName,
        e.email as employeeEmail,
        s.statusName,
        dh.fullName as departmentHeadName,
        a.fullName as approverName
    FROM ${TABLE_NAME} rr
    LEFT JOIN employees e ON rr.employeeID = e.employeeID
    LEFT JOIN status s ON rr.statusID = s.statusID
    LEFT JOIN employees dh ON rr.approvedByDept = dh.employeeID
    LEFT JOIN employees a ON rr.approvedBy = a.employeeID
`;

const INSERT_COLUMNS = [
    COLUMNS.employeeID,
    COLUMNS.resignDate,
    COLUMNS.reason,
    COLUMNS.statusID,
    COLUMNS.approvedByDept,
    COLUMNS.approvedBy,
    COLUMNS.createdAt,
    COLUMNS.updatedAt
].join(', ');

const UPDATE_SET = [
    `${COLUMNS.resignDate} = ?`,
    `${COLUMNS.reason} = ?`,
    `${COLUMNS.statusID} = ?`,
    `${COLUMNS.approvedByDept} = ?`,
    `${COLUMNS.approvedBy} = ?`,
    `${COLUMNS.updatedAt} = ?`
].join(', ');

const SPECIAL_QUERIES = {
    GET_BY_EMPLOYEE: `${DEFAULT_SELECT} WHERE rr.employeeID = ?`,
    GET_BY_DEPARTMENT_HEAD: `${DEFAULT_SELECT} WHERE rr.approvedByDept = ?`,
    GET_BY_STATUS: `${DEFAULT_SELECT} WHERE rr.statusID = ?`,
    GET_PENDING: `${DEFAULT_SELECT} WHERE rr.statusID = 1`,
    GET_BY_DATE_RANGE: `${DEFAULT_SELECT} WHERE rr.resignDate BETWEEN ? AND ?`
};

module.exports = {
    TABLE_NAME,
    COLUMNS,
    DEFAULT_SELECT,
    INSERT_COLUMNS,
    UPDATE_SET,
    SPECIAL_QUERIES
};