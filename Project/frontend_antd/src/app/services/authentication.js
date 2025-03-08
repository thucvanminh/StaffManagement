// frontend_antd/src/app/services/authentication.js

import  API from './api';

class Authentication {
    async login(username, password) {
        return API.postAPI('auth/login',{username, password});
    }
}

module.exports = new Authentication();