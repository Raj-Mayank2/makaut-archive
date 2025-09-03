// server/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { getPendingProfessors, approveProfessor } = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// All routes in this file are protected and require admin access
router.use(protect, isAdmin);

router.get('/pending-professors', getPendingProfessors);
router.patch('/approve-professor/:id', approveProfessor);

module.exports = router;