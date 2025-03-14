// backend/routes/leaveRoute.js

const express = require('express');
const router = express.Router();
const {
    createLeaveRequest,
    approveByDept,
    approveByHR
} = require('../controllers/leaveRequestController');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeDeptHead = require('../middlewares/authorizeDeptHead');
const authorizeRole = require('../middlewares/authorizeRole');

// Giả sử HR_ROLE_ID là ID của vai trò HR trong bảng roles (thay bằng giá trị thực tế)
const HR_ROLE_ID = 2; // Ví dụ, thay bằng ID thực từ model `roles`

// Tạo leave request (nhân viên bất kỳ)
router.post('/',
    authenticateToken,
    createLeaveRequest
);

// Trưởng phòng duyệt hoặc từ chối leave request
router.put('/:leaveRequestID/approve-by-dept',
    authenticateToken,
    authorizeDeptHead,
    approveByDept
);

// HR duyệt hoặc từ chối leave request
router.put('/:leaveRequestID/approve-by-hr',
    authenticateToken,
    authorizeRole([HR_ROLE_ID]),
    approveByHR
);

module.exports = router;