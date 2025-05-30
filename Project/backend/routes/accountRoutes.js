// backend/routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorizeRole');
const { validateAccount } = require('../validations/accountValidation');

router.get('/', authMiddleware, authorizeRole([1,2]), accountController.getAllAccounts);
router.get('/:id', authMiddleware, authorizeRole([1,2]), accountController.getAccountById);
router.post('/', authMiddleware, authorizeRole([1,2]), validateAccount, accountController.addAccount);
router.put('/:id', authMiddleware, authorizeRole([1,2]), validateAccount, accountController.updateAccount);
router.delete('/:id', authMiddleware, authorizeRole([1,2]), accountController.deleteAccount);

module.exports = router;
