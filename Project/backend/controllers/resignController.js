// backend/controllers/resignController.js

const prisma = require('../prisma');
const { sendNotification } = require('../controllers/notificationController');
const StatusEnum = require('../enum/StatusEnum');

// 📌 1. Nhân viên tạo đơn xin nghỉ
exports.createResignRequest = async (req, res) => {
    try {
        const { employeeID, resignDate, reason } = req.body;

        const resignRequest = await prisma.resign_requests.create({
            data: {
                employeeID,
                resignDate: new Date(resignDate),
                reason,
                statusID: StatusEnum.PENDING,
            },
        });

        // Gửi thông báo đến trưởng phòng
        const employee = await prisma.employees.findUnique({ where: { employeeID } });
        const department = await prisma.departments.findUnique({ where: { departmentID: employee.departmentID } });

        if (department?.HeadOfDepartmentID) {
            await sendNotification(
                resignRequest.resignRequestID,
                "Resign Request",
                department.HeadOfDepartmentID,
                `New resign request from ${employee.fullName}`
            );
        }

        return res.status(201).json({ message: "Resign request created successfully", resignRequest });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// 📌 2. Trưởng phòng duyệt hoặc từ chối đơn xin nghỉ
exports.approveByDeptHead = async (req, res) => {
    try {
        const { resignRequestID, approved } = req.body;
        const headOfDepartmentID = req.user.employeeID; // Lấy từ token

        const resignRequest = await prisma.resign_requests.findUnique({
            where: { resignRequestID },
        });

        if (!resignRequest) {
            return res.status(404).json({ error: "Resign request not found" });
        }

        const updatedRequest = await prisma.resign_requests.update({
            where: { resignRequestID },
            data: {
                statusID: approved == StatusEnum.ACCEPTED_BY_DEPT ? StatusEnum.ACCEPTED_BY_DEPT : StatusEnum.REJECTED_BY_DEPT,
                approvedByDept: headOfDepartmentID,
            },
        });

        // Gửi thông báo đến nhân viên
        await sendNotification(
            resignRequestID,
            "Resign Request",
            resignRequest.employeeID,
            approved == StatusEnum.ACCEPTED_BY_DEPT
                ? "Your resign request has been approved by your Head of Department and sent to HR."
                : "Your resign request has been rejected by your Head of Department."
        );

        return res.status(200).json({ message: "Resign request updated", updatedRequest });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// 📌 3. HR duyệt hoặc từ chối đơn xin nghỉ
exports.approveByHR = async (req, res) => {
    try {
        const { resignRequestID, approved } = req.body;
        const HRID = req.user.employeeID; // Lấy từ token

        const resignRequest = await prisma.resign_requests.findUnique({
            where: { resignRequestID },
        });

        if (!resignRequest) {
            return res.status(404).json({ error: "Resign request not found" });
        }

        if (resignRequest.statusID !== StatusEnum.ACCEPTED_BY_DEPT) {
            return res.status(400).json({ error: "Request must be approved by Head of Department first" });
        }

        const updatedRequest = await prisma.resign_requests.update({
            where: { resignRequestID },
            data: {
                statusID: approved == StatusEnum.ACCEPTED_BY_HR ? StatusEnum.ACCEPTED_BY_HR : StatusEnum.REJECTED_BY_HR,
                approvedBy: HRID,
            },
        });

        // Gửi thông báo đến nhân viên
        await sendNotification(
            resignRequestID,
            "Resign Request",
            resignRequest.employeeID,
            approved == StatusEnum.ACCEPTED_BY_HR
                ? "Your resign request has been approved by HR."
                : "Your resign request has been rejected by HR."
        );

        return res.status(200).json({ message: "Resign request updated", updatedRequest });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// exports.getAllResignRequests = async (req, res) => {
//     try {
//         const resignRequests = await prisma.resign_requests.findMany();
//         const status = await prisma.statuses.findMany();
//         const employee = await prisma.employees.findMany();
//         const department = await prisma.departments.findMany();
//         const role = await prisma.roles.findMany();
//         const resignRequest = resignRequests.map(request => ({
//             ...request,
//             status: status.find(s => s.statusID === request.statusID),
//             employee: employee.find(e => e.employeeID === request.employeeID),
//             department: department.find(d => d.departmentID === request.departmentID),
//             role: role.find(r => r.roleID === request.roleID)
//         }));
//         res.status(200).json(resignRequest);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// };

exports.getAllResignRequests = async (req, res) => {

    try {
        const resignRequest = await prisma.resign_requests.findMany({
            include: {
                employee: {
                    include: {
                        department: true // Lấy thông tin phòng ban
                    }
                },
                status: true // Lấy thông tin trạng thái
            }
        });
        res.status(200).json(resignRequest);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.getResignRequestById = async (req, res) => {
    const { id } = req.params;
    try {
        const resignRequest = await prisma.resign_requests.findUnique({ where: { resignRequestID: parseInt(id) } });
        res.status(200).json(resignRequest);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getRequestByEmployeeID = async (req, res) => {
    const { id } = req.params;
    try {
        const resignRequest = await prisma.resign_requests.findMany({ where: { employeeID: parseInt(id) } });
        res.status(200).json(resignRequest);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.updateResignRequest = async (req, res) => {
    const { id } = req.params;
    const { statusID, approvedBy } = req.body;
    try {
        const updatedRequest = await prisma.resign_requests.update({
            where: { resignRequestID: parseInt(id) },
            data: { statusID, approvedBy },
        });
        res.status(200).json(updatedRequest);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.deleteResignRequest = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.resign_requests.delete({ where: { resignRequestID: parseInt(id) } });
        res.status(200).json({ message: "Resign request deleted" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getAllPendingResignRequests = async (req, res) => {
    try {
        const pendingResignRequests = await prisma.resign_requests.findMany({ where: { statusID: StatusEnum.PENDING } });
        res.status(200).json(pendingResignRequests);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getAllRejectedResignRequests = async (req, res) => {
    try {
        const rejectedResignRequests = await prisma.resign_requests.findMany({ where: { statusID: StatusEnum.REJECTED_BY_DEPT || StatusEnum.REJECTED_BY_HR } });
        res.status(200).json(rejectedResignRequests);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getAllAcceptedRequestsByDept = async (req, res) => {
    try {
        const acceptedResignRequests = await prisma.resign_requests.findMany({ where: { statusID: StatusEnum.ACCEPTED_BY_DEPT } });
        res.status(200).json(acceptedResignRequests);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getAllAcceptedResignRequests = async (req, res) => {
    try {
        const acceptedResignRequests = await prisma.resign_requests.findMany({ where: { statusID: StatusEnum.ACCEPTED_BY_DEPT } });
        res.status(200).json(acceptedResignRequests);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};





