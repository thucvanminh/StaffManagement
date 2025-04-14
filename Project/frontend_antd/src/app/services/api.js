// frontend_antd/src/app/service/api.js

const BASE_URL = 'http://localhost:5000';

class API {
    async fetchAPI(endpoint, options = {}) {
        const controller = new AbortController();
        const timeoutID = setTimeout(() => controller.abort(), 15000);

        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        // NOTE: Không throw lỗi nếu không có token, thay vào đó redirect đến trang login
        // Tuy nhiên, nếu endpoint là '/auth/login', không cần redirect vì đây là yêu cầu đăng nhập
        if (!token && endpoint !== '/auth/login') {
            window.location.href = '/login';
            return;
        }

        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }), // Chỉ thêm Authorization nếu có token
            ...options.headers,
        };

        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                ...options,
                headers,
                signal: controller.signal, // Sử dụng signal để hủy request
                credentials: 'include',
            });

            clearTimeout(timeoutID);

            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login'; // Redirect nếu token hết hạn
                return;
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            if (response.status === 204) {
                return null;
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
        const queryString = Object.entries(queryParams)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;

        return this.fetchAPI(url, {
            method: 'GET',
            ...options,
        });
    }

    async postAPI(endpoint, body = {}, options = {}) {
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