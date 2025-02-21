const BASE_URL = 'http://localhost:5000'; // URL backend (server-side API)

/**
 * Hàm login gửi yêu cầu POST đến API backend
 * @param {string} username - Tên đăng nhập của người dùng
 * @param {string} password - Mật khẩu của người dùng
 * @returns {Promise<object>} - Dữ liệu phản hồi từ backend (token hoặc lỗi)
 */
export async function login(username, password) {
    // Gửi yêu cầu API
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST', // Phương thức POST để gửi dữ liệu
        headers: { 'Content-Type': 'application/json' }, // Header định dạng JSON
        body: JSON.stringify({ username, password }), // Dữ liệu username và password
    });

    // Xử lý lỗi nếu phản hồi không thành công (status !== 200)
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed'); // Phản hồi lỗi từ backend
    }

    // Trả về JSON chứa dữ liệu phản hồi thành công (ví dụ: token)
    return await response.json();
}

/**
 * Lấy thông tin Employee dựa trên token
 * @returns {Promise<object>} - Dữ liệu thông tin Employee từ backend
 */
export async function fetchEmployeeInfo() {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage

    if (!token) {
        throw new Error('No token found. Please login first.');
    }

    const response = await fetch(`${BASE_URL}/employee/info`, {
        method: 'GET', // Kiểu request GET
        headers: {
            'Authorization': `Bearer ${token}`, // Gửi token trong header Authorization
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch employee info.');
    }

    return await response.json();
}
