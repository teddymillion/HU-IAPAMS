import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import EvaluatorDashboard from './pages/evaluator/Dashboard';
import StaffDashboard from './pages/staff/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ChangePassword from './pages/ChangePassword';
import Unauthorized from './components/error/unauthorized';
import { AuthProvider } from './context/authContext';


function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <AuthProvider>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        
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
        
        <Route path="/applicant/*" element={
          <ProtectedRoute allowedRole="staff">
            <StaffDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
      </AuthProvider>
      </Router>
  );
}

export default App;