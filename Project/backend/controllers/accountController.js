// src/controllers/AccountController.js
const Account = require('../models/Account');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

class AccountController {
    async getAllAccounts(req, res) {
        try {
            const accounts = await Account.findAll({attributes: {exclude: ['password']}});
            res.status(200).json(accounts);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async getAccountById(req, res) {
        try {
            const account = await Account.findOne({
                where: {employeeID: req.params.id},
                attributes: {exclude: ['password']}
            });
            if (!account) throw new Error('Account not found');
            res.status(200).json(account);
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    }

    async getAccountByUsername(req, res) {
        try {
            const account = await Account.findOne({where: {username: req.params.username}});
            if (!account) throw new Error('Account not found');
            res.status(200).json(account);
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    }

    async addAccount(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        try {
            let data = req.body;
            if (data.password) {
                data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
            }
            const newAccount = await Account.create(data);
            // Loại bỏ password trước khi trả về
            const responseData = { ...newAccount.get(), password: undefined };
            res.status(201).json(responseData);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateAccount(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});

        try {
            const account = await Account.findOne({where: {accountID: req.params.id}});
            if (!account) throw new Error('Account not found');

            let data = req.body;
            if (data.password) {
                // Hash mật khẩu mới nếu có thay đổi
                data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
            }

            const [updated] = await Account.update(data, {where: {accountID: req.params.id}});
            if (updated === 0) throw new Error('Account not found');

            const updatedAccount = await Account.findOne({where: {accountID: req.params.id}});
            res.status(200).json(updatedAccount);
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    }

    async deleteAccount(req, res) {
        try {
            const account = await Account.findOne({where: {accountID: req.params.id}});
            if (!account) throw new Error('Account not found');
            await account.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    }
}

module.exports = new AccountController();