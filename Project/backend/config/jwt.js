// backend/config/jwt.js
require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'fallbackSecretKey';

/**
 * Tạo JWT token từ thông tin người dùng.
 * @param {Object} user - Đối tượng chứa thông tin cần thiết (lấy từ Employee) gồm:
 *                        - employeeID: ID của nhân viên
 *                        - roleID: Role của nhân viên
 * @returns {string} JWT token có thời gian hiệu lực 24 giờ
 */
function generateToken(user) {
    const payload = {
        employeeID: user.employeeID, // Sử dụng employeeID thay vì userId
        roleID: user.roleID         // Giữ tên roleID để khớp với model
    };
    return jwt.sign(payload, SECRET_KEY, {  });
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