// frontend_antd/src/app/services/employeeService.js
import API from './api';

class EmployeeService {
    async getAllEmployees() {
        try {
            const response = await API.getAPI('/employees');
            return response;
        } catch (error) {
            throw new Error('Cannot get employees: ' + error.message);
        }
    }

    async getEmployeeById(id) {
        try {
            const response = await API.getAPI(`/employees/${id}`);
            return response;
        } catch (error) {
            throw new Error('Cannot get employees: ' + error.message);
        }
    }

    async createEmployee(employeeData) {
        try {
            const response = await API.postAPI('/employees', employeeData);
            return response;
        } catch (error) {
            throw new Error('Cannot create employee: ' + error.message);
        }
    }

    async updateEmployee(id, employeeData) {
        try {
            const response = await API.putAPI(`/employees/${id}`, employeeData);
            return response;
        } catch (error) {
            throw new Error('Cannot update employee: ' + error.message);
        }
    }

    async deleteEmployee(id) {
        try {
            await API.deleteAPI(`/employees/${id}`);
        } catch (error) {
            throw new Error('Cannot delete employee: ' + error.message);
        }
    }

    async queryEmployees(queryParams) {
        try {
            const response = await API.postAPI('/employees/query', queryParams);
            return response;
        } catch (error) {
            throw new Error('Cannot search employees: ' + error.message);
        }
    }
    async isHeadOfDepartment(employeeID) {
        try {
            const response = await API.getAPI(`/employees/is-head-of-department/${employeeID}`);
            return response.isHeadOfDepartment;
        } catch (error) {
            console.error('Error checking department head:', error);
            throw error;
        }
    }
}

export default new EmployeeService();