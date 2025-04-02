import API from './api';

class OvertimeService{
    async getAllOvertimeRequests(){
        return await API.getAPI('/overtime-requests');
    }

    async createOvertimeRequest(data){
        return await API.postAPI('/overtime_requests' ,data);
    }
};

export default new OvertimeService();
