// components/layout/ProfileEditModal.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiUpload } from 'react-icons/fi';

export const ProfileEditModal = ({ 
  isOpen, 
  onClose, 
  profilePhoto, 
  userData, 
  onFileChange, 
  onSave 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
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
                    onChange={onFileChange}
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
                  onChange={(e) => onSave({...userData, name: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => onSave({...userData, email: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-green-600 rounded-md text-sm font-medium text-white hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};