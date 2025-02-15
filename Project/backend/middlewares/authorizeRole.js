


// backend/middlewares/authorizeRoles.js
/**
 * Middleware xác thực user có thuộc các role được chỉ định.
 * @param {number[]} allowedRoles - Danh sách các roleID được phép truy cập.
 */
function authorizeRoles(allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Kiểm tra `roleID` của user có thuộc danh sách `allowedRoles`
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
        }

        next(); // Chuyển điều hướng đến controller nếu hợp lệ
    };
}

module.exports = authorizeRoles;