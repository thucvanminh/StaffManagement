// backend/controllers/validations/employeeValidation.js

const {body, query} = require('express-validator');
const Employee = require('../../models/Employee');

const validateEmployee = [
    body('fullName')
        .notEmpty().withMessage('Name cannot be empty')
        .isLength({min: 2, max: 255}).withMessage('Name must be between 2-255 characters')
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
            const existingEmployee = await Employee.findOne({where: {email: value}});
            if (existingEmployee) {
                throw new Error('This email address is already in use.\n');
            }
        }),
    body('phone')
        .isMobilePhone('vi-VN').withMessage('Phone number is not valid (Vietnam)'),
    body('address')
        .isLength({max: 400}).withMessage('Address cannot be longer than 400 characters'),
    body('city')
        .isLength({max: 100}).withMessage('City name cannot be longer than 100 characters'),
    body('gender')
        .isIn(['Nam', 'Nữ', 'Khác']).withMessage('gender is not valid'),
    body('departmentID')
        .isInt().withMessage('DepartmentID must be positive integer'),
    body('roleID')
        .isInt().withMessage('RoleID must be positive integer'),
];

const updateEmployee = [
    body('fullName')
        .notEmpty().withMessage('Name cannot be empty')
        .isLength({min: 2, max: 255}).withMessage('Name must be between 2-255 characters')
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
        .isEmail().withMessage('Email is not valid'),
    body('phone')
        .isMobilePhone('vi-VN').withMessage('Phone number is not valid (Vietnam)'),
    body('address')
        .isLength({max: 400}).withMessage('Address cannot be longer than 400 characters'),
    body('city')
        .isLength({max: 100}).withMessage('City name cannot be longer than 100 characters'),
    body('gender')
        .isIn(['Nam', 'Nữ', 'Khác']).withMessage('Gender is not valid'),
    body('departmentID')
        .isInt().withMessage('DepartmentID must be positive integer'),
    body('roleID')
        .isInt().withMessage('RoleID must be positive integer'),
];

const validateQueryEmployee = [
    query('departmentID').optional().isInt().withMessage('departmentID must be positive integer'),
    query('roleID').optional().isInt().withMessage('roleID must be positive integer'),
    query('city').optional().isString().withMessage('city must be string'),
    query('birthday').optional().isISO8601().toDate().withMessage('birthday must be date'),
];

module.exports = {
    validateEmployee,
    validateQueryEmployee, updateEmployee
};
