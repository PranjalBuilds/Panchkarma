import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { useStore } from '../store/useStore';
import { validateTherapyForm } from '../utils/validation';
import { TIME_SLOTS } from '../utils/constants';
import { 
  Plus, 
  Calendar, 
  Clock, 
  Trash2, 
  Edit3,
  Filter,
  Search,
  CreditCard,
  MapPin,
  User
} from 'lucide-react';
import toast from 'react-hot-toast';
import PaymentModal from '../components/PaymentModal';

const Therapies = () => {
  const [therapies, setTherapies] = useState([]);
  const [therapyTypes, setTherapyTypes] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTherapy, setEditingTherapy] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedTherapy, setSelectedTherapy] = useState(null);
  const [formData, setFormData] = useState({
    therapyTypeId: '',
    clinicId: '',
    doctorId: '',
    date: '',
    time: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { addBooking, addPayment } = useStore();

  useEffect(() => {
    loadTherapies();
    loadAdminData();
  }, []);

  const loadTherapies = () => {
    const allTherapies = storage.getTherapies();
    setTherapies(allTherapies);
  };

  const loadAdminData = () => {
    // Load admin-managed data
    const therapyTypes = storage.getTherapyTypes();
    const doctors = storage.getDoctors();
    const clinics = storage.getClinics();
    
    setTherapyTypes(therapyTypes);
    setDoctors(doctors);
    setClinics(clinics);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateTherapyForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    setIsLoading(true);
    
      try {
        if (editingTherapy) {
          // Update existing therapy
          const updated = storage.updateTherapy(editingTherapy.id, formData);
          if (updated) {
            toast.success('Therapy updated successfully');
          } else {
            toast.error('Failed to update therapy');
          }
        } else {
          // Get therapy type details for pricing
          const selectedTherapyType = therapyTypes.find(t => t.id === formData.therapyTypeId);
          const selectedClinic = clinics.find(c => c.id === formData.clinicId);
          const selectedDoctor = doctors.find(d => d.id === formData.doctorId);
          
          const therapyData = {
            ...formData,
            type: selectedTherapyType?.name || '',
            basePrice: selectedTherapyType?.basePrice || 0,
            duration: selectedTherapyType?.duration || 60,
            clinicName: selectedClinic?.name || '',
            doctorName: selectedDoctor?.name || '',
            userId: 'current-user' // In real app, get from auth context
          };
          
          const newTherapy = storage.addTherapy(therapyData);
          setSelectedTherapy(newTherapy);
          setShowPaymentModal(true);
        }
        
        loadTherapies();
        resetForm();
      } catch (error) {
        toast.error('An error occurred');
      }
    
    setIsLoading(false);
  };

  const resetForm = () => {
    setFormData({
      therapyTypeId: '',
      clinicId: '',
      doctorId: '',
      date: '',
      time: '',
      notes: ''
    });
    setErrors({});
    setShowForm(false);
    setEditingTherapy(null);
  };

  const handleEdit = (therapy) => {
    setFormData({
      type: therapy.type,
      date: therapy.date,
      time: therapy.time,
      duration: therapy.duration || '60',
      notes: therapy.notes,
      practitioner: therapy.practitioner || ''
    });
    setEditingTherapy(therapy);
    setShowForm(true);
  };

  const handleDelete = (therapyId) => {
    if (window.confirm('Are you sure you want to delete this therapy session?')) {
      storage.deleteTherapy(therapyId);
      loadTherapies();
      toast.success('Therapy deleted successfully');
    }
  };

  const getTherapyTypeLabel = (type) => {
    const therapyType = THERAPY_TYPES.find(t => t.value === type);
    return therapyType ? therapyType.label : type;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
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

  const getFilteredTherapies = () => {
    let filtered = therapies;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(therapy =>
        getTherapyTypeLabel(therapy.type).toLowerCase().includes(searchTerm.toLowerCase()) ||
        therapy.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (therapy.practitioner && therapy.practitioner.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply status filter
    const now = new Date();
    switch (filter) {
      case 'upcoming':
        filtered = filtered.filter(therapy => {
          const therapyDate = new Date(`${therapy.date}T${therapy.time}`);
          return therapyDate > now;
        });
        break;
      case 'past':
        filtered = filtered.filter(therapy => {
          const therapyDate = new Date(`${therapy.date}T${therapy.time}`);
          return therapyDate <= now;
        });
        break;
      default:
        // 'all' - no additional filtering
        break;
    }
    
    // Sort by date and time
    return filtered.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA - dateB;
    });
  };

  const handlePaymentSuccess = (paymentData) => {
    // Add booking to store
    addBooking({
      id: paymentData.id,
      userId: 'current-user', // In real app, get from auth context
      therapyId: paymentData.id,
      ...paymentData,
      status: 'confirmed',
      paymentId: paymentData.paymentId
    });

    // Add payment record
    addPayment({
      id: paymentData.paymentId,
      bookingId: paymentData.id,
      amount: paymentData.amount,
      status: 'completed',
      method: 'card',
      createdAt: new Date().toISOString()
    });

    toast.success('Therapy booked and payment completed successfully!');
    setShowPaymentModal(false);
    setSelectedTherapy(null);
  };

  const filteredTherapies = getFilteredTherapies();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Therapy Sessions</h1>
          <p className="text-gray-600 mt-1">Schedule and manage your Panchakarma treatments</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="mr-2" size={16} />
          Schedule Therapy
        </button>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search therapies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400" size={20} />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Sessions</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>
        </div>
      </div>

      {/* Therapy Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-6">
                {editingTherapy ? 'Edit Therapy Session' : 'Schedule New Therapy'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="label">Therapy Type *</label>
                    <select
                      name="therapyTypeId"
                      value={formData.therapyTypeId}
                      onChange={handleChange}
                      className={`input-field ${errors.therapyTypeId ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select therapy type</option>
                      {therapyTypes.map((therapy) => (
                        <option key={therapy.id} value={therapy.id}>
                          {therapy.name} - ₹{therapy.basePrice}
                        </option>
                      ))}
                    </select>
                    {errors.therapyTypeId && (
                      <p className="text-red-500 text-sm mt-1">{errors.therapyTypeId}</p>
                    )}
                  </div>

                  <div>
                    <label className="label">Clinic *</label>
                    <select
                      name="clinicId"
                      value={formData.clinicId}
                      onChange={handleChange}
                      className={`input-field ${errors.clinicId ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select clinic</option>
                      {clinics.map((clinic) => (
                        <option key={clinic.id} value={clinic.id}>
                          {clinic.name} - {clinic.location}
                        </option>
                      ))}
                    </select>
                    {errors.clinicId && (
                      <p className="text-red-500 text-sm mt-1">{errors.clinicId}</p>
                    )}
                  </div>

                  <div>
                    <label className="label">Doctor</label>
                    <select
                      name="doctorId"
                      value={formData.doctorId}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Select doctor (optional)</option>
                      {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                          Dr. {doctor.name} - {doctor.specialization}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="label">
                      <Calendar className="inline w-4 h-4 mr-2" />
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={`input-field ${errors.date ? 'border-red-500' : ''}`}
                    />
                    {errors.date && (
                      <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                    )}
                  </div>

                  <div>
                    <label className="label">
                      <Clock className="inline w-4 h-4 mr-2" />
                      Time
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={`input-field ${errors.time ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select time</option>
                      {TIME_SLOTS.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    {errors.time && (
                      <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                    )}
                  </div>

                  <div>
                    <label className="label">Duration (minutes)</label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="30">30 minutes</option>
                      <option value="60">60 minutes</option>
                      <option value="90">90 minutes</option>
                      <option value="120">120 minutes</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label">Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    className={`input-field resize-none ${errors.notes ? 'border-red-500' : ''}`}
                    placeholder="Any special instructions or notes for this session"
                  />
                  {errors.notes && (
                    <p className="text-red-500 text-sm mt-1">{errors.notes}</p>
                  )}
                </div>

                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Saving...' : editingTherapy ? 'Update Therapy' : 'Schedule Therapy'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Therapies List */}
      <div className="space-y-4">
        {filteredTherapies.length === 0 ? (
          <div className="card text-center py-12">
            <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No therapies found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by scheduling your first therapy session'
              }
            </p>
            {!searchTerm && filter === 'all' && (
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary flex items-center mx-auto"
              >
                <Plus className="mr-2" size={16} />
                Schedule Your First Therapy
              </button>
            )}
          </div>
        ) : (
          filteredTherapies.map((therapy) => {
            const therapyDate = new Date(`${therapy.date}T${therapy.time}`);
            const isPast = therapyDate < new Date();
            
            return (
              <div
                key={therapy.id}
                className={`card ${isPast ? 'opacity-75' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isPast ? 'bg-gray-100' : 'bg-primary-100'
                    }`}>
                      <Calendar className={isPast ? 'text-gray-600' : 'text-primary-600'} size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {getTherapyTypeLabel(therapy.type)}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Calendar className="mr-1" size={16} />
                          {formatDate(therapy.date)}
                        </span>
                        <span className="flex items-center">
                          <Clock className="mr-1" size={16} />
                          {formatTime(therapy.time)}
                        </span>
                        <span>{therapy.duration} min</span>
                        {therapy.practitioner && (
                          <span>with {therapy.practitioner}</span>
                        )}
                      </div>
                      {therapy.notes && (
                        <p className="text-sm text-gray-600 mt-2">{therapy.notes}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(therapy)}
                      className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(therapy.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        therapyDetails={selectedTherapy}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default Therapies;
