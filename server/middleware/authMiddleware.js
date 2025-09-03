const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure the path to your User model is correct

const protect = async (req, res, next) => {
  let token;

  // Check for the authorization header and ensure it's a Bearer token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Get token from header (e.g., "Bearer eyJhbGci...")
      token = req.headers.authorization.split(' ')[1];

      // 2. Verify the token's signature and expiration
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Get the user from the database using the ID in the token
      // We exclude the password from the data we fetch
      req.user = await User.findById(decoded.id).select('-password');
      
      // 4. Handle the case where the user might have been deleted
      if (!req.user) {
          return res.status(401).json({ message: 'User not found, authorization failed' });
      }

      // 5. If everything is okay, proceed to the next middleware or route handler
      next();
    } catch (error) {
      // This will catch errors from jwt.verify (e.g., invalid or expired token)
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // This block runs if no 'Authorization' header or 'Bearer' token is found
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const isProfessor = (req, res, next) => {
if (req.user && req.user.role === 'professor') {
 next();
} else {
 res.status(403).json({ message: 'Not authorized as a professor' });
}
};

const isAdmin = (req, res, next) => {
 if (req.user && req.user.role === 'admin') {
next();
 } else {
 res.status(403).json({ message: 'Not authorized as an admin' });
 }
};

module.exports = { protect, isProfessor, isAdmin };