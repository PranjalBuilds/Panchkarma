import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Bell, Shield } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white dark:bg-dark-800 shadow-sm border-b border-earth-200 dark:border-dark-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-serif font-bold text-primary-700 dark:text-primary-400">
            AyurSutra
          </h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">Panchakarma Management</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors">
            <Bell size={20} />
          </button>
          
          <ThemeToggle />
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                {user?.role === 'admin' ? (
                  <Shield className="text-primary-600 dark:text-primary-400" size={16} />
                ) : (
                  <User className="text-primary-600 dark:text-primary-400" size={16} />
                )}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email} • {user?.role === 'admin' ? 'Admin' : 'Patient'}
                </p>
              </div>
            </div>
            
            <button
              onClick={logout}
              className="flex items-center space-x-1 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <LogOut className="mr-2" size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;