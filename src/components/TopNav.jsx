import React, { useState, useEffect, useRef } from 'react';
import { BellIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon, CogIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

const TopNav = ({ userType = 'admin' }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const notificationsRef = useRef<HTMLDivElement | null>(null);

  const getNotifications = () => {
    switch (userType) {
      case 'admin':
        return [
          { id: 1, message: 'New application for Senior Developer', time: '10 min ago', read: false },
          { id: 2, message: 'Mike Chen completed evaluation for Product Manager', time: '1 hour ago', read: true },
          { id: 3, message: 'System maintenance scheduled for tonight', time: '2 days ago', read: true },
        ];
      case 'evaluator':
        return [
          { id: 1, message: 'New evaluation assigned: UI/UX Designer', time: '15 min ago', read: false },
          { id: 2, message: 'Reminder: Complete Frontend Dev evaluations by Friday', time: '2 hours ago', read: false },
          { id: 3, message: 'Evaluation guidelines updated', time: '1 day ago', read: true },
        ];
      case 'applicant':
        return [
          { id: 1, message: 'Your application for Product Manager is under review', time: '2 days ago', read: false },
          { id: 2, message: 'Interview scheduled for Senior Developer role', time: '3 days ago', read: true },
          { id: 3, message: 'Thank you for applying to TechCorp', time: '1 week ago', read: true },
        ];
      default:
        return [];
    }
  };

  const notifications = getNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  const getUserGreeting = () => {
    switch (userType) {
      case 'admin': return 'Admin';
      case 'evaluator': return 'Evaluator';
      case 'applicant': return 'Applicant';
      default: return 'User';
    }
  };

  const getSearchPlaceholder = () => {
    switch (userType) {
      case 'admin': return 'Search jobs, applicants...';
      case 'evaluator': return 'Search applications...';
      case 'applicant': return 'Search jobs...';
      default: return 'Search...';
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Search Bar - Hidden for applicants on small screens */}
        <div className={`relative ${userType === 'applicant' ? 'hidden sm:block' : 'block'} w-48 sm:w-64`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            placeholder={getSearchPlaceholder()}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            aria-label="Search"
          />
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Notification Bell - Hidden for applicants */}
          {userType !== 'applicant' && (
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsProfileOpen(false);
                }}
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Notifications"
                aria-expanded={isNotificationsOpen}
              >
                <BellIcon className="h-6 w-6" aria-hidden="true" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                    {unreadCount}
                    <span className="sr-only">unread notifications</span>
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationsOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-72 sm:w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none z-20">
                  <div className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">Notifications</p>
                  </div>
                  <div className="py-1 max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 text-sm ${!notification.read ? 'bg-blue-50' : ''}`}
                        >
                          <p className="text-gray-900">{notification.message}</p>
                          <p className="text-gray-500 mt-1 text-xs">{notification.time}</p>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-500">
                        No notifications
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-2">
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-800 w-full text-left">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotificationsOpen(false);
              }}
              className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="User menu"
              aria-expanded={isProfileOpen}
            >
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User profile"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 hidden md:inline">
                {getUserGreeting()}
              </span>
              <ChevronDownIcon className="ml-1 h-4 w-4 text-gray-500 hidden md:inline" aria-hidden="true" />
            </button>

            {isProfileOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <UserCircleIcon className="h-5 w-5 mr-2 text-gray-400" aria-hidden="true" />
                  Your Profile
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <CogIcon className="h-5 w-5 mr-2 text-gray-400" aria-hidden="true" />
                  Settings
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2 text-gray-400" aria-hidden="true" />
                  Sign out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;