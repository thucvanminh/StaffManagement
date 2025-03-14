// backend/routes/resignRoutes.js
const express = require('express');
const router = express.Router();
const resignController = require('../controllers/resignController');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeDeptHead = require('../middlewares/authorizeDeptHead');
const authorizeRole = require('../middlewares/authorizeRole');

const HR_ROLE_ID = 2; // Định danh role HR

router.post('/', authenticateToken, resignController.createResignRequest);
router.put('/approve-dept', authenticateToken, authorizeDeptHead, resignController.approveByDeptHead);
router.put('/approve-hr', authenticateToken, authorizeRole([HR_ROLE_ID]), resignController.approveByHR);
router.get('/', authenticateToken, authorizeRole([HR_ROLE_ID]), resignController.getAllResignRequests);
router.get('/:id', authenticateToken, authorizeRole([HR_ROLE_ID]), resignController.getResignRequestById);
router.put('/:id', authenticateToken, authorizeRole([HR_ROLE_ID]), resignController.updateResignRequest);
router.delete('/:id', authenticateToken, authorizeRole([HR_ROLE_ID]), resignController.deleteResignRequest);
router.get('/pending', authenticateToken, authorizeRole([HR_ROLE_ID]), resignController.getAllPendingResignRequests);
router.get('/rejected', authenticateToken, authorizeRole([HR_ROLE_ID]), resignController.getAllRejectedResignRequests);
router.get('/accepted', authenticateToken, authorizeRole([HR_ROLE_ID]), resignController.getAllAcceptedResignRequests);
router.get('/accepted-by-dept', authenticateToken, authorizeRole([HR_ROLE_ID]), resignController.getAllAcceptedRequestsByDept);

module.exports = router;
