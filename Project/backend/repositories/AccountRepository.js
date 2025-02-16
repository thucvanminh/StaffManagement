const Account = require('../models/Account');

class AccountRepository {
    async getAll() {
        return Account.findAll();
    }

    async getById(id) {
        return Account.findOne({ where: { accountID: id } });
    }

    async getByUsername(username) {
        return Account.findOne({ where: { username } });
    }

    async create(data) {
        return Account.create(data);
    }

    async update(id, data) {
        return Account.update(data, { where: { accountID: id } });
    }

    async delete(id) {
        const account = await this.getById(id);
        if (!account) return null;
        return account.destroy();
    }
}

module.exports = new AccountRepository();
