// backend/controllers/accountController.js
const Account = require('../models/Account');
const Employee = require('../models/Employee');
const bcrypt = require('bcrypt'); // Hashing for password
const {validationResult} = require('express-validator');

// Lấy danh sách tất cả các account
exports.getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.findAll({
            include: [{
                model: Employee,
                as: 'employee',
                attributes: ['fullName', 'email'], // Tùy chỉnh dữ liệu Employee cần lấy kèm
            }],
        });
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// Lấy account theo ID
exports.getAccountById = async (req, res) => {
    try {
        const {id} = req.params;
        const account = await Account.findOne({
            where: {accountID: id},
            include: [{
                model: Employee,
                as: 'employee',
                attributes: ['fullName', 'email'], // Tùy chỉnh dữ liệu Employee cần lấy
            }],
        });
        if (!account) {
            return res.status(404).json({message: 'Account not found'});
        }
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.getAccountByUserName = async (req, res) => {
    try {
        const {username} = req.params;
        const account = await Account.findOne({
            where: {username: username},
            include: [{
                model: Employee,
                as: 'employee',
                attributes: ['fullName', 'email'],
            }],
        });
        if(!account){
            return res.status(404).json({message: 'Account not found'});
        }
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// Thêm mới account
exports.addAccount = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const {username, password, employeeID} = req.body;

        // Kiểm tra xem employeeID đã được dùng để tạo account chưa
        const existingAccount = await Account.findOne({where: {employeeID}});
        if (existingAccount) {
            return res.status(400).json({message: 'Employee already has an account'});
        }

        // Hash password trước khi lưu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo account mới
        const newAccount = await Account.create({
            username,
            password: hashedPassword,
            employeeID,
        });

        res.status(201).json(newAccount);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// Cập nhật thông tin account
exports.updateAccount = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const {id} = req.params;
        const {username, password} = req.body;

        // Hash password nếu được cập nhật
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

        const updatedFields = {
            username,
            ...(hashedPassword && {password: hashedPassword}), // Chỉ cập nhật password nếu có
        };

        // Tiến hành cập nhật
        const [updated] = await Account.update(updatedFields, {where: {accountID: id}});

        if (!updated) {
            return res.status(404).json({message: 'Account not found'});
        }

        const updatedAccount = await Account.findByPk(id);
        res.status(200).json(updatedAccount);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// Xóa account
exports.deleteAccount = async (req, res) => {
    try {
        const {id} = req.params;

        const account = await Account.findByPk(id);
        if (!account) {
            return res.status(404).json({message: 'Account not found'});
        }

        await account.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};