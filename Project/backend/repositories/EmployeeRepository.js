const Employee = require('../models/Employee');

class EmployeeRepository {
    async getAll() {
        return Employee.findAll();
    }

    async getById(id) {
        return Employee.findOne({ where: { employeeID: id } });
    }

    async create(data) {
        return Employee.create(data);
    }

    async update(id, data) {
        return Employee.update(data, { where: { employeeID: id } });
    }

    async delete(id) {
        const employee = await this.getById(id);
        if (!employee) return null;
        return employee.destroy();
    }

    async query(condition) {
        return Employee.findAll({ where: condition });
    }
}

module.exports = new EmployeeRepository();
