// server/controllers/userController.js
const sendWelcomeEmail = require('../utils/sendEmail'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Helper function to generate a token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new user
// @route   POST /api/users/register
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // If a professor registers, they start as unapproved
  const isApproved = role === 'professor' ? false : true;

  const user = await User.create({
    name,
    email,
    password,
    role,
    isApproved,
  });

  if (user) {
    sendWelcomeEmail(user.email, user.name);
    res.status(201).json({
      message: 'Registration successful. If you registered as a professor, your account requires admin approval.',
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // Enforce the "pending professor" rule at login
    if (user.role === 'professor' && !user.isApproved) {
      return res.status(403).json({ message: 'Your professor account is pending approval from an admin.' });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports = { registerUser, loginUser, getMe };