import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../helpers/token';

const REST_API_BASE_URL = "https://localhost:443/api/employees";

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: REST_API_BASE_URL,
});

// Add a request interceptor to include the JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token && isTokenExpired(token)) {
      // If token is expired, remove it and redirect to login
      localStorage.removeItem('accessToken');
      const navigate = useNavigate();
      navigate('/login');
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 error (Unauthorized)
      if(isTokenExpired(token)){
        localStorage.removeItem('accessToken');
        const navigate = useNavigate();
        navigate('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
