// backend/controllers/validatios/departmentValidation.js

const { body, query } = require('express-validator');
const Department = require('../../models/Department');

const validateDepartment = [
    body('departmentID').notEmpty()
        .withMessage('Department ID cannot be null')
        .isInt().withMessage('Department ID must be a number'),
    body('departmentName').notEmpty()
        .withMessage('Department Name cannot be null'),
    body('HeadOfDepartmentID').optional({ nullable: true }).isInt()
        .withMessage('ID must be number type')
];

const validateQueryDepartment = [
    query('departmentID').isEmpty()
        .withMessage('Department ID cannot be null'),
]

module.exports = {
    validateDepartment,
    validateQueryDepartment
}