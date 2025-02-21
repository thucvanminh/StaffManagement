const Account = require('../models/Account');
const bcrypt = require('bcrypt'); // Import bcrypt
const SALT_ROUNDS = 10; // Độ an toàn khi mã hóa (số vòng salt)


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
        // Kiểm tra nếu data có trường password
        if (data.password) {
            // Mã hóa mật khẩu bằng bcrypt
            const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
            data.password = hashedPassword; // Gán mật khẩu đã mã hóa
        }
        return Account.create(data); // Lưu vào database
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
