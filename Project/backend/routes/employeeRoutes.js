// backend/routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorizeRole');
const { validateEmployee, updateEmployee, validateQueryEmployee } = require('../controllers/validations/employeeValidation');

router.get('/is-head-of-department/:employeeID', authenticateToken,employeeController.isHeadDepartment);
router.get('/', authenticateToken, authorizeRole([1,2]), employeeController.getAllEmployees);
router.get('/query', authenticateToken, authorizeRole([1,2]), validateQueryEmployee, employeeController.queryEmployee);
router.get('/:id',  authenticateToken, authorizeRole([1,2]), employeeController.getEmployeeById);
router.post('/', authenticateToken, authorizeRole([1,2]), validateEmployee, employeeController.addEmployee);
router.put('/:id', authenticateToken, authorizeRole([1,2]), employeeController.deleteEmployee);

module.exports = router;
