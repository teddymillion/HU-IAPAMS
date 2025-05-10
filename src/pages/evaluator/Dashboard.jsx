import { useState } from 'react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
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

import { DashboardLayout } from '../../components/layout/layout';

import EvaluationPage from './EvaluationPage';


const EvaluatorDashboard = () => {
  const { auth, logout } = useAuth();
  const navItems = [
    {path: '/evaluator/dashboard', name: 'Applications', icon: <FiBriefcase /> },
  ];

  return (
  
    <DashboardLayout
    
      title="Evaluator Dashboard"
      user={auth?.user}
      navLinks={navItems}
      onLogout={logout}
      >
        <Routes>
          <Route path='dashboard' element={<EvaluationPage/>} />
          <Route path="applications" element={<EvaluationPage />} />
          <Route path="notifications" element={<div>Notifications View</div>} />
        </Routes>
    </DashboardLayout>
  );
};

export default EvaluatorDashboard;