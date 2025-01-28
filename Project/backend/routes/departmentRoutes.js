// backend/routes/departmentRoutes.js


const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

router.get('/', departmentController.getAllDepartments);
router.get('/:id', departmentController.getDepartmentsByID);
router.post('/', departmentController.addDepartment);
router.put('/:id', departmentController.updateDepartment);
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;