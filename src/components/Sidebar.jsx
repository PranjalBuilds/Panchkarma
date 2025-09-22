import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  User, 
  Calendar, 
  Sparkles,
  Home,
  Settings,
  Users,
  BarChart3,
  Clock
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();
  
  const patientNavItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/therapies', icon: Calendar, label: 'My Therapies' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/coming-soon', icon: Sparkles, label: 'Coming Soon' },
  ];
  
  const adminNavItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Admin Dashboard' },
    { path: '/admin/therapies', icon: Calendar, label: 'Manage Therapies' },
    { path: '/admin/slots', icon: Clock, label: 'Manage Slots' },
    { path: '/admin/patients', icon: Users, label: 'Patients' },
    { path: '/admin/reports', icon: BarChart3, label: 'Reports' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];
  
  const navItems = user?.role === 'admin' ? adminNavItems : patientNavItems;

  return (
    <aside className="w-64 bg-white dark:bg-dark-800 shadow-sm border-r border-earth-200 dark:border-dark-700 min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
            <Home className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-primary-700 dark:text-primary-400">
              AyurSutra
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user?.role === 'admin' ? 'Admin Portal' : 'Wellness Portal'}
            </p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 border-r-2 border-primary-600 dark:border-primary-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-earth-50 dark:hover:bg-dark-700 hover:text-primary-600 dark:hover:text-primary-400'
                }`
              }
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-earth-50 dark:bg-dark-700 rounded-lg p-4">
          <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
            Version 1.0.0
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-1">
            © 2024 AyurSutra
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
