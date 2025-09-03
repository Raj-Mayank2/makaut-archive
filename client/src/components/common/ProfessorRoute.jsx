// src/components/common/ProfessorRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProfessorRoute = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    // If not logged in, go to login page
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'professor') {
    // If logged in but not a professor, go to the main dashboard
    // This prevents students from accessing professor pages
    return <Navigate to="/dashboard" replace />;
  }

  // If authenticated and is a professor, render the page
  return <Outlet />;
};

export default ProfessorRoute;