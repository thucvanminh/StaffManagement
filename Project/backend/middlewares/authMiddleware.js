// backend/middlewares/authMiddleware.js
const { verifyToken } = require('../config/jwt');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Định dạng: Bearer <token>
    
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }
    
    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token is invalid or expired' });
    }
    
    req.user = decoded; // Gán payload token vào req.user
    next();
}

module.exports = authenticateToken;
