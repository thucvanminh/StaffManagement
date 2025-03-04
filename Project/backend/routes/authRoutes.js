// backend/routes/authRoutes.js


const rateLimit = require("express-rate-limit");
const accountValidation = require('../controllers/validations/accountValidation');
const authMiddleware = require('../middlewares/authMiddleware');

const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 phút
    max: 50000, // Chỉ cho phép 5 lần thử trong 5 phút
    message: "You've tried too many times, Try again after 5 minutes",
});

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', loginLimiter, accountValidation.validateAccount, authController.login);
router.post('/me', authMiddleware, authController.getInfor);

module.exports = router;