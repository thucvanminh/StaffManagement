// backend/controllers/authController.js
const {generateToken} = require('../config/jwt');
const bcrypt = require('bcrypt');  // Sử dụng để so sánh mật khẩu đã được hash
const Account = require('../models/Account');
const Employee = require('../models/Employee'); // Import để dùng cho include




exports.login = async (req, res) => {
    try {
        const {username, password} = req.body;

        // Tìm tài khoản theo username và include thông tin Employee qua alias 'employee'
        const account = await Account.findOne({
            where: {username},
            include: [
                {
                    model: Employee,
                    as: 'employee'
                }
            ]
        });

        // Nếu không tìm thấy account hoặc không có thông tin employee, trả về lỗi
        if (!account || !account.employee) {
            return res.status(401).json({message: 'User name or password is not correct'});
        }

        // So sánh mật khẩu nhập vào với mật khẩu đã hash trong DB
        const isValid = await bcrypt.compare(password, account.password);
        if (!isValid) {
            return res.status(401).json({message: 'User name or password is not correct'});
        }

        // Tạo token với thông tin của employee
        const token = generateToken({
            employeeID: account.employee.employeeID,
            roleID: account.employee.roleID
        });

        // Trả về token cho client
        return res.json({token});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

exports.getInfor = async (req, res) => {
    try {
        const employee = await Employee.findOne({
            where: { employeeID: req.user.employeeID },
            attributes: ['fullName', 'dateOfBirth']
        });

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
