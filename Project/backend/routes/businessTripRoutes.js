// backend/routes/businessTripRoutes.js
const express = require('express');
const router = express.Router();

const BusinessTripController = require('../controllers/BusinessTripController'); // Sửa typo
const authMiddleware = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/authorizeRole'); // Sửa typo
const authorizeDeptHead = require('../middlewares/authorizeDeptHead');

router.use(authMiddleware);

// Nhân viên tạo request
router.post('/create', authorizeRoles([3]), BusinessTripController.createTripRequest);

// Xem tất cả request (Director, HR)
router.get('/', authorizeRoles([1, 2,3]), BusinessTripController.getAllBusinessTripRequest);

// Head of Dept duyệt
router.put('/approve-dept/:id', authorizeDeptHead, BusinessTripController.approveByDept);

// HR duyệt
router.put('/approve-hr/:id', authorizeRoles([2]), BusinessTripController.approveByHR);

// Reject (Head of Dept hoặc HR)
router.put('/reject/:id', BusinessTripController.rejectRequest);

module.exports = router;