import axios from 'axios';
import { store } from '../redux/store';
import { logout } from '../redux/userSlice';


// TODO: Define base URL
const BASE_URL = 'http://localhost:8000/api/v1';


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const rawToken = localStorage.getItem('accessToken');
    let accessToken = null;
    
    if (rawToken) {
      try {
        accessToken = JSON.parse(rawToken);
      } catch (e) {
        accessToken = rawToken;
      }
    }


    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }


    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Response Interceptor & Refresh Token Logic
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;


    if (error.response?.status === 401 && originalRequest.url !== "/login" && !originalRequest._retry) {
      originalRequest._retry = true;


      try {
        const rawRefreshToken = localStorage.getItem('refreshToken');
        let refreshToken = null;
        
        if (rawRefreshToken) {
          try {
            refreshToken = JSON.parse(rawRefreshToken);
          } catch (e) {
            refreshToken = rawRefreshToken;
          }
        }


        if (!refreshToken) {
          throw new Error('No refresh token available');
        }


        const response = await axiosInstance.post('/users/refresh-token', { refreshToken });


        const { accessToken, refreshToken: newRefreshToken } = response.data.data;


        localStorage.setItem('accessToken', JSON.stringify(accessToken));
        localStorage.setItem('refreshToken', JSON.stringify(newRefreshToken));


        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;


        return await axiosInstance(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        
        // if (window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/') {
        //     window.location.href = '/';
        // }

        throw new Error('Session expired. Please login again.');
      }
    }


    return Promise.reject(error);
  }
);


export default axiosInstance;
