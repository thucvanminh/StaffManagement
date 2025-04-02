// frontend_antd/src/app/services/recruitmentService.js


import API from './api';

class RecruitmentService {
    // Lấy danh sách tất cả đơn xin việc
    async getAllRecruitmentRequests() {
        try {
            const response = await API.getAPI('/recruitment-requests');
            return response;
        } catch (error) {
            throw new Error('Cannot get requests: ' + error.message);
        }
    }

    // Lấy chi tiết một đơn xin việc theo ID
    async getRecruitmentRequestById(id) {
        try {
            const response = await API.getAPI(`/recruitment-requests/${id}`);
            return response;
        } catch (error) {
            throw new Error('Không thể lấy chi tiết đơn xin việc: ' + error.message);
        }
    }

    // Tạo mới một đơn xin việc
    async createRecruitmentRequest(data) {
        try {
            const response = await API.postAPI('/recruitment-requests', data);
            return response;
        } catch (error) {
            throw new Error('Không thể tạo đơn xin việc: ' + error.message);
        }
    }

    // Cập nhật một đơn xin việc
    async updateRecruitmentRequest(id, data) {
        try {
            const response = await API.putAPI(`/recruitment-requests/${id}`, data);
            return response;
        } catch (error) {
            throw new Error('Không thể cập nhật đơn xin việc: ' + error.message);
        }
    }

    // Xóa một đơn xin việc
    async deleteRecruitmentRequest(id) {
        try {
            await API.deleteAPI(`/recruitment-requests/${id}`);
        } catch (error) {
            throw new Error('Không thể xóa đơn xin việc: ' + error.message);
        }
    }
}

export default new RecruitmentService();