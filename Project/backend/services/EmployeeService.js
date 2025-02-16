const EmployeeRepository = require('../repositories/EmployeeRepository');

class EmployeeService {
    async getAllEmployees() {
        return EmployeeRepository.getAll();
    }

    async getEmployeeById(id) {
        const employee = await EmployeeRepository.getById(id);
        if (!employee) throw new Error('Employee not found');
        return employee;
    }

    async createEmployee(data) {
        return EmployeeRepository.create(data);
    }

    async updateEmployee(id, data) {
        const [updated] = await EmployeeRepository.update(id, data);
        if (updated === 0) throw new Error('Employee not found');
        return EmployeeRepository.getById(id);
    }

    async deleteEmployee(id) {
        const employee = await EmployeeRepository.delete(id);
        if (!employee) throw new Error('Employee not found');
        return employee;
    }

    async queryEmployees(condition) {
        return EmployeeRepository.query(condition);
    }
}

module.exports = new EmployeeService();
