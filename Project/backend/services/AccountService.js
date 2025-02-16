const AccountRepository = require('../repositories/AccountRepository');

class AccountService {
    async getAllAccounts() {
        return AccountRepository.getAll();
    }

    async getAccountById(id) {
        const account = await AccountRepository.getById(id);
        if (!account) throw new Error('Account not found');
        return account;
    }

    async getAccountByUsername(username) {
        const account = await AccountRepository.getByUsername(username);
        if (!account) throw new Error('Account not found');
        return account;
    }

    async createAccount(data) {
        return AccountRepository.create(data);
    }

    async updateAccount(id, data) {
        const [updated] = await AccountRepository.update(id, data);
        if (updated === 0) throw new Error('Account not found');
        return AccountRepository.getById(id);
    }

    async deleteAccount(id) {
        const account = await AccountRepository.delete(id);
        if (!account) throw new Error('Account not found');
        return account;
    }
}

module.exports = new AccountService();
