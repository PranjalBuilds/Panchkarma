import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { initializeMockData } from './utils/initData';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Therapies from './pages/Therapies';
import ComingSoon from './pages/ComingSoon';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTherapies from './pages/admin/AdminTherapies';
import AdminSlots from './pages/admin/AdminSlots';
import AdminPatients from './pages/admin/AdminPatients';
import AdminReports from './pages/admin/AdminReports';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

const AppContent = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-dark-900">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
      {isAuthenticated ? (
        <div className="flex">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="flex-1 p-6">
              <Routes>
                {/* Patient Routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/therapies" element={<Therapies />} />
                <Route path="/coming-soon" element={<ComingSoon />} />
                
                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/therapies" element={<AdminTherapies />} />
                <Route path="/admin/slots" element={<AdminSlots />} />
                <Route path="/admin/patients" element={<AdminPatients />} />
                <Route path="/admin/reports" element={<AdminReports />} />
                
                {/* Default redirect based on role */}
                <Route path="*" element={
                  <Navigate to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'} />
                } />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
};

function App() {
  useEffect(() => {
    // Initialize mock data on app start
    initializeMockData();
  }, []);

  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
