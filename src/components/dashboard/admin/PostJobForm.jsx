import React, { useState } from 'react';
import {
  PlusIcon,
  PaperClipIcon,
  MagnifyingGlassIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../utils/api';
import { useAuth } from '../../../context/authContext';


const PostJobForm = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state matching backend IPosition interface
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: 'engineering',
    positionType: 'senior',
    requirements: [],
    deadline: '',
    status: 'draft'
  });

  const [evaluationCriteria, setEvaluationCriteria] = useState(['Technical Skills']);
  const [newCriteria, setNewCriteria] = useState('');

  const departments = [
    'engineering', 'hr', 'finance', 'it', 'legal', 
    'research', 'product', 'quality', 'supply', 'procurement'
  ];

  const positionTypes = ['dean', 'head', 'senior', 'junior'];

  const handleAddCriteria = () => {
    if (newCriteria.trim()) {
      setEvaluationCriteria([...evaluationCriteria, newCriteria]);
      setNewCriteria('');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (status) => {
    setIsLoading(true);
    
    try {
      // Prepare data matching exactly the IPosition interface
      const positionPayload = {
        title: formData.title,
        description: formData.description,
        department: formData.department,
        positionType: formData.positionType,
        requirements: formData.requirements, // Only include if you want to maintain separate requirements
        deadline: formData.deadline ? new Date(formData.deadline).toISOString() : null,
        status: status === 'published' ? 'open' : 'draft',
        evaluationCriteria: evaluationCriteria,
        createdBy: user._id // Added to match your model
      };

      const response = await api.post('/positions', positionPayload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success(`Position ${status === 'published' ? 'published' : 'saved as draft'} successfully!`);
      navigate('/positions');
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create position');
      console.error('Error creating position:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Post New Position</h1>

      <form>
        {/* Position Information */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">1. Position Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position Title*</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position Type*</label>
              <select
                name="positionType"
                value={formData.positionType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {positionTypes.map(type => (
                  <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Position Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">2. Position Description*</h2>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Department */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">3. Department*</h2>
          <select
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept.charAt(0).toUpperCase() + dept.slice(1).replace(/([A-Z])/g, ' $1')}
              </option>
            ))}
          </select>
        </div>

        {/* Requirements */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">4. Requirements</h2>
          <textarea
            name="requirements"
            value={formData.requirements.join('\n')}
            onChange={(e) => setFormData({...formData, requirements: e.target.value.split('\n')})}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter requirements, one per line"
          />
        </div>

        {/* Evaluation Criteria */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">5. Evaluation Criteria</h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {evaluationCriteria.map((criteria, index) => (
              <span key={index} className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                {criteria}
                <button
                  type="button"
                  onClick={() => setEvaluationCriteria(evaluationCriteria.filter((_, i) => i !== index))}
                  className="ml-1.5 text-blue-500 hover:text-blue-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={newCriteria}
              onChange={(e) => setNewCriteria(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddCriteria}
              className="px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 flex items-center"
            >
              <PlusIcon className="h-4 w-4" />
              <span className="ml-1">Add</span>
            </button>
          </div>
        </div>

        {/* Application Timeline */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">6. Application Deadline*</h2>
          <div className="relative">
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <CalendarIcon className="h-5 w-5 text-gray-400 absolute right-3 top-2.5" />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            type="button"
            onClick={() => handleSubmit('draft')}
            disabled={isLoading}
            className={`px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Saving...' : 'Save as Draft'}
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('published')}
            disabled={isLoading}
            className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Publishing...' : 'Publish Position'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJobForm;