// backend/enums/statusEnum.js
const StatusEnum = Object.freeze({
    PENDING: 1,
    ACCEPTED_BY_DEPT: 2,
    REJECTED_BY_DEPT: 3,
    ACCEPTED_BY_HR: 4,
    REJECTED_BY_HR: 5,
    CANCELLED: 6,
    IN_PROCESS: 7,
    FINISHED: 8
});

module.exports = StatusEnum;