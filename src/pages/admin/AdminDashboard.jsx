import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { storage } from '../../utils/storage';
import { 
  Users, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Activity,
  AlertCircle,
  CheckCircle,
  UserPlus,
  MessageSquare
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const { 
    therapySlots, 
    bookings, 
    waitlist, 
    adminStats, 
    updateAdminStats 
  } = useStore();
  
  const [allUsers, setAllUsers] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [recentFeedbacks, setRecentFeedbacks] = useState([]);

  useEffect(() => {
    // Load all users
    const users = storage.getAllUsers();
    setAllUsers(users);
    
    // Load recent feedbacks
    const feedbacks = storage.getFeedbacks();
    setRecentFeedbacks(feedbacks.slice(-5).reverse());
    
    // Calculate admin stats
    const totalSlots = therapySlots.length;
    const occupiedSlots = bookings.filter(booking => {
      const bookingDate = new Date(`${booking.date}T${booking.time}`);
      return bookingDate > new Date();
    }).length;
    const freeSlots = totalSlots - occupiedSlots;
    const totalPatients = users.filter(user => user.role === 'patient').length;
    const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.amount || 0), 0);

    updateAdminStats({
      totalSlots,
      occupiedSlots,
      freeSlots,
      totalBookings: bookings.length,
      totalPatients,
      totalRevenue
    });

    // Get recent bookings
    const recent = bookings
      .sort((a, b) => new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`))
      .slice(0, 5);
    setRecentBookings(recent);

    // Prepare chart data
    const therapyTypes = ['vamana', 'virechana', 'basti', 'nasya', 'raktamokshana'];
    const chartData = therapyTypes.map(type => {
      const count = bookings.filter(booking => booking.type === type).length;
      return {
        name: type.charAt(0).toUpperCase() + type.slice(1),
        value: count,
        color: getTherapyColor(type)
      };
    });
    setChartData(chartData);
  }, [therapySlots, bookings, waitlist, updateAdminStats]);

  const getTherapyColor = (type) => {
    const colors = {
      vamana: '#3a9d3a',
      virechana: '#b19d7f',
      basti: '#e8c896',
      nasya: '#857157',
      raktamokshana: '#c49a5a'
    };
    return colors[type] || '#3a9d3a';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
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
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-gray-100">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your Panchakarma center operations
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Slots</p>
              <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                {adminStats.totalSlots}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
              <Calendar className="text-primary-600 dark:text-primary-400" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Occupied Slots</p>
              <p className="text-3xl font-bold text-warm-600 dark:text-warm-400">
                {adminStats.occupiedSlots}
              </p>
            </div>
            <div className="w-12 h-12 bg-warm-100 dark:bg-warm-900/30 rounded-lg flex items-center justify-center">
              <Clock className="text-warm-600 dark:text-warm-400" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Free Slots</p>
              <p className="text-3xl font-bold text-earth-600 dark:text-earth-400">
                {adminStats.freeSlots}
              </p>
            </div>
            <div className="w-12 h-12 bg-earth-100 dark:bg-earth-900/30 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-earth-600 dark:text-earth-400" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Patients</p>
              <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                {adminStats.totalPatients}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
              <Users className="text-primary-600 dark:text-primary-400" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-3xl font-bold text-warm-600 dark:text-warm-400">
                {allUsers.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-warm-100 dark:bg-warm-900/30 rounded-lg flex items-center justify-center">
              <UserPlus className="text-warm-600 dark:text-warm-400" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-3xl font-bold text-earth-600 dark:text-earth-400">
                ₹{adminStats.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-earth-100 dark:bg-earth-900/30 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-earth-600 dark:text-earth-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Therapy Distribution Chart */}
        <div className="card">
          <h3 className="text-lg font-serif font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Therapy Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="card">
          <h3 className="text-lg font-serif font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Recent Bookings
          </h3>
          <div className="space-y-3">
            {recentBookings.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No recent bookings
              </p>
            ) : (
              recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                      <Calendar className="text-primary-600 dark:text-primary-400" size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {booking.type.charAt(0).toUpperCase() + booking.type.slice(1)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(booking.date)} at {formatTime(booking.time)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                      {formatCurrency(booking.amount || 0)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Feedbacks */}
        <div className="card">
          <h3 className="text-lg font-serif font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Recent Feedback
          </h3>
          <div className="space-y-3">
            {recentFeedbacks.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No feedback received
              </p>
            ) : (
              recentFeedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  className="p-3 bg-gray-50 dark:bg-dark-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-warm-100 dark:bg-warm-900/30 rounded-lg flex items-center justify-center">
                      <MessageSquare className="text-warm-600 dark:text-warm-400" size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {feedback.patientName || 'Anonymous'}
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}
                              fill={i < feedback.rating ? 'currentColor' : 'none'}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(feedback.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feedback.comment}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Waitlist Alert */}
      {waitlist.length > 0 && (
        <div className="card bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center space-x-3">
            <AlertCircle className="text-yellow-600 dark:text-yellow-400" size={24} />
            <div>
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200">
                Waitlist Alert
              </h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                {waitlist.length} patients are waiting for available slots
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
