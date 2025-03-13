// backend/routes/authRoutes.js


const rateLimit = require("express-rate-limit");
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const accountValidation = require('../controllers/validations/accountValidation');
const authMiddleware = require('../middlewares/authMiddleware');

const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 phút
    max: 50000, // Chỉ cho phép 5 lần thử trong 5 phút
    message: "You've tried too many times, Try again after 5 minutes",
});



router.post('/login', loginLimiter, accountValidation.validateAccount, AuthController.login);
router.post('/me', authMiddleware, AuthController.getInfor);

module.exports = router;