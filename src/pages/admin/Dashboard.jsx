import { 
  FiBriefcase, 
  FiUsers, 
  FiClipboard, 
  FiFileText,
  FiUser,
  FiKey,
  FiLogOut,
  FiEdit2,
  FiUpload
} from 'react-icons/fi';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import Overview from '../../components/dashboard/admin/Home';
import Users from './users/manage-users';
import ApplicationManagement from './application-management/ApplicationManagement';
import EvaluationManagement from './evaluation-management/EvaluationManagement';
import PositionManagement from '../../components/dashboard/admin/PositionManagement';
import { DashboardLayout } from '../../components/layout/layout';


const AdminDashboard = () => {
  const { auth, logout } = useAuth();

  const navLinks = [
    { path: '/admin/dashboard', name: 'Overview', icon: <FiBriefcase /> },
    { path: '/admin/positions', name: 'Manage Positions', icon: <FiBriefcase /> },
    { path: '/admin/applications', name: 'Manage Applications', icon: <FiFileText /> },
    { path: '/admin/evaluators', name: 'Manage Evaluators', icon: <FiUsers /> },

    { path: '/admin/users', name: 'Manage Users', icon: <FiUser /> }
  ];

  return (
    <DashboardLayout 
      title="Admin Dashboard"
      navLinks={navLinks}
      user={auth?.user}
      onLogout={logout}
    >
      <Routes>
        <Route path="dashboard" element={<Overview />} />
        <Route path="positions" element={<PositionManagement />} />
        <Route path="evaluators" element={<EvaluationManagement />} />
        <Route path="applications" element={<ApplicationManagement />} />
        <Route path="users" element={<Users />} />
        <Route path="/" element={<Overview />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminDashboard;