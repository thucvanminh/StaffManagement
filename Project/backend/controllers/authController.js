// backend/controllers/authController.js
const { generateToken } = require('../config/jwt');
const bcrypt = require('bcrypt');
const pool = require('../config/database');
const { AUTH_QUERIES } = require('../models/Account');
const { DEFAULT_SELECT } = require('../models/Employee');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Tìm tài khoản theo username với thông tin employee và role
        const [accounts] = await pool.execute(AUTH_QUERIES.LOGIN, [username]);
        
        if (accounts.length === 0) {
            return res.status(401).json({ message: 'User name or password is not correct' });
        }

        const account = accounts[0];

        // So sánh mật khẩu
        const isValid = await bcrypt.compare(password, account.password);
        if (!isValid) {
            return res.status(401).json({ message: 'User name or password is not correct' });
        }

        // Tạo token với thông tin của employee
        const token = generateToken({
            employeeID: account.employeeID,
            roleID: account.roleID
        });

        // Trả về token và thông tin cơ bản
        return res.json({
            token,
            user: {
                employeeID: account.employeeID,
                fullName: account.fullName,
                email: account.email,
                roleID: account.roleID,
                roleName: account.roleName
            }
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getInfor = async (req, res) => {
    try {
        if (!req.user || !req.user.employeeID) {
            return res.status(401).json({ message: 'User not authenticated or invalid token' });
        }

        const [employees] = await pool.execute(`${DEFAULT_SELECT} WHERE e.employeeID = ?`, [req.user.employeeID]);

        if (employees.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Loại bỏ thông tin nhạy cảm
        const employee = employees[0];
        delete employee.password;

        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
