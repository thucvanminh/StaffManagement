// backend/controllers/departmentController.js

const Employee = require('../models/Employee');
const Department = require('../models/Department');

// Lấy danh sách tất cả nhân viên
exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll({
            include: [{
                model: Employee,
                as: 'HeadOfDepartmentIDQuerry',
                attributes: ['fullName'], // Dùng mảng
            }]
        });
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllDepartmentsByID = async (req, res) => {
    try {
        const { id } = req.params;
        const departmentID = await Department.findOne({
            where: { departmentID: id },
            include: [{
                model: Employee,
                as: 'HeadOfDepartmentID',
                attributes: ['employeeName'], // Dùng mảng
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
exports.addDepartment = async (req, res) => {
    try {
        const newDepartment = await Department.create(req.body);
        res.status(201).json(newDepartment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateDepartment = async (req, res) => {
    try {
        const { inputId } = req.params;
        const updateDepartment = await Department.update(req.body, {
            where: { departmentID: inputId }
        });
        res.status(200).json(updateDepartment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        await Department.destroy({ where: { departmentID: id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


}
