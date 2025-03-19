// backend/routes/transferRoutes.js

const express = require('express');
const router = express.Router();
const { createTransferRequest, getAllTransferRequests } = require('../controllers/transferRequestController');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorizeRole');

const HR_ROLE_ID = 2;
const DIRECTOR_ROLE_ID = 1;

router.use(authenticateToken);

router.post('/',
    authorizeRole([HR_ROLE_ID]),
    createTransferRequest
);

router.get('/', authorizeRole([HR_ROLE_ID, DIRECTOR_ROLE_ID]), getAllTransferRequests);


module.exports = router;