// frontend_antd/src/app/services/businessTripService.js
import API from './api';

class BusinessTripService {
    async getAllBusinessTrips() {
        try {
            const response = await API.getAPI('/business-trips');
            return response;
        } catch (error) {
            throw new Error('Cannot get business trips: ' + error.message);
        }
    }

    async getBusinessTripById(id) {
        try {
            const response = await API.getAPI(`/business-trips/${id}`);
            return response;
        } catch (error) {
            throw new Error('Cannot get business trip: ' + error.message);
        }
    }

    async createBusinessTrip(businessTripData) {    
        try {
            const response = await API.postAPI('/business-trips', businessTripData);
            return response;
        } catch (error) {
            throw new Error('Cannot create business trip: ' + error.message);
        }
    }   

    async updateBusinessTrip(id, businessTripData) {
        try {
            const response = await API.putAPI(`/business-trips/${id}`, businessTripData);
            return response;
        } catch (error) {
            throw new Error('Cannot update business trip: ' + error.message);
        }
    }   

    async deleteBusinessTrip(id) {
        try {
            const response = await API.deleteAPI(`/business-trips/${id}`);
            return response;
        } catch (error) {
            throw new Error('Cannot delete business trip: ' + error.message);
        }
    }   

    async getBusinessTripByEmployeeId(employeeId) {
        try {
            const response = await API.getAPI(`/business-trips/employee/${employeeId}`);
            return response;
        } catch (error) {
            throw new Error('Cannot get business trip by employee ID: ' + error.message);
        }
    }   

    async getPendingBusinessTrips() {
        try {
            const response = await API.getAPI('/business-trips/status/pending');
            return response;
        } catch (error) {
            throw new Error('Cannot get pending business trips: ' + error.message);
        }
    }
}

export default new BusinessTripService();
