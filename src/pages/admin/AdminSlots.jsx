import React from 'react';
import { Plus, Edit3, Trash2, Clock } from 'lucide-react';

const AdminSlots = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-gray-100">
            Manage Slots
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage available therapy slots and scheduling
          </p>
        </div>
        <button className="btn-primary flex items-center">
          <Plus className="mr-2" size={16} />
          Add Slot
        </button>
      </div>

      <div className="card">
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          Slot management interface coming soon...
        </p>
      </div>
    </div>
  );
};

export default AdminSlots;
