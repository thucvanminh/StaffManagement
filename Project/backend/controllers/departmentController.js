// src/controllers/DepartmentController.js
const Department = require('../models/Department');
const { validationResult } = require('express-validator');

class DepartmentController {
    async getAllDepartments(req, res) {
        try {
            const departments = await Department.findAll();
            res.status(200).json(departments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getDepartmentById(req, res) {
        try {
            const department = await Department.findOne({ where: { departmentID: req.params.id } });
            if (!department) throw new Error('Department not found');
            res.status(200).json(department);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async addDepartment(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        try {
            const newDepartment = await Department.create(req.body);
            res.status(201).json(newDepartment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateDepartment(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        try {
            const [updated] = await Department.update(req.body, { where: { departmentID: req.params.id } });
            if (updated === 0) throw new Error('Department not found');
            const updatedDepartment = await Department.findOne({ where: { departmentID: req.params.id } });
            res.status(200).json(updatedDepartment);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async deleteDepartment(req, res) {
        try {
            const department = await Department.findOne({ where: { departmentID: req.params.id } });
            if (!department) throw new Error('Department not found');
            await department.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

module.exports = new DepartmentController();