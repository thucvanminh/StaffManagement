// backend/routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorizeRole');
const { validateEmployee, updateEmployee, validateQueryEmployee } = require('../controllers/validations/employeeValidation');
router.use(authenticateToken);

router.get('/is-head-of-department/:employeeID', employeeController.isHeadDepartment);
router.get('/', authorizeRole([1, 2]), employeeController.getAllEmployees);
router.get('/query', authorizeRole([1, 2]), validateQueryEmployee, employeeController.queryEmployee);
router.get('/:id', authorizeRole([1, 2]), employeeController.getEmployeeById);
router.post('/', authorizeRole([1, 2]), validateEmployee, employeeController.addEmployee);
router.put('/:id', authorizeRole([1, 2]), validateEmployee, employeeController.updateEmployee);
router.delete('/:id', authorizeRole([1, 2]), employeeController.deleteEmployee);

module.exports = router;
