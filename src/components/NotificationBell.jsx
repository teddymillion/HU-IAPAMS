import { useState } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import useAuthStore from '../store/authStore';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, removeNotification } = useAuthStore();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-white hover:text-indigo-200"
      >
        <BellIcon className="h-6 w-6" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50">
          {notifications.length === 0 ? (
            <p className="px-4 py-2 text-gray-500">No new notifications</p>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="px-4 py-2 hover:bg-gray-50 flex justify-between items-center"
                >
                  <p className="text-sm text-gray-700">{notification.message}</p>
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="text-xs text-gray-400 hover:text-gray-500"
                  >
                    Dismiss
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;