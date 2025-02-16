// src/controllers/EmployeeController.js
const EmployeeService = require('../services/EmployeeService');
const { validationResult } = require('express-validator');

class EmployeeController {
    async getAllEmployees(req, res) {
        try {
            const employees = await EmployeeService.getAllEmployees();
            res.status(200).json(employees);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getEmployeeById(req, res) {
        try {
            const employee = await EmployeeService.getEmployeeById(req.params.id);
            res.status(200).json(employee);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async addEmployee(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        try {
            const newEmployee = await EmployeeService.createEmployee(req.body);
            res.status(201).json(newEmployee);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateEmployee(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        try {
            const updatedEmployee = await EmployeeService.updateEmployee(req.params.id, req.body);
            res.status(200).json(updatedEmployee);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async deleteEmployee(req, res) {
        try {
            await EmployeeService.deleteEmployee(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async queryEmployee(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        try {
            const employees = await EmployeeService.queryEmployees(req.query);
            res.status(200).json(employees);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new EmployeeController();
