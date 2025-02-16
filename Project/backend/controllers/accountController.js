// src/controllers/AccountController.js
const AccountService = require('../services/AccountService');
const { validationResult } = require('express-validator');

class AccountController {
    async getAllAccounts(req, res) {
        try {
            const accounts = await AccountService.getAllAccounts();
            res.status(200).json(accounts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAccountById(req, res) {
        try {
            const account = await AccountService.getAccountById(req.params.id);
            res.status(200).json(account);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async getAccountByUsername(req, res) {
        try {
            const account = await AccountService.getAccountByUsername(req.params.username);
            res.status(200).json(account);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async addAccount(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        try {
            const newAccount = await AccountService.createAccount(req.body);
            res.status(201).json(newAccount);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateAccount(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        try {
            const updatedAccount = await AccountService.updateAccount(req.params.id, req.body);
            res.status(200).json(updatedAccount);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async deleteAccount(req, res) {
        try {
            await AccountService.deleteAccount(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

module.exports = new AccountController();
