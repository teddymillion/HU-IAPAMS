import { useState } from 'react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, 
  FiKey, 
  FiLogOut,
  FiEdit2,
  FiUpload,
  FiBriefcase,
  FiFileText,
  FiClock,
  FiBell,
  FiCheckCircle
} from 'react-icons/fi';
import { useAuth } from '../../context/authContext';
import AvailablePositions from './AvailablePosition';
import MyApplications from './MyApplications';
import { DashboardLayout } from '../../components/layout/layout';
import StaffHome from './Overview';
import Overview from '../../components/dashboard/admin/Home';
import PositionDetail from '../../components/position/PositionDetails';

const StaffDashboard = () => {
  const { auth, logout } = useAuth();
  const navItems = [
    {path: '/staff/dashboard', name: 'Overview', icon: <FiBriefcase /> },
    { path: '/staff/positions', name: 'Available Positions', icon: <FiBriefcase /> },
    { path: '/staff/applications', name: 'My Applications', icon: <FiFileText /> },

    // { path: 'staff/notifications', name: 'Notifications', icon: <FiBell /> }
  ];

  return (
  
    <DashboardLayout
    
      title="Academic Staff Dashboard"
      user={auth?.user}
      navLinks={navItems}
      onLogout={logout}
      >
        <Routes>
          <Route path='dashboard' element={<StaffHome/>} />
          <Route path="positions" element={<AvailablePositions />} />
          <Route path="applications" element={<MyApplications />} />
          <Route path="positions/:id" element={<PositionDetail />} />
          <Route path="notifications" element={<div>Notifications View</div>} />
        </Routes>
    </DashboardLayout>
  );
};

export default StaffDashboard;