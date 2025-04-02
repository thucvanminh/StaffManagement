// frontend_antd/src/app/service/transferService.js

import API from './api';

class TransferService {
    async getTransferRequests() {
        return API.getAPI('/transfer-requests');
    }
    async createTransferRequest(data) {
        return API.postAPI('/transfer-requests', data);
    }
}

export default new TransferService();