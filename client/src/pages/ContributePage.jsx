import { useState } from 'react';

const ContributePage = () => {
  const [formData, setFormData] = useState({
      title: '',
      subject: '',
      department: 'CSE', // Default value
      semester: '',
      driveLink: '',
      fileType: 'PDF', // Default value
  });
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' or 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasConfirmed) {
      alert('Please confirm the sharing permissions before submitting.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmissionStatus(null);
    setErrorMessage('');
    
    try {
      // Assumes you store the JWT token in localStorage after login
      const authToken = localStorage.getItem('token'); 
      if (!authToken) {
          throw new Error('You must be logged in to submit notes.');
      }

      const response = await fetch('/api/notes/submit-link', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
          throw new Error(data.message || 'Failed to submit note');
      }

      setSubmissionStatus('success');
      setFormData({ title: '', subject: '', department: 'CSE', semester: '', driveLink: '', fileType: 'PDF' });
      setHasConfirmed(false);
    } catch (error) {
      setErrorMessage(error.message);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionStatus === 'success') {
    return (
      <div className="text-center max-w-2xl mx-auto my-20 p-10 bg-green-50 border-2 border-green-200 rounded-lg">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-3xl font-bold text-green-800 mb-2">Submission Successful!</h2>
        <p className="text-gray-600">
          Thank you for contributing! Your notes are pending review and will be live on the site after approval.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Contribute Your Notes</h1>
      <form onSubmit={handleSubmit}>
        {/* INSTRUCTION BLOCK */}
        <div className="p-4 mb-6 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-r-lg">
            <h4 className="font-bold">⚠️ Important: How to Share Your Link</h4>
            <ol className="list-decimal list-inside mt-2 text-sm">
                <li>Upload your PDF notes to your Google Drive.</li>
                <li>Right-click the file and select <strong>"Share"</strong>.</li>
                <li>Under "General access", change to <strong>"Anyone with the link"</strong>.</li>
                <li>Ensure the role is set to <strong>"Viewer"</strong>, then click <strong>"Copy link"</strong>.</li>
            </ol>
        </div>
        
        {/* FORM FIELDS */}
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Note Title (e.g., DSA Module 1)" className="w-full p-2 mb-4 border rounded" required />
        <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject Name (e.g., Data Structures)" className="w-full p-2 mb-4 border rounded" required />
        <select name="semester" value={formData.semester} onChange={handleChange} className="w-full p-2 mb-4 border rounded" required>
            <option value="">Select Semester</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => <option key={sem} value={sem}>{sem}</option>)}
        </select>
        <input name="driveLink" type="url" value={formData.driveLink} onChange={handleChange} placeholder="Paste your Google Drive link here" className="w-full p-2 mb-4 border rounded" required />
        
        {/* CONFIRMATION CHECKBOX */}
        <div className="mb-6">
          <label className="flex items-center">
            <input type="checkbox" checked={hasConfirmed} onChange={(e) => setHasConfirmed(e.target.checked)} className="h-5 w-5" />
            <span className="ml-2 text-gray-700">I confirm the link is shared with "Anyone with the link".</span>
          </label>
        </div>
        
        {submissionStatus === 'error' && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <button type="submit" disabled={isSubmitting || !hasConfirmed} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
          {isSubmitting ? 'Submitting...' : 'Submit for Review'}
        </button>
      </form>
    </div>
  );
};

export default ContributePage;