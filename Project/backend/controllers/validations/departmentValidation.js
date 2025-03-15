// backend/controllers/validations/departmentValidation.js
const { body, query } = require('express-validator');

const validateDepartment = [
    body('departmentID')
        .notEmpty().withMessage('Department ID cannot be null')
        .isInt({ min: 1 }).withMessage('Department ID must be a positive integer')
        .custom(async (value, { req }) => {
            const department = await prisma.departments.findUnique({ where: { departmentID: value } });
            if (department && department.departmentID !== req.body.departmentID) {
                throw new Error('Department ID already exists.');
            } else {
                return true;
            }
        }),
    body('departmentName')
        .notEmpty().withMessage('Department Name cannot be null')
        .isLength({ max: 255 }).withMessage('Department Name cannot exceed 255 characters'),
    body('HeadOfDepartmentID')
        .optional({ nullable: true })
        .isInt({ min: 1 }).withMessage('Head of Department ID must be a positive integer')
        .custom(async (value) => {
            if (value) {
                const employee = await prisma.employees.findUnique({ where: { employeeID: value } });
                if (!employee) {
                    throw new Error('Head of Department ID does not exist in employees.');
                }
            }
        }),
];

const validateQueryDepartment = [
    query('departmentID')
        .optional() // Changed from .isEmpty() to allow querying by ID
        .isInt({ min: 1 }).withMessage('Department ID must be a positive integer'),
];

module.exports = {
    validateDepartment,
    validateQueryDepartment,
};