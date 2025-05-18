
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../context/authContext';
// import { getMyApplications } from '../../services/applicationService';
// import { getUserProfile } from '../../services/userService';
// import { getPositions } from '../../services/positionService';
// import { toast } from 'react-hot-toast';
// import NotificationsIcon from '@mui/icons-material/Notifications';

// const StaffHome = () => {
//   const { auth } = useAuth();
//   const [user, setUser] = useState(null);
//   const [applications, setApplications] = useState([]);
//   const [positions, setPositions] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setIsLoading(true);
//     try {
//       const [userRes, appsRes, positionsRes] = await Promise.all([
//         getUserProfile(auth.tokens.accessToken),
//         getMyApplications(auth.tokens.accessToken),
//         getPositions(auth.tokens.accessToken)
//       ]);
//       if (userRes.success) setUser(userRes.data.data);
//       if (appsRes.success) setApplications(appsRes.data.data);
//       if (positionsRes.success) setPositions(positionsRes.data);
//     } catch (error) {
//       console.error('Error loading data', error);
//       toast.error('Failed to load data');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const completeness = user ? calculateCompleteness(user) : 0;
//   const stats = getApplicationStats();

//   function calculateCompleteness(user) {
//     const fields = ['fullName', 'email', 'phone', 'profilePhoto', 'education', 'experience', 'skills'];
//     const filled = fields.filter(f => user[f] && (Array.isArray(user[f]) ? user[f].length > 0 : true));
//     return Math.round((filled.length / fields.length) * 100);
//   }

//   function getApplicationStats() {
//     return {
//       positionsAvailable: positions.length,
//       applications: applications.length,
//       inReview: applications.filter(a => a.status === 'under_review').length
//     };
//   }

//   function getStatusColor(status) {
//     switch (status) {
//       case 'applied': return 'bg-blue-500';
//       case 'under_review': return 'bg-yellow-500';
//       case 'accepted': return 'bg-green-500';
//       case 'rejected': return 'bg-red-500';
//       default: return 'bg-gray-500';
//     }
//   }

//   return (
//     <div className="max-w-6xl mx-auto py-8">
//       {/* Header */}
//       <div className="bg-green-600 text-white p-4 rounded-lg mb-6">
//         <h1 className="text-2xl font-semibold">
//           Welcome back, {user ? user?.fullName : 'John Doe'}!
//         </h1>
//         <div className="flex items-center mt-2">
//           <div className="w-full bg-white rounded-full h-2.5">
//             <div
//               className="bg-blue-500 h-2.5 rounded-full"
//               style={{ width: `${completeness}%` }}
//             />
//           </div>
//           <span className="ml-3">{completeness}% complete</span>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         {[
//           { label: 'Positions Available', value: stats.positionsAvailable },
//           { label: 'Applications', value: stats.applications },
//           { label: 'In Review', value: stats.inReview }
//         ].map((item, idx) => (
//           <div key={idx} className="bg-white shadow rounded-lg p-4">
//             <p className="text-gray-500">{item.label}</p>
//             <p className="text-3xl font-bold">{item.value}</p>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Newly Posted Positions */}
//         <div className="bg-white shadow rounded-lg p-4">
//           <h2 className="text-xl font-semibold mb-2">Newly Posted Positions</h2>
//           <hr className="mb-2" />
//           {positions.length === 0 ? (
//             <p className="text-gray-500">No positions available.</p>
//           ) : (
//             <ul>
//               {positions.map(pos => (
//                 <li key={pos.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
//                   <div>
//                     <p className="font-medium">{pos.title}</p>
//                     <p className="text-sm text-gray-500">{pos.department} • {pos.type}</p>
//                   </div>
//                   <span className={`text-white text-xs px-2 py-1 rounded ${getStatusColor(pos.status)}`}>
//                     {pos.status}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Recent Notifications */}
//         <div className="bg-white shadow rounded-lg p-4">
//           <div className="flex items-center mb-2">
//             <NotificationsIcon className="mr-2 text-gray-700" />
//             <h2 className="text-xl font-semibold">Recent Notifications</h2>
//           </div>
//           <hr className="mb-2" />
//           <ul>
//             {applications.length === 0 ? (
//               <p className="text-gray-500">No recent notifications.</p>
//             ) : (
//               applications.slice(0, 5).map(app => (
//                 <li key={app.id} className="py-2 border-b last:border-b-0">
//                   <p className="font-medium">{app.positionTitle} — {app.status}</p>
//                   <p className="text-sm text-gray-500">{app.updatedAt ? new Date(app.updatedAt).toLocaleString() : ''}</p>
//                 </li>
//               ))
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StaffHome;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { getMyApplications } from '../../services/applicationService';
import { getUserProfile } from '../../services/userService';
import { getPositions } from '../../services/positionService';
import { toast } from 'react-hot-toast';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';

const StaffHome = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [userRes, appsRes, positionsRes] = await Promise.all([
        getUserProfile(auth.tokens.accessToken),
        getMyApplications(auth.tokens.accessToken),
        getPositions(auth.tokens.accessToken)
      ]);
      if (userRes.success) setUser(userRes.data.data);
      if (appsRes.success) setApplications(appsRes.data.data);
      if (positionsRes.success) setPositions(positionsRes.data);
    } catch (error) {
      console.error('Error loading data', error);
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const completeness = user ? calculateCompleteness(user) : 0;
  const stats = getApplicationStats();

  function calculateCompleteness(user) {
    const fields = ['fullName', 'email', 'phone', 'profilePhoto', 'education', 'experience', 'skills'];
    const filled = fields.filter(f => user[f] && (Array.isArray(user[f]) ? user[f].length > 0 : true));
    return Math.round((filled.length / fields.length) * 100);
  }

  function getApplicationStats() {
    return {
      positionsAvailable: positions?.length,
      applications: applications?.length,
      inReview: applications.filter(a => a.status === 'under_review').length
    };
  }

  // Inside your component, after fetching positions & applications:
  // console.log('Applications:', applications); // Check the applications data
const appliedPositionIds = applications.map(app => app.position._id); // Adjust field name if needed
// console.log('Applied position IDs:', appliedPositionIds); // Check the IDs
const newPositions = positions.filter(pos => !appliedPositionIds.includes(pos._id));

// console.log('Newly posted positions:', newPositions);
  function getStatusColor(status) {
    switch (status) {
      case 'applied': return 'bg-blue-500';
      case 'under_review': return 'bg-yellow-500';
      case 'accepted': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  }

  const handlePositionClick = (id) => {
    navigate(`/staff/positions/${id}`); 
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 rounded-lg mb-6">
        <h1 className="text-2xl font-semibold">
          Welcome back, {user ? user.fullName : 'John Doe'}!
        </h1>
        <div className="flex items-center mt-2">
          <div className="w-full bg-white rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{ width: `${completeness}%` }}
            />
          </div>
          <span className="ml-3">{completeness}% complete</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Positions Available', value: stats.positionsAvailable },
          { label: 'Applications', value: stats.applications },
          { label: 'In Review', value: stats.inReview }
        ].map((item, idx) => (
          <div key={idx} className="bg-white shadow rounded-lg p-4">
            <p className="text-gray-500">{item.label}</p>
            <p className="text-3xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Newly Posted Positions */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Newly Posted Positions</h2>
          <hr className="mb-2" />
          {newPositions.length === 0 ? (
            <p className="text-gray-500">No positions available.</p>
          ) : (
            <ul>
              {newPositions.map(pos => (
                <li
                  key={pos._id}
                  className="flex justify-between items-center py-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => handlePositionClick(pos._id)}
                >
                  <div>
                    <p className="font-medium">{pos.title}</p>
                    <p className="text-sm text-gray-500">{pos.department} • {pos.type}</p>
                  </div>
                  <span className={`text-white text-xs px-2 py-1 rounded ${getStatusColor(pos.status)}`}>
                    {pos.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent Notifications */}
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center mb-2">
            <NotificationsIcon className="mr-2 text-gray-700" />
            <h2 className="text-xl font-semibold">Recent Notifications</h2>
          </div>
          <hr className="mb-2" />
          <ul>
            {applications.length === 0 ? (
              <p className="text-gray-500">No recent notifications.</p>
            ) : (
              applications.slice(0, 5).map(app => (
                <li key={app.id} className="py-2 border-b last:border-b-0">
                  <p className="font-medium">{app.positionTitle} — {app.status}</p>
                  <p className="text-sm text-gray-500">{app.updatedAt ? new Date(app.updatedAt).toLocaleString() : ''}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StaffHome;
