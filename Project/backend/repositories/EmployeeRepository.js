const Employee = require('../models/Employee');
const Department = require('../models/Department');
const Roles  = require('../models/Roles');

class EmployeeRepository {
    async getAll() {
        return Employee.findAll();
    }

    async getById(id) {
        return Employee.findOne(
            {
                where: {employeeID: id},
                include: [
                    {
                        model: Department, as: 'department',
                        attributes: ['departmentName']
                    },{
                        model: Roles, as: 'role',
                        attributes: [ 'roleName']
                    }
                ]

            }
        );
    }

    async create(data) {
        return Employee.create(data);
    }

    async update(id, data) {
        return Employee.update(data, {where: {employeeID: id}});
    }

    async delete(id) {
        const employee = await this.getById(id);
        if (!employee) return null;
        return employee.destroy();
    }

    async query(condition) {
        return Employee.findAll({where: condition});
    }
}

module.exports = new EmployeeRepository();
