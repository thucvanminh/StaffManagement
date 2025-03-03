// backend/routes/statusRoutes

const Status = require('../models/Status');

class StatusController {
    async getAllStatus(req, res) {
        try {
            const statuses = await Status.findAll({});
            return res.status(200).json(statuses);

        } catch (error) {
            return res.status(500).send({error: error});
        }
    }

}

module.exports = new StatusController();