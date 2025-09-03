// src/services/api.js
import axios from 'axios';


const API_URL = 'https://notes-backend-ii2j.onrender.com' || 'http://localhost:5000';

const api = axios.create({
  // IMPORTANT: Replace this with your actual backend URL when you build it
  baseURL: `${API_URL}/api`,
});

// This part is for sending the token with every request once the user is logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;