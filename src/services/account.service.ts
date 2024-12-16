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

  async updateProfile() {
    const response: AxiosResponse = await this.api.put('/account/profile');
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
}

// Create one instance (object) of the service
const accountService = new AccountService();

export default accountService;