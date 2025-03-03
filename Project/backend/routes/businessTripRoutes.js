// backend/routes/businessTripRoutes.js

const express = require('express');
const router = express.Router();

const BusinessTripController = require('../controllers/businessTripController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorizeRole');

// Nhân viên tạo yêu cầu
router.post('/create', BusinessTripController.createTripRequest);
router.get('/',BusinessTripController.getAllBusinessTripRequest);
// Trưởng phòng duyệt/từ chối
router.put('/approve-dept/:id', BusinessTripController.approveByDept);

// HR duyệt/từ chối
router.put('/approve-hr/:id', BusinessTripController.approveByHR);
router.put('/reject/:id', BusinessTripController.rejectRequest);

module.exports = router;