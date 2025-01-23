const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Định tuyến
router.get('/', employeeController.getAllEmployees);
router.get('/:id',employeeController.getEmployeeByID);
router.post('/', employeeController.addEmployee);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
