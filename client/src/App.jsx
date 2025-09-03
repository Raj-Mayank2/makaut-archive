// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// ... other imports
import UploadPage from './pages/UploadPage';
import ProfessorRoute from './components/common/ProfessorRoute';
// Layout & Pages
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage'; // <-- Import Dashboard
import AdminDashboardPage from './pages/AdminDashboardPage';

// Route Protection
import AdminRoute from './components/common/AdminRoute';
import ProtectedRoute from './components/common/ProtectedRoute'; // <-- Import ProtectedRoute
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <Navbar /> 
      <main className="container mx-auto px-4 py-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* Protected Routes for any logged-in user */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* Other general protected routes like /profile can go here */}
          </Route>
          
          <Route element={<ProfessorRoute />}>
            <Route path="/upload" element={<UploadPage />} />
          </Route>
          {/* Admin-Only Route */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;