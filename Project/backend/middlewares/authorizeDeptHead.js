// backend/middlewares/authorizeDeptHead.js
const prisma = require('../prisma');

async function authorizeDeptHead(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    const requestId = parseInt(req.params.id);
    let requestType;

    if (req.baseUrl.includes('leave')) {
        requestType = 'leaveRequest';
    } else if (req.baseUrl.includes('resign')) {
        requestType = 'resignRequest';
    } else if (req.baseUrl.includes('business')) {
        requestType = 'businessTripRequest';
    } else if (req.baseUrl.includes('overtime')) {
        requestType = 'overtimeRequest';
    }

    let model;
    if (requestType === 'leaveRequest') {
        model = prisma.leave_requests;
    } else if (requestType === 'resignRequest') {
        model = prisma.resign_requests;
    } else if (requestType === 'businessTripRequest') {
        model = prisma.business_trip_requests;
    } else if (requestType === 'overtimeRequest') {
        model = prisma.overtime_requests;
    }

    let request = await model.findUnique({
        where: { [`${requestType}ID`]: requestId },
    });
    const employee = await prisma.employees.findUnique({
        where: { employeeID: request.employeeID },
    });
    request = {
        ...request,
        employee: employee
    };

    if (!request) {
        return res.status(404).json({ message: 'Request not found' });
    }

    const dept = await prisma.departments.findUnique({
        where: { departmentID: request.employee.departmentID },
    });

    if (dept.HeadOfDepartmentID !== req.user.employeeID) {
        return res.status(403).json({ message: 'Only head of department can approve' });
    }

    next();
}

module.exports = authorizeDeptHead;