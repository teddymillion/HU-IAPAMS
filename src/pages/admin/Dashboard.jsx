


import { Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
import Positions from './Positions';
import Evaluators from './Evaluators';
import Results from './Results';
import useAuthStore from '../../store/authStore';
import { useState } from 'react';
import Overview from '../../components/dashboard/admin/Home';
import { path } from 'framer-motion/client';
import Users from './users/manage-users';
import PostJobForm from '../../components/dashboard/admin/PostJobForm';
import ApplicationManagement from './application-management/ApplicationManagement';
import EvaluationManagement from './evaluation-management/EvaluationManagement';


const AdminDashboard = () => {
  const logout = useAuthStore((state) => state.logout);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Administrator'
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const navLinks = [
    {path: '/admin/dashboard', name: 'Overview', icon: <FiBriefcase />},
    { path: '/admin/positions', name: 'Manage Positions', icon: <FiBriefcase /> },
    { path: '/admin/applications', name: 'Manage Applications', icon: <FiFileText /> },

    { path: '/admin/evaluators', name: 'Manage Evaluators', icon: <FiUsers /> },
    { path: '/admin/results', name: 'Manage Results', icon: <FiClipboard /> },
    { path: '/admin/users', name: 'Manage Users', icon: <FiUser /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Green-themed header */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-green-600 p-4 shadow-lg"
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <motion.h1 
              whileHover={{ scale: 1.02 }}
              className="text-white text-xl font-bold flex items-center"
            >
              <span className="bg-white text-green-600 p-1 rounded mr-2">
                <FiUser />
              </span>
              Admin Dashboard
            </motion.h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* User profile dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-2 focus:outline-none">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                  {profilePhoto ? (
                    <img 
                      src={profilePhoto} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <FiUser />
                  )}
                </div>
                <span className="text-white hidden md:inline">{userData.name}</span>
              </button>
              
              {/* Profile dropdown */}
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                <div className="px-4 py-2 border-b">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      {profilePhoto ? (
                        <img 
                          src={profilePhoto} 
                          alt="Profile" 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <FiUser />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                      <p className="text-xs text-gray-500">{userData.role}</p>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsEditingProfile(true)}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                >
                  <FiEdit2 className="mr-2" /> Edit Profile
                </button>
                
                <Link
                  to="/change-password"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                >
                  <FiKey className="mr-2" /> Change Password
                </Link>
                
                <button
                  onClick={logout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                >
                  <FiLogOut className="mr-2" /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Profile edit modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-lg w-full max-w-md"
          >
            <h3 className="text-lg font-medium mb-4">Edit Profile</h3>
            
            <div className="flex flex-col items-center mb-4">
              <div className="relative mb-2">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-2 overflow-hidden">
                  {profilePhoto ? (
                    <img 
                      src={profilePhoto} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiUser size={24} />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full cursor-pointer">
                  <FiUpload size={16} />
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <span className="text-sm text-gray-500">Click to upload photo</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({...userData, email: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsEditingProfile(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="px-4 py-2 bg-green-600 rounded-md text-sm font-medium text-white hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <motion.aside 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-64 bg-white shadow-md h-[calc(100vh-64px)] sticky top-16"
        >
          <nav className="p-4 space-y-1">
            {navLinks.map((link) => (
              <motion.div
                key={link.path}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link
                  to={link.path}
                  className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors"
                >
                  <span className="mr-3 text-green-500">{link.icon}</span>
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Routes>
                <Route path="dashboard" element={<Overview />} />
                <Route path="positions" element={<PostJobForm />} />
                <Route path="evaluators" element={<EvaluationManagement />} />
                <Route path="results" element={<Results />} />
                <Route path="applications" element={<ApplicationManagement/>} />
                <Route path="users" element={< Users />} />
                <Route path="/" element={<Positions />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

// // src/pages/admin/Dashboard.tsx

// import { DashboardLayout } from '../../components/dashboard/dashboardLayout';

// import Users from './users/manage-users';
// import PostJobForm from '../../components/dashboard/admin/PostJobForm';
// import ApplicationManagement from './application-management/ApplicationManagement';
// import EvaluationManagement from './evaluation-management/EvaluationManagement';

// import { Routes, Route, Link } from 'react-router-dom';
// import { usePositions } from '../../hooks/use-position';
// import { FiBriefcase, FiFileText, FiUsers } from 'react-icons/fi';
// const AdminDashboard = () => {
//   const { positions, loading: positionsLoading } = usePositions();
//   // const { applications, loading: appsLoading } = useApplications();

//   const navItems = [
//     { path: '/admin/positions', name: 'Manage Positions', icon: <FiBriefcase /> },
//     { path: '/admin/applications', name: 'Manage Applications', icon: <FiFileText /> },
//     { path: '/admin/users', name: 'Manage Users', icon: <FiUsers /> },
//   ];

//   return (
//     <DashboardLayout
//       title="Admin Dashboard"
//       navItems={navItems}
//       profileContent={
//         <div className="flex items-center space-x-4">
//           <button className="text-white hover:text-green-200" onClick={logout}>
//             Logout
//           </button>
//           <Link to="/change-password" className="text-white hover:text-green-200">
//             Change Password
//           </Link>
//         </div>

//       }
//     >
//       <Routes>
//         <Route path="positions" element={ <PostJobForm/>} />
//         <Route path="applications" element={<ApplicationManagement />} />
//         <Route path="users" element={<Users />} />
//       </Routes>
//     </DashboardLayout>
//   );
// };

// export default AdminDashboard;