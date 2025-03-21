// backend/controllers/validations/employeeValidation.js

const { body, query } = require('express-validator');
const prisma = require('../prisma');

const validateEmployee = [
    body('employeeID').optional().isInt({ min: 1 }).withMessage('employeeID must be positive integer')
        .custom(async (value) => {
            const existingEmployee = await prisma.employees.findUnique({ where: { employeeID: value } });
            if (existingEmployee) {
                throw new Error('Employee ID already exists');
            }
            return true;
        }),
    body('fullName')
        .notEmpty().withMessage('Name cannot be empty')
        .isLength({ min: 2, max: 255 }).withMessage('Name must be between 2-255 characters')
        .custom((value) => {
            const words = value.split(' ').filter(word => word.trim().length > 0);
            if (words.length < 2) {
                throw new Error('Name must contain 2 words');
            }
            return true;
        }),
    body('dateOfBirth')
        .isISO8601().toDate().withMessage('Invalid date of birth')
        .custom((value) => {
            const today = new Date();
            let age = today.getFullYear() - value.getFullYear();
            const monthDiff = today.getMonth() - value.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < value.getDate())) {
                age--;
            }
            if (age < 18) {
                throw new Error('Employee must be 18 or older');
            }
            return true;
        }),
    body('hireDay')
        .isISO8601().toDate().withMessage('Invalid Day'),
    body('email')
        .isEmail().withMessage('Invalid email type')
        .custom(async (value) => {
            const existingEmployee = await prisma.employees.findUnique({ where: { email: value } });
            if (existingEmployee) {
                throw new Error('This email address is already in use.');
            }
        }),
    body('phone')
        .isMobilePhone('vi-VN').withMessage('Phone number is not valid (Vietnam)'),
    body('address')
        .isLength({ max: 400 }).withMessage('Address cannot be longer than 400 characters'),
    body('city')
        .isLength({ max: 100 }).withMessage('City name cannot be longer than 100 characters'),
    body('gender')
        .isIn(['Male', 'Female', 'Khác']).withMessage('Gender is not valid'),
    body('departmentID')
        .isInt({ min: 1 }).withMessage('DepartmentID must be positive integer'),
    body('roleID')
        .isInt({ min: 1 }).withMessage('RoleID must be positive integer'),
];

const updateEmployee = [
    body('employeeID').optional().isInt({ min: 1 }).withMessage('employeeID must be positive integer')
        .custom(async (value, { req }) => {
            const existingEmployee = await prisma.employees.findUnique({ where: { employeeID: value } });
            if (existingEmployee.employeeID !== parseInt(req.body.employeeID)) {
                throw new Error('Employee ID is already in exists');
            }
        }),
    body('fullName')
        .notEmpty().withMessage('Name cannot be empty')
        .isLength({ min: 2, max: 255 }).withMessage('Name must be between 2-255 characters')
        .custom((value) => {
            const words = value.split(' ').filter(word => word.trim().length > 0);
            if (words.length < 2) {
                throw new Error('Name must contain 2 words');
            }
            return true;
        }),
    body('dateOfBirth')
        .isISO8601().toDate().withMessage('Invalid date of birth')
        .custom((value) => {
            const today = new Date();
            let age = today.getFullYear() - value.getFullYear();
            const monthDiff = today.getMonth() - value.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < value.getDate())) {
                age--;
            }
            if (age < 18) {
                throw new Error('Employee must be 18 or older');
            }
            return true;
        }),
    body('hireDay')
        .isISO8601().toDate().withMessage('Hire day is not valid'),
    body('email')
        .isEmail().withMessage('Invalid email type')
        .custom(async (value, { req }) => {
            const existingEmployee = await prisma.employees.findUnique({ where: { email: value } });
            if (existingEmployee && existingEmployee.employeeID !== parseInt(req.body.employeeID)) {
                // console.log(existingEmployee.employeeID);
                // console.log(req.body.employeeID);

                throw new Error('This email is in use');
            }
            return true;
        }),
    body('phone')
        .isMobilePhone('vi-VN').withMessage('Phone number is not valid (Vietnam)'),
    body('address')
        .isLength({ max: 400 }).withMessage('Address cannot be longer than 400 characters'),
    body('city')
        .isLength({ max: 100 }).withMessage('City name cannot be longer than 100 characters'),
    body('gender')
        .isIn(['Male', 'Female', 'Khác']).withMessage('Gender is not valid'),
    body('departmentID')
        .isInt({ min: 1 }).withMessage('DepartmentID must be positive integer'),
    body('roleID')
        .isInt({ min: 1 }).withMessage('RoleID must be positive integer'),
];

const validateQueryEmployee = [
    query('departmentID').optional().isInt({ min: 1 }).withMessage('departmentID must be positive integer'),
    query('roleID').optional().isInt({ min: 1 }).withMessage('roleID must be positive integer'),
    query('city').optional().isString().withMessage('city must be string'),
    query('birthday').optional().isISO8601().toDate().withMessage('birthday must be date'),
];

module.exports = {
    validateEmployee,
    validateQueryEmployee,
    updateEmployee
};