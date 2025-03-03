// backend/middlewares/authorizeDeptHead.js
const BusinessTripRequest = require('../models/BusinessTripRequest');
const Employee = require('../models/Employee');
const Department = require('../models/Department');

async function authorizeDeptHead(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    const { id } = req.params; // ID của BusinessTripRequest
    const trip = await BusinessTripRequest.findByPk(id, {
        include: [{ model: Employee, as: 'employee' }]
    });
    if (!trip) {
        return res.status(404).json({ message: 'Request not found' });
    }
    const dept = await Department.findOne({ where: { departmentID: trip.employee.departmentID } });
    if (dept.HeadOfDepartmentID !== req.user.employeeID) {
        return res.status(403).json({ message: 'Only head of department can approve' });
    }
    next();
}

module.exports = authorizeDeptHead;