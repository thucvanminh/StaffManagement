// src/controllers/DepartmentController.js
const prisma = require('../prisma');
const { validationResult } = require('express-validator');

class DepartmentController {
    async getAllDepartments(req, res) {
        try {
            const departments = await prisma.departments.findMany({
            });
            const headOfDepartment = await prisma.employees.findMany({
                where: {
                    departmentID: { 
                        in: departments.map(department => department.departmentID)
                    }
                }
            });
            const department = departments.map(department => ({
                ...department,
                headOfDepartment: headOfDepartment.find(employee => employee.departmentID === department.departmentID)
            }));
            res.status(200).json(department);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getDepartmentById(req, res) {
        try {
            const department = await prisma.departments.findUnique({
                where: { departmentID: parseInt(req.params.id) },
            });
            if (!department) throw new Error('Department not found');
            res.status(200).json(department);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async addDepartment(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const { departmentID, departmentName, HeadOfDepartmentID } = req.body;
            const newDepartment = await prisma.departments.create({
                data: {
                    departmentID,
                    departmentName,
                    HeadOfDepartmentID: HeadOfDepartmentID ? parseInt(HeadOfDepartmentID) : null,
                },
            });
            res.status(201).json(newDepartment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateDepartment(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        try {
            const { departmentID, departmentName, HeadOfDepartmentID } = req.body;
            const updatedDepartment = await prisma.departments.update({
                where: { departmentID: parseInt(req.params.id) },
                data: {
                    departmentID: parseInt(departmentID),
                    departmentName,
                    HeadOfDepartmentID: HeadOfDepartmentID ? parseInt(HeadOfDepartmentID) : null,
                },
            });
            res.status(200).json(updatedDepartment);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async deleteDepartment(req, res) {
        try {
            await prisma.departments.delete({
                where: { departmentID: parseInt(req.params.id) },
            });
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    async queryDepartment(req, res) {
        try {
            const { departmentID, HeadOfDepartmentID, departmentName } = req.body;
            const headDepartmentName = await prisma.employees.findUnique({
                where: { employeeID: parseInt(HeadOfDepartmentID) },
                select: { fullName: true }
            });
            const department = await prisma.departments.findUnique({
                where: {
                    ...(departmentID && { departmentID: parseInt(departmentID) }),
                    ...(HeadOfDepartmentID && { HeadOfDepartmentID: parseInt(HeadOfDepartmentID) }),
                    ...(departmentName && { departmentName: departmentName }),
                    ...(headDepartmentName && { headDepartmentName: headDepartmentName })
                }
            });
            res.status(200).json(department);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

module.exports = new DepartmentController();