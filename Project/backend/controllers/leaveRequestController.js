// backend/controllers/leaveRequestController.js

const prisma = require('../prisma');
const { sendNotification } = require('../controllers/notificationController');


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
                statusID: 1, // "Pending"
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
        const leaveRequest = await prisma.leave_requests.findUnique({
            where: { leaveRequestID },
        });

        if (!leaveRequest) {
            return res.status(404).json({ error: "Leave request not found" });
        }

        // Cập nhật trạng thái
        const updatedRequest = await prisma.leave_requests.update({
            where: { leaveRequestID },
            data: {
                statusID: approved == 2 ? 2 : 4, // Nếu duyệt thì Dept Approved (2), nếu từ chối thì Rejected (4)
                approvedByDept: headOfDepartmentID,
            },
        });

        // Gửi thông báo đến nhân viên nếu bị từ chối
        if (approved == 4) {
            await sendNotification(
                leaveRequestID,
                "LEAVEREQUEST",
                leaveRequest.employeeID,
                "Your leave request has been rejected by your Head of Department."
            );
        }

        return res.status(200).json({ message: "Leave request updated", updatedRequest });
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
        if (leaveRequest.statusID !== 2) {
            return res.status(400).json({ error: "Request must be approved by Head of Department first" });
        }

        // Cập nhật trạng thái
        const updatedRequest = await prisma.leave_requests.update({
            where: { leaveRequestID },
            data: {
                statusID: approved == 3 ? 3 : 4, // Nếu duyệt thì Approved (3), nếu từ chối thì Rejected (4)
                approvedBy: HRID,
            },
        });

        // Gửi thông báo đến nhân viên
        await sendNotification(
            leaveRequestID,
            "LEAVEREQUEST",
            leaveRequest.employeeID,
            approved == 3
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

exports.getLeaveRequestsByApprover = async (req, res) => {
    try {
        const { approverID } = req.params;
        const leaveRequests = await prisma.leave_requests.findMany({
            where: { approvedBy: parseInt(approverID) }
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



