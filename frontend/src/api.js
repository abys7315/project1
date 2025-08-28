import axios from 'axios';

const api = axios.create({
  baseURL: "https://sharkathon-testing.onrender.com",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
