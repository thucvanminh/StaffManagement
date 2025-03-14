// backend/enums/statusEnum.js
const StatusEnum = Object.freeze({
    PENDING: 1,
    ACCEPTED_BY_DEPT: 2,
    REJECTED_BY_DEPT: 3,
    ACCEPTED_BY_HR: 4,
    REJECTED_BY_HR: 5,
    CANCELLED: 6
});

module.exports = StatusEnum;