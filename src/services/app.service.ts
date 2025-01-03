import axios, { AxiosInstance, AxiosResponse } from "axios";

class AppService {
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

  async getLanguageStats() {
    const response: AxiosResponse = await this.api.get('/api/langStats');
    return response.data;
  }

  async getNotifications() {
    const response: AxiosResponse = await this.api.get('/api/notifications');
    return response.data;
  }

  async readNotification(notificationId: string) {
    const response: AxiosResponse = await this.api.put(`/api/notification/${notificationId}`);
    return response.data;
  }

  async deleteNotification(notificationId: string) {
    const response: AxiosResponse = await this.api.delete(`/api/notification/${notificationId}`);
    return response.data;
  }

  async getMatches(matchType: string) {
    const response: AxiosResponse = await this.api.get(`/api/match/${matchType}`);
    return response.data;
  }

  async getLearners(langId: string) {
    const response: AxiosResponse = await this.api.get(`/api/learners/${langId}`);
    return response.data;
  }

  async getTeachers(langId: string) {
    const response: AxiosResponse = await this.api.get(`/api/teachers/${langId}`);
    return response.data;
  }

  async getUser(userId: string) {
    const response: AxiosResponse = await this.api.get(`/api/users/${userId}`);
    return response.data;
  }

  async getOffer(offerId: string) {
    const response: AxiosResponse = await this.api.get(`/checkout/offers/${offerId}`);
    return response.data;
  }
}

// Create one instance (object) of the service
const appService = new AppService();

export default appService;