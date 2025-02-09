// backend/controllers/departmentController.js

const Employee = require('../models/Employee');
const Department = require('../models/Department');
const { validateDepartment,
    validateQueryDepartment } = require('./validations/departmentValidation');
const { validationResult } = require('express-validator');

// Lấy danh sách tất cả nhân viên
exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll({
            include: [{
                model: Employee,
                as: 'DepartmentHead',
                attributes: ['fullName'], // Dùng mảng
            }]
        });
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDepartmentByID = async (req, res) => {
    try {
        const { id } = req.params;  // lấy một đối tượng {id : 'example'} trong URL
        const departmentID = await Department.findOne({
            where: { departmentID: id },
            include: [{
                model: Employee,
                as: 'DepartmentHead', // alias
                attributes: ['fullName'], // Dùng mảng
            }]
        });
        if (!departmentID) {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.status(200).json(departmentID);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.addDepartment = [
    validateDepartment,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const newDepartment = await Department.create(req.body);
            res.status(201).json(newDepartment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }];

exports.updateDepartment = async (req, res) => {
    try {
        const departmentID = req.params.id;
        const updateDepartment = await Department.update(req.body, {
            where: { departmentID }
        });
        res.status(200).json(updateDepartment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.deleteDepartment = async (req, res) => {
    try {
        const departmentID = req.params.id;
        await Department.destroy({ where: { departmentID } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


}
