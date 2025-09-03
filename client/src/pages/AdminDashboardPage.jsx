// src/pages/AdminDashboardPage.jsx
import { useState, useEffect } from 'react';
import { getPendingProfessors, approveProfessor } from '../services/adminService';

const AdminDashboardPage = () => {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchPending = async () => {
    try {
      setLoading(true);
      const data = await getPendingProfessors();
      setProfessors(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await approveProfessor(id);
      setMessage(res.message);
      // Refresh the list after approval
      fetchPending(); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-8 bg-gray-50 rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Control Panel</h1>
      
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Pending Professor Approvals</h2>
        {loading ? (
          <p>Loading...</p>
        ) : professors.length > 0 ? (
          <ul className="space-y-4">
            {professors.map((prof) => (
              <li key={prof._id} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <p className="font-bold">{prof.name}</p>
                  <p className="text-sm text-gray-500">{prof.email}</p>
                </div>
                <button
                  onClick={() => handleApprove(prof._id)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Approve
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No pending approvals.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;