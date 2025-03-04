// backend/controllers/BusinessTripController.js
const BusinessTripRequest = require('../models/BusinessTripRequest');
const Employee = require('../models/Employee');
const Department = require('../models/Department');
const Notification = require('../models/Notification');
const Status = require('../models/Status');

class  businessTripController {
    async createTripRequest  (req, res)  {
        try {
            const { destination, startDate, endDate, reason } = req.body;
            const employeeID = req.user.employeeID; // Lấy từ token

            const tripRequest = await BusinessTripRequest.create({
                employeeID,
                destination,
                startDate,
                endDate,
                reason,
                statusID: 1, // Pending
            });

            // Tạo thông báo cho Head of Department
            const employee = await Employee.findByPk(employeeID, {
                include: [{ model: Department, as: 'department' }],
            });
            const headOfDeptID = employee.department.HeadOfDepartmentID;

            await Notification.create({
                requestID: tripRequest.businessTripID,
                requestType: 'BusinessTrip',
                recipientID: headOfDeptID,
                message: `New business trip request from ${employee.fullName} needs your approval.`,
                sentAt: new Date(),
            });

            res.status(201).json({ message: 'Trip request created', data: tripRequest });
        } catch (error) {
            res.status(500).json({ message: 'Error creating request', error: error.message });
        }
    };

    async getAllBusinessTripRequest  (req, res)  {
        try {
            const user = req.user;
            let trips;

            if (user.roleID === 1 || user.roleID === 2) {
                // Director hoặc HR: Xem tất cả request
                trips = await BusinessTripRequest.findAll({
                    include: [
                        { model: Employee, as: 'employee', attributes: ['employeeID', 'fullName'] },
                        { model: Status, as: 'status' },

                    ]
                });
            } else {
                // Head of Department: Chỉ xem request của nhân viên trong phòng ban
                const dept = await Department.findOne({ where: { HeadOfDepartmentID: user.employeeID } });
                if (!dept) return res.status(403).json({ message: 'Not a department head' });

                trips = await BusinessTripRequest.findAll({
                    include: [
                        {
                            model: Employee,
                            as: 'employee',
                            where: { departmentID: dept.departmentID },
                        },
                        { model: Status, as: 'status' },
                    ],
                });
            }

            res.status(200).json(trips);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching requests', error: error.message });
        }
    };

    async approveByDept  (req, res) {
        try {
            const { id } = req.params;
            const trip = await BusinessTripRequest.findByPk(id);
            if (!trip) return res.status(404).json({ message: 'Request not found' });

            // Cập nhật trạng thái sang "Dept Approved"
            trip.statusID = 2;
            trip.approvedByDept = req.user.employeeID;
            await trip.save();

            // Gửi thông báo cho HR (roleID = 2, có thể gửi cho một HR cụ thể)
            const hr = await Employee.findOne({ where: { roleID: 2 } });
            await Notification.create({
                requestID: trip.businessTripID,
                requestType: 'BusinessTrip',
                recipientID: hr.employeeID,
                message: `Business trip request #${id} approved by dept, awaiting your approval.`,
                sentAt: new Date(),
            });

            res.status(200).json({ message: 'Approved by department', data: trip });
        } catch (error) {
            res.status(500).json({ message: 'Error approving request', error: error.message });
        }
    };

    async approveByHR  (req, res) {
        try {
            const { id } = req.params;
            const trip = await BusinessTripRequest.findByPk(id);
            if (!trip) return res.status(404).json({ message: 'Request not found' });

            // Cập nhật trạng thái sang "Approved"
            trip.statusID = 3;
            trip.approvedBy = req.user.employeeID;
            await trip.save();

            // Gửi thông báo cho nhân viên
            await Notification.create({
                requestID: trip.businessTripID,
                requestType: 'BusinessTrip',
                recipientID: trip.employeeID,
                message: `Your business trip request #${id} has been approved by HR.`,
                sentAt: new Date(),
            });

            res.status(200).json({ message: 'Approved by HR', data: trip });
        } catch (error) {
            res.status(500).json({ message: 'Error approving request', error: error.message });
        }
    };

    async rejectRequest  (req, res)  {
        try {
            const { id } = req.params;
            const trip = await BusinessTripRequest.findByPk(id);
            if (!trip) return res.status(404).json({ message: 'Request not found' });

            // Chỉ Head of Dept hoặc HR mới được reject
            const user = req.user;
            const dept = await Department.findOne({
                where: { HeadOfDepartmentID: user.employeeID },
            });
            const isHeadOfDept = dept && trip.employee.departmentID === dept.departmentID;
            const isHR = user.roleID === 2;

            if (!isHeadOfDept && !isHR) {
                return res.status(403).json({ message: 'Unauthorized to reject this request' });
            }

            // Cập nhật trạng thái sang "Rejected"
            trip.statusID = 4;
            if (isHeadOfDept) trip.approvedByDept = user.employeeID; // Ghi nhận người reject
            if (isHR) trip.approvedBy = user.employeeID;
            await trip.save();

            // Gửi thông báo cho nhân viên
            await Notification.create({
                requestID: trip.businessTripID,
                requestType: 'BusinessTrip',
                recipientID: trip.employeeID,
                message: `Your business trip request #${id} has been rejected by ${isHeadOfDept ? 'Dept Head' : 'HR'}.`,
                sentAt: new Date(),
            });

            res.status(200).json({ message: 'Request rejected', data: trip });
        } catch (error) {
            res.status(500).json({ message: 'Error rejecting request', error: error.message });
        }
    };

}

module.exports = new businessTripController();