// frontend/src/services/leaveService.js
import API from './api';

const leaveService = {
    // Tạo yêu cầu nghỉ phép
    createLeaveRequest: async (data) => {
        return API.postAPI('/leave-requests/', data);
    },

    // Trưởng phòng duyệt/từ chối
    approveByDept: async (leaveRequestID, data) => {
        return API.putAPI(`/leave-requests/${leaveRequestID}/approve-by-dept`, data);
    },

    // HR duyệt/từ chối
    approveByHR: async (leaveRequestID, data) => {
        return API.putAPI(`/leave-requests/${leaveRequestID}/approve-by-hr`, data);
    },

    // Lấy tất cả yêu cầu nghỉ phép
    getAllLeaveRequests: async () => {
        return API.getAPI('/leave-requests/');
    },

    // Lấy yêu cầu đang chờ xử lý
    getPendingLeaveRequests: async () => {
        return API.getAPI('/leave-requests/pending');
    },

    // Lấy yêu cầu bị từ chối
    getRejectedLeaveRequests: async () => {
        return API.getAPI('/leave-requests/rejected');
    },

    // Lấy yêu cầu được chấp nhận bởi trưởng phòng
    getAcceptedRequestsByDept: async () => {
        return API.getAPI('/leave-requests/accepted-by-dept');
    },

    // Lấy yêu cầu được chấp nhận bởi HR
    getAcceptedLeaveRequests: async () => {
        return API.getAPI('/leave-requests/accepted');
    },
};

export default leaveService;