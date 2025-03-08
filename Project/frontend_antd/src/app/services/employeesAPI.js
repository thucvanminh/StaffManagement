// services/employeeAPI.js
import API from './api';

class employeesAPI {
    async isHeadOfDepartment(employeeID) {
        const response = await API.getAPI(`/employees/is-head-of-department/${employeeID}`);
        return response.isHeadOfDepartment; // Giả sử backend trả về { isHeadOfDepartment: true/false }
    }

    async getAllEmployees() {
        return API.getAPI('/employees/');
    }

    async getEmployeeByID(id) {
        return API.getAPI(`/employees/${id}`);
    }
}

module.exports = new employeesAPI();

// export async function isHeadOfDepartment(employeeID) {
//     try {
//         const response = await fetch(`${BASE_URL}/employees/is-head-of-department/${employeeID}`, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                 'Content-Type': 'application/json',
//             },
//         });
//
//         if (!response.ok) {
//             throw new Error('Failed to check department head status');
//         }
//
//         const data = await response.json();
//         return data.isHeadOfDepartment;
//     } catch (error) {
//         console.error('Error checking department head:', error);
//         return false;
//     }
// }