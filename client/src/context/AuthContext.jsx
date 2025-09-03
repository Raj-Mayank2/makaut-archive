// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, getProfile } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          // Get user profile with the token
          const currentUser = await getProfile();
          setUser(currentUser);
        } catch (error) {
          // If token is invalid, logout
          console.error(error);
          logout();
        }
      }
      setIsLoading(false);
    };
    checkLoggedInUser();
  }, []);

  const login = async (credentials) => {
    try {
      const { user, token } = await loginUser(credentials);
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
    } catch (error) {
      // Re-throw the error to be handled by the LoginPage component
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};