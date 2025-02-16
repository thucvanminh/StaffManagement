// src/routes/departmentRoutes.js
const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/DepartmentController');
const { validateDepartment } = require('../controllers/validations/departmentValidation');

router.get('/', departmentController.getAllDepartments);
router.get('/:id', departmentController.getDepartmentById);
router.post('/', validateDepartment, departmentController.addDepartment);
router.put('/:id', validateDepartment, departmentController.updateDepartment);
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;
