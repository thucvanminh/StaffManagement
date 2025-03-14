// backend/routes/overtimeRoute.js

const express = require('express');
const router = express.Router();
const {
    createOvertimeRequest,
    approveByHR,
    rejectByHR,
    getAllPendingOvertimeRequests,
    getAllRejectedOvertimeRequests,
    getAllAcceptedOvertimeRequests,
    getAllAcceptedRequestsByDept,
    getRequestByEmployeeID,
    getRequestByRequestID
} = require('../controllers/overtimeRequestController');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeDeptHead = require('../middlewares/authorizeDeptHead');
const authorizeRole = require('../middlewares/authorizeRole');

// Giả sử HR_ROLE_ID là ID của vai trò HR trong bảng roles (thay bằng giá trị thực tế)
const HR_ROLE_ID = 2; // Ví dụ, thay bằng ID thực từ model `roles`
router.use(authenticateToken);

// Tạo overtime request (chỉ trưởng phòng)
router.post('/',
    authorizeDeptHead,
    createOvertimeRequest
);

// Duyệt overtime request (chỉ HR)
router.put('/:id/approveHR',
    authorizeRole([HR_ROLE_ID]),
    approveByHR
);

// Từ chối overtime request (chỉ HR)
router.put('/:id/rejectHR',
    authorizeRole([HR_ROLE_ID]),
    rejectByHR
);

router.get('/pending', getAllPendingOvertimeRequests);
router.get('/rejected', getAllRejectedOvertimeRequests);
router.get('/accepted', getAllAcceptedOvertimeRequests);
router.get('/accepted-by-dept', getAllAcceptedRequestsByDept);
router.get('/employee/:id', getRequestByEmployeeID);
router.get('/:id', getRequestByRequestID);

module.exports = router;