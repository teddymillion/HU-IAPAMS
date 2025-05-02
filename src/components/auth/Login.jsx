// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { FiMail } from 'react-icons/fi';
// import { useAuth } from '../../context/authContext';


// const Login = () => {
//   const [selectedRole, setSelectedRole] = useState('');
//   const [credentials, setCredentials] = useState({ username: '', password: '' });
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const navigate = useNavigate();
//   const { login, auth } = useAuth();

//   const roles = [
//     { value: 'admin', label: 'Administrator' },
//     { value: 'evaluator', label: 'Evaluator' },
//     { value: 'staff', label: 'Academic Staff' },
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (credentials.username && credentials.password && selectedRole) {
//       try {
//         const user = await login(credentials.username, credentials.password);
//         toast.success('Login successful!, navigating...');
//         navigate(`/${user.role}/dashboard`);
//       } catch (error) {
//         toast.error(error.message || 'Login failed');
//       }
//     } else {
//       toast.error('Please fill in all fields');
//     }
//   };
//   const handleForgotPassword = (e) => {
//     e.preventDefault();
//     if (email) {
//       toast.success(`Password reset link sent to ${email}`);
//       setShowForgotPassword(false);
//       setEmail('');
//     } else {
//       toast.error('Please enter your email address');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             HU-IAPMS
//           </h2>
//         </div>

//         {showForgotPassword ? (
//           <form className="mt-8 space-y-6" onSubmit={handleForgotPassword}>
//             <div className="rounded-md shadow-sm">
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                   Enter your email to reset password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiMail className="text-gray-400" />
//                   </div>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     required
//                     className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
//                     placeholder="Email address"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="flex space-x-3">
//               <button
//                 type="button"
//                 onClick={() => setShowForgotPassword(false)}
//                 className="w-1/2 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="w-1/2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//               >
//                 Send Reset Link
//               </button>
//             </div>
//           </form>
//         ) : (
//           <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//             <div className="rounded-md shadow-sm -space-y-px">
//               <div className="mb-4">
//                 <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
//                   Select Role
//                 </label>
//                 <select
//                   id="role"
//                   required
//                   className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
//                   value={selectedRole}
//                   onChange={(e) => setSelectedRole(e.target.value)}
//                 >
//                   <option value="">Select a role</option>
//                   {roles.map((role) => (
//                     <option key={role.value} value={role.value}>
//                       {role.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label htmlFor="username" className="sr-only">
//                   Username
//                 </label>
//                 <input
//                   id="username"
//                   name="username"
//                   type="text"
//                   required
//                   className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
//                   placeholder="Username"
//                   value={credentials.username}
//                   onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password" className="sr-only">
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
//                   placeholder="Password"
//                   value={credentials.password}
//                   onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//                 />
//               </div>
//             </div>

//             <div className="flex items-center justify-end">
//               <button
//                 type="button"
//                 onClick={() => setShowForgotPassword(true)}
//                 className="text-sm text-green-600 hover:text-green-500"
//               >
//                 Forgot password?
//               </button>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//               >
//                 Sign in
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/authContext';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const roles = [
    { value: 'admin', label: 'Administrator' },
    { value: 'evaluator', label: 'Evaluator' },
    { value: 'staff', label: 'Academic Staff' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (credentials.username && credentials.password && selectedRole) {
      try {
        const user = await login(credentials.username, credentials.password);
        toast.success('Login successful!, navigating...');
        navigate(`/${user.role}/dashboard`);
      } catch (error) {
        toast.error(error.message || 'Login failed');
      }
    } else {
      toast.error('Please fill in all fields');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            HU-IAPMS
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Select Role
              </label>
              <select
                id="role"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-green-600 hover:text-green-500"
            >
              Forgot password?
            </Link>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;