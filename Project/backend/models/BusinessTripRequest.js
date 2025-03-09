// backend/models/BusinessTripRequest.js

const TABLE_NAME = 'business_trip_requests';

const COLUMNS = {
    requestID: 'requestID',
    employeeID: 'employeeID',
    startDate: 'startDate',
    endDate: 'endDate',
    destination: 'destination',
    purpose: 'purpose',
    statusID: 'statusID',
    approverID: 'approverID',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};

const DEFAULT_SELECT = `
    SELECT 
        btr.*,
        e.fullName as employeeName,
        e.email as employeeEmail,
        s.statusName,
        s.description as statusDescription,
        a.fullName as approverName
    FROM ${TABLE_NAME} btr
    LEFT JOIN employees e ON btr.employeeID = e.employeeID
    LEFT JOIN status s ON btr.statusID = s.statusID
    LEFT JOIN employees a ON btr.approverID = a.employeeID
`;

const INSERT_COLUMNS = [
    COLUMNS.employeeID,
    COLUMNS.startDate,
    COLUMNS.endDate,
    COLUMNS.destination,
    COLUMNS.purpose,
    COLUMNS.statusID,
    COLUMNS.approverID,
    COLUMNS.createdAt,
    COLUMNS.updatedAt
].join(', ');

const UPDATE_SET = [
    `${COLUMNS.startDate} = ?`,
    `${COLUMNS.endDate} = ?`,
    `${COLUMNS.destination} = ?`,
    `${COLUMNS.purpose} = ?`,
    `${COLUMNS.statusID} = ?`,
    `${COLUMNS.approverID} = ?`,
    `${COLUMNS.updatedAt} = ?`
].join(', ');

// Các truy vấn đặc biệt
const SPECIAL_QUERIES = {
    GET_BY_EMPLOYEE: `${DEFAULT_SELECT} WHERE btr.employeeID = ?`,
    GET_BY_APPROVER: `${DEFAULT_SELECT} WHERE btr.approverID = ?`,
    GET_BY_STATUS: `${DEFAULT_SELECT} WHERE btr.statusID = ?`,
    GET_PENDING: `${DEFAULT_SELECT} WHERE btr.statusID = 1`, // Giả sử 1 là status "Pending"
    GET_BY_DATE_RANGE: `${DEFAULT_SELECT} WHERE btr.startDate BETWEEN ? AND ?`
};

module.exports = {
    TABLE_NAME,
    COLUMNS,
    DEFAULT_SELECT,
    INSERT_COLUMNS,
    UPDATE_SET,
    SPECIAL_QUERIES
};