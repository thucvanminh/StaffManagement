// backend/models/Notification.js

const TABLE_NAME = 'notifications';

const COLUMNS = {
    notificationID: 'notificationID',
    requestID: 'requestID',
    requestType: 'requestType',
    recipientID: 'recipientID',
    message: 'message',
    sentAt: 'sentAt',
    isRead: 'isRead'
};

const DEFAULT_SELECT = `
    SELECT 
        n.*,
        e.fullName as recipientName,
        e.email as recipientEmail
    FROM ${TABLE_NAME} n
    LEFT JOIN employees e ON n.recipientID = e.employeeID
`;

const INSERT_COLUMNS = [
    COLUMNS.requestID,
    COLUMNS.requestType,
    COLUMNS.recipientID,
    COLUMNS.message,
    COLUMNS.sentAt,
    COLUMNS.isRead
].join(', ');

const UPDATE_SET = [
    `${COLUMNS.message} = ?`,
    `${COLUMNS.isRead} = ?`
].join(', ');

const SPECIAL_QUERIES = {
    GET_BY_RECIPIENT: `${DEFAULT_SELECT} WHERE n.recipientID = ? ORDER BY n.sentAt DESC`,
    GET_UNREAD: `${DEFAULT_SELECT} WHERE n.recipientID = ? AND n.isRead = 0`,
    GET_BY_REQUEST: `${DEFAULT_SELECT} WHERE n.requestID = ? AND n.requestType = ?`,
    MARK_AS_READ: `UPDATE ${TABLE_NAME} SET ${COLUMNS.isRead} = 1 WHERE ${COLUMNS.notificationID} = ?`
};

module.exports = {
    TABLE_NAME,
    COLUMNS,
    DEFAULT_SELECT,
    INSERT_COLUMNS,
    UPDATE_SET,
    SPECIAL_QUERIES
};