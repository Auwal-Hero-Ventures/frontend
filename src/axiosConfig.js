// src/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://yourdomain.com/api/',
    timeout: 5000,
});

// Run this function after user login to set the authorization header
export const setAuthToken = (token) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

export default axiosInstance;
