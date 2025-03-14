// backend/routes/transferRoutes.js

const express = require('express');
const router = express.Router();
const { createTransferRequest } = require('../controllers/transferRequestController');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorizeRole');

const HR_ROLE_ID = 2; // Thay bằng ID thực tế của HR trong bảng roles

router.post('/',
    authenticateToken,
    authorizeRole([HR_ROLE_ID]),
    createTransferRequest
);

module.exports = router;