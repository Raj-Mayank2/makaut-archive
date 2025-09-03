// src/components/common/NoteCard.jsx
// src/components/common/NoteCard.jsx
import { useAuth } from '../../context/AuthContext';

// We now accept an 'onDelete' function as a prop
const NoteCard = ({ note, onDelete }) => {
  const { user } = useAuth(); // Get the current logged-in user

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{note.title}</h3>
        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Subject:</span> {note.subject}
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Uploaded by:</span> {note.uploadedBy?.name || 'N/A'}
        </p>
      </div>

      <div className="mt-4 flex flex-col space-y-2">
        <a
          href={note.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Download
        </a>
        
        {/* ## Conditional "Delete" Button ## */}
        {user?.role === 'admin' && (
          <button
            onClick={() => onDelete(note._id)}
            className="w-full inline-block text-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Delete (Admin)
          </button>
        )}
      </div>
    </div>
  );
};

export default NoteCard;