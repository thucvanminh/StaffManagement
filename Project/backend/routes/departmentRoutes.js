// backend/routes/departmentRoutes.js
const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { validateDepartment } = require('../controllers/validations/departmentValidation');
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRole = require("../middlewares/authorizeRole");
router.use(authMiddleware);

router.get('/', authorizeRole([1, 2]), departmentController.getAllDepartments);
router.get('/:id', authorizeRole([1, 2]), departmentController.getDepartmentById);
router.post('/', authorizeRole([1, 2]), validateDepartment, departmentController.addDepartment);
router.put('/:id', authorizeRole([1, 2]), validateDepartment, departmentController.updateDepartment);
router.delete('/:id', authorizeRole([1, 2]), departmentController.deleteDepartment);

module.exports = router;
