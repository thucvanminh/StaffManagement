// backend/routes/businessTripRoutes.js
const express = require('express');
const router = express.Router();

const businessTripController = require('../controllers/businessTripController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorizeRole');
const authorizeDeptHead = require('../middlewares/authorizeDeptHead');
router.use(authMiddleware);

// Lấy tất cả yêu cầu
router.get('/', authorizeRole([1, 2, 3]), businessTripController.getAllRequests);

// Lấy yêu cầu theo ID
router.get('/:id', authorizeRole([1, 2, 3]), businessTripController.getRequestById);

// Lấy yêu cầu theo nhân viên
router.get('/employee/:employeeId', authorizeRole([1, 2, 3]), businessTripController.getRequestsByEmployee);


// Lấy các yêu cầu đang chờ duyệt
router.get('/status/pending', authorizeRole([1, 2]), businessTripController.getPendingRequests);

// Tạo yêu cầu mới
router.post('/', authorizeDeptHead, authorizeRole([3]), businessTripController.createRequest);

// Cập nhật yêu cầu
router.put('/:id', authorizeRole([1, 2, 3]), businessTripController.updateRequest);

// Xóa yêu cầu
router.delete('/:id', authorizeRole([1, 2]), businessTripController.deleteRequest);

// Duyệt yêu cầu
router.put('/:id/approve', authorizeRole([1, 2]), businessTripController.approveRequest);

// Từ chối yêu cầu
router.put('/:id/reject', authorizeRole([1, 2]), businessTripController.rejectRequest);

module.exports = router;