// src/controllers/DepartmentController.js
const pool = require('../config/database');
const { validationResult } = require('express-validator');
const { TABLE_NAME, COLUMNS, DEFAULT_SELECT, INSERT_COLUMNS, UPDATE_SET } = require('../models/Department');

class DepartmentController {
    async getAllDepartments(req, res) {
        try {
            const [departments] = await pool.execute(DEFAULT_SELECT);
            res.status(200).json(departments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getDepartmentById(req, res) {
        try {
            const [departments] = await pool.execute(`${DEFAULT_SELECT} WHERE d.${COLUMNS.departmentID} = ?`, [req.params.id]);
            if (departments.length === 0) throw new Error('Department not found');
            res.status(200).json(departments[0]);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async addDepartment(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        try {
            const { departmentName, HeadOfDepartmentID } = req.body;
            const [result] = await pool.execute(`
                INSERT INTO ${TABLE_NAME} (${INSERT_COLUMNS})
                VALUES (?, ?)
            `, [departmentName, HeadOfDepartmentID]);

            const [newDepartment] = await pool.execute(`${DEFAULT_SELECT} WHERE d.${COLUMNS.departmentID} = ?`, [result.insertId]);
            res.status(201).json(newDepartment[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateDepartment(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        try {
            const { departmentName, HeadOfDepartmentID } = req.body;
            const [result] = await pool.execute(`
                UPDATE ${TABLE_NAME} 
                SET ${UPDATE_SET}
                WHERE ${COLUMNS.departmentID} = ?
            `, [departmentName, HeadOfDepartmentID, req.params.id]);

            if (result.affectedRows === 0) throw new Error('Department not found');

            const [updatedDepartment] = await pool.execute(`${DEFAULT_SELECT} WHERE d.${COLUMNS.departmentID} = ?`, [req.params.id]);
            res.status(200).json(updatedDepartment[0]);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async deleteDepartment(req, res) {
        try {
            const [result] = await pool.execute(`DELETE FROM ${TABLE_NAME} WHERE ${COLUMNS.departmentID} = ?`, [req.params.id]);
            if (result.affectedRows === 0) throw new Error('Department not found');
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

module.exports = new DepartmentController();