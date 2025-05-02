import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHome, FaUserPlus, FaUsers, FaClipboardList, FaChartBar, FaUserCog,
  FaFileAlt, FaUserTie, FaBriefcase 
} from 'react-icons/fa';
import { HiOutlineDocumentReport } from 'react-icons/hi';


const SidebarItem = ({ icon, text, to, active = false }) => (
<li>
  <Link
    to={to}
    className={`flex items-center gap-3 p-2 rounded-md text-sm font-medium ${
      active ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    } transition`}
  >
    <span>{icon}</span>
    <span>{text}</span>
  </Link>
</li>

);

const Sidebar = ({ userType }) => {
  const getSidebarItems = () => {
    switch (userType) {
      case 'admin':
        return (
          <>
            <SidebarItem icon={<FaHome className="h-5 w-5" />} text="Dashboard Home" to="/admin/dashboard" />
            <SidebarItem icon={<FaUserPlus className="h-5 w-5" />} text="Post New Job" to="/admin/post-job" />
            <SidebarItem icon={<FaClipboardList className="h-5 w-5" />} text="Manage Job Posts" to="/admin/jobs" />
            <SidebarItem icon={<FaUsers className="h-5 w-5" />} text="View Applicants" to="/admin/applicants" />
            <SidebarItem icon={<FaUserCog className="h-5 w-5" />} text="Assign Evaluators" to="/admin/evaluators" />
            <SidebarItem icon={<FaUsers className="h-5 w-5" />} text="Manage Users" to="/admin/users" />
            <SidebarItem icon={<HiOutlineDocumentReport className="h-5 w-5" />} text="Reports & Analytics" to="/admin/reports" />
          </>
        );
      case 'evaluator':
        return (
          <>
            <SidebarItem icon={<FaHome className="h-5 w-5" />} text="Dashboard Home" to="/evaluator/dashboard" />
            <SidebarItem icon={<FaFileAlt className="h-5 w-5" />} text="Current Evaluations" to="/evaluator/current" />
            <SidebarItem icon={<FaClipboardList className="h-5 w-5" />} text="Completed Evaluations" to="/evaluator/completed" />
            <SidebarItem icon={<HiOutlineDocumentReport className="h-5 w-5" />} text="Evaluation Reports" to="/evaluator/reports" />
          </>
        );
      case 'applicant':
        return (
          <>
            <SidebarItem icon={<FaHome className="h-5 w-5" />} text="Home" to="/applicant/dashboard" />
            <SidebarItem icon={<FaBriefcase className="h-5 w-5" />} text="Available jobs" to="/applicant/jobs" />
            <SidebarItem icon={<FaFileAlt className="h-5 w-5" />} text="My Applications" to="/applicant/applications" />
            <SidebarItem icon={<FaUserTie className="h-5 w-5" />} text="Profile" to="/applicant/profile" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-64 bg-white shadow-md flex-shrink-0">
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold text-gray-800">
          {userType === 'admin' && 'HR Dashboard'}
          {userType === 'evaluator' && 'Evaluator Dashboard'}
          {userType === 'applicant' && 'Applicant Dashboard'}
        </h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {getSidebarItems()}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;