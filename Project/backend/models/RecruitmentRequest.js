// backend/models/RecruitmentRequest.js

const TABLE_NAME = 'recruitment_requests';

const COLUMNS = {
    recruitmentRequestID: 'recruitmentRequestID',
    applicantName: 'applicantName',
    applicantEmail: 'applicantEmail',
    position: 'position',
    description: 'description',
    statusID: 'statusID',
    approvedBy: 'approvedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};

const DEFAULT_SELECT = `
    SELECT 
        rr.*,
        s.statusName,
        a.fullName as approverName
    FROM ${TABLE_NAME} rr
    LEFT JOIN status s ON rr.statusID = s.statusID
    LEFT JOIN employees a ON rr.approvedBy = a.employeeID
`;

const INSERT_COLUMNS = [
    COLUMNS.applicantName,
    COLUMNS.applicantEmail,
    COLUMNS.position,
    COLUMNS.description,
    COLUMNS.statusID,
    COLUMNS.approvedBy,
    COLUMNS.createdAt,
    COLUMNS.updatedAt
].join(', ');

const UPDATE_SET = [
    `${COLUMNS.applicantName} = ?`,
    `${COLUMNS.applicantEmail} = ?`,
    `${COLUMNS.position} = ?`,
    `${COLUMNS.description} = ?`,
    `${COLUMNS.statusID} = ?`,
    `${COLUMNS.approvedBy} = ?`,
    `${COLUMNS.updatedAt} = ?`
].join(', ');

const SPECIAL_QUERIES = {
    GET_BY_STATUS: `${DEFAULT_SELECT} WHERE rr.statusID = ?`,
    GET_BY_POSITION: `${DEFAULT_SELECT} WHERE rr.position LIKE ?`,
    GET_PENDING: `${DEFAULT_SELECT} WHERE rr.statusID = 1`,
    GET_BY_APPROVER: `${DEFAULT_SELECT} WHERE rr.approvedBy = ?`
};

module.exports = {
    TABLE_NAME,
    COLUMNS,
    DEFAULT_SELECT,
    INSERT_COLUMNS,
    UPDATE_SET,
    SPECIAL_QUERIES
};