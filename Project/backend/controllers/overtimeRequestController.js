// backend/controllers/overtimeRequestController.js
const prisma = require('../prisma');
const { sendNotification } = require('./notificationController'); // Giả sử tên file

// Hàm gửi thông báo hàng loạt cho overtime
async function sendOvertimeNotifications(request, id) {
    const notifications = request.employees.map(emp => ({
        requestID: request.overtimeRequestID,
        requestType: 'OVERTIME',
        recipientID: emp.employeeID,
        message: `Overtime request ${id} approved by HR for ${request.date}`,
        sentAt: new Date(),
    }));
    await prisma.notification.createMany({ data: notifications });
}

const createOvertimeRequest = async (req, res) => {
    const { date, hours, reason, employeeIDs } = req.body;
    const deptHeadID = req.user.employeeID;

    const overtimeRequest = await prisma.overtime_requests.create({
        data: {
            date: new Date(date),
            hours,
            reason,
            statusID: 1, // Pending
            employees: {
                create: employeeIDs.map(employeeID => ({ employeeID })),
            },
        },
    });

    res.status(201).json(overtimeRequest);
};

const approveByHR = async (req, res) => {
    const { id } = req.params;

    let updatedRequest = await prisma.overtime_requests.update({
        where: { overtimeRequestID: parseInt(id) },
        data: { statusID: 2, approvedBy: req.user.employeeID }, // Approved by HR
    });
    const employees = await prisma.overtime_employees.findMany({
        where: { overtimeRequestID: parseInt(id) }
    });

    updatedRequest = {
        ...updatedRequest, employees
    }
    await sendOvertimeNotifications(updatedRequest, id);

    res.json(updatedRequest);
};

const rejectByHR = async (req, res) => {
    const { id } = req.params;

    const updatedRequest = await prisma.overtime_requests.update({
        where: { overtimeRequestID: parseInt(id) },
        data: { statusID: 3, approvedBy: req.user.employeeID }, // Rejected by HR
    });

    // Optional: Gửi thông báo từ chối cho trưởng phòng nếu cần
    await sendNotification(
        updatedRequest.overtimeRequestID,
        'OVERTIME',
        req.user.employeeID,
        `Overtime request ${id} rejected by HR`
    );

    res.json(updatedRequest);
};

module.exports = {
    createOvertimeRequest,
    approveByHR,
    rejectByHR,
};