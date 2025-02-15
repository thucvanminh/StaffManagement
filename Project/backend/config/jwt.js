

// backend/config/jwt.js
require('dotenv').config();
const jwt = require('jsonwebtoken');
const account = require('../models/Account');
const employee = require('../models/Employee');

const SECRET_KEY = process.env.JWT_SECRET || 'fallbackSecretKey';

/**
 * Tạo JWT token từ thông tin người dùng.
 * @param {Object} user - Đối tượng chứa thông tin cần thiết (lấy từ Employee) gồm:
 *                        - id: employeeID
 *                        - role: roleID
 * @returns {string} JWT token có thời gian hiệu lực 1 giờ
 */
function generateToken(user) {
    const payload = {
        userId: account.employee.employeeID,
        role: account.employee.roleID
        // Lấy từ account.employee.roleID
    };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

/**
 * Xác minh JWT token.
 * @param {string} token - Token cần xác minh
 * @returns {Object|null} Payload giải mã nếu hợp lệ, null nếu không hợp lệ
 */
function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
}

module.exports = { generateToken, verifyToken };

