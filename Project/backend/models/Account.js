// backend/models/Account.js

const TABLE_NAME = 'accounts';

const COLUMNS = {
    accountID: 'accountID',
    username: 'username',
    password: 'password',
    employeeID: 'employeeID'
};

const DEFAULT_SELECT = `
    SELECT 
        a.*,
        e.fullName,
        e.email,
        r.roleID,
        r.roleName
    FROM ${TABLE_NAME} a
    LEFT JOIN employees e ON a.employeeID = e.employeeID
    LEFT JOIN roles r ON e.roleID = r.roleID
`;

const INSERT_COLUMNS = [
    COLUMNS.username,
    COLUMNS.password,
    COLUMNS.employeeID
].join(', ');

const UPDATE_SET = [
    `${COLUMNS.username} = ?`,
    `${COLUMNS.password} = ?`,
    `${COLUMNS.employeeID} = ?`
].join(', ');

// Các truy vấn đặc biệt cho authentication
const AUTH_QUERIES = {
    LOGIN: `
        SELECT 
            a.*,
            e.fullName,
            e.email,
            r.roleID,
            r.roleName
        FROM ${TABLE_NAME} a
        LEFT JOIN employees e ON a.employeeID = e.employeeID
        LEFT JOIN roles r ON e.roleID = r.roleID
        WHERE a.username = ?
    `,
    CHECK_USERNAME: `SELECT COUNT(*) as count FROM ${TABLE_NAME} WHERE ${COLUMNS.username} = ?`,
    CHECK_EMPLOYEE: `SELECT COUNT(*) as count FROM ${TABLE_NAME} WHERE ${COLUMNS.employeeID} = ?`
};

module.exports = {
    TABLE_NAME,
    COLUMNS,
    DEFAULT_SELECT,
    INSERT_COLUMNS,
    UPDATE_SET,
    AUTH_QUERIES
};
