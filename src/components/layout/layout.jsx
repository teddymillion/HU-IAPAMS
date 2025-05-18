import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { getUserProfile, updateUserProfile } from '../../services/userService';
import toast from 'react-hot-toast';
import ProfileEditModal from './ProfileEditModal';

export const DashboardLayout = ({ 
  title, 
  navLinks, 
  children,
  user,
  onLogout,
  token
}) => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [userData, setUserData] = useState({
    id: user?._id,
    fullName: user?.fullName || '',
    username: user?.username || '',
    email: user?.email || '',
    profilePhoto: user?.profilePhoto
  });

  // Fetch full user profile data when edit button is clicked
  const fetchUserProfile = async () => {
    try {
      setIsLoadingProfile(true);
      const result = await getUserProfile(token);
      
      if (result.success) {
        const userinfo = result.data;
        setUserData({
          id: userinfo.data._id,
          fullName: userinfo.data.fullName || '',
          username: userinfo.data.username || '',
          email: userinfo.data.email || '',
          phone: userinfo.data.phone || '',
          department: userinfo.data.department || '',
          positionType: userinfo.data.positionType || '',
          bio: userinfo.data.bio || '',
          address: userinfo.data.address || '',
          education: userinfo.data.education || [],
          experience: userinfo.data.experience || [],
          skills: userinfo.data.skills || [],
          website: userinfo.data.website || '',
          socialMedia: userinfo.data.socialMedia || {},
          profilePhoto: userinfo.data.profilePhoto,
          profilePhotoFile: null
        });
        
        if (userinfo.data.profilePhoto) {
          setProfilePhoto(userinfo.data.profilePhoto);
        }
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      toast.error('Failed to load profile data');
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleEditProfile = async () => {
    await fetchUserProfile();
    setIsEditingProfile(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
      
      setUserData(prev => ({
        ...prev,
        profilePhotoFile: file
      }));
    }
  };

  const handleSaveProfile = async (updatedData) => {
    try {
      setIsSaving(true);
      const result = await updateUserProfile(updatedData, token);
      
      if (result.success) {
        setUserData(prev => ({
          ...updatedData,
          profilePhotoFile: null
        }));
        
        if (result.data?.profilePhoto) {
          setProfilePhoto(result.data.profilePhoto);
        }
        
        setIsEditingProfile(false);
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
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
          onEditProfile={handleEditProfile}
        />

        <ProfileEditModal
          isOpen={isEditingProfile}
          onClose={() => !isSaving && setIsEditingProfile(false)}
          profilePhoto={profilePhoto}
          userData={userData}
          onFileChange={handleFileChange}
          onSave={handleSaveProfile}
          isSaving={isSaving}
          isLoading={isLoadingProfile}
        />

        {/* Main content container */}
        <main className="flex-1 p-4 sm:p-6 mt-8">
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