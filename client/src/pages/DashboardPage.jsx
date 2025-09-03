import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getNotes, getFilterOptions, deleteNote } from '../services/noteService';
import NoteCard from '../components/common/NoteCard';

const DashboardPage = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for selections
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // State for filter options
  const [filterOptions, setFilterOptions] = useState({
    departments: [],
    semesters: [],
    subjects: [],
  });

  // --- CORRECTED DATA FETCHING ---

  // 1. Fetch initial departments on page load
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const { departments } = await getFilterOptions();
        setFilterOptions(prev => ({ ...prev, departments: departments || [] }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  // 2. Fetch semesters when department is selected
  useEffect(() => {
    if (selectedDepartment) {
      const fetchSemesters = async () => {
        try {
          setLoading(true);
          const { semesters } = await getFilterOptions({ department: selectedDepartment });
          setFilterOptions(prev => ({ ...prev, semesters: semesters || [] }));
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchSemesters();
    }
  }, [selectedDepartment]);

  // 3. Fetch subjects when semester is selected
  useEffect(() => {
    if (selectedDepartment && selectedSemester) {
      const fetchSubjects = async () => {
        try {
          setLoading(true);
          const { subjects } = await getFilterOptions({ department: selectedDepartment, semester: selectedSemester });
          setFilterOptions(prev => ({ ...prev, subjects: subjects || [] }));
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchSubjects();
    }
  }, [selectedSemester]);
  
  // 4. Fetch notes when subject is selected
  useEffect(() => {
    if (selectedDepartment && selectedSemester && selectedSubject) {
      const fetchNotes = async () => {
        try {
          setLoading(true);
          const filters = { department: selectedDepartment, semester: selectedSemester, subject: selectedSubject };
          const fetchedNotes = await getNotes(filters);
          setNotes(fetchedNotes);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchNotes();
    }
  }, [selectedSubject]);

  // ... (All your handlers and UI sub-components are excellent, no changes needed there)
  
  const handleDeleteNote = async (noteId) => {
    if (window.confirm('Are you sure you want to permanently delete this note?')) {
      try {
        await deleteNote(noteId);
        setNotes(prevNotes => prevNotes.filter(note => note._id !== noteId));
      } catch (err) {
        setError(err.message);
      }
    }
  };
  const handleBackToDepartments = () => {
    setSelectedDepartment(null);
    setSelectedSemester(null);
    setSelectedSubject(null);
    setFilterOptions(prev => ({...prev, semesters: [], subjects: []}));
    setNotes([]);
  };
  const handleBackToSemesters = () => {
    setSelectedSemester(null);
    setSelectedSubject(null);
    setFilterOptions(prev => ({ ...prev, subjects: [] }));
    setNotes([]);
  };
  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setNotes([]);
  };

  const Breadcrumb = () => (
    <div className="flex items-center space-x-2 mb-8 text-sm">
      <span onClick={handleBackToDepartments} className={`px-3 py-1 rounded-full transition-all duration-200 ${!selectedDepartment ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer'}`}>Departments</span>
      {selectedDepartment && (<>
        <span className="text-gray-400">→</span>
        <span onClick={handleBackToSemesters} className={`px-3 py-1 rounded-full transition-all duration-200 ${!selectedSemester ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer'}`}>{selectedDepartment}</span>
      </>)}
      {selectedSemester && (<>
        <span className="text-gray-400">→</span>
        <span onClick={handleBackToSubjects} className={`px-3 py-1 rounded-full transition-all duration-200 ${!selectedSubject ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer'}`}>Semester {selectedSemester}</span>
      </>)}
      {selectedSubject && (<>
        <span className="text-gray-400">→</span>
        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">{selectedSubject}</span>
      </>)}
    </div>
  );

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 animate-pulse">
          <div className="h-6 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-200 rounded-lg w-3/4"></div>
        </div>
      ))}
    </div>
  );

  const SelectionCard = ({ item, onClick, type }) => {
    const getIcon = () => {
      switch (type) {
        case 'department': return '🏛️';
        case 'semester': return '📚';
        case 'subject': return '📖';
        default: return '📁';
      }
    };
    return (
      <div onClick={onClick} className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-blue-200">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10 text-center">
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{getIcon()}</div>
          <p className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{type === 'semester' ? `Semester ${item}` : item}</p>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (loading) return <LoadingSkeleton />;
    if (error) return (<div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center"><div className="text-6xl mb-4">⚠️</div><p className="text-red-600 text-lg font-medium mb-2">Oops! Something went wrong</p><p className="text-red-500">{error}</p></div>);

    if (selectedSubject) {
      return (
        <div className="space-y-8">
          <div className="text-center"><h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">{selectedSubject} Notes</h2></div>
          {notes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {notes.map((note) => <NoteCard key={note._id} note={note} onDelete={handleDeleteNote} isAdmin={user?.role === 'admin'} />)}
            </div>
          ) : (<div className="text-center py-16"><div className="text-8xl mb-6">📝</div><h3 className="text-2xl font-semibold text-gray-700 mb-2">No Notes Available</h3><p className="text-gray-500 max-w-md mx-auto">There are no notes available for this subject yet.</p></div>)}
        </div>
      );
    }
    
    if (selectedSemester) {
      return (
        <div className="space-y-8 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Choose Your Subject</h2>
          {filterOptions.subjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterOptions.subjects.sort().map(subject => (<SelectionCard key={subject} item={subject} onClick={() => setSelectedSubject(subject)} type="subject" />))}
            </div>
          ) : (<p className="text-gray-500">No subjects found for this semester.</p>)}
        </div>
      );
    }

    if (selectedDepartment) {
      return (
        <div className="space-y-8 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Select Semester</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filterOptions.semesters.sort((a,b) => a-b).map(semester => (<SelectionCard key={semester} item={semester} onClick={() => setSelectedSemester(semester)} type="semester" />))}
          </div>
        </div>
      );
    }
    
    return (
      <div className="space-y-8 text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Choose Your Department</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filterOptions.departments.sort().map(department => (<SelectionCard key={department} item={department} onClick={() => setSelectedDepartment(department)} type="department" />))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12"><h1 className="text-5xl font-extrabold text-gray-800">Welcome back, <span className="text-indigo-600">{user?.name || 'Student'}!</span></h1><p className="text-xl text-gray-600 mt-4">Navigate through your academic world.</p></div>
        <Breadcrumb />
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;