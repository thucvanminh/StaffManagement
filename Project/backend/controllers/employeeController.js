// src/controllers/EmployeeController.js
const Employee = require('../models/Employee');
const Department = require('../models/Department');
const Roles = require('../models/Roles');
const { validationResult } = require('express-validator');

class EmployeeController {
    async getAllEmployees(req, res) {
        try {
            const employees = await Employee.findAll({
                include: [
                    { model: Department, as: 'department', attributes: ['departmentID', 'departmentName'] },
                    { model: Roles, as: 'role', attributes: ['roleID', 'roleName'] },
                    { model: Employee, as: 'headOfDepartment', attributes: ['employeeID', 'fullName'] }
                ]
            });
            res.status(200).json(employees);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getEmployeeById(req, res) {
        try {
            const employee = await Employee.findOne({
                where: { employeeID: req.params.id },
                include: [
                    { model: Department, as: 'department', attributes: ['departmentID', 'departmentName'] },
                    { model: Roles, as: 'role', attributes: ['roleID', 'roleName'] },
                    { model: Employee, as: 'headOfDepartment', attributes: ['employeeID', 'fullName'] }
                ]
            });
            if (!employee) throw new Error('Employee not found');
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
            const newEmployee = await Employee.create(req.body);
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
            const [updated] = await Employee.update(req.body, { where: { employeeID: req.params.id } });
            if (updated === 0) throw new Error('Employee not found');
            const updatedEmployee = await Employee.findOne({ where: { employeeID: req.params.id } });
            res.status(200).json(updatedEmployee);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async deleteEmployee(req, res) {
        try {
            const employee = await Employee.findOne({ where: { employeeID: req.params.id } });
            if (!employee) throw new Error('Employee not found');
            await employee.destroy();
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
            const employees = await Employee.findAll({ where: req.query });
            res.status(200).json(employees);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new EmployeeController();