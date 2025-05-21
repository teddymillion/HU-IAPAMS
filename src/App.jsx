import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './components/auth/Login';
import AdminDashboard from './pages/admin/Dashboard';
import EvaluatorDashboard from './pages/evaluator/Dashboard';
import StaffDashboard from './pages/staff/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './components/error/unauthorized';
import { AuthProvider } from './context/authContext';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import ChangePassword from './components/auth/ChangePassword';


function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* Protected Routes*/}
        
        <Route path="/admin/*" element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/evaluator/*" element={
          <ProtectedRoute allowedRole="evaluator">
            <EvaluatorDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/staff/*" element={
          <ProtectedRoute allowedRole="staff">
            <StaffDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
      </AuthProvider>
      </Router>
  );
}

export default App;