// src/routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/EmployeeController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorizeRole');
const { validateEmployee, updateEmployee, validateQueryEmployee } = require('../controllers/validations/employeeValidation');

router.get('/', authMiddleware, authorizeRole([1,2]), employeeController.getAllEmployees);
router.get('/query', authMiddleware, authorizeRole([1,2]), validateQueryEmployee, employeeController.queryEmployee);
router.get('/:id', authMiddleware, authorizeRole([1,2]), employeeController.getEmployeeById);
router.post('/', authMiddleware, authorizeRole([1,2]), validateEmployee, employeeController.addEmployee);
router.put('/:id', authMiddleware, authorizeRole([1,2]), updateEmployee, employeeController.updateEmployee);
router.delete('/:id', authMiddleware, authorizeRole([1,2]), employeeController.deleteEmployee);

module.exports = router;
