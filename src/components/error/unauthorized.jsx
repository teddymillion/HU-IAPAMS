
// implement a 401 unauthorized page


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';


const Unauthorized = () => {
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);
    
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
    return (
        <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center h-screen bg-gray-100"
        >
        <h1 className="text-4xl font-bold text-red-600">Unauthorized</h1>
        <p className="mt-4 text-lg text-gray-700">You do not have permission to access this page.</p>
        <button
            onClick={handleLogout}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Logout
        </button>
        </motion.div>
    );
}

export default Unauthorized;