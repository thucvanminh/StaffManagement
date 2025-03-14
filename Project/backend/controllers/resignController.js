// backend/controllers/resignController.js

const prisma = require('../prisma');
const { sendNotification } = require('../controllers/notificationController');

// 📌 1. Nhân viên tạo đơn xin nghỉ
exports.createResignRequest = async (req, res) => {
    try {
        const { employeeID, resignDate, reason } = req.body;

        const resignRequest = await prisma.resign_requests.create({
            data: {
                employeeID,
                resignDate: new Date(resignDate),
                reason,
                statusID: 1, // "Pending"
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
                statusID: approved ? 2 : 4, // Nếu duyệt thì chuyển lên HR (2), nếu từ chối thì Rejected (4)
                approvedByDept: headOfDepartmentID,
            },
        });

        // Gửi thông báo đến nhân viên
        await sendNotification(
            resignRequestID,
            "Resign Request",
            resignRequest.employeeID,
            approved == 2
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

        if (resignRequest.statusID !== 2) {
            return res.status(400).json({ error: "Request must be approved by Head of Department first" });
        }

        const updatedRequest = await prisma.resign_requests.update({
            where: { resignRequestID },
            data: {
                statusID: approved ? 3 : 4, // Nếu duyệt thì Approved (3), nếu từ chối thì Rejected (4)
                approvedBy: HRID,
            },
        });

        // Gửi thông báo đến nhân viên
        await sendNotification(
            resignRequestID,
            "Resign Request",
            resignRequest.employeeID,
            approved
                ? "Your resign request has been approved by HR."
                : "Your resign request has been rejected by HR."
        );

        return res.status(200).json({ message: "Resign request updated", updatedRequest });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getAllResignRequests = async (req, res) => {
    const resignRequests = await prisma.resign_requests.findMany();
    res.status(200).json(resignRequests);
};

exports.getResignRequestById = async (req, res) => {
    const { id } = req.params;
    const resignRequest = await prisma.resign_requests.findUnique({ where: { resignRequestID: parseInt(id) } });
    res.status(200).json(resignRequest);
};


exports.updateResignRequest = async (req, res) => {
    const { id } = req.params;
    const { statusID, approvedBy } = req.body;
    const updatedRequest = await prisma.resign_requests.update({
        where: { resignRequestID: parseInt(id) },
        data: { statusID, approvedBy },
    });
    res.status(200).json(updatedRequest);
};

exports.deleteResignRequest = async (req, res) => {
    const { id } = req.params;
    await prisma.resign_requests.delete({ where: { resignRequestID: parseInt(id) } });
    res.status(200).json({ message: "Resign request deleted" });
};




