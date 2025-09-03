// src/components/layout/Navbar.jsx
import { useState } from 'react'; // <-- Import useState
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // <-- State for mobile menu

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-xl border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          {/* Enhanced Logo */}
          <Link to="/" className="group flex items-center space-x-3 transition-all duration-300 hover:scale-105" onClick={() => setIsMenuOpen(false)}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-2xl shadow-lg">
                <span className="text-2xl font-black tracking-tight">MA</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Makaut Archives
              </span>
              <span className="text-xs text-gray-500 font-medium tracking-wider">
                KNOWLEDGE HUB
              </span>
            </div>
          </Link>

          {/* Hamburger Menu Button (Visible on medium screens and below) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu (Visible on medium screens and up) */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              // ## LOGGED-IN DESKTOP LINKS ##
              <>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="group relative inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <span className="text-lg">⚡</span>
                    <span>Admin Panel</span>
                  </Link>
                )}
                {user?.role === 'professor' && (
                  <Link to="/upload" className="group relative inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <span className="text-lg">📤</span>
                    <span>Upload Note</span>
                  </Link>
                )}
                <Link to="/dashboard" className="group relative inline-flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 hover:bg-blue-50 rounded-xl">
                  <span className="text-lg">📊</span>
                  <span>Dashboard</span>
                </Link>
                <Link to="/about" className="group relative inline-flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 hover:bg-blue-50 rounded-xl">About</Link>
                <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-xl border border-blue-100">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="text-gray-700 font-medium">
                    Welcome, <span className="font-bold text-blue-600">{user?.name}</span>!
                  </span>
                </div>
                <button onClick={logout} className="group relative inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 font-semibold rounded-xl border border-gray-200 hover:border-red-200 transition-all duration-300 transform hover:scale-105">
                  <span className="text-lg group-hover:rotate-12 transition-transform duration-300">🚪</span>
                  <span>Logout</span>
                </button>
              </>
            ) : (
              // ## LOGGED-OUT DESKTOP LINKS ##
              <>
                <Link to="/login" className="group relative inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5">
                  <span className="relative flex items-center space-x-2">
                    <span className="text-lg">🔐</span>
                    <span>Login</span>
                  </span>
                </Link>
                <Link to="/register" className="group relative inline-flex items-center space-x-2 px-6 py-3 text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 hover:bg-blue-50 rounded-xl">
                  <span className="text-lg">✨</span>
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu (Conditionally Rendered) */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            {isAuthenticated ? (
              // ## LOGGED-IN MOBILE LINKS ##
              <div className="flex flex-col space-y-4 items-start">
                  {user?.role === 'admin' && (
                  <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 font-semibold hover:bg-blue-50 rounded-xl">⚡ Admin Panel</Link>
                )}
                {user?.role === 'professor' && (
                  <Link to="/upload" onClick={() => setIsMenuOpen(false)} className="w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 font-semibold hover:bg-blue-50 rounded-xl">📤 Upload Note</Link>
                )}
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 font-semibold hover:bg-blue-50 rounded-xl">📊 Dashboard</Link>
                <Link to="/about" onClick={() => setIsMenuOpen(false)} className="w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 font-semibold hover:bg-blue-50 rounded-xl">About</Link>
                <div className="w-full px-4 py-2 text-blue-600 font-bold">
                  Welcome, {user?.name}!
                </div>
                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full text-left px-4 py-2 text-red-600 font-semibold hover:bg-red-50 rounded-xl">🚪 Logout</button>
              </div>
            ) : (
              // ## LOGGED-OUT MOBILE LINKS ##
              <div className="flex flex-col space-y-4">
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 font-semibold hover:bg-blue-50 rounded-xl">🔐 Login</Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 font-semibold hover:bg-blue-50 rounded-xl">✨ Sign Up</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;