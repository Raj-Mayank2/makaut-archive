// src/components/common/AdminRoute.jsx

//import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  // We'll get the user from our AuthContext later.
  // For now, let's simulate it. In a real scenario, useAuth() would be here.
  // const { user } = useAuth(); 
  
  // -- TEMPORARY SIMULATION --
  // To test this, you can change 'admin' to 'student' and see access denied.
  const simulatedUser = { role: 'admin' }; 
  // -------------------------

  // The real logic will be:
  // if (!user || user.role !== 'admin') { ... }
  if (!simulatedUser || simulatedUser.role !== 'admin') {
    // If user is not an admin, redirect them to the main dashboard.
    return <Navigate to="/dashboard" replace />;
  }

  // If user is an admin, render the child route (the AdminDashboardPage).
  return <Outlet />;
};

export default AdminRoute;