import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const session = storage.getSession();
    const userData = storage.getUser();
    
    if (session && userData && new Date(session.expiresAt) > new Date()) {
      setUser(userData);
    } else {
      // Clear expired session
      storage.removeSession();
      storage.removeUser();
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const userData = storage.getUser();
      
      if (!userData) {
        throw new Error('No user found. Please sign up first.');
      }
      
      if (userData.email !== email || userData.password !== password) {
        throw new Error('Invalid email or password');
      }
      
      // Create session
      const session = {
        userId: userData.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
      };
      
      storage.setSession(session);
      setUser(userData);
      
      toast.success('Welcome back!');
      return { success: true };
    } catch (error) {
      toast.error(error.message);
      return { success: false, error: error.message };
    }
  };

  const signup = async (userData) => {
    try {
      // Check if user already exists
      const existingUser = storage.getUser();
      if (existingUser && existingUser.email === userData.email) {
        throw new Error('User already exists with this email');
      }
      
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString()
      };
      
      storage.setUser(newUser);
      
      // Create session
      const session = {
        userId: newUser.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };
      
      storage.setSession(session);
      setUser(newUser);
      
      toast.success('Account created successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.message);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    storage.removeSession();
    storage.removeUser();
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateProfile = (updates) => {
    try {
      const updatedUser = { ...user, ...updates };
      storage.setUser(updatedUser);
      setUser(updatedUser);
      toast.success('Profile updated successfully');
      return { success: true };
    } catch (error) {
      toast.error('Failed to update profile');
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
