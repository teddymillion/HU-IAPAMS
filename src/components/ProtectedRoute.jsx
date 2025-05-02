// import { Navigate } from 'react-router-dom';
// import useAuthStore from '../store/authStore';

// const ProtectedRoute = ({ children, allowedRole }) => {
//   const { isAuthenticated, role } = useAuthStore();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   if (role !== allowedRole) {
//     return <Navigate to={`/${role}`} />;
//   }

//   return children;
// };

// export default ProtectedRoute;

// src/components/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export const ProtectedRoute = ({ children, allowedRole }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth?.tokens) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (auth.user && auth.user.role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;