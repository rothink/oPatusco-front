import axios from 'axios';
import router from "@/router";
import store from '@/store';

axios.interceptors.request.use(
  (config) => {
    // @ts-ignore
    config.baseURL = "http://localhost/api";
    const token = store.getters.authToken || localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return Promise.resolve(config);
  },
  (error) => {
    Promise.reject(error)
  },
);

axios.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response.status === 401 &&
      error.response.data.message === 'Unauthenticated.'
    ) {
      router.push('/login')
      return Promise.reject(error.response)
    }
    return Promise.reject(error.response)
  }

);
