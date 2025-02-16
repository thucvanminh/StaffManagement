// backend/controllers/validatios/accountValidation.js

const { check } = require('express-validator');


const validateAccount = [
    check('username').trim().notEmpty().withMessage('Username is required'),
    check('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    check('employeeID').optional().isInt().withMessage('Employee ID must be a valid integer'),
];
module.exports = { validateAccount };