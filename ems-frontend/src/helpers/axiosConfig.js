import axios from 'axios';

const REST_API_BASE_URL = "https://localhost:443/api/employees";

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: REST_API_BASE_URL,
});

// Add a request interceptor to include the JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
