// backend/controllers/overtimeRequestController.js
const prisma = require('../prisma');
const { sendNotification } = require('./notificationController'); // Giả sử tên file
const { StatusEnum } = require('../enum/statusEnum');
const { where } = require('sequelize');

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

async function createOvertimeRequest(req, res) {
    const { date, hours, reason, employeeIDs } = req.body;
    const deptHeadID = req.user.employeeID;

    const overtimeRequest = await prisma.overtime_requests.create({
        data: {
            date: new Date(date),
            hours,
            reason,
            statusID: StatusEnum.PENDING, // Pending
            employees: {
                create: employeeIDs.map(employeeID => ({ employeeID })),
            },
        },
    });

    res.status(201).json(overtimeRequest);
};

// async function getAllOvertimeRequests(req, res) {
//     try {
//         // Lấy tất cả yêu cầu tăng ca
//         const overtimeRequests = await prisma.overtime_requests.findMany({
//             orderBy: {
//                 createdAt: 'desc'
//             }
//         });

//         // Lấy thông tin nhân viên và trạng thái cho mỗi yêu cầu
//         const requestsWithDetails = await Promise.all(
//             overtimeRequests.map(async (request) => {
//                 // Lấy thông tin nhân viên
//                 const employees = await prisma.overtime_employees.findMany({
//                     where: {
//                         overtimeRequestID: request.overtimeRequestID
//                     },
//                     include: {
//                         employee: {
//                             select: {
//                                 employeeID: true,
//                                 fullName: true,
//                                 email: true,
//                                 departmentID: true
//                             }
//                         }
//                     }
//                 });

//                 // Lấy thông tin trạng thái
//                 const status = await prisma.statuses.findUnique({
//                     where: {
//                         statusID: request.statusID
//                     },
//                     select: {
//                         statusID: true,
//                         statusName: true,
//                         description: true
//                     }
//                 });

//                 return {
//                     ...request,
//                     employees: employees.map(oe => oe.employee),
//                     statusName: status.statusName,
//                     statusDescription: status.description
//                 };
//             })
//         );

//         res.status(200).json(requestsWithDetails);
//     } catch (error) {
//         console.error('Error in getAllOvertimeRequests:', error);
//         res.status(500).json({ 
//             error: "Internal Server Error",
//             message: error.message 
//         });
//     }
// };

// backend/controllers/overtimeRequestController.js
async function getAllOvertimeRequests(req, res) {
    try {
        const overtimeRequests = await prisma.overtime_requests.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                overtime_employees: {
                    include: {
                        employee: {
                            select: {
                                employeeID: true,
                                fullName: true,
                                email: true,
                                departmentID: true,
                                roleID: true,
                                department: { // Include department
                                    select: {
                                        departmentName: true,
                                    },
                                },
                            },
                        },
                    },
                },
                status: {
                    select: {
                        statusID: true,
                        statusName: true,
                        description: true,
                    },
                },
            },
        });

        const requestsWithDetails = overtimeRequests.map((request) => ({
            ...request,
            employees: request.overtime_employees.map((oe) => ({
                ...oe.employee,
                departmentName: oe.employee.department?.departmentName || 'N/A', // Xử lý trường hợp null
            })),
            statusName: request.status.statusName,
            statusDescription: request.status.description,
            overtime_employees: undefined,
            status: undefined,
        }));

        res.status(200).json(requestsWithDetails);
    } catch (error) {
        console.error('Error in getAllOvertimeRequests:', error);
        res.status(500).json({
            error: "Internal Server Error",
            message: error.message,
        });
    }
};


async function approveByHR(req, res) {
    const { id } = req.params;

    let updatedRequest = await prisma.overtime_requests.update({
        where: { overtimeRequestID: parseInt(id) },
        data: { statusID: StatusEnum.ACCEPTED_BY_HR, approvedBy: req.user.employeeID }, // Approved by HR
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

async function rejectByHR(req, res) {
    const { id } = req.params;

    const updatedRequest = await prisma.overtime_requests.update({
        where: { overtimeRequestID: parseInt(id) },
        data: { statusID: StatusEnum.REJECTED_BY_HR, approvedBy: req.user.employeeID }, // Rejected by HR
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

async function getRequestByEmployeeID(req, res) {
    const { id } = req.params;
    try {
        const overtimeRequest = await prisma.overtime_requests.findMany({
            where: { employees: { some: { employeeID: parseInt(id) } } }
        });
        res.status(200).json(overtimeRequest);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

async function getRequestByRequestID(req, res) {
    const { id } = req.params;
    try {
        const overtimeRequest = await prisma.overtime_requests.findUnique({
            where: { overtimeRequestID: parseInt(id) }
        });
        res.status(200).json(overtimeRequest);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

async function getAllPendingOvertimeRequests(req, res) {
    try {
        const pendingOvertimeRequests = await prisma.overtime_requests.findMany({
            where: { statusID: StatusEnum.PENDING }
        });
        res.status(200).json(pendingOvertimeRequests);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

async function getAllRejectedOvertimeRequests(req, res) {
    try {
        const rejectedOvertimeRequests = await prisma.overtime_requests.findMany({
            where: { statusID: StatusEnum.REJECTED_BY_HR }
        });
        res.status(200).json(rejectedOvertimeRequests);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

async function getAllAcceptedOvertimeRequests(req, res) {
    try {
        const acceptedOvertimeRequests = await prisma.overtime_requests.findMany({
            where: { statusID: StatusEnum.ACCEPTED_BY_HR }
        });
        res.status(200).json(acceptedOvertimeRequests);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};



module.exports = {
    createOvertimeRequest,
    approveByHR,
    rejectByHR,
    getAllOvertimeRequests,
    getAllPendingOvertimeRequests,
    getAllRejectedOvertimeRequests,
    getAllAcceptedOvertimeRequests,
    getRequestByEmployeeID,
    getRequestByRequestID
};