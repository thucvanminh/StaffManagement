// require('dotenv').config();
// const jwt = require('jsonwebtoken');

// const SECRET_KEY = process.env.JWT_SECRET || 'fallbackSecretKey';

// // Hàm tạo token: Nhận thông tin user (bao gồm roleID) làm payload
// function generateToken(user) {
//     // Ví dụ payload chứa id và role (roleID)
//     const payload = {
//         userId: user.id,
//         role: user.role  // Ví dụ: 'admin', 'user', v.v.
//     };
//     // Tạo token với thời gian hiệu lực (1h ở đây)
//     return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
// }

// // Hàm xác minh token: Nếu hợp lệ trả về payload, nếu không trả về lỗi/null
// function verifyToken(token) {
//     try {
//         return jwt.verify(token, SECRET_KEY);
//     } catch (error) {
//         return null;
//     }
// }

// module.exports = { generateToken, verifyToken };

// backend/config/jwt.js
require('dotenv').config();
const jwt = require('jsonwebtoken');

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
        userId: user.id,   // Lấy từ account.employee.employeeID
        role: user.role    // Lấy từ account.employee.roleID
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

