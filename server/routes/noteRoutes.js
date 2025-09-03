const express = require('express');
const router = express.Router();

// Simplified imports
const { 
  uploadNote, 
  getNotes, 
  getFilterOptions, 
  deleteNote 
} = require('../controllers/noteController');

const { protect, isProfessor, isAdmin } = require('../middleware/authMiddleware');
const { upload, uploadToSupabase } = require('../middleware/uploadMiddleware');

// Route for professors to upload a note
router.post(
  '/upload',
  protect,
  isProfessor,
  upload.single('file'),
  uploadToSupabase,
  uploadNote
);

// General routes to get notes and filters
router.get('/filters', protect, getFilterOptions);
router.get('/', protect, getNotes);

// Route for an admin to delete any note
router.delete('/:id', protect, isAdmin, deleteNote);

// All routes for student submission and admin approval have been removed
module.exports = router;