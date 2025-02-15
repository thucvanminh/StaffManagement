// createAccounts.js
const bcrypt = require('bcrypt');
const Account = require('./models/Account');

async function createAccount(username, plainPassword, employeeID) {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    return Account.create({
        username,
        password: hashedPassword,
        employeeID
    });
}

async function run() {
    try {
        await createAccount('ptt_thuan', '123456', 200);
        console.log("Accounts created successfully.");
    } catch (error) {
        console.error("Error creating accounts:", error);
    }
}

run();
