// src/controllers/AccountController.js
const prisma = require('../prisma');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { where } = require('sequelize');
const SALT_ROUNDS = 10;

class AccountController {
    async getAllAccounts(req, res) {
        try {
            const accounts = await prisma.accounts.findMany({
                select: { accountID: true, username: true, employeeID: true }, // Loại bỏ password
            });
            const employees = await prisma.employees.findMany({});
            const result = accounts.map(account => {
                const employee = employees.find(emp => emp.employeeID === account.employeeID);
                return {
                    ...account,
                    employee: employee || null
                };
            });
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAccountById(req, res) {
        try {
            const account = await prisma.accounts.findUnique({
                where: { accountID: parseInt(req.params.id) },
                select: { accountID: true, username: true, employeeID: true },
            });
            if (!account) throw new Error('Account not found');
            const employee = await prisma.employees.findUnique({
                where: { employeeID: parseInt(account.employeeID) },
            });
            const result = {
                ...account,
                employee: employee || null
            };
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async getAccountByUsername(req, res) {
        try {
            const account = await prisma.accounts.findUnique({
                where: { username: req.params.username },
            });
            if (!account) throw new Error('Account not found');
            res.status(200).json(account);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async addAccount(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const { username, password, employeeID } = req.body;
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            const newAccount = await prisma.accounts.create({
                data: {
                    username,
                    password: hashedPassword,
                    employeeID: parseInt(employeeID),
                },
                select: { accountID: true, username: true, employeeID: true },
            });
            res.status(201).json(newAccount);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateAccount(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const { username, password, employeeID } = req.body;
            const data = { username, employeeID: parseInt(employeeID) };
            if (password) data.password = await bcrypt.hash(password, SALT_ROUNDS);

            const updatedAccount = await prisma.accounts.update({
                where: { accountID: parseInt(req.params.id) },
                data,
                select: { accountID: true, username: true, employeeID: true },
            });
            res.status(200).json(updatedAccount);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async deleteAccount(req, res) {
        try {
            await prisma.accounts.delete({
                where: { accountID: parseInt(req.params.id) },
            });
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

module.exports = new AccountController();