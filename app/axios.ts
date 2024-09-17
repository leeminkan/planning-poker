import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL:
    typeof window !== 'undefined' ? window.ENV.HOST : 'http://localhost:3000',
  timeout: 1000,
});
