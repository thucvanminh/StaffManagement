const prisma = require('../prisma');
const { validationResult } = require('express-validator');
const StatusEnum = require('../enum/StatusEnum');


class BusinessTripController {
    async getAllRequests(req, res) {
        try {
            // const requests = await prisma.business_trip_requests.findMany({});
            // const status = await prisma.statuses.findMany();
            // const employee = await prisma.employees.findMany();
            // const role = await prisma.roles.findMany();
            // const department = await prisma.departments.findMany();
            // const businessTrip = requests.map(request => ({
            //     ...request,
            //     status: status.find(s => s.statusID === getDynamicStatus(request)),
            //     employee: employee.find(e => e.employeeID === request.employeeID),
            //     department: department.find(d => d.departmentID === request.departmentID),
            //     role: role.find(r => r.roleID === request.roleID)
            // }));
            // Lấy dữ liệu business_trip_requests và sắp xếp theo updatedAt giảm dần
            const requests = await prisma.business_trip_requests.findMany({
                orderBy: {
                    updatedAt: 'desc', // Sắp xếp giảm dần (mới nhất trước)
                },
            });

            // Lấy dữ liệu liên quan riêng lẻ
            const employees = await prisma.employees.findMany();
            const statuses = await prisma.statuses.findMany();
            const roles = await prisma.roles.findMany();
            const departments = await prisma.departments.findMany();

            // Ghép dữ liệu thủ công
            const businessTrips = requests.map(request => {
                const employee = employees.find(e => e.employeeID === request.employeeID);
                const status = statuses.find(s => s.statusID === getDynamicStatus(request));
                const role = employee ? roles.find(r => r.roleID === employee.roleID) : null;
                const department = employee && employee.departmentID
                    ? departments.find(d => d.departmentID === employee.departmentID)
                    : null;

                return {
                    businessTripID: request.businessTripID,
                    employeeID: request.employeeID,
                    destination: request.destination,
                    startDate: request.startDate,
                    endDate: request.endDate,
                    reason: request.reason,
                    status: {
                        statusID: status.statusID,
                        statusName: status.statusName,
                    },
                    employee: employee ? {
                        fullName: employee.fullName,
                        role: role ? { roleName: role.roleName } : null,
                        department: department ? { departmentName: department.departmentName } : null,
                    } : null,
                };
            });
            res.status(200).json(businessTrips);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getRequestById(req, res) {
        try {
            const request = await prisma.business_trip_requests.findUnique({
                where: { businessTripID: parseInt(req.params.id) },
            });
            if (!request) throw new Error('Business trip request not found');
            const status = await prisma.statuses.findMany();
            const employee = await prisma.employees.findMany();
            const businessTrip = {
                ...request,
                status: status.find(s => s.statusID === getDynamicStatus(request)),
                employee: employee.find(e => e.employeeID === request.employeeID)
            };
            res.status(200).json(businessTrip);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async createRequest(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const { employeeID, startDate, endDate, destination, reason } = req.body;
            const newRequest = await prisma.business_trip_requests.create({
                data: {
                    employeeID: parseInt(employeeID),
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                    destination,
                    reason,
                    statusID: StatusEnum.PENDING,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    createdBy: req.user.employeeID // HR creates request
                },
            });

            await prisma.notifications.create({
                data: {
                    requestID: newRequest.businessTripID,
                    requestType: 'business_trip',
                    recipientID: parseInt(employeeID),
                    message: `You have a new business trip request to ${destination} from ${startDate} to ${endDate}.`,
                    sentAt: new Date()
                }
            });

            res.status(201).json(newRequest);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateRequest(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const { startDate, endDate, destination, reason } = req.body;
            const updatedRequest = await prisma.business_trip_requests.update({
                where: { businessTripID: parseInt(req.params.id) },
                data: {
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                    destination,
                    reason,
                    updatedAt: new Date(),
                },
            });
            res.status(200).json(updatedRequest);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async deleteRequest(req, res) {
        try {
            await prisma.business_trip_requests.delete({
                where: { businessTripID: parseInt(req.params.id) },
            });
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async getRequestsByEmployee(req, res) {
        try {
            const requests = await prisma.business_trip_requests.findMany({
                where: { employeeID: parseInt(req.params.employeeId) },
            });
            const status = await prisma.statuses.findMany();
            const employee = await prisma.employees.findMany();
            const businessTrip = requests.map(request => ({
                ...request,
                status: status.find(s => s.statusID === getDynamicStatus(request)),
                employee: employee.find(e => e.employeeID === request.employeeID)
            }));
            res.status(200).json(businessTrip);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getPendingRequests(req, res) {
        try {
            const requests = await prisma.business_trip_requests.findMany({
                where: { statusID: StatusEnum.PENDING },
            });
            const status = await prisma.statuses.findMany();
            const employee = await prisma.employees.findMany();
            const businessTrip = requests.map(request => ({
                ...request,
                status: status.find(s => s.statusID === getDynamicStatus(request)),
                employee: employee.find(e => e.employeeID === request.employeeID)
            }));
            res.status(200).json(businessTrip);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

// Helper function to determine dynamic status
const getDynamicStatus = (request) => {
    const now = new Date();
    if (now >= request.endDate) return StatusEnum.FINISHED;
    if (now >= request.startDate) return StatusEnum.IN_PROCESS;
    return request.statusID; // Default to stored status (e.g., PENDING)
};

module.exports = new BusinessTripController();