const DepartmentRepository = require('../repositories/DepartmentRepository');

class DepartmentService {
    async getAllDepartments() {
        return DepartmentRepository.getAll();
    }

    async getDepartmentById(id) {
        const department = await DepartmentRepository.getById(id);
        if (!department) throw new Error('Department not found');
        return department;
    }

    async createDepartment(data) {
        return DepartmentRepository.create(data);
    }

    async updateDepartment(id, data) {
        const [updated] = await DepartmentRepository.update(id, data);
        if (updated === 0) throw new Error('Department not found');
        return DepartmentRepository.getById(id);
    }

    async deleteDepartment(id) {
        const department = await DepartmentRepository.delete(id);
        if (!department) throw new Error('Department not found');
        return department;
    }
}

module.exports = new DepartmentService();
