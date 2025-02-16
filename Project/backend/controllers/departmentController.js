// src/controllers/DepartmentController.js
const DepartmentService = require('../services/DepartmentService');
const { validationResult } = require('express-validator');

class DepartmentController {
    async getAllDepartments(req, res) {
        try {
            const departments = await DepartmentService.getAllDepartments();
            res.status(200).json(departments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getDepartmentById(req, res) {
        try {
            const department = await DepartmentService.getDepartmentById(req.params.id);
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
            const newDepartment = await DepartmentService.createDepartment(req.body);
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
            const updatedDepartment = await DepartmentService.updateDepartment(req.params.id, req.body);
            res.status(200).json(updatedDepartment);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async deleteDepartment(req, res) {
        try {
            await DepartmentService.deleteDepartment(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

module.exports = new DepartmentController();
