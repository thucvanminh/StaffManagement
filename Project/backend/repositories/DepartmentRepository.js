const Department = require('../models/Department');

class DepartmentRepository {
    async getAll() {
        return Department.findAll();
    }

    async getById(id) {
        return Department.findOne({ where: { departmentID: id } });
    }

    async create(data) {
        return Department.create(data);
    }

    async update(id, data) {
        return Department.update(data, { where: { departmentID: id } });
    }

    async delete(id) {
        const department = await this.getById(id);
        if (!department) return null;
        return department.destroy();
    }
}

module.exports = new DepartmentRepository();
