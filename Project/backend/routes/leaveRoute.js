// backend/routes/leaveRoute.js

const express = require('express');
const router = express.Router();
const {
    createLeaveRequest,
    approveByDept,
    approveByHR,
    getAllPendingLeaveRequests,
    getAllRejectedLeaveRequests,
    getAllAcceptedLeaveRequests,
    getAllAcceptedRequestsByDept,
    getAllLeaveRequests
} = require('../controllers/leaveRequestController');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeDeptHead = require('../middlewares/authorizeDeptHead');
const authorizeRole = require('../middlewares/authorizeRole');

// Giả sử HR_ROLE_ID là ID của vai trò HR trong bảng roles (thay bằng giá trị thực tế)
const DIRECTOR_ROLE_ID = 1;
const HR_ROLE_ID = 2; // Ví dụ, thay bằng ID thực từ model `roles`
router.use(authenticateToken);


// Tạo leave request (nhân viên bất kỳ)
router.post('/',

    authorizeRole([DIRECTOR_ROLE_ID], [HR_ROLE_ID]),
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
    authorizeRole([HR_ROLE_ID], [DIRECTOR_ROLE_ID]),
    approveByHR
);

router.get('/',
    authorizeRole([HR_ROLE_ID], [DIRECTOR_ROLE_ID]),
    getAllLeaveRequests
);

router.get('/pending',
    authorizeRole([HR_ROLE_ID], [DIRECTOR_ROLE_ID]),
    getAllPendingLeaveRequests
);
router.get('/rejected',
    authorizeRole([HR_ROLE_ID], [DIRECTOR_ROLE_ID]),
    getAllRejectedLeaveRequests
);
router.get('/accepted',
    authorizeRole([HR_ROLE_ID], [DIRECTOR_ROLE_ID]),
    getAllAcceptedLeaveRequests
);
router.get('/accepted-by-dept',
    authorizeRole([HR_ROLE_ID], [DIRECTOR_ROLE_ID]),
    getAllAcceptedRequestsByDept
);


module.exports = router;