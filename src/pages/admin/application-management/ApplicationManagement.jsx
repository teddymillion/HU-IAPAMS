import React, { useState } from 'react';
import { 
  Search, FilterList, Assignment, CheckCircle, Cancel, 
  Person, AccessTime, HowToReg, Mail, Download 
} from '@mui/icons-material';

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      applicant: 'Dr. Alemayehu Bekele',
      position: 'Associate Professor - Computer Science',
      department: 'Computing',
      appliedDate: '2025-04-25',
      status: 'Received',
      documents: 3,
      email: 'alemu@haramaya.edu.et'
    },
    {
      id: 2,
      applicant: 'Dr. Fatuma Mohammed',
      position: 'Lecturer - Data Science',
      department: 'Information Science',
      appliedDate: '2025-04-26',
      status: 'Under Review',
      documents: 4,
      email: 'fatuma.m@haramaya.edu.et'
    },
    {
      id: 3,
      applicant: 'Dr. Tesfaye Abebe',
      position: 'Professor - Artificial Intelligence',
      department: 'Computing',
      appliedDate: '2025-04-27',
      status: 'Shortlisted',
      documents: 5,
      email: 'tesfaye.a@haramaya.edu.et'
    }
  ]);

  const [filters, setFilters] = useState({
    status: 'all',
    department: 'all',
    search: ''
  });

  const statusOptions = [
    'All', 'Received', 'Under Review', 'Shortlisted', 'Rejected'
  ];

  const departmentOptions = [
    'All', 'Computing', 'Information Science', 'Engineering', 'Agriculture'
  ];

  const handleStatusChange = (id, newStatus) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  const filteredApplications = applications.filter(app => {
    return (
      (filters.status === 'all' || app.status === filters.status) &&
      (filters.department === 'all' || app.department === filters.department) &&
      (filters.search === '' || 
       app.applicant.toLowerCase().includes(filters.search.toLowerCase()) ||
       app.position.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Application Management</h1>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search applications..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <FilterList className="text-gray-500" />
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              {statusOptions.map(option => (
                <option key={option} value={option === 'All' ? 'all' : option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <Assignment className="text-gray-500" />
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.department}
              onChange={(e) => setFilters({...filters, department: e.target.value})}
            >
              {departmentOptions.map(option => (
                <option key={option} value={option === 'All' ? 'all' : option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Person className="text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{app.applicant}</div>
                        <div className="text-sm text-gray-500">{app.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{app.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {app.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <AccessTime className="mr-1 text-gray-400" size="small"/>
                      {app.appliedDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${app.status === 'Received' ? 'bg-blue-100 text-blue-800' : 
                        app.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === 'Shortlisted' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => handleStatusChange(app.id, 'Shortlisted')}
                        title="Shortlist"
                      >
                        <HowToReg />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleStatusChange(app.id, 'Rejected')}
                        title="Reject"
                      >
                        <Cancel />
                      </button>
                      <button 
                        className="text-gray-600 hover:text-gray-900"
                        title="View Documents"
                      >
                        <Download />
                      </button>
                      <button 
                        className="text-gray-600 hover:text-gray-900"
                        title="Contact Applicant"
                      >
                        <Mail />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredApplications.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No applications found matching your criteria
          </div>
        )}
        
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredApplications.length}</span> of{' '}
            <span className="font-medium">{applications.length}</span> applications
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationManagement;