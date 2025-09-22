import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { useStore } from '../store/useStore';
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
  const { setUser: setStoreUser, clearUser } = useStore();

  useEffect(() => {
    // Check for existing session on app load
    const session = storage.getSession();
    const userData = storage.getUser();
    
    if (session && userData && new Date(session.expiresAt) > new Date()) {
      setUser(userData);
      setStoreUser(userData);
    } else {
      // Clear expired session
      storage.removeSession();
      storage.removeUser();
      clearUser();
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email, password, role) => {
    try {
      // Check all users for matching credentials
      const allUsers = storage.getAllUsers();
      const userData = allUsers.find(user => 
        user.email === email && 
        user.password === password && 
        user.role === role
      );
      
      if (!userData) {
        throw new Error('Invalid email, password, or role. Please check your credentials.');
      }
      
      // Create session
      const session = {
        userId: userData.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
      };
      
      storage.setSession(session);
      setUser(userData);
      setStoreUser(userData);
      
      toast.success('Welcome back!');
      return { success: true };
    } catch (error) {
      toast.error(error.message);
      return { success: false, error: error.message };
    }
  };

  const signup = async (userData) => {
    try {
      // Check if user already exists in all users
      const allUsers = storage.getAllUsers();
      const existingUser = allUsers.find(user => user.email === userData.email);
      if (existingUser) {
        throw new Error('User already exists with this email');
      }
      
      const newUser = {
        id: Date.now().toString(),
        role: userData.role || 'patient', // Default to patient role
        ...userData,
        createdAt: new Date().toISOString()
      };
      
      // Add to all users and set as current user
      storage.addUser(newUser);
      storage.setUser(newUser);
      
      // Create session
      const session = {
        userId: newUser.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };
      
      storage.setSession(session);
      setUser(newUser);
      setStoreUser(newUser);
      
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
    clearUser();
    toast.success('Logged out successfully');
  };

  const updateProfile = (updates) => {
    try {
      const updatedUser = { ...user, ...updates };
      storage.setUser(updatedUser);
      storage.updateUser(user.id, updates);
      setUser(updatedUser);
      setStoreUser(updatedUser);
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
