// src/controllers/EmployeeController.js
const pool = require('../config/database');
const { validationResult } = require('express-validator');
const { TABLE_NAME, COLUMNS, DEFAULT_SELECT, INSERT_COLUMNS, UPDATE_SET } = require('../models/Employee');

class EmployeeController {
    async getAllEmployees(req, res) {
        try {
            const [employees] = await pool.execute(DEFAULT_SELECT);
            res.status(200).json(employees);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getEmployeeById(req, res) {
        try {
            const [employees] = await pool.execute(`${DEFAULT_SELECT} WHERE e.${COLUMNS.employeeID} = ?`, [req.params.id]);

            if (employees.length === 0) throw new Error('Employee not found');
            res.status(200).json(employees[0]);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async addEmployee(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        try {
            const { 
                fullName, dateOfBirth, hireDay, email, phone, 
                address, city, gender, departmentID, roleID, headOfDepartmentID 
            } = req.body;

            const [result] = await pool.execute(`
                INSERT INTO ${TABLE_NAME} (${INSERT_COLUMNS})
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [fullName, dateOfBirth, hireDay, email, phone, address, city, gender, departmentID, roleID, headOfDepartmentID]);

            const [newEmployee] = await pool.execute(`${DEFAULT_SELECT} WHERE e.${COLUMNS.employeeID} = ?`, [result.insertId]);
            res.status(201).json(newEmployee[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateEmployee(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        try {
            const { 
                fullName, dateOfBirth, hireDay, email, phone, 
                address, city, gender, departmentID, roleID, headOfDepartmentID 
            } = req.body;

            const [result] = await pool.execute(`
                UPDATE ${TABLE_NAME} 
                SET ${UPDATE_SET}
                WHERE ${COLUMNS.employeeID} = ?
            `, [fullName, dateOfBirth, hireDay, email, phone, address, city, gender, departmentID, roleID, headOfDepartmentID, req.params.id]);

            if (result.affectedRows === 0) throw new Error('Employee not found');

            const [updatedEmployee] = await pool.execute(`${DEFAULT_SELECT} WHERE e.${COLUMNS.employeeID} = ?`, [req.params.id]);
            res.status(200).json(updatedEmployee[0]);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async deleteEmployee(req, res) {
        try {
            const [result] = await pool.execute(`DELETE FROM ${TABLE_NAME} WHERE ${COLUMNS.employeeID} = ?`, [req.params.id]);
            if (result.affectedRows === 0) throw new Error('Employee not found');
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
            let query = `SELECT * FROM ${TABLE_NAME} WHERE 1=1`;
            const params = [];

            if (req.query.departmentID) {
                query += ` AND ${COLUMNS.departmentID} = ?`;
                params.push(req.query.departmentID);
            }
            if (req.query.roleID) {
                query += ` AND ${COLUMNS.roleID} = ?`;
                params.push(req.query.roleID);
            }
            if (req.query.fullName) {
                query += ` AND ${COLUMNS.fullName} LIKE ?`;
                params.push(`%${req.query.fullName}%`);
            }

            const [employees] = await pool.execute(query, params);
            res.status(200).json(employees);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async isHeadDepartment(req, res) {
        try {
            const [result] = await pool.execute(`
                SELECT COUNT(*) as count 
                FROM departments 
                WHERE headOfDepartmentID = ?
            `, [req.params.employeeID]);

            res.json({ isHeadOfDepartment: result[0].count > 0 });
        } catch (error) {
            res.status(500).json({ message: 'Error checking department head status', error });
        }
    }
}

module.exports = new EmployeeController();