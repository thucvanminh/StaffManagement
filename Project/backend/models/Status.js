const TABLE_NAME = 'status';

const COLUMNS = {
    statusID: 'statusID',
    statusName: 'statusName',
    description: 'description'
};

const DEFAULT_SELECT = `
    SELECT * FROM ${TABLE_NAME}
`;

const INSERT_COLUMNS = [
    COLUMNS.statusName,
    COLUMNS.description
].join(', ');

const UPDATE_SET = [
    `${COLUMNS.statusName} = ?`,
    `${COLUMNS.description} = ?`
].join(', ');

module.exports = {
    TABLE_NAME,
    COLUMNS,
    DEFAULT_SELECT,
    INSERT_COLUMNS,
    UPDATE_SET
};