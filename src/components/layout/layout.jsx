import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { ProfileEditModal } from "./profileEditModal";

export const DashboardLayout = ({ 
  title, 
  navLinks, 
  children,
  user,
  onLogout
}) => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [userData, setUserData] = useState({
    name: user?.fullName || user?.username || 'User',
    email: user?.email || 'user@example.com',
    role: user?.role || 'User',
    profilePhoto:user?.profilePhoto,

  });

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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-10">
        <Sidebar navLinks={navLinks} />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col ml-64">
        <Header 
          title={title}
          user={user}
          profilePhoto={profilePhoto}
          onLogout={onLogout}
          onEditProfile={() => setIsEditingProfile(true)}
        />

        <ProfileEditModal
          isOpen={isEditingProfile}
          onClose={() => setIsEditingProfile(false)}
          profilePhoto={profilePhoto}
          userData={userData}
          onFileChange={handleFileChange}
          onSave={setUserData}
        />

        {/* Main content container */}
        <main className="flex-1 p-4 sm:p-6 mt-8" >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow-md rounded-lg p-4 sm:p-6 h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};