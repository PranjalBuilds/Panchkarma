import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, Calendar, Phone, Mail, Eye } from 'lucide-react';
import { storage } from '../../utils/storage';

const AdminPatients = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientBookings, setPatientBookings] = useState([]);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = () => {
    const users = storage.getAllUsers();
    const patientUsers = users.filter(user => user.role === 'patient');
    setAllUsers(users);
    setPatients(patientUsers);
  };

  const getPatientBookings = (patientId) => {
    const bookings = storage.getTherapies();
    return bookings.filter(booking => booking.userId === patientId);
  };

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    const bookings = getPatientBookings(patient.id);
    setPatientBookings(bookings);
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-gray-100">
            Patients
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View and manage patient information and bookings
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search patients by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400" size={20} />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {filteredPatients.length} patients
            </span>
          </div>
        </div>
      </div>

      {/* Patients List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPatients.length === 0 ? (
          <div className="col-span-full card text-center py-12">
            <Users className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No patients found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm ? 'Try adjusting your search criteria' : 'No patients have registered yet'}
            </p>
          </div>
        ) : (
          filteredPatients.map((patient) => (
            <div key={patient.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                    <Users className="text-primary-600 dark:text-primary-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {patient.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Patient ID: {patient.id.slice(-6)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleViewPatient(patient)}
                  className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                >
                  <Eye size={16} />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Mail size={16} />
                  <span>{patient.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Phone size={16} />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar size={16} />
                  <span>Joined {formatDate(patient.createdAt)}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-dark-600">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Total Bookings:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {getPatientBookings(patient.id).length}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Patient Details Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-dark-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif font-semibold text-gray-900 dark:text-gray-100">
                  Patient Details
                </h2>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Patient Info */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Personal Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Name</label>
                      <p className="text-gray-900 dark:text-gray-100">{selectedPatient.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
                      <p className="text-gray-900 dark:text-gray-100">{selectedPatient.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Phone</label>
                      <p className="text-gray-900 dark:text-gray-100">{selectedPatient.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Date of Birth</label>
                      <p className="text-gray-900 dark:text-gray-100">
                        {selectedPatient.dateOfBirth ? formatDate(selectedPatient.dateOfBirth) : 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Address</label>
                      <p className="text-gray-900 dark:text-gray-100">
                        {selectedPatient.address || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Medical History</label>
                      <p className="text-gray-900 dark:text-gray-100">
                        {selectedPatient.medicalHistory || 'Not provided'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Patient Bookings */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Therapy Bookings ({patientBookings.length})
                  </h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {patientBookings.length === 0 ? (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                        No bookings found
                      </p>
                    ) : (
                      patientBookings.map((booking) => (
                        <div key={booking.id} className="p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                              {booking.type.charAt(0).toUpperCase() + booking.type.slice(1)}
                            </h4>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {formatDate(booking.date)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                            <span>{formatTime(booking.time)}</span>
                            <span>{booking.duration || 60} min</span>
                          </div>
                          {booking.notes && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                              {booking.notes}
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPatients;
