// backend/controllers/leaveRequestController.js

const prisma = require('../prisma');
const { sendNotification } = require('../controllers/notificationController');
const StatusEnum = require('../enum/StatusEnum');


// 1. Nhân viên tạo yêu cầu nghỉ phép
exports.createLeaveRequest = async (req, res) => {
    try {
        const { employeeID, startDate, endDate, reason } = req.body;

        const leaveRequest = await prisma.leave_requests.create({
            data: {
                employeeID,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                reason,
                statusID: StatusEnum.PENDING,
            },
        });

        return res.status(201).json({ message: "Leave request created successfully", leaveRequest });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// 2. Trưởng phòng duyệt hoặc từ chối yêu cầu
exports.approveByDept = async (req, res) => {
    try {
        const { leaveRequestID, approved, headOfDepartmentID } = req.body;

        // Kiểm tra yêu cầu nghỉ phép có tồn tại không
        let leaveRequest = await prisma.leave_requests.findUnique({
            where: { leaveRequestID },
        });

        if (!leaveRequest) {
            return res.status(404).json({ error: "Leave request not found" });
        }

        // Cập nhật trạng thái
        const updatedRequest = await prisma.leave_requests.update({
            where: { leaveRequestID },
            data: {
                statusID: approved == StatusEnum.ACCEPTED_BY_DEPT ? StatusEnum.ACCEPTED_BY_DEPT : StatusEnum.REJECTED_BY_DEPT, // Nếu duyệt thì Dept Approved (2), nếu từ chối thì Rejected (4)
                approvedByDept: headOfDepartmentID,
            },
        });

        // Gửi thông báo đến nhân viên nếu bị từ chối
        if (approved == StatusEnum.REJECTED_BY_DEPT) {
            await sendNotification(
                leaveRequestID,
                "LEAVEREQUEST",
                leaveRequest.employeeID,
                "Your leave request has been rejected by your Head of Department."
            );
            leaveRequest = await prisma.leave_requests.update({
                where: { leaveRequestID },
                data: {
                    statusID: StatusEnum.REJECTED_BY_DEPT,
                },
            });
        }

        return res.status(200).json({ message: "Leave request updated", leaveRequest });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// 3. HR duyệt hoặc từ chối yêu cầu
exports.approveByHR = async (req, res) => {
    try {
        const { leaveRequestID, approved, HRID } = req.body;

        // Kiểm tra yêu cầu nghỉ phép có tồn tại không
        const leaveRequest = await prisma.leave_requests.findUnique({
            where: { leaveRequestID },
        });

        if (!leaveRequest) {
            return res.status(404).json({ error: "Leave request not found" });
        }

        // Kiểm tra xem đã được trưởng phòng duyệt chưa
        if (leaveRequest.statusID !== StatusEnum.ACCEPTED_BY_DEPT) {
            return res.status(400).json({ error: "Request must be approved by Head of Department first" });
        }

        // Cập nhật trạng thái
        const updatedRequest = await prisma.leave_requests.update({
            where: { leaveRequestID },
            data: {
                statusID: approved == StatusEnum.ACCEPTED_BY_HR ? StatusEnum.ACCEPTED_BY_HR : StatusEnum.REJECTED_BY_HR, // Nếu duyệt thì Approved (3), nếu từ chối thì Rejected (4)
                approvedBy: HRID,
            },
        });

        // Gửi thông báo đến nhân viên
        await sendNotification(
            leaveRequestID,
            "LEAVEREQUEST",
            leaveRequest.employeeID,
            approved == StatusEnum.ACCEPTED_BY_HR
                ? "Your leave request has been approved by HR."
                : "Your leave request has been rejected by HR."
        );

        return res.status(200).json({ message: "Leave request updated", updatedRequest });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getAllLeaveRequests = async (req, res) => {
    try {
        const leaveRequests = await prisma.leave_requests.findMany();
        const status = await prisma.statuses.findMany();
        const employee = await prisma.employees.findMany();
        const leaveRequest = leaveRequests.map(request => ({
            ...request,
            status: status.find(s => s.statusID === request.statusID),
            employee: employee.find(e => e.employeeID === request.employeeID)
        }));
        res.status(200).json(leaveRequest);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getLeaveRequestsByEmployeeID = async (req, res) => {
    try {
        const { employeeID } = req.params;
        const leaveRequests = await prisma.leave_requests.findMany({
            where: { employeeID: parseInt(employeeID) }
        });
        const status = await prisma.statuses.findMany();
        const employee = await prisma.employees.findMany();
        const leaveRequest = leaveRequests.map(request => ({
            ...request,
            status: status.find(s => s.statusID === request.statusID),
            employee: employee.find(e => e.employeeID === request.employeeID)
        }));
        res.status(200).json(leaveRequest);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getAllPendingLeaveRequests = async (req, res) => {
    try {
        const pendingLeaveRequests = await prisma.leave_requests.findMany({
            where: { statusID: StatusEnum.PENDING }
        });
        res.status(200).json(pendingLeaveRequests);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getAllRejectedLeaveRequests = async (req, res) => {
    try {
        const rejectedLeaveRequests = await prisma.leave_requests.findMany({
            where: { statusID: StatusEnum.REJECTED_BY_DEPT || StatusEnum.REJECTED_BY_HR }
        });
        res.status(200).json(rejectedLeaveRequests);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getAllAcceptedRequestsByDept = async (req, res) => {
    try {
        const acceptedLeaveRequests = await prisma.leave_requests.findMany({
            where: { statusID: StatusEnum.ACCEPTED_BY_DEPT }
        });
        res.status(200).json(acceptedLeaveRequests);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getAllAcceptedLeaveRequests = async (req, res) => {
    try {
        const acceptedLeaveRequests = await prisma.leave_requests.findMany({
            where: { statusID: StatusEnum.ACCEPTED_BY_HR }
        });
        res.status(200).json(acceptedLeaveRequests);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};






