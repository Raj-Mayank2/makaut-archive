// src/services/authService.js
import api from './api';

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    // The backend should return the user object and a token
    return response.data; 
  } catch (error) {
    // Throw an error to be caught by the component
    throw new Error(error.response.data.message || 'An error occurred.');
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'An error occurred.');
  }
};


export const getProfile = async () => {
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Could not fetch profile.');
  }
};