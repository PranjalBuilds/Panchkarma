import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storage } from '../utils/storage';
import { THERAPY_TYPES } from '../utils/constants';
import { 
  Calendar, 
  Clock, 
  Plus, 
  TrendingUp, 
  Users, 
  Activity,
  ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [therapies, setTherapies] = useState([]);
  const [upcomingTherapies, setUpcomingTherapies] = useState([]);
  const [stats, setStats] = useState({
    totalTherapies: 0,
    upcomingCount: 0,
    completedCount: 0
  });

  useEffect(() => {
    const allTherapies = storage.getTherapies();
    setTherapies(allTherapies);
    
    // Get upcoming therapies (next 7 days)
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const upcoming = allTherapies.filter(therapy => {
      const therapyDate = new Date(`${therapy.date}T${therapy.time}`);
      return therapyDate >= now && therapyDate <= nextWeek;
    }).sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
    
    setUpcomingTherapies(upcoming);
    
    // Calculate stats
    const completed = allTherapies.filter(therapy => {
      const therapyDate = new Date(`${therapy.date}T${therapy.time}`);
      return therapyDate < now;
    });
    
    setStats({
      totalTherapies: allTherapies.length,
      upcomingCount: upcoming.length,
      completedCount: completed.length
    });
  }, []);

  const getTherapyTypeLabel = (type) => {
    const therapyType = THERAPY_TYPES.find(t => t.value === type);
    return therapyType ? therapyType.label : type;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-serif font-bold mb-2">
          Welcome back, {user?.name?.split(' ')[0]}! 🌿
        </h1>
        <p className="text-primary-100">
          Your wellness journey continues. Here's your personalized dashboard.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Therapies</p>
              <p className="text-3xl font-bold text-primary-600">{stats.totalTherapies}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Activity className="text-primary-600" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-3xl font-bold text-warm-600">{stats.upcomingCount}</p>
            </div>
            <div className="w-12 h-12 bg-warm-100 rounded-lg flex items-center justify-center">
              <Clock className="text-warm-600" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-earth-600">{stats.completedCount}</p>
            </div>
            <div className="w-12 h-12 bg-earth-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-earth-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Therapies */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif font-semibold text-gray-900">
              Upcoming Therapies
            </h2>
            <Link
              to="/therapies"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
            >
              View All
              <ArrowRight className="ml-1" size={16} />
            </Link>
          </div>

          {upcomingTherapies.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-500 mb-4">No upcoming therapies scheduled</p>
              <Link
                to="/therapies"
                className="btn-primary inline-flex items-center"
              >
                <Plus className="mr-2" size={16} />
                Schedule Therapy
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingTherapies.slice(0, 3).map((therapy) => (
                <div
                  key={therapy.id}
                  className="flex items-center justify-between p-4 bg-earth-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Calendar className="text-primary-600" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {getTherapyTypeLabel(therapy.type)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatDate(therapy.date)} at {formatTime(therapy.time)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary-600">
                      {therapy.duration || '60'} min
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-xl font-serif font-semibold text-gray-900 mb-6">
            Quick Actions
          </h2>
          
          <div className="space-y-4">
            <Link
              to="/therapies"
              className="flex items-center justify-between p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Plus className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Schedule New Therapy</p>
                  <p className="text-sm text-gray-600">Book your next session</p>
                </div>
              </div>
              <ArrowRight className="text-primary-600" size={16} />
            </Link>

            <Link
              to="/profile"
              className="flex items-center justify-between p-4 bg-earth-50 rounded-lg hover:bg-earth-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-earth-600 rounded-lg flex items-center justify-center">
                  <Users className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Update Profile</p>
                  <p className="text-sm text-gray-600">Manage your information</p>
                </div>
              </div>
              <ArrowRight className="text-earth-600" size={16} />
            </Link>

            <Link
              to="/coming-soon"
              className="flex items-center justify-between p-4 bg-warm-50 rounded-lg hover:bg-warm-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-warm-600 rounded-lg flex items-center justify-center">
                  <Activity className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Wellness Insights</p>
                  <p className="text-sm text-gray-600">Coming soon features</p>
                </div>
              </div>
              <ArrowRight className="text-warm-600" size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
