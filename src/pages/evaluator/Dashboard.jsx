import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const EvaluatorDashboard = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">Evaluator Dashboard</h1>
          <div className="space-x-4">
            <Link to="/change-password" className="text-white hover:text-indigo-200">
              Change Password
            </Link>
            <button
              onClick={logout}
              className="text-white hover:text-indigo-200"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome, Evaluator</h2>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-600">Your evaluation dashboard will be available soon.</p>
        </div>
      </div>
    </div>
  );
};

export default EvaluatorDashboard;