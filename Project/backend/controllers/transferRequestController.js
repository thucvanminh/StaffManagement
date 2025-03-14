// backend/controllers/transferRequestController.js

const prisma = require('../prisma');
const { sendNotification } = require('./notificationController');
const StatusEnum = require('../enum/StatusEnum');

const getAllTransferRequests = async (req, res) => {
    const transferRequests = await prisma.transfer_requests.findMany();
    const employee = await prisma.employees.findMany();
    const currentDepartment = await prisma.departments.findMany();
    const status = await prisma.statuses.findMany();
    const targetDepartment = await prisma.departments.findMany();
    res.status(200).json({ transferRequests, employee, currentDepartment, status, targetDepartment });
};

const createTransferRequest = async (req, res) => {
    const { employeeID, targetDepartmentID, requestType, description } = req.body;
    const createdBy = req.user.employeeID; // HR tạo

    // Lấy departmentID hiện tại của nhân viên
    const employee = await prisma.employees.findUnique({ where: { employeeID } });
    if (!employee || !employee.departmentID) {
        return res.status(400).json({ message: 'Employee has no current department' });
    }

    const transferRequest = await prisma.transfer_requests.create({
        data: {
            employeeID,
            currentDepartmentID: employee.departmentID,
            targetDepartmentID,
            requestType,
            description,
            statusID: StatusEnum.PENDING,
            createdBy,
        },
    });

    // Lấy thông tin trưởng phòng hiện tại và đích
    const currentDept = await prisma.departments.findUnique({ where: { departmentID: employee.departmentID } });
    const targetDept = await prisma.departments.findUnique({ where: { departmentID: targetDepartmentID } });

    // Gửi thông báo
    await Promise.all([
        sendNotification(
            transferRequest.transferRequestID,
            'TRANSFER',
            employeeID,
            `You have a transfer request to ${targetDept.departmentName}`
        ),
        sendNotification(
            transferRequest.transferRequestID,
            'TRANSFER',
            currentDept.HeadOfDepartmentID,
            `Employee ${employee.fullName} ${employee.birthday} requested transfer from your department`
        ),
        sendNotification(
            transferRequest.transferRequestID,
            'TRANSFER',
            targetDept.HeadOfDepartmentID,
            `Employee ${employee.fullName} ${employee.birthday} requested transfer to your department`
        ),
    ]);

    res.status(201).json(transferRequest);
};


module.exports = { createTransferRequest, getAllTransferRequests };