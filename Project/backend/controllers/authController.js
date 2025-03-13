// backend/controllers/authController.js
const prisma = require('../prisma');
const { generateToken } = require('../config/jwt');
const bcrypt = require('bcrypt');

class AuthController {
    async login(req, res) {
        try {
            const { username, password } = req.body;
            console.log('Login attempt for username:', username);

            const account = await prisma.accounts.findFirst({
                where: {
                    username: username
                }
            });
            const employee = await prisma.employees.findUnique({
                where: {
                    employeeID: account.employeeID
                }
            });
            const role = await prisma.roles.findUnique({
                where: {
                    roleID: employee.roleID
                }
            });

            console.log('Found account:', account ? 'Yes' : 'No');

            if (!account) {
                return res.status(401).json({ message: 'Username or password is incorrect' });
            }

            const isValid = await bcrypt.compare(password, account.password);
            console.log('Password valid:', isValid ? 'Yes' : 'No');

            if (!isValid) {
                return res.status(401).json({ message: 'Username or password is incorrect' });
            }

            const token = generateToken({
                employeeID: account.employeeID,
                roleID: employee.roleID,
            });

            return res.json({
                token,
                user: {
                    employeeID: account.employeeID,
                    fullName: employee.fullName,
                    email: employee.email,
                    roleID: role.roleID,
                    roleName: role.roleName,
                },
            });
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({ error: error.message });
        }
    }

    async getInfor(req, res) {
        try {
            if (!req.user || !req.user.employeeID) {
                return res.status(401).json({ message: 'User not authenticated or invalid token' });
            }

            const employee = await prisma.employees.findUnique({
                where: {
                    employeeID: req.user.employeeID
                },
                
                
            });

            if (!employee) {
                return res.status(404).json({ message: 'Employee not found' });
            }

            res.json(employee);
        } catch (error) {
            console.error('Get info error:', error);
            res.status(500).json({ error: error.message });
        }
    };
}



module.exports = new AuthController();
