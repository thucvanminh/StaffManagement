// backend/routes/overtimeRoute.js

const express = require('express');
const router = express.Router();
const {
    createOvertimeRequest,
    approveByHR,
    rejectByHR
} = require('../controllers/overtimeRequestController');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeDeptHead = require('../middlewares/authorizeDeptHead');
const authorizeRole = require('../middlewares/authorizeRole');

// Giả sử HR_ROLE_ID là ID của vai trò HR trong bảng roles (thay bằng giá trị thực tế)
const HR_ROLE_ID = 2; // Ví dụ, thay bằng ID thực từ model `roles`

// Tạo overtime request (chỉ trưởng phòng)
router.post('/',
    authenticateToken,
    authorizeDeptHead,
    createOvertimeRequest
);

// Duyệt overtime request (chỉ HR)
router.put('/:id/approveHR',
    authenticateToken,
    authorizeRole([HR_ROLE_ID]),
    approveByHR
);

// Từ chối overtime request (chỉ HR)
router.put('/:id/rejectHR',
    authenticateToken,
    authorizeRole([HR_ROLE_ID]),
    rejectByHR
);

module.exports = router;