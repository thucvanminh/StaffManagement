// backend/controllers/validatios/accountValidation.js

const { check } = require('express-validator');


const validateAccount = [
    check('username').trim().notEmpty().withMessage('Username is required'),
    check('password').notEmpty().withMessage('Password is reequired')
];

module.exports = { validateAccount };