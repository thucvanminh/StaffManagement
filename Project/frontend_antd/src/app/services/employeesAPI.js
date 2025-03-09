// frontend_antd/src/app/services/employeesAPI.js
import API from './api';

class EmployeesAPI {
    constructor() {
        this.cache = new Map();
        this.CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
    }

    async isHeadOfDepartment(employeeID) {
        try {
            const response = await API.getAPI(`/employees/is-head-of-department/${employeeID}`);
            return response.isHeadOfDepartment;
        } catch (error) {
            throw new Error('Cannot check department head role: ' + error.message);
        }
    }

    async getAllEmployees(useCache = true) {
        const cacheKey = 'all_employees';
        if (useCache && this.cache.has(cacheKey)) {
            const { data, timestamp } = this.cache.get(cacheKey);
            if (Date.now() - timestamp < this.CACHE_DURATION) {
                return data;
            }
        }

        try {
            const response = await API.getAPI('/employees/');
            this.cache.set(cacheKey, {
                data: response,
                timestamp: Date.now()
            });
            return response;
        } catch (error) {
            throw new Error('Cannot get employee list: ' + error.message);
        }
    }

    async getEmployeeByID(id) {
        const cacheKey = `employee_${id}`;
        if (this.cache.has(cacheKey)) {
            const { data, timestamp } = this.cache.get(cacheKey);
            if (Date.now() - timestamp < this.CACHE_DURATION) {
                return data;
            }
        }

        try {
            const response = await API.getAPI(`/employees/${id}`);
            this.cache.set(cacheKey, {
                data: response,
                timestamp: Date.now()
            });
            return response;
        } catch (error) {
            throw new Error(`Cannot get employee info for ID ${id}: ${error.message}`);
        }
    }

    async createEmployee(employeeData) {
        try {
            const response = await API.postAPI('/employees/', employeeData);
            this.clearCache();
            return response;
        } catch (error) {
            throw new Error('Cannot create new employee: ' + error.message);
        }
    }

    async updateEmployee(id, employeeData) {
        try {
            const response = await API.putAPI(`/employees/${id}`, employeeData);
            this.clearCache();
            return response;
        } catch (error) {
            throw new Error(`Cannot update employee ID ${id}: ${error.message}`);
        }
    }

    async deleteEmployee(id) {
        try {
            const response = await API.deleteAPI(`/employees/${id}`);
            this.clearCache();
            return response;
        } catch (error) {
            throw new Error(`Cannot delete employee ID ${id}: ${error.message}`);
        }
    }

    async getEmployeesByDepartment(departmentId) {
        try {
            return await API.getAPI('/employees/', { departmentId });
        } catch (error) {
            throw new Error(`Cannot get employee list by department: ${error.message}`);
        }
    }

    clearCache() {
        this.cache.clear();
    }
}

export default new EmployeesAPI();
