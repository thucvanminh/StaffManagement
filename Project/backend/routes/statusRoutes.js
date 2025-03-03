// backend/routes/statusRoutes.js
const express  = require('express');
const router = express.Router();
const BusinessTripController = require('../controllers/businessTripController');
const StatusController = require('../controllers/statusController');
router.get('/',StatusController.getAllStatus);

module.exports = router;