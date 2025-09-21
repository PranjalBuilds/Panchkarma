import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Calendar, 
  Sparkles,
  Home
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/therapies', icon: Calendar, label: 'Therapies' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/coming-soon', icon: Sparkles, label: 'Coming Soon' },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-earth-200 min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
            <Home className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-primary-700">
              AyurSutra
            </h2>
            <p className="text-xs text-gray-500">Wellness Portal</p>
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
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                    : 'text-gray-600 hover:bg-earth-50 hover:text-primary-600'
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
        <div className="bg-earth-50 rounded-lg p-4">
          <p className="text-xs text-gray-600 text-center">
            Version 1.0.0
          </p>
          <p className="text-xs text-gray-500 text-center mt-1">
            © 2024 AyurSutra
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
