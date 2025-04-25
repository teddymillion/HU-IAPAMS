// import { Routes, Route, Link } from 'react-router-dom';
// import Positions from './Positions';
// import Evaluators from './Evaluators';
// import Results from './Results';
// import useAuthStore from '../../store/authStore';

// const AdminDashboard = () => {
//   const logout = useAuthStore((state) => state.logout);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <nav className="bg-indigo-600 p-4">
//         <div className="flex justify-between items-center">
//           <h1 className="text-white text-xl font-bold">Admin Dashboard</h1>
//           <div className="space-x-4">
//             <Link to="/change-password" className="text-white hover:text-indigo-200">
//               Change Password
//             </Link>
//             <button
//               onClick={logout}
//               className="text-white hover:text-indigo-200"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>

//       <div className="flex">
//         <aside className="w-64 bg-white shadow-md h-[calc(100vh-64px)]">
//           <nav className="p-4 space-y-2">
//             <Link
//               to="/admin/positions"
//               className="block p-2 text-gray-700 hover:bg-indigo-50 rounded"
//             >
//               Manage Positions
//             </Link>
//             <Link
//               to="/admin/evaluators"
//               className="block p-2 text-gray-700 hover:bg-indigo-50 rounded"
//             >
//               Manage Evaluators
//             </Link>
//             <Link
//               to="/admin/results"
//               className="block p-2 text-gray-700 hover:bg-indigo-50 rounded"
//             >
//               Manage Results
//             </Link>
//           </nav>
//         </aside>

//         <main className="flex-1 p-8">
//           <Routes>
//             <Route path="positions" element={<Positions />} />
//             <Route path="evaluators" element={<Evaluators />} />
//             <Route path="results" element={<Results />} />
//             <Route path="/" element={<Positions />} />
//           </Routes>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
import { Routes, Route, Link } from 'react-router-dom';
import Positions from './Positions';
import Evaluators from './Evaluators';
import Results from './Results';
import useAuthStore from '../../store/authStore';

const AdminDashboard = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">Admin Dashboard</h1>
          <div className="space-x-4">
            <Link to="/change-password" className="text-white hover:text-indigo-200">
              Change Password
            </Link>
            <button
              onClick={logout}
              className="text-white hover:text-indigo-200"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 bg-white shadow-md h-[calc(100vh-64px)]">
          <nav className="p-4 space-y-2">
          <Link
              to="/admin/positions"
              className="block p-2 text-gray-700 hover:bg-indigo-50 rounded"
            >
              Manage Applications
            </Link>
            <Link
              to="/admin/positions"
              className="block p-2 text-gray-700 hover:bg-indigo-50 rounded"
            >
              Manage Positions
            </Link>
            
            <Link
              to="/admin/evaluators"
              className="block p-2 text-gray-700 hover:bg-indigo-50 rounded"
            >
              Manage Evaluators
            </Link>
            <Link
              to="/admin/results"
              className="block p-2 text-gray-700 hover:bg-indigo-50 rounded"
            >
              Manage Results
            </Link>
            <Link
              to="/admin/positions"
              className="block p-2 text-gray-700 hover:bg-indigo-50 rounded"
            >
              Users
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <Routes>
            <Route path="positions" element={<Positions />} />
            <Route path="evaluators" element={<Evaluators />} />
            <Route path="results" element={<Results />} />
            <Route path="/" element={<Positions />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;