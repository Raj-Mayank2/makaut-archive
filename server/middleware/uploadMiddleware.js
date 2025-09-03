const multer = require('multer');
const supabase = require('../config/supabase');

// Use multer's memory storage to temporarily hold the file
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadToSupabase = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const filePath = `notes/${Date.now()}-${req.file.originalname}`;

  try {
    const { data, error } = await supabase.storage
      .from('note-files') // The name of your bucket
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
      });

    if (error) {
      throw error;
    }

    // Attach the file path to the request object to be used in the controller
    req.file.path = data.path;
    next();
  } catch (error) {
    console.error('Supabase Upload Error:', error);
    res.status(500).json({ message: 'Error uploading file to Supabase.' });
  }
};

module.exports = { upload, uploadToSupabase };