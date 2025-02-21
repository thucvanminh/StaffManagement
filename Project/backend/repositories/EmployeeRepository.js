const Employee = require('../models/Employee');
const Department = require('../models/Department');
const Roles = require('../models/Roles');

class EmployeeRepository {
    async getAll() {
        return Employee.findAll(
            {
                include: [
                    {
                        model: Department,
                        as: 'department', // Lấy tên phòng ban
                        attributes: ['departmentID', 'departmentName']
                    },
                    {
                        model: Roles,
                        as: 'role', // Lấy tên role
                        attributes: ['roleID', 'roleName']
                    },
                    {
                        model: Employee,
                        as: 'headOfDepartment', // Lấy thông tin trưởng phòng
                        attributes: ['employeeID', 'fullName']
                    }
                ]
            }
        );
    }

    async getById(id) {
        return Employee.findOne(
            {
                where: {employeeID: id},
                include: [
                    {
                        model: Department,
                        as: 'department', // Lấy tên phòng ban
                        attributes: ['departmentID', 'departmentName']
                    },
                    {
                        model: Roles,
                        as: 'role', // Lấy tên role
                        attributes: ['roleID', 'roleName']
                    },
                    {
                        model: Employee,
                        as: 'headOfDepartment', // Lấy thông tin trưởng phòng
                        attributes: ['employeeID', 'fullName']
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
