import axios, { AxiosInstance, AxiosResponse } from "axios";

class AccountService {
  api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_DEV_SERVER_URL || import.meta.env.VITE_SERVER_URL,
    });

    // Automatically set JWT token on the request headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers.set('Authorization', `Bearer ${storedToken}`);
      }

      return config;
    });
  }

  async getProfile() {
    const response: AxiosResponse = await this.api.get('/account/profile');
    return response.data;
  }

  async updateProfile(requestBody: object) {
    const response: AxiosResponse = await this.api.put('/account/profile', requestBody);
    return response.data;
  }

  async deleteProfile() {
    const response: AxiosResponse = await this.api.delete('/account/profile');
    return response.data;
  }

  async getClasses() {
    const response: AxiosResponse = await this.api.get('/account/classes');
    return response.data;
  }

  async getClass(classId: string) {
    const response: AxiosResponse = await this.api.get(`/account/classes/${classId}`);
    return response.data;
  }

  async cancelClass(classId: string) {
    const response: AxiosResponse = await this.api.delete(`/account/classes/${classId}`);
    return response.data;
  }

  async rescheduleClass(classId: string, requestBody: {date: string, timeslot: string}) {
    const response: AxiosResponse = await this.api.put(`/account/classes/${classId}/reschedule`, requestBody);
    return response.data;
  }

  async acceptReschedule(classId: string) {
    const response: AxiosResponse = await this.api.put(`/account/classes/${classId}/reschedule/accept`);
    return response.data;
  }

  async declineReschedule(classId: string) {
    const response: AxiosResponse = await this.api.put(`/account/classes/${classId}/reschedule/decline`);
    return response.data;
  }

  async getCalendar() {
    const response: AxiosResponse = await this.api.get('/account/calendar');
    return response.data;
  }

  async getOffers() {
    const response: AxiosResponse = await this.api.get('/account/offers');
    return response.data;
  }

  async createOffer(requestBody: object) {
    const response: AxiosResponse = await this.api.post('/account/offer', requestBody);
    return response.data;
  }

  async updateOffer(offerId: string) {
    const response: AxiosResponse = await this.api.put(`/account/offer/${offerId}`);
    return response.data;
  }

  async deleteOffer(offerId: string) {
    const response: AxiosResponse = await this.api.delete(`/account/offer/${offerId}`);
    return response.data;
  }
}

// Create one instance (object) of the service
const accountService = new AccountService();

export default accountService;