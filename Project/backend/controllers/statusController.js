// backend/routes/statusRoutes.js
const prisma = require('../prisma');

class StatusController {
    async getAllStatus(req, res) {
        try {
            const statuses = await prisma.statuses.findMany();
            return res.status(200).json(statuses);
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
    async getStatusById(req, res) {
        try {
            const status = await prisma.statuses.findUnique({
                where: { statusID: parseInt(req.body.statusID) },
            });
            if (!status) {
                return res.status(404).json({ message: 'Status not found' });
            }
            return res.status(200).json(status);
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
    async addStatus(req, res) {
        try {
            const status = await prisma.statuses.create({
                data: req.body,
            });
            return res.status(201).json(status);
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
    async updateStatus(req, res) {
        try {
            const { statusID, statusName, description } = req.body;
            const status = await prisma.statuses.update({
                where: { statusID: parseInt(statusID) },
                data: { statusName, description },
            });
            return res.status(200).json(status);
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
    async deleteStatus(req, res) {
        try {
            await prisma.statuses.delete({
                where: { statusID: parseInt(req.body.statusID) },
            });
            return res.status(204).send();
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
}
module.exports = new StatusController();