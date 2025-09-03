// server/server.js
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');

const cors = require('cors');


const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
// ... near the top
const adminRoutes = require('./routes/adminRoutes');

connectDB();

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To accept JSON data in the body

// Mount the routes
app.use('/api/users', userRoutes);

// server/server.js
// ... other code ...

// Add this block right before your noteRoutes
app.use('/api/notes', (req, res, next) => {
  console.log(`--- Request received for: ${req.method} ${req.originalUrl} ---`);
  next();
}, noteRoutes);

app.use('/api/admin', adminRoutes);
app.use('/api/notes', require('./routes/noteRoutes')); 
// ...

app.use('/api/admin', adminRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));