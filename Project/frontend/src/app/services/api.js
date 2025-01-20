// frontend/services/api.js
import axios from 'axios';

export const getEmployees = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/employees'); // Kiểm tra URL
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error); // Hiển thị lỗi trong console
    throw error; // Ném lỗi để nó có thể được xử lý ở frontend
  }
};
