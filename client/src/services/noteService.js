// src/services/noteService.js
import api from './api';

// Function to get notes, optionally with filters
export const getNotes = async (filters = {}) => {
  try {
    const response = await api.get('/notes', { params: filters });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Could not fetch notes.');
  }
};


export const uploadNote = async (formData) => {
  try {
    // We send formData and set the content-type header for file uploads
    const response = await api.post('/notes/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Could not upload note.');
  }
};

// src/services/noteService.js
// ...
export const getFilterOptions = async (filters = {}) => {
  try {
    const response = await api.get('/notes/filters', { params: filters });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Could not fetch filter options.');
  }
};

// src/services/noteService.js
// ...

export const deleteNote = async (noteId) => {
  try {
    const response = await api.delete(`/notes/${noteId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Could not delete note.');
  }
};