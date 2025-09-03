// server/models/Note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Removes whitespace from both ends
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true, // This will be the URL from Cloudinary
    },
    fileType: {
      type: String,
      enum: ['PDF', 'DOCX', 'PPT', 'TXT', 'Other'], // Defines allowed file types
      required: true,
    },
    // This creates a direct link between the note and the user who uploaded it
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // This must match the name you gave mongoose.model('User', ...)
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Note', noteSchema);