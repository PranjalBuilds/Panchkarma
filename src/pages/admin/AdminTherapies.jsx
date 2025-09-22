import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Calendar, Clock, DollarSign } from 'lucide-react';
import { storage } from '../../utils/storage';
import toast from 'react-hot-toast';

const AdminTherapies = () => {
  const [therapyTypes, setTherapyTypes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTherapy, setEditingTherapy] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    basePrice: '',
    duration: '60',
    instructions: ''
  });

  useEffect(() => {
    loadTherapyTypes();
  }, []);

  const loadTherapyTypes = () => {
    const therapies = storage.getTherapyTypes();
    setTherapyTypes(therapies);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.basePrice) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (editingTherapy) {
        storage.updateTherapyType(editingTherapy.id, formData);
        toast.success('Therapy updated successfully');
      } else {
        storage.addTherapyType(formData);
        toast.success('Therapy added successfully');
      }
      
      loadTherapyTypes();
      resetForm();
    } catch (error) {
      toast.error('Failed to save therapy');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      basePrice: '',
      duration: '60',
      instructions: ''
    });
    setShowForm(false);
    setEditingTherapy(null);
  };

  const handleEdit = (therapy) => {
    setFormData({
      name: therapy.name,
      description: therapy.description,
      basePrice: therapy.basePrice,
      duration: therapy.duration || '60',
      instructions: therapy.instructions || ''
    });
    setEditingTherapy(therapy);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this therapy type?')) {
      storage.deleteTherapyType(id);
      loadTherapyTypes();
      toast.success('Therapy deleted successfully');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-gray-100">
            Manage Therapies
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Add and manage therapy types with pricing
          </p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="mr-2" size={16} />
          Add Therapy Type
        </button>
      </div>

      {/* Therapy Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-dark-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-serif font-semibold text-gray-900 dark:text-gray-100 mb-6">
                {editingTherapy ? 'Edit Therapy Type' : 'Add New Therapy Type'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="label">Therapy Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="e.g., Vamana Therapy"
                      required
                    />
                  </div>

                  <div>
                    <label className="label">Base Price (₹) *</label>
                    <input
                      type="number"
                      name="basePrice"
                      value={formData.basePrice}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="2000"
                      min="0"
                      required
                    />
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
                  <label className="label">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="input-field resize-none"
                    placeholder="Describe the therapy and its benefits"
                    required
                  />
                </div>

                <div>
                  <label className="label">Pre/Post Instructions</label>
                  <textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Instructions for patients before and after therapy"
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-dark-600">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    {editingTherapy ? 'Update Therapy' : 'Add Therapy'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Therapies List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {therapyTypes.length === 0 ? (
          <div className="col-span-full card text-center py-12">
            <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No therapy types added
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Start by adding your first therapy type
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary flex items-center mx-auto"
            >
              <Plus className="mr-2" size={16} />
              Add First Therapy
            </button>
          </div>
        ) : (
          therapyTypes.map((therapy) => (
            <div key={therapy.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {therapy.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {therapy.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <DollarSign size={16} className="mr-1" />
                      {formatCurrency(parseInt(therapy.basePrice))}
                    </span>
                    <span className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {therapy.duration} min
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(therapy)}
                    className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(therapy.id)}
                    className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              {therapy.instructions && (
                <div className="pt-4 border-t border-gray-200 dark:border-dark-600">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Instructions:
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {therapy.instructions}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminTherapies;
