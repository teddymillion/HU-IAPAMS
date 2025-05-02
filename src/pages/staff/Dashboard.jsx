

// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   FiUser, 
//   FiKey, 
//   FiLogOut,
//   FiEdit2,
//   FiUpload,
//   FiBriefcase,
//   FiFileText,
//   FiClock,
//   FiBell,
//   FiCheckCircle
// } from 'react-icons/fi';
// import useAuthStore from '../../store/authStore';

// const StaffDashboard = () => {
//   const logout = useAuthStore((state) => state.logout);
//   const navigate = useNavigate();
//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const [isEditingProfile, setIsEditingProfile] = useState(false);
//   const [userData, setUserData] = useState({
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     department: 'Computer Science',
//     profileCompletion: 85
//   });

//   // Mock data for positions
//   const [positions, setPositions] = useState([
//     {
//       id: 1,
//       title: 'Senior UX Designer',
//       type: 'Full-time',
//       team: 'Product Design Team',
//       description: "We're looking for an experienced UX designer to join our growing product team...",
//       deadline: 'Apr 30, 2025',
//       status: 'applied'
//     },
//     {
//       id: 2,
//       title: 'Frontend Developer',
//       type: 'Full-time',
//       team: 'Engineering',
//       description: "Join our engineering team to build amazing user interfaces...",
//       deadline: 'May 15, 2025',
//       status: 'shortlisted'
//     },
//     {
//       id: 3,
//       title: 'Product Manager',
//       type: 'Full-time',
//       team: 'Product Management',
//       description: "Looking for a strategic product manager to drive our product vision...",
//       deadline: 'May 5, 2025',
//       status: 'available'
//     }
//   ]);

//   const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       message: 'Your application for Senior UX Designer has been received',
//       time: '2 hours ago',
//       read: false
//     },
//     {
//       id: 2,
//       message: "You've been shortlisted for Frontend Developer position",
//       time: '1 day ago',
//       read: false
//     },
//     {
//       id: 3,
//       message: 'New position matching your profile: Product Manager',
//       time: '2 days ago',
//       read: true
//     }
//   ]);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePhoto(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const quickApply = (positionId) => {
//     setPositions(positions.map(pos => 
//       pos.id === positionId ? { ...pos, status: 'applied' } : pos
//     ));
//     setNotifications([
//       {
//         id: Date.now(),
//         message: `Your application for ${positions.find(p => p.id === positionId).title} has been submitted`,
//         time: 'Just now',
//         read: false
//       },
//       ...notifications
//     ]);
//   };

//   const markAsRead = (notificationId) => {
//     setNotifications(notifications.map(notif => 
//       notif.id === notificationId ? { ...notif, read: true } : notif
//     ));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Green-themed header */}
//       <motion.nav 
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         className="bg-green-600 p-4 shadow-lg"
//       >
//         <div className="flex justify-between items-center max-w-7xl mx-auto">
//           <motion.h1 
//             whileHover={{ scale: 1.02 }}
//             className="text-white text-xl font-bold flex items-center"
//           >
//             <FiBriefcase className="mr-2" />
//             Academic Staff Dashboard
//           </motion.h1>
          
//           <div className="flex items-center space-x-4">
//             {/* Notifications */}
//             <div className="relative group">
//               <button className="text-white hover:text-green-200 p-1 relative">
//                 <FiBell className="h-5 w-5" />
//                 {notifications.filter(n => !n.read).length > 0 && (
//                   <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
//                 )}
//               </button>
//               <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
//                 <div className="px-4 py-2 border-b font-medium text-gray-700">
//                   Notifications
//                 </div>
//                 {notifications.slice(0, 3).map(notification => (
//                   <div 
//                     key={notification.id}
//                     className={`px-4 py-2 text-sm cursor-pointer ${!notification.read ? 'bg-green-50' : 'bg-white'} hover:bg-green-100`}
//                     onClick={() => markAsRead(notification.id)}
//                   >
//                     <div className="text-gray-800">{notification.message}</div>
//                     <div className="text-xs text-gray-500">{notification.time}</div>
//                   </div>
//                 ))}
//                 <Link
//                   to="/notifications"
//                   className="block px-4 py-2 text-sm text-center text-green-600 hover:bg-green-50"
//                 >
//                   View All
//                 </Link>
//               </div>
//             </div>
            
//             {/* User profile dropdown */}
//             <div className="relative group">
//               <button className="flex items-center space-x-2 focus:outline-none">
//                 <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
//                   {profilePhoto ? (
//                     <img 
//                       src={profilePhoto} 
//                       alt="Profile" 
//                       className="w-full h-full rounded-full object-cover"
//                     />
//                   ) : (
//                     <FiUser />
//                   )}
//                 </div>
//                 <span className="text-white hidden md:inline">{userData.name}</span>
//               </button>
              
//               <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
//                 <div className="px-4 py-2 border-b">
//                   <div className="flex items-center space-x-2">
//                     <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
//                       {profilePhoto ? (
//                         <img 
//                           src={profilePhoto} 
//                           alt="Profile" 
//                           className="w-full h-full rounded-full object-cover"
//                         />
//                       ) : (
//                         <FiUser />
//                       )}
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-900">{userData.name}</p>
//                       <p className="text-xs text-gray-500">Academic Staff</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <button 
//                   onClick={() => setIsEditingProfile(true)}
//                   className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
//                 >
//                   <FiEdit2 className="mr-2" /> Edit Profile
//                 </button>
                
//                 <Link
//                   to="/change-password"
//                   className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
//                 >
//                   <FiKey className="mr-2" /> Change Password
//                 </Link>
                
//                 <button
//                   onClick={logout}
//                   className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
//                 >
//                   <FiLogOut className="mr-2" /> Logout
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.nav>

//       {/* Profile edit modal */}
//       {isEditingProfile && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <motion.div 
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             className="bg-white p-6 rounded-lg w-full max-w-md"
//           >
//             <h3 className="text-lg font-medium mb-4">Edit Profile</h3>
            
//             <div className="flex flex-col items-center mb-4">
//               <div className="relative mb-2">
//                 <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-2 overflow-hidden">
//                   {profilePhoto ? (
//                     <img 
//                       src={profilePhoto} 
//                       alt="Profile" 
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <FiUser size={24} />
//                   )}
//                 </div>
//                 <label className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full cursor-pointer">
//                   <FiUpload size={16} />
//                   <input 
//                     type="file" 
//                     className="hidden" 
//                     accept="image/*"
//                     onChange={handleFileChange}
//                   />
//                 </label>
//               </div>
//               <span className="text-sm text-gray-500">Click to upload photo</span>
//             </div>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Name</label>
//                 <input
//                   type="text"
//                   value={userData.name}
//                   onChange={(e) => setUserData({...userData, name: e.target.value})}
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Email</label>
//                 <input
//                   type="email"
//                   value={userData.email}
//                   onChange={(e) => setUserData({...userData, email: e.target.value})}
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Department</label>
//                 <input
//                   type="text"
//                   value={userData.department}
//                   onChange={(e) => setUserData({...userData, department: e.target.value})}
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                 />
//               </div>
//             </div>
            
//             <div className="mt-6 flex justify-end space-x-3">
//               <button
//                 onClick={() => setIsEditingProfile(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => setIsEditingProfile(false)}
//                 className="px-4 py-2 bg-green-600 rounded-md text-sm font-medium text-white hover:bg-green-700"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto p-4 md:p-8">
//         {/* Welcome section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-lg shadow p-6 mb-6"
//         >
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {userData.name}!</h2>
//           <div className="flex items-center mb-6">
//             <div className="w-full bg-gray-200 rounded-full h-2.5">
//               <div 
//                 className="bg-green-600 h-2.5 rounded-full" 
//                 style={{ width: `${userData.profileCompletion}%` }}
//               ></div>
//             </div>
//             <span className="ml-4 text-sm font-medium text-gray-700">{userData.profileCompletion}% complete</span>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <motion.div 
//               whileHover={{ scale: 1.02 }}
//               className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
//             >
//               <h3 className="font-medium text-lg text-gray-700 flex items-center">
//                 <FiBriefcase className="mr-2 text-green-600" /> Positions Available
//               </h3>
//               <p className="text-3xl font-bold text-gray-900 mt-2">24</p>
//             </motion.div>
            
//             <motion.div 
//               whileHover={{ scale: 1.02 }}
//               className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
//             >
//               <h3 className="font-medium text-lg text-gray-700 flex items-center">
//                 <FiFileText className="mr-2 text-green-600" /> Applications
//               </h3>
//               <p className="text-3xl font-bold text-gray-900 mt-2">8</p>
//             </motion.div>
            
//             <motion.div 
//               whileHover={{ scale: 1.02 }}
//               className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
//             >
//               <h3 className="font-medium text-lg text-gray-700 flex items-center">
//                 <FiClock className="mr-2 text-green-600" /> In Review
//               </h3>
//               <p className="text-3xl font-bold text-gray-900 mt-2">3</p>
//             </motion.div>
//           </div>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Newly Posted Positions */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.2 }}
//             className="bg-white rounded-lg shadow p-6"
//           >
//             <h3 className="text-xl font-bold text-gray-900 mb-4">Newly Posted Positions</h3>
//             <div className="space-y-4">
//               {positions.map(position => (
//                 <motion.div
//                   key={position.id}
//                   whileHover={{ scale: 1.01 }}
//                   className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
//                 >
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h4 className="font-medium text-lg text-gray-900">{position.title}</h4>
//                       <p className="text-sm text-gray-600">{position.team} • {position.type}</p>
//                     </div>
//                     {position.status === 'applied' && (
//                       <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
//                         Applied
//                       </span>
//                     )}
//                     {position.status === 'shortlisted' && (
//                       <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
//                         Shortlisted
//                       </span>
//                     )}
//                   </div>
//                   <p className="text-gray-600 mt-2">{position.description}</p>
//                   <div className="mt-4 flex justify-between items-center">
//                     <div className="flex items-center text-sm text-gray-500">
//                       <FiClock className="mr-1" /> Deadline: {position.deadline}
//                     </div>
//                     {position.status === 'available' ? (
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="px-3 py-1 bg-green-600 text-white rounded-md text-sm"
//                         onClick={() => quickApply(position.id)}
//                       >
//                         Quick Apply
//                       </motion.button>
//                     ) : (
//                       <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm cursor-default">
//                         {position.status === 'applied' ? 'Applied' : 'Shortlisted'}
//                       </button>
//                     )}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Recent Notifications */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.2 }}
//             className="bg-white rounded-lg shadow p-6"
//           >
//             <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
//               <FiBell className="mr-2 text-green-600" /> Recent Notifications
//             </h3>
//             <div className="space-y-3">
//               {notifications.slice(0, 5).map(notification => (
//                 <motion.div
//                   key={notification.id}
//                   whileHover={{ x: 5 }}
//                   className={`p-3 rounded-lg cursor-pointer ${!notification.read ? 'bg-green-50 border-l-4 border-green-500' : 'bg-gray-50'}`}
//                   onClick={() => markAsRead(notification.id)}
//                 >
//                   <p className="text-gray-800">{notification.message}</p>
//                   <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
//                 </motion.div>
//               ))}
//             </div>
//             <Link
//               to="/notifications"
//               className="mt-4 inline-block text-sm text-green-600 hover:text-green-700"
//             >
//               View all notifications →
//             </Link>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StaffDashboard;

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

const StaffDashboard = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  // Use actual user data from auth context
  const userData = {
    name: auth?.user?.fullName || 'Staff Member',
    email: auth?.user?.email || 'staff@example.com',
    department: auth?.user?.department || 'Computer Science',
    profileCompletion: auth?.user?.profileCompletion || 85
  };

  const navItems = [
    { path: 'positions', name: 'Available Positions', icon: <FiBriefcase /> },
    { path: 'applications', name: 'My Applications', icon: <FiFileText /> },
    { path: 'notifications', name: 'Notifications', icon: <FiBell /> }
  ];

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-green-600 p-4 shadow-lg"
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <motion.h1 
            whileHover={{ scale: 1.02 }}
            className="text-white text-xl font-bold flex items-center"
          >
            <FiBriefcase className="mr-2" />
            Academic Staff Dashboard
          </motion.h1>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative group">
              <Link
                to="notifications"
                className="text-white hover:text-green-200 p-1 relative"
              >
                <FiBell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </Link>
            </div>
            
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
                      <p className="text-xs text-gray-500">Academic Staff</p>
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
      <AnimatePresence>
        {isEditingProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
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
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <input
                    type="text"
                    value={userData.department}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                    readOnly
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
      </AnimatePresence>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <motion.aside 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-64 bg-white shadow-md h-[calc(100vh-64px)] sticky top-16"
        >
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link
                  to={item.path}
                  className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors"
                >
                  <span className="mr-3 text-green-500">{item.icon}</span>
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow rounded-lg p-6 min-h-[calc(100vh-180px)]"
          >
            <Routes>
              {/* <Route path="positions" element={<StaffPositions />} />
              <Route path="applications" element={<StaffApplications />} /> */}
              <Route path="notifications" element={<div>Notifications View</div>} />
              <Route path="/" element={
                <div className="space-y-6">
                  {/* Welcome section */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {userData.name}!</h2>
                    <div className="flex items-center mb-6">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-green-600 h-2.5 rounded-full" 
                          style={{ width: `${userData.profileCompletion}%` }}
                        ></div>
                      </div>
                      <span className="ml-4 text-sm font-medium text-gray-700">{userData.profileCompletion}% complete</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <h3 className="font-medium text-lg text-gray-700 flex items-center">
                          <FiBriefcase className="mr-2 text-green-600" /> Positions Available
                        </h3>
                        <p className="text-3xl font-bold text-gray-900 mt-2">24</p>
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <h3 className="font-medium text-lg text-gray-700 flex items-center">
                          <FiFileText className="mr-2 text-green-600" /> Applications
                        </h3>
                        <p className="text-3xl font-bold text-gray-900 mt-2">8</p>
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <h3 className="font-medium text-lg text-gray-700 flex items-center">
                          <FiClock className="mr-2 text-green-600" /> In Review
                        </h3>
                        <p className="text-3xl font-bold text-gray-900 mt-2">3</p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              } />
            </Routes>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default StaffDashboard;