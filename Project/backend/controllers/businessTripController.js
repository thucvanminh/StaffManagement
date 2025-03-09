// backend/controllers/businessTripController.js
const pool = require('../config/database');
const { validationResult } = require('express-validator');
const { 
    TABLE_NAME, 
    COLUMNS, 
    DEFAULT_SELECT, 
    INSERT_COLUMNS, 
    UPDATE_SET,
    SPECIAL_QUERIES 
} = require('../models/BusinessTripRequest');

class BusinessTripController {
    async getAllRequests(req, res) {
        try {
            const [requests] = await pool.execute(DEFAULT_SELECT);
            res.status(200).json(requests);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getRequestById(req, res) {
        try {
            const [requests] = await pool.execute(`${DEFAULT_SELECT} WHERE btr.${COLUMNS.requestID} = ?`, [req.params.id]);
            
            if (requests.length === 0) {
                throw new Error('Business trip request not found');
            }
            
            res.status(200).json(requests[0]);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async createRequest(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const {
                employeeID,
                startDate,
                endDate,
                destination,
                purpose
            } = req.body;

            const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
            
            const [result] = await pool.execute(`
                INSERT INTO ${TABLE_NAME} (${INSERT_COLUMNS})
                VALUES (?, ?, ?, ?, ?, 1, NULL, ?, ?)
            `, [employeeID, startDate, endDate, destination, purpose, now, now]);

            const [newRequest] = await pool.execute(
                `${DEFAULT_SELECT} WHERE btr.${COLUMNS.requestID} = ?`, 
                [result.insertId]
            );

            res.status(201).json(newRequest[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateRequest(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const {
                startDate,
                endDate,
                destination,
                purpose,
                statusID,
                approverID
            } = req.body;

            const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

            const [result] = await pool.execute(`
                UPDATE ${TABLE_NAME} 
                SET ${UPDATE_SET}
                WHERE ${COLUMNS.requestID} = ?
            `, [startDate, endDate, destination, purpose, statusID, approverID, now, req.params.id]);

            if (result.affectedRows === 0) {
                throw new Error('Business trip request not found');
            }

            const [updatedRequest] = await pool.execute(
                `${DEFAULT_SELECT} WHERE btr.${COLUMNS.requestID} = ?`, 
                [req.params.id]
            );

            res.status(200).json(updatedRequest[0]);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async deleteRequest(req, res) {
        try {
            const [result] = await pool.execute(
                `DELETE FROM ${TABLE_NAME} WHERE ${COLUMNS.requestID} = ?`, 
                [req.params.id]
            );

            if (result.affectedRows === 0) {
                throw new Error('Business trip request not found');
            }

            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async getRequestsByEmployee(req, res) {
        try {
            const [requests] = await pool.execute(SPECIAL_QUERIES.GET_BY_EMPLOYEE, [req.params.employeeId]);
            res.status(200).json(requests);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getRequestsByApprover(req, res) {
        try {
            const [requests] = await pool.execute(SPECIAL_QUERIES.GET_BY_APPROVER, [req.params.approverId]);
            res.status(200).json(requests);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getPendingRequests(req, res) {
        try {
            const [requests] = await pool.execute(SPECIAL_QUERIES.GET_PENDING);
            res.status(200).json(requests);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async approveRequest(req, res) {
        try {
            const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
            
            const [result] = await pool.execute(`
                UPDATE ${TABLE_NAME}
                SET ${COLUMNS.statusID} = 2,
                    ${COLUMNS.approverID} = ?,
                    ${COLUMNS.updatedAt} = ?
                WHERE ${COLUMNS.requestID} = ?
            `, [req.user.employeeID, now, req.params.id]);

            if (result.affectedRows === 0) {
                throw new Error('Business trip request not found');
            }

            const [updatedRequest] = await pool.execute(
                `${DEFAULT_SELECT} WHERE btr.${COLUMNS.requestID} = ?`, 
                [req.params.id]
            );

            res.status(200).json(updatedRequest[0]);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async rejectRequest(req, res) {
        try {
            const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
            
            const [result] = await pool.execute(`
                UPDATE ${TABLE_NAME}
                SET ${COLUMNS.statusID} = 3,
                    ${COLUMNS.approverID} = ?,
                    ${COLUMNS.updatedAt} = ?
                WHERE ${COLUMNS.requestID} = ?
            `, [req.user.employeeID, now, req.params.id]);

            if (result.affectedRows === 0) {
                throw new Error('Business trip request not found');
            }

            const [updatedRequest] = await pool.execute(
                `${DEFAULT_SELECT} WHERE btr.${COLUMNS.requestID} = ?`, 
                [req.params.id]
            );

            res.status(200).json(updatedRequest[0]);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

module.exports = new BusinessTripController();