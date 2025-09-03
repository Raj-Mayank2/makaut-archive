const Note = require('../models/Note');
const supabase = require('../config/supabase');

// @desc    Upload a new note (for Professors)
const uploadNote = async (req, res) => {
  const { title, subject, department, semester, fileType } = req.body;
  if (!req.file) return res.status(400).json({ message: 'Please upload a file' });
  const { data } = supabase.storage.from('note-files').getPublicUrl(req.file.path);
  const newNote = new Note({ title, subject, department, semester, fileType, fileUrl: data.publicUrl, uploadedBy: req.user.id });
  try {
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: 'Server error while saving note' });
  }
};

// @desc    Get all notes, with optional filtering
const getNotes = async (req, res) => {
  try {
    const query = {};
    if (req.query.department) query.department = req.query.department;
    if (req.query.semester) query.semester = req.query.semester;
    if (req.query.subject) query.subject = req.query.subject;
    const notes = await Note.find(query).populate('uploadedBy', 'name').sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching notes' });
  }
};

/**
 * @desc    Get unique values for filters hierarchically (CORRECTED LOGIC)
 * @route   GET /api/notes/filters
 */
const getFilterOptions = async (req, res) => {
  try {
    const { department, semester } = req.query;

    // Case 3: Both department and semester are provided -> Get subjects
    if (department && semester) {
      const subjects = await Note.distinct('subject', { department, semester });
      return res.status(200).json({ subjects });
    }
    
    // Case 2: Only department is provided -> Get semesters for that department
    if (department) {
      const semesters = await Note.distinct('semester', { department });
      return res.status(200).json({ semesters });
    }

    // Case 1: No parameters provided -> Get all initial departments
    const departments = await Note.distinct('department');
    res.status(200).json({ departments });

  } catch (error) {
    res.status(500).json({ message: 'Server error fetching filter options' });
  }
};

// @desc    Delete a note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    try {
      const urlParts = note.fileUrl.split('/');
      const filePath = urlParts.slice(urlParts.indexOf('note-files') + 1).join('/');
      if (filePath) await supabase.storage.from('note-files').remove([filePath]);
    } catch (storageError) {
      console.error('Could not delete file from Supabase, but continuing to delete DB record.', storageError);
    }
    await Note.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting note' });
  }
};

module.exports = {
  uploadNote,
  getNotes,
  getFilterOptions,
  deleteNote,
};