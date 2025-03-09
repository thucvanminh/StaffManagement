// backend/models/LeaveRequest.js

const TABLE_NAME = 'leave_requests';

const COLUMNS = {
    leaveRequestID: 'leaveRequestID',
    employeeID: 'employeeID',
    startDate: 'startDate',
    endDate: 'endDate',
    reason: 'reason',
    statusID: 'statusID',
    approvedByDept: 'approvedByDept',
    approvedBy: 'approvedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};

const DEFAULT_SELECT = `
    SELECT 
        lr.*,
        e.fullName as employeeName,
        e.email as employeeEmail,
        s.statusName,
        dh.fullName as departmentHeadName,
        a.fullName as approverName
    FROM ${TABLE_NAME} lr
    LEFT JOIN employees e ON lr.employeeID = e.employeeID
    LEFT JOIN status s ON lr.statusID = s.statusID
    LEFT JOIN employees dh ON lr.approvedByDept = dh.employeeID
    LEFT JOIN employees a ON lr.approvedBy = a.employeeID
`;

const INSERT_COLUMNS = [
    COLUMNS.employeeID,
    COLUMNS.startDate,
    COLUMNS.endDate,
    COLUMNS.reason,
    COLUMNS.statusID,
    COLUMNS.approvedByDept,
    COLUMNS.approvedBy,
    COLUMNS.createdAt,
    COLUMNS.updatedAt
].join(', ');

const UPDATE_SET = [
    `${COLUMNS.startDate} = ?`,
    `${COLUMNS.endDate} = ?`,
    `${COLUMNS.reason} = ?`,
    `${COLUMNS.statusID} = ?`,
    `${COLUMNS.approvedByDept} = ?`,
    `${COLUMNS.approvedBy} = ?`,
    `${COLUMNS.updatedAt} = ?`
].join(', ');

const SPECIAL_QUERIES = {
    GET_BY_EMPLOYEE: `${DEFAULT_SELECT} WHERE lr.employeeID = ?`,
    GET_BY_DEPARTMENT_HEAD: `${DEFAULT_SELECT} WHERE lr.approvedByDept = ?`,
    GET_BY_STATUS: `${DEFAULT_SELECT} WHERE lr.statusID = ?`,
    GET_PENDING: `${DEFAULT_SELECT} WHERE lr.statusID = 1`,
    GET_BY_DATE_RANGE: `${DEFAULT_SELECT} WHERE 
        (lr.startDate BETWEEN ? AND ?) OR 
        (lr.endDate BETWEEN ? AND ?) OR
        (lr.startDate <= ? AND lr.endDate >= ?)`
};

module.exports = {
    TABLE_NAME,
    COLUMNS,
    DEFAULT_SELECT,
    INSERT_COLUMNS,
    UPDATE_SET,
    SPECIAL_QUERIES
};