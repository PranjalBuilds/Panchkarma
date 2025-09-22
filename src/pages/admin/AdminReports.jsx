import React from 'react';
import { BarChart3, Download, Calendar } from 'lucide-react';

const AdminReports = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-gray-100">
            Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View analytics and generate reports
          </p>
        </div>
        <button className="btn-primary flex items-center">
          <Download className="mr-2" size={16} />
          Export Report
        </button>
      </div>

      <div className="card">
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          Reports interface coming soon...
        </p>
      </div>
    </div>
  );
};

export default AdminReports;
