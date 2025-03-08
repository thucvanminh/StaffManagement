// frontend_antd/src/app/services/employeesAPI.js
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

export default new employeesAPI();

