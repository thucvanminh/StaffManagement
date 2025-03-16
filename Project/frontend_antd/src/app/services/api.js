// frontend_antd/src/app/service/api.js

const BASE_URL = 'http://localhost:5000';

class API {
    async fetchAPI(endpoint, options = {}) {
        const controller = new AbortController();
        const timeoutID = setTimeout(() => controller.abort(), 15000);

        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        if (!token) {
            throw new Error('Vui lòng đăng nhập để tiếp tục');
        }

        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers,
        };

        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                ...options,
                headers,
                signal: controller.signal, 
                credentials: 'include',
            });

            clearTimeout(timeoutID);

            if (response.status === 401) {
                localStorage.removeItem('token');
                throw new Error('Token expired');
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            return response.json();
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('Request timed out');
            }
            console.error('API request failed:', error);
            throw error;
        }
    }

    async getAPI(endpoint, queryParams = {}, options = {}) {
        // Sửa: Dùng template literal để nối key và value trong query string
        const queryString = Object.entries(queryParams)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
        // Sửa: Dùng template literal để nối endpoint và query string nếu có
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;

        return this.fetchAPI(url, {
            method: 'GET',
            ...options,
        });
    }

    async postAPI(endpoint, body = {}, options = {}) { // Sửa tham số để nhận body
        return this.fetchAPI(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
            ...options,
        });
    }

    async putAPI(endpoint, body = {}, options = {}) {
        return this.fetchAPI(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body),
            ...options,
        });
    }

    async deleteAPI(endpoint, options = {}) {
        return this.fetchAPI(endpoint, {
            method: 'DELETE',
            ...options,
        });
    }

    async checkAPIConnection() {
        try {
            const response = await this.fetchAPI('/');
            return response;
        } catch (error) {
            throw new Error('Cannot connect to API: ' + error.message);
        }
    }
}

export default new API();