import axios from 'axios';
import { mockApi } from './mockApi';

// Verifica se estamos em desenvolvimento
const isDevelopment = import.meta.env.DEV;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Use mockApi em desenvolvimento e api real em produção
export const postService = isDevelopment ? mockApi : {
  getAllPosts: async (searchTerm = '') => {
    const response = await api.get(`/posts${searchTerm ? `?search=${searchTerm}` : ''}`);
    return response.data;
  },

  getPostById: async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  createPost: async (postData) => {
    const response = await api.post('/posts', postData);
    return response.data;
  },

  updatePost: async (id, postData) => {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  },

  deletePost: async (id) => {
    await api.delete(`/posts/${id}`);
  },

  addComment: async (postId, comment) => {
    const response = await api.post(`/posts/${postId}/comments`, comment);
    return response.data;
  }
};

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};

export default api;