// backend/models/OvertimeRequest.js

const TABLE_NAME = 'overtime_requests';

const COLUMNS = {
    overtimeRequestID: 'overtimeRequestID',
    employeeID: 'employeeID',
    date: 'date',
    hours: 'hours',
    reason: 'reason',
    statusID: 'statusID',
    approvedBy: 'approvedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};

const DEFAULT_SELECT = `
    SELECT 
        or.*,
        e.fullName as employeeName,
        e.email as employeeEmail,
        s.statusName,
        a.fullName as approverName
    FROM ${TABLE_NAME} or
    LEFT JOIN employees e ON or.employeeID = e.employeeID
    LEFT JOIN status s ON or.statusID = s.statusID
    LEFT JOIN employees a ON or.approvedBy = a.employeeID
`;

const INSERT_COLUMNS = [
    COLUMNS.employeeID,
    COLUMNS.date,
    COLUMNS.hours,
    COLUMNS.reason,
    COLUMNS.statusID,
    COLUMNS.approvedBy,
    COLUMNS.createdAt,
    COLUMNS.updatedAt
].join(', ');

const UPDATE_SET = [
    `${COLUMNS.date} = ?`,
    `${COLUMNS.hours} = ?`,
    `${COLUMNS.reason} = ?`,
    `${COLUMNS.statusID} = ?`,
    `${COLUMNS.approvedBy} = ?`,
    `${COLUMNS.updatedAt} = ?`
].join(', ');

const SPECIAL_QUERIES = {
    GET_BY_EMPLOYEE: `${DEFAULT_SELECT} WHERE or.employeeID = ?`,
    GET_BY_DATE_RANGE: `${DEFAULT_SELECT} WHERE or.date BETWEEN ? AND ?`,
    GET_BY_STATUS: `${DEFAULT_SELECT} WHERE or.statusID = ?`,
    GET_PENDING: `${DEFAULT_SELECT} WHERE or.statusID = 1`,
    GET_BY_APPROVER: `${DEFAULT_SELECT} WHERE or.approvedBy = ?`
};

module.exports = {
    TABLE_NAME,
    COLUMNS,
    DEFAULT_SELECT,
    INSERT_COLUMNS,
    UPDATE_SET,
    SPECIAL_QUERIES
};
