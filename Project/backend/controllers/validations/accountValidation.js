// backend/controllers/validations/accountValidation.js
const { check } = require('express-validator');

const validateAccount = [
    check('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ max: 70 }).withMessage('Username cannot exceed 70 characters')
        .custom(async (value) => {
            const existingAccount = await prisma.accounts.findUnique({ where: { username: value } });
            if (existingAccount) {
                throw new Error('Username is already in use.');
            }
        }),
    check('password')
        .optional()
        .isLength({ min: 6, max: 100 }).withMessage('Password must be between 6 and 100 characters'),
    check('employeeID')
        .optional()
        .isInt({ min: 1 }).withMessage('Employee ID must be a positive integer')
        .custom(async (value) => {
            const employee = await prisma.employees.findUnique({ where: { employeeID: value } });
            if (!employee) {
                throw new Error('Employee ID does not exist.');
            }
        }),
];

module.exports = { validateAccount };