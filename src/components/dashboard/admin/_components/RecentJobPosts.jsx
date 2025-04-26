import React from 'react';
import { CheckBadgeIcon, EyeIcon } from '@heroicons/react/24/outline';

const RecentJobPosts = () => {
  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      type: 'Full-time',
      location: 'Remote',
      posted: '2 days ago',
      status: 'Active',
      applicants: 45,
      evaluators: 3,
    },
    {
      id: 2,
      title: 'Product Manager',
      type: 'Full-time',
      location: 'On-site',
      posted: '3 days ago',
      status: 'Active',
      applicants: 29,
      evaluators: 2,
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Recent Job Posts</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800">View All Jobs</button>
      </div>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{job.title}</h3>
                <p className="text-sm text-gray-500">
                  {job.type} • {job.location} • Posted {job.posted}
                </p>
              </div>
              <div className="flex items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {job.status}
                </span>
              </div>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <div className="flex space-x-4">
                <span className="text-sm text-gray-500">
                  <span className="font-medium text-gray-900">{job.applicants}</span> Applicants
                </span>
                <span className="text-sm text-gray-500">
                  <span className="font-medium text-gray-900">{job.evaluators}</span> Evaluators
                </span>
              </div>
              <div className="flex space-x-2">
                <button className="p-1 text-gray-500 hover:text-gray-700">
                  <EyeIcon className="h-5 w-5" />
                </button>
                <button className="p-1 text-gray-500 hover:text-gray-700">
                  <CheckBadgeIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentJobPosts;