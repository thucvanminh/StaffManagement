// backend/routes/emoloyeeRoutes.js

const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middlewares/authMiddleware'); // xác thực token
const authorizeRole = require('../middlewares/authorizeRole'); // kiểm tra quyền theo roleID

// Route lấy danh sách nhân viên: chỉ cần xác thực
//router.get('/', authMiddleware, employeeController.getAllEmployees);

// Route thêm nhân viên: chỉ cho phép admin (roleID === 1)
router.post('/', authMiddleware, authorizeRole(1), employeeController.addEmployee);
router.get('/', authMiddleware, authorizeRole(1), employeeController.getAllEmployees);
router.get('/query', authMiddleware, authorizeRole([1,2]), employeeController.queryEmployee);
router.get('/:id', authMiddleware, authorizeRole(1), employeeController.getEmployeeByID);
router.put('/:id', authMiddleware, authorizeRole(1), employeeController.updateEmployee);
router.delete('/:id', authMiddleware, authorizeRole(1), employeeController.deleteEmployee);



// Định tuyến
// router.get('/', employeeController.getAllEmployees);
// router.get('/query', employeeController.queryEmployee);
// router.get('/:id', employeeController.getEmployeeByID);
// router.post('/', employeeController.addEmployee);
// router.put('/:id', employeeController.updateEmployee);
// router.delete('/:id', employeeController.deleteEmployee);
module.exports = router;
