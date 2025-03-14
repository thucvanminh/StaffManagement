// backend/controllers/businessTripController.js
const prisma = require('../prisma');
const { validationResult } = require('express-validator');

class BusinessTripController {
    async getAllRequests(req, res) {
        try {
            const requests = await prisma.business_trip_requests.findMany({
            });
            const status = await prisma.statuses.findMany();
            const employee = await prisma.employees.findMany();
            const businessTrip = requests.map(request => ({
                ...request,
                status: status.find(s => s.statusID === request.statusID),
                employee: employee.find(e => e.employeeID === request.employeeID)
            }));
            res.status(200).json(businessTrip);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getRequestById(req, res) {
        try {
            const request = await prisma.business_trip_requests.findUnique({
                where: { businessTripID: parseInt(req.params.id) },
            });
            const status = await prisma.statuses.findMany();
            const employee = await prisma.employees.findMany();
            const businessTrip = {
                ...request,
                status: status.find(s => s.statusID === request.statusID),
                employee: employee.find(e => e.employeeID === request.employeeID)
            };
            if (!request) throw new Error('Business trip request not found');
            res.status(200).json(businessTrip);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    // async getRequestByEmployeeID(req, res) {
    //     try {
    //         const requests = await prisma.business_trip_requests.findMany({
    //             where: { employeeID: parseInt(req.params.employeeId) },
    //         });
    //         const status = await prisma.statuses.findMany();
    //         const employee = await prisma.employees.findMany();
    //         const businessTrip = requests.map(request => ({
    //             ...request,
    //             status: status.find(s => s.statusID === request.statusID),
    //             employee: employee.find(e => e.employeeID === request.employeeID)
    //         }));
    //         res.status(200).json(businessTrip);
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // }

    async createRequest(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { employeeID, startDate, endDate, destination, reason: purpose } = req.body;
            const newRequest = await prisma.business_trip_requests.create({
                data: {
                    employeeID: parseInt(employeeID),
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                    destination,
                    reason: purpose,
                    statusID: 1, // Mặc định là "Pending"
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },

            });
            res.status(201).json(newRequest);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateRequest(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { startDate, endDate, destination, purpose, statusID, approvedBy: approverID } = req.body;
            const updatedRequest = await prisma.business_trip_requests.update({
                where: { businessTripID: parseInt(req.params.id) },
                data: {
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                    destination,
                    reason: purpose,
                    statusID: parseInt(statusID),
                    approvedBy: approverID ? parseInt(approverID) : null,
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
                status: status.find(s => s.statusID === request.statusID),
                employee: employee.find(e => e.employeeID === request.employeeID)
            }));
            res.status(200).json(businessTrip);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getRequestsByApprover(req, res) {
        try {
            const requests = await prisma.business_trip_requests.findMany({
                where: { approvedBy: parseInt(req.params.approverId) },

            });
            const status = await prisma.statuses.findMany();
            const employee = await prisma.employees.findMany();
            const businessTrip = requests.map(request => ({
                ...request,
                status: status.find(s => s.statusID === request.statusID),
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
                where: { statusID: 1 }, // Giả sử 1 là "Pending"
                });
            const status = await prisma.statuses.findMany();
            const employee = await prisma.employees.findMany();
            const businessTrip = requests.map(request => ({
                ...request,
                status: status.find(s => s.statusID === request.statusID),
                employee: employee.find(e => e.employeeID === request.employeeID)
            }));
            res.status(200).json(businessTrip);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async approveRequest(req, res) {
        try {
            const updatedRequest = await prisma.business_trip_requests.update({
                where: { businessTripID: parseInt(req.params.id) },
                data: {
                    statusID: 2, // Giả sử 2 là "Approved"
                    approvedBy: req.user.employeeID,
                    updatedAt: new Date(),
                },
            });
            res.status(200).json(updatedRequest);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async rejectRequest(req, res) {
        try {
            const updatedRequest = await prisma.business_trip_requests.update({
                where: { businessTripID: parseInt(req.params.id) },
                data: {
                    statusID: 3, // Giả sử 3 là "Rejected"
                    approvedBy: req.user.employeeID,
                    updatedAt: new Date(),
                },

            });
            res.status(200).json(updatedRequest);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

module.exports = new BusinessTripController();