const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // <-- Import protect
const authLimiter = require('../middleware/rateLimitMiddleware');
router.post('/register' ,authLimiter, registerUser);
router.post('/login', authLimiter, loginUser);
router.get('/me', protect, getMe); // <-- Add new protected route

module.exports = router;