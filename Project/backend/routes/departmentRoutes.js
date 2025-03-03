// backend/routes/departmentRoutes.js
const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/DepartmentController');
const { validateDepartment } = require('../controllers/validations/departmentValidation');
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRole = require("../middlewares/authorizeRole");

router.get('/',authMiddleware, authorizeRole([1,2]), departmentController.getAllDepartments);
router.get('/:id',authMiddleware, authorizeRole([1,2]), departmentController.getDepartmentById);
router.post('/',authMiddleware, authorizeRole([1,2]), validateDepartment, departmentController.addDepartment);
router.put('/:id',authMiddleware, authorizeRole([1,2]), validateDepartment, departmentController.updateDepartment);
router.delete('/:id',authMiddleware, authorizeRole([1,2]), departmentController.deleteDepartment);

module.exports = router;
