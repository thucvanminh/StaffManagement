// frontend_antd/src/app/services/authentication.js

import API from './api';

class Authentication {
    async login(username, password) {
        try {
            const response = await API.postAPI('/auth/login', { username, password });
            console.log('API Response:', response); // Debug API response

            if (response.token) {
                localStorage.setItem('token', response.token);
            }
            return response;
        } catch (error) {
            console.error('Login error:', error); // In lỗi ra console
            throw new Error('Đăng nhập thất bại: ' + error.message);
        }
    }


    async logout() {
        try {
            await API.postAPI('/auth/logout');
            localStorage.removeItem('token');
        } catch (error) {
            console.error('Đăng xuất thất bại:', error);
        }
    }

    async refreshToken() {
        try {
            const response = await API.postAPI('/auth/refresh-token');
            if (response.token) {
                localStorage.setItem('token', response.token);
            }
            return response;
        } catch (error) {
            throw new Error('Làm mới token thất bại: ' + error.message);
        }
    }

    isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token;
    }

    getToken() {
        return localStorage.getItem('token');
    }
}

export default new Authentication();