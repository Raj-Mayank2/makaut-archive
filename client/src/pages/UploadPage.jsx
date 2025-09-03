// src/pages/UploadPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadNote } from '../services/noteService';

const UploadPage = () => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('PDF'); // Default file type
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Create a FormData object to send the file and text data together
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subject', subject);
    formData.append('department', department);
    formData.append('semester', semester);
    formData.append('fileType', fileType);
    formData.append('file', file); // The key 'file' must match the backend (upload.single('file'))

    try {
      await uploadNote(formData);
      setSuccess('Note uploaded successfully! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000); // Wait 2 seconds before redirecting
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Upload New Note</h1>
      <div className="p-8 bg-white rounded-lg shadow-md">
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Note Title, Subject, etc. */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Note Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
            <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
            <input type="text" id="department" value={department} onChange={(e) => setDepartment(e.target.value)} required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="semester" className="block text-sm font-medium text-gray-700">Semester</label>
            <input type="number" id="semester" value={semester} onChange={(e) => setSemester(e.target.value)} required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          
          {/* File Input */}
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">Note File</label>
            <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} required
              className="w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>

          <div>
            <button type="submit" disabled={loading}
              className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
            >
              {loading ? 'Uploading...' : 'Upload Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;