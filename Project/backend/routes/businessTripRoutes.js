const express = require('express');
const router = express.Router();
const businessTripController = require('../controllers/businessTripController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorizeRole');

router.use(authMiddleware);

// Get all requests (HR, Dept Head, Employee)
router.get('/', authorizeRole([1, 2, 3]), businessTripController.getAllRequests);

// Get request by ID
router.get('/:id', authorizeRole([1, 2, 3]), businessTripController.getRequestById);

// Get requests by employee
router.get('/employee/:employeeId', authorizeRole([1, 2, 3]), businessTripController.getRequestsByEmployee);

// Get pending requests (HR, Dept Head)
router.get('/status/pending', authorizeRole([1, 2]), businessTripController.getPendingRequests);

// Create request (HR only)
router.post('/', authorizeRole([1]), businessTripController.createRequest);

// Update request (HR only)
router.put('/:id', authorizeRole([1]), businessTripController.updateRequest);

// Delete request (HR only)
router.delete('/:id', authorizeRole([1]), businessTripController.deleteRequest);

module.exports = router;