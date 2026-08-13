import axios from 'axios';

const API_BASE = '/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('lumo_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchHealth = async () => {
  const res = await apiClient.get('/health');
  return res.data;
};

export const fetchModels = async () => {
  const res = await apiClient.get('/chat/models');
  return res.data;
};
