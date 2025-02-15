// backend/middlewares/authorizeRole.js
/**
 * Middleware kiểm tra phân quyền dựa trên role.
 * @param {number|string} requiredRole - RoleID hoặc role name yêu cầu để truy cập route.
 */
function authorizeRole(requiredRole) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        
        // Kiểm tra nếu role của user không khớp với requiredRole
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
        }
        
        next();
    };
}

module.exports = authorizeRole;
