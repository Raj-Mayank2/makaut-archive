// server/controllers/adminController.js
const User = require('../models/User');

// @desc    Get all pending professor accounts
// @route   GET /api/admin/pending-professors
const getPendingProfessors = async (req, res) => {
  try {
    const pendingProfessors = await User.find({ role: 'professor', isApproved: false });
    res.status(200).json(pendingProfessors);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Approve a professor's account
// @route   PATCH /api/admin/approve-professor/:id
const approveProfessor = async (req, res) => {
  try {
    const professor = await User.findById(req.params.id);
    if (professor && professor.role === 'professor') {
      professor.isApproved = true;
      await professor.save();
      res.status(200).json({ message: 'Professor approved successfully.' });
    } else {
      res.status(404).json({ message: 'Professor not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getPendingProfessors, approveProfessor };