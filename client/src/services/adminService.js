// src/services/adminService.js
import api from './api';

export const getPendingProfessors = async () => {
  try {
    const response = await api.get('/admin/pending-professors');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Could not fetch pending professors.');
  }
};

export const approveProfessor = async (id) => {
  try {
    const response = await api.patch(`/admin/approve-professor/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Could not approve professor.');
  }
};