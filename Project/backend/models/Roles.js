const TABLE_NAME = 'roles';

const COLUMNS = {
    roleID: 'roleID',
    roleName: 'roleName',
    description: 'description'
};

const DEFAULT_SELECT = `
    SELECT * FROM ${TABLE_NAME}
`;

const INSERT_COLUMNS = [
    COLUMNS.roleName,
    COLUMNS.description
].join(', ');

const UPDATE_SET = [
    `${COLUMNS.roleName} = ?`,
    `${COLUMNS.description} = ?`
].join(', ');

module.exports = {
    TABLE_NAME,
    COLUMNS,
    DEFAULT_SELECT,
    INSERT_COLUMNS,
    UPDATE_SET
};
