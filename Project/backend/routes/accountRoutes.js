// backend/routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account_controller');
const authMiddleware = require('../middlewares/authMiddleware'); // Xác thực token
const authorizeRoles = require('../middlewares/authorizeRole'); // Kiểm tra quyền theo roleID
const accountValidation = require('../controllers/validations/accountValidation');




// Route CRUD
router.get('/', authMiddleware, authorizeRoles([1,2]), accountController.getAllAccounts);
router.get('/:id', authMiddleware, authorizeRoles([1, 2]), accountController.getAccountById);
router.post('/', authMiddleware, authorizeRoles([1]), accountValidation.validateAccount, accountController.addAccount);
router.put('/:id', authMiddleware, authorizeRoles([1]), accountValidation.validateAccount, accountController.updateAccount);
router.delete('/:id', authMiddleware, authorizeRoles([1]), accountController.deleteAccount);

module.exports = router;