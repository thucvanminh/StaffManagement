// backend/controllers/validations/employeeValidation.js

const { body, query } = require('express-validator');
const Employee = require('../../models/Employee');

const validateEmployee = [
    body('fullName')
        .notEmpty().withMessage('Tên không được để trống')
        .isLength({ min: 2, max: 255 }).withMessage('Tên phải từ 2-255 ký tự')
        .custom((value) => {
            const words = value.split(' ').filter(word => word.trim().length > 0);
            if (words.length < 2) {
                throw new Error('Name must contain 2 words');
            }
            return true;
        }),
    body('dateOfBirth')
        .isISO8601().toDate().withMessage('Ngày sinh không hợp lệ')
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
        .isISO8601().toDate().withMessage('Ngày thuê không hợp lệ'),
    body('email')
        .isEmail().withMessage('Email không hợp lệ')
        .custom(async (value) => {
            const existingEmployee = await Employee.findOne({ where: { email: value } });
            if (existingEmployee) {
                throw new Error('Địa chỉ email này đã được sử dụng.');
            }
        }),
    body('phone')
        .isMobilePhone('vi-VN').withMessage('Số điện thoại không hợp lệ (Việt Nam)'),
    body('address')
        .isLength({ max: 400 }).withMessage('Địa chỉ không được vượt quá 255 ký tự'),
    body('city')
        .isLength({ max: 100 }).withMessage('Thành phố không được vượt quá 100 ký tự'),
    body('gender')
        .isIn(['Nam', 'Nữ', 'Khác']).withMessage('Giới tính không hợp lệ'),
    body('departmentID')
        .isInt().withMessage('DepartmentID phải là số nguyên'),
    body('roleID')
        .isInt().withMessage('RoleID phải là số nguyên'),
];

const validateQueryEmployee = [
    query('departmentID').optional().isInt().withMessage('departmentID phải là số nguyên'),
    query('roleID').optional().isInt().withMessage('roleID phải là số nguyên'),
    query('city').optional().isString().withMessage('city phải là chuỗi'),
    query('birthday').optional().isISO8601().toDate().withMessage('birthday phải là định dạng ngày tháng'),
];

module.exports = {
    validateEmployee,
    validateQueryEmployee
};
