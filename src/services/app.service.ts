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
    const response: AxiosResponse = await this.api.put(`/api/notifications/${notificationId}`);
    return response.data;
  }

  async deleteNotification(notificationId: string) {
    const response: AxiosResponse = await this.api.delete(`/api/notifications/${notificationId}`);
    return response.data;
  }

  async getUsers(params: { [key: string]: string }) {
    const queryParams = new URLSearchParams(params).toString();
    const response: AxiosResponse = await this.api.get(`/api/users/?${queryParams}`);
    return response.data;
  }

  async getUser(userId: string) {
    const response: AxiosResponse = await this.api.get(`/api/users/${userId}`);
    return response.data;
  }

  async getChats() {
    const response: AxiosResponse = await this.api.get('/api/inbox');
    return response.data;
  }

  async createChat(requestBody: object) {
    const response: AxiosResponse = await this.api.post('/api/inbox', requestBody);
    return response.data;
  }

  async deleteMessages(chatId: string) {
    const response: AxiosResponse = await this.api.delete(`/api/inbox/${chatId}`);
    return response.data;
  }

  async getOffer(offerId: string) {
    const response: AxiosResponse = await this.api.get(`/checkout/${offerId}`);
    return response.data;
  }

  async createClass(offerId: string, requestBody: object) {
    const response: AxiosResponse = await this.api.post(`/checkout/${offerId}`, requestBody);
    return response.data;
  }
}

// Create one instance (object) of the service
const appService = new AppService();

export default appService;