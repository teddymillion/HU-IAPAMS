import React, { useState } from 'react';
import {
  PlusIcon,
  PaperClipIcon,
  MagnifyingGlassIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const PostJobForm = () => {
  const [jobType, setJobType] = useState('full-time');
  const [locationType, setLocationType] = useState('remote');
  const [evaluationCriteria, setEvaluationCriteria] = useState(['Technical Skills']);
  const [newCriteria, setNewCriteria] = useState('');
  const [selectedEvaluators, setSelectedEvaluators] = useState([]);

  const evaluators = [
    { id: 1, name: 'Sarah Johnson', role: 'Technical Lead' },
    { id: 2, name: 'Mike Chen', role: 'HR Manager' },
  ];

  const handleAddCriteria = () => {
    if (newCriteria.trim()) {
      setEvaluationCriteria([...evaluationCriteria, newCriteria]);
      setNewCriteria('');
    }
  };

  const handleEvaluatorToggle = (evaluatorId) => {
    if (selectedEvaluators.includes(evaluatorId)) {
      setSelectedEvaluators(selectedEvaluators.filter(id => id !== evaluatorId));
    } else {
      setSelectedEvaluators([...selectedEvaluators, evaluatorId]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Post New Position</h1>
      <p className="text-gray-600 mb-6">Create a new position posting</p>

      {/* Section 1: Job Information */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">1. Position Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position Title</label>
            <input
              type="text"
              placeholder="e.g., Senior Backend Developer"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">Position Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="dean">Dean</option>
                <option value="head">Head</option>
                <option value="senior">Senior</option>
                <option value="junior">Junior</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Job Description */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">2. Position Description</h2>

        <div className="mb-3 flex space-x-2">
          <button className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
            <strong>B</strong>
          </button>
          <button className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
            <em>I</em>
          </button>
          <button className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
            <span className="underline">U</span>
          </button>
        </div>

        <textarea
          placeholder="Enter detailed job description..."
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <div className="mb-8">
        {/* departmant */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Department</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="engineering">Engineering</option>

              <option value="hr">Human Resources</option>
              <option value="finance">Finance</option>
              <option value="it">IT</option>

              <option value="legal">Legal</option>
              <option value="research">Research & Development</option>
              <option value="product">Product Management</option>
              <option value="quality">Quality Assurance</option>
              <option value="supply">Supply Chain Management</option>
              <option value="procurement">Procurement</option>
            </select>
          </div>
        </div>
      </div>




      {/* Section 3: Requirements */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">3. Requirements</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
            <input
              type="number"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Qualifications</label>
          <textarea
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Qualifications</label>
          <textarea
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>

      {/* Section 4: Evaluation Criteria */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">4. Evaluation Criteria</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Criteria</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {evaluationCriteria.map((criteria, index) => (
              <span key={index} className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                {criteria}
                <button
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
              placeholder="Add new criteria"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddCriteria}
              className="px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 flex items-center"
            >
              <PlusIcon className="h-4 w-4" />
              <span className="ml-1">Add</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Evaluation Template</label>
          <div className="flex items-center">
            <label className="flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
              <PaperClipIcon className="h-5 w-5 mr-2" />
              <span>Upload template (optional)</span>
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Section 5: Application Timeline */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">5. Application Timeline</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <div className="relative">
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="mm/dd/yyyy"
              />
              <CalendarIcon className="h-5 w-5 text-gray-400 absolute right-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <div className="relative">
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="mm/dd/yyyy"
              />
              <CalendarIcon className="h-5 w-5 text-gray-400 absolute right-3 top-2.5" />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-1">Evaluation Period</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="mm/dd/yyyy"
              />
              <CalendarIcon className="h-5 w-5 text-gray-400 absolute right-3 top-2.5" />
            </div>
            <div className="flex items-center justify-center text-gray-500">to</div>
            <div className="relative">
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="mm/dd/yyyy"
              />
              <CalendarIcon className="h-5 w-5 text-gray-400 absolute right-3 top-2.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Section 6: Assign Evaluators */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">6. Assign Evaluators</h2>

        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search evaluators..."
            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-3">
          {evaluators.map((evaluator) => (
            <div key={evaluator.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
              <input
                type="checkbox"
                checked={selectedEvaluators.includes(evaluator.id)}
                onChange={() => handleEvaluatorToggle(evaluator.id)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{evaluator.name}</p>
                <p className="text-xs text-gray-500">{evaluator.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 7: Additional Settings */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">7. Additional Settings</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Application Status</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="notify"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="notify" className="ml-2 block text-sm text-gray-700">
            Notify evaluators and team members
          </label>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-4 border-t">
        <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
          Save as Draft
        </button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Publish Job
        </button>
      </div>
    </div>
  );
};

export default PostJobForm;