
// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   FiClipboard, 
//   FiUser, 
//   FiKey, 
//   FiLogOut,
//   FiEdit2,
//   FiUpload,
//   FiCheck,
//   FiX,
//   FiEye,
//   FiFileText,
//   FiUsers,
//   FiBarChart2
// } from 'react-icons/fi';
// import useAuthStore from '../../store/authStore';

// const EvaluatorDashboard = () => {
//   const logout = useAuthStore((state) => state.logout);
//   const navigate = useNavigate();
//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const [isEditingProfile, setIsEditingProfile] = useState(false);
//   const [activeTab, setActiveTab] = useState('pending');
//   const [userData] = useState({
//     name: 'Evaluator User',
//     email: 'evaluator@example.com',
//     department: 'Computer Science'
//   });

//   // Mock data - replace with API calls in production
//   const [applications, setApplications] = useState([
//     {
//       id: 1,
//       applicantName: 'John Doe',
//       position: 'Assistant Professor',
//       department: 'Computer Science',
//       status: 'pending',
//       submittedDate: '2023-06-15',
//       criteria: [
//         { name: 'Qualifications', score: 4, max: 5 },
//         { name: 'Experience', score: 3, max: 5 },
//         { name: 'Publications', score: 5, max: 5 }
//       ]
//     },
//     {
//       id: 2,
//       applicantName: 'Jane Smith',
//       position: 'Lecturer',
//       department: 'Mathematics',
//       status: 'pending',
//       submittedDate: '2023-06-10',
//       criteria: [
//         { name: 'Qualifications', score: 5, max: 5 },
//         { name: 'Experience', score: 4, max: 5 },
//         { name: 'Publications', score: 3, max: 5 }
//       ]
//     },
//     {
//       id: 3,
//       applicantName: 'Mike Johnson',
//       position: 'Associate Professor',
//       department: 'Physics',
//       status: 'approved',
//       submittedDate: '2023-05-28',
//       decisionDate: '2023-06-05',
//       criteria: [
//         { name: 'Qualifications', score: 5, max: 5 },
//         { name: 'Experience', score: 5, max: 5 },
//         { name: 'Publications', score: 4, max: 5 }
//       ]
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

//   const evaluateApplication = (id, decision) => {
//     setApplications(applications.map(app => 
//       app.id === id ? { 
//         ...app, 
//         status: decision ? 'approved' : 'rejected',
//         decisionDate: new Date().toISOString().split('T')[0]
//       } : app
//     ));
//   };

//   const publishResults = () => {
//     // In a real app, this would notify applicants and make results visible to them
//     alert('Results have been published to applicants!');
//   };

//   const filteredApplications = applications.filter(app => 
//     activeTab === 'pending' ? app.status === 'pending' : 
//     activeTab === 'approved' ? app.status === 'approved' :
//     app.status === 'rejected'
//   );

//   const navItems = [
//     { path: '/evaluator/applications', name: 'Evaluate Applications', icon: <FiFileText /> },
//     { path: '/evaluator/results', name: 'Manage Results', icon: <FiBarChart2 /> },
//     { path: '/evaluator/applicants', name: 'Applicant Profiles', icon: <FiUsers /> }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
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
//             <FiClipboard className="mr-2" />
//             Evaluator Dashboard
//           </motion.h1>
          
//           <div className="flex items-center space-x-4">
//             <div className="relative group">
//               <button className="flex items-center space-x-2 focus:outline-none">
//                 <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
//                   {profilePhoto ? (
//                     <img src={profilePhoto} alt="Profile" className="w-full h-full rounded-full object-cover" />
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
//                         <img src={profilePhoto} alt="Profile" className="w-full h-full rounded-full object-cover" />
//                       ) : (
//                         <FiUser />
//                       )}
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-900">{userData.name}</p>
//                       <p className="text-xs text-gray-500">Evaluator</p>
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
//                     <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
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
//                   disabled
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Email</label>
//                 <input
//                   type="email"
//                   value={userData.email}
//                   onChange={(e) => setUserData({...userData, email: e.target.value})}
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                   disabled
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Department</label>
//                 <input
//                   type="text"
//                   value={userData.department}
//                   onChange={(e) => setUserData({...userData, department: e.target.value})}
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                   disabled
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

//       <div className="flex max-w-7xl mx-auto">
//         {/* Sidebar */}
//         <motion.aside 
//           initial={{ x: -20, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="w-64 bg-white shadow-md h-[calc(100vh-64px)] sticky top-16"
//         >
//           <nav className="p-4 space-y-1">
//             {navItems.map((item) => (
//               <motion.div
//                 key={item.path}
//                 whileHover={{ x: 5 }}
//                 transition={{ type: 'spring', stiffness: 300 }}
//               >
//                 <Link
//                   to={item.path}
//                   className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors"
//                 >
//                   <span className="mr-3 text-green-500">{item.icon}</span>
//                   {item.name}
//                 </Link>
//               </motion.div>
//             ))}
//           </nav>
//         </motion.aside>

//         {/* Main content */}
//         <main className="flex-1 p-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white shadow rounded-lg p-6"
//           >
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold text-gray-900">Application Evaluations</h2>
//               {activeTab !== 'pending' && (
//                 <motion.button
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="px-4 py-2 bg-green-600 rounded-md text-sm font-medium text-white hover:bg-green-700"
//                   onClick={publishResults}
//                 >
//                   Publish Results to Applicants
//                 </motion.button>
//               )}
//             </div>

//             {/* Evaluation tabs */}
//             <div className="border-b border-gray-200 mb-6">
//               <nav className="-mb-px flex space-x-8">
//                 <button
//                   onClick={() => setActiveTab('pending')}
//                   className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'pending' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
//                 >
//                   Pending Evaluation
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('approved')}
//                   className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'approved' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
//                 >
//                   Approved
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('rejected')}
//                   className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'rejected' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
//                 >
//                   Rejected
//                 </button>
//               </nav>
//             </div>

//             {/* Applications list */}
//             {filteredApplications.length === 0 ? (
//               <p className="text-gray-500 text-center py-8">No {activeTab} applications found.</p>
//             ) : (
//               <div className="space-y-6">
//                 {filteredApplications.map((application) => (
//                   <motion.div
//                     key={application.id}
//                     whileHover={{ scale: 1.005 }}
//                     className="border border-gray-200 rounded-lg overflow-hidden"
//                   >
//                     <div className="p-4 bg-gray-50 border-b border-gray-200">
//                       <div className="flex justify-between items-center">
//                         <h3 className="font-medium text-lg">{application.applicantName}</h3>
//                         <span className={`px-2 py-1 text-xs rounded-full ${
//                           application.status === 'approved' ? 'bg-green-100 text-green-800' :
//                           application.status === 'rejected' ? 'bg-red-100 text-red-800' :
//                           'bg-yellow-100 text-yellow-800'
//                         }`}>
//                           {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
//                         </span>
//                       </div>
//                       <p className="text-sm text-gray-600">{application.position} - {application.department}</p>
//                     </div>
                    
//                     <div className="p-4">
//                       <div className="mb-4">
//                         <h4 className="font-medium text-gray-700 mb-2">Evaluation Criteria</h4>
//                         <div className="space-y-2">
//                           {application.criteria.map((criterion, index) => (
//                             <div key={index} className="flex items-center">
//                               <span className="w-32 text-sm text-gray-600">{criterion.name}</span>
//                               <div className="flex-1 bg-gray-200 rounded-full h-2.5">
//                                 <div 
//                                   className="bg-green-600 h-2.5 rounded-full" 
//                                   style={{ width: `${(criterion.score / criterion.max) * 100}%` }}
//                                 ></div>
//                               </div>
//                               <span className="ml-2 text-xs font-medium text-gray-700">
//                                 {criterion.score}/{criterion.max}
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
                      
//                       <div className="flex justify-between items-center">
//                         <div>
//                           <p className="text-xs text-gray-500">Submitted: {application.submittedDate}</p>
//                           {application.decisionDate && (
//                             <p className="text-xs text-gray-500">Decision: {application.decisionDate}</p>
//                           )}
//                         </div>
                        
//                         {application.status === 'pending' ? (
//                           <div className="space-x-2">
//                             <motion.button
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                               className="px-3 py-1 bg-green-600 text-white rounded-md text-sm flex items-center"
//                               onClick={() => evaluateApplication(application.id, true)}
//                             >
//                               <FiCheck className="mr-1" /> Approve
//                             </motion.button>
//                             <motion.button
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                               className="px-3 py-1 bg-red-600 text-white rounded-md text-sm flex items-center"
//                               onClick={() => evaluateApplication(application.id, false)}
//                             >
//                               <FiX className="mr-1" /> Reject
//                             </motion.button>
//                           </div>
//                         ) : (
//                           <button
//                             className="px-3 py-1 bg-green-600 text-white rounded-md text-sm flex items-center"
//                             onClick={() => navigate(`/applicant/results/${application.id}`)}
//                           >
//                             <FiEye className="mr-1" /> View as Applicant
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </motion.div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default EvaluatorDashboard;

import { useState } from 'react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiClipboard, 
  FiUser, 
  FiKey, 
  FiLogOut,
  FiEdit2,
  FiUpload,
  FiCheck,
  FiX,
  FiEye,
  FiFileText,
  FiUsers,
  FiBarChart2
} from 'react-icons/fi';
import { useAuth } from '../../context/authContext';

import {  AnimatePresence } from 'framer-motion';
// import EvaluatorApplications from './EvaluatorApplications';
// import EvaluatorResults from './EvaluatorResults';
// import EvaluatorApplicants from './EvaluatorApplicants';

const EvaluatorDashboard = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  // Use actual user data from auth context
  const userData = {
    name: auth?.user?.name || 'Evaluator User',
    email: auth?.user?.email || 'evaluator@example.com',
    department: auth?.user?.department || 'Computer Science'
  };

  const navItems = [
    { path: 'applications', name: 'Evaluate Applications', icon: <FiFileText /> },
   
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
            <FiClipboard className="mr-2" />
            Evaluator Dashboard
          </motion.h1>
          
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <button className="flex items-center space-x-2 focus:outline-none">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Profile" className="w-full h-full rounded-full object-cover" />
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
                        <img src={profilePhoto} alt="Profile" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <FiUser />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                      <p className="text-xs text-gray-500">Evaluator</p>
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
                      <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
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
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                    readOnly
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
              {/* <Route path="applications" element={<EvaluatorApplications />} />
              <Route path="results" element={<EvaluatorResults />} />
              <Route path="applicants" element={<EvaluatorApplicants />} /> */}
              <Route path="/" element={
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">Welcome, Evaluator!</h2>
                    <p className="text-gray-500">Select an option from the sidebar to get started.</p>
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

export default EvaluatorDashboard;