
// backend/controllers/authController.js
const { generateToken } = require('../config/jwt');
const bcrypt = require('bcrypt');  // Sử dụng để so sánh mật khẩu đã được hash
const Account = require('../models/Account');
const Employee = require('../models/Employee'); // Import để dùng cho include

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Tìm tài khoản theo username và include thông tin Employee qua alias 'employee'
        const account = await Account.findOne({
            where: { username },
            include: [
                {
                    model: Employee,
                    as: 'employee'
                }
            ]
        });

        // Nếu không tìm thấy account hoặc không có thông tin employee, trả về lỗi
        if (!account || !account.employee) {
            return res.status(401).json({ message: 'User name or password is not correct' });
        }

        // So sánh mật khẩu nhập vào với mật khẩu đã hash trong DB
        const isValid = await bcrypt.compare(password, account.password);
        if (!isValid) {
            return res.status(401).json({ message: 'User name or password is not correct' });
        }

        // Tạo đối tượng user lấy từ thông tin employee
        const user = {
            id: account.employee.employeeID, // Lấy employeeID từ Employee
            role: account.employee.roleID      // Lấy roleID từ Employee (hoặc nếu bạn lưu role dưới dạng chuỗi, thay thế bằng account.employee.role)
        };

        // Tạo JWT token dựa trên thông tin user
        const token = generateToken(user);

        // Trả về token cho client
        return res.json({ token });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
