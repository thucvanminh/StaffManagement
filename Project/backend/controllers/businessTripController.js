const BusinessTripRequest = require('../models/BusinessTripRequest');
const Notification =  require('../models/Notification');
const Employee =  require('../models/Employee');
class BusinessTripController {
    async getAllBusinessTripRequest  (req, res)  {
        try{
            const allBusinessTrip = await BusinessTripRequest.findAll({
                include: [
                    {model: Employee, as: 'employee', attributes: ['employeeID', 'fullName']},
                ]
            },{attributes: {exclude: ['employeeID']}}
                );
            res.status(200).json(allBusinessTrip);
        }catch (error){
            res.status(500).json({error: error.message});
        }
    };

    async createTripRequest  (req, res)  {
        const { employeeID, destination, startDate, endDate, reason } = req.body;
        const trip = await BusinessTripRequest.create({
            employeeID,
            destination,
            startDate,
            endDate,
            reason,
            statusID: 1 // Pending
        });
        res.status(201).json(trip);
    };

    async approveByDept  (req, res) {
        const { id } = req.params;
        const { deptHeadID } = req.body; // ID trưởng phòng duyệt
        const trip = await BusinessTripRequest.findByPk(id);
        if (!trip || trip.statusID !== 1) return res.status(400).json({ error: 'Invalid request' });

        await trip.update({ statusID: 2, approvedByDept: deptHeadID }); // Dept_Approved
        res.status(200).json(trip);
    };

    async approveByHR  (req, res)  {
        const { id } = req.params;
        const { hrID } = req.body; // ID HR duyệt
        const trip = await BusinessTripRequest.findByPk(id);
        if (!trip || trip.statusID !== 2) return res.status(400).json({ error: 'Invalid request' });

        await trip.update({ statusID: 3, approvedBy: hrID }); // HR_Approved
        await Notification.create({
            requestID: id,
            requestType: 'BusinessTrip',
            recipientID: trip.employeeID,
            message: 'Yêu cầu công tác của bạn đã được duyệt bởi HR.'
        });
        res.status(200).json(trip);
    };

    async rejectRequest  (req, res)  {
        const { id } = req.params;
        const { rejectorID, role } = req.body; // rejectorID: ID người từ chối, role: 'dept' hoặc 'hr'
        const trip = await BusinessTripRequest.findByPk(id);
        if (!trip || trip.statusID > 3) return res.status(400).json({ error: 'Invalid request' });

        await trip.update({
            statusID: 4, // Rejected
            ...(role === 'dept' ? { approvedByDept: rejectorID } : { approvedBy: rejectorID })
        });
        await Notification.create({
            requestID: id,
            requestType: 'BusinessTrip',
            recipientID: trip.employeeID,
            message: `Yêu cầu công tác của bạn đã bị từ chối bởi ${role === 'dept' ? 'trưởng phòng' : 'HR'}.`
        });
        res.status(200).json(trip);
    };

}

module.exports = new BusinessTripController();