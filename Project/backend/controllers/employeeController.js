// src/controllers/EmployeeController.js
const prisma = require('../prisma');
const { validationResult } = require('express-validator');

class EmployeeController {
    async getAllEmployees(req, res) {
        try {
            // const employees = await prisma.employees.findMany({
            // });

            // const departments = await prisma.departments.findMany();
            // const roles = await prisma.roles.findMany();
            // const employee = employees.map(employee => ({
            //     ...employee,
            //     department: departments.find(d => d.departmentID === employee.departmentID),
            //     role: roles.find(r => r.roleID === employee.roleID)
            // }));
            const employees = await prisma.employees.findMany({
            });
            const departments = await prisma.departments.findMany();
            const roles = await prisma.roles.findMany();
            const employee = employees.map(employee => ({
                ...employee,
                department: departments.find(d => d.departmentID === employee.departmentID),
                role: roles.find(r => r.roleID === employee.roleID)
            }));
            res.status(200).json(employee);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getEmployeeById(req, res) {
        try {
            const employeeQuery = await prisma.employees.findUnique({
                where: { employeeID: parseInt(req.params.id) },
            });


            if (!employeeQuery) {
                res.status(404).json({ message: 'Employee not found' });
            } else {
                const department = await prisma.departments.findUnique({
                    where: {
                        departmentID: employeeQuery.departmentID
                    }
                });
                const role = await prisma.roles.findUnique({
                    where: {
                        roleID: employeeQuery.roleID
                    }
                });
                const employee = {
                    ...employeeQuery,
                    department,
                    role
                };
                res.status(200).json(employee);
            }
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async addEmployee(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        // {
        //     "employeeID": 400,
        //     "fullName": "Văn Minh Hieu",
        //     "dateOfBirth": "1997-03-03T00:00:00.000Z",
        //     "hireDay": "2009-03-03T00:00:00.000Z",
        //     "email": "vanminhthuccccc@gmail.com",
        //     "phone": "0777999888",
        //     "address": "333 Đường Tôn Đức Thắng",
        //     "city": "Bình Dương",
        //     "gender": "Male",
        //     "departmentID": 3,
        //     "headOfDepartmentID": 103,
        //     "roleID": 3,
        // }
        try {
            const { fullName, dateOfBirth, hireDay, email, phone, address, city, gender, departmentID, roleID, headOfDepartmentID } = req.body;
            const newEmployee = await prisma.employees.create({
                data: {
                    fullName,
                    dateOfBirth: new Date(dateOfBirth),
                    hireDay: new Date(hireDay),
                    email,
                    phone,
                    address,
                    city,
                    gender,
                    departmentID: parseInt(departmentID),
                    roleID: parseInt(roleID),
                    headOfDepartmentID: headOfDepartmentID ? parseInt(headOfDepartmentID) : null,
                },
            });
            res.status(201).json(newEmployee);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateEmployee(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const {fullName, dateOfBirth, hireDay, email, phone, address, city, gender, departmentID, roleID, headOfDepartmentID } = req.body;
            const updatedEmployee = await prisma.employees.update({
                where: { employeeID: parseInt(req.params.id) },
                data: {
                    employeeID: parseInt(req.params.id),
                    fullName,
                    dateOfBirth: new Date(dateOfBirth),
                    hireDay: new Date(hireDay),
                    email,
                    phone,
                    address,
                    city,
                    gender,
                    departmentID: parseInt(departmentID),
                    roleID: parseInt(roleID),
                    headOfDepartmentID: headOfDepartmentID ? parseInt(headOfDepartmentID) : null,
                },
            // include: { departments: true, roles: true },
            });
            res.status(200).json(updatedEmployee);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async deleteEmployee(req, res) {
        try {
            await prisma.employees.delete({
                where: { employeeID: parseInt(req.params.id) },
            });
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async queryEmployee(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const { departmentID, roleID, fullName, city, birthYear, gender, phone, email, hireYear } = req.body;

            // Kiểm tra kiểu dữ liệu
            if (roleID && isNaN(parseInt(roleID))) {
                return res.status(400).json({ error: "roleID must be a number" });
            }
            if (birthYear && isNaN(parseInt(birthYear))) {
                return res.status(400).json({ error: "birthYear must be a number" });
            }
            if (hireYear && isNaN(parseInt(hireYear))) {
                return res.status(400).json({ error: "hireYear must be a number" });
            }

            const employees = await prisma.employees.findMany({
                where: {
                    ...(departmentID && { departmentID: parseInt(departmentID) }),
                    ...(roleID && { roleID: parseInt(roleID) }),
                    ...(fullName && { fullName: { contains: fullName } }),
                    ...(city && { city: city }),
                    ...(birthYear && {
                        dateOfBirth: {
                            gte: new Date(`${parseInt(birthYear)}-01-01`),
                            lte: new Date(`${parseInt(birthYear)}-12-31`),
                        },
                    }),
                    ...(gender && { gender: gender }), // Lọc theo giới tính
                    ...(phone && { phone: phone }),   // Lọc theo số điện thoại
                    ...(email && { email: email }),   // Lọc theo email
                    ...(hireYear && {
                        hireDay: {
                            gte: new Date(`${parseInt(hireYear)}-01-01`),
                            lte: new Date(`${parseInt(hireYear)}-12-31`),
                        },
                    }), // Lọc theo năm thuê
                },
            });
            res.status(200).json(employees);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async isHeadDepartment(req, res) {
        try {
            const count = await prisma.departments.count({
                where: { HeadOfDepartmentID: parseInt(req.params.employeeID) },
            });
            res.json({ isHeadOfDepartment: count > 0 });
        } catch (error) {
            res.status(500).json({ message: 'Error checking department head status', error });
        }
    }
}

module.exports = new EmployeeController();