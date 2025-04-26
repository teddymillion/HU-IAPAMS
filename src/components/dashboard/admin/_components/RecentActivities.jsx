import { ClockIcon } from '@heroicons/react/24/outline';
import React from 'react';


const RecentActivities = () => {
  const activities = [
    {
      id: 1,
      name: 'Sarah Johnson',
      action: 'completed reviewing T2 applications for Senior Developer',
      time: '2 hours ago',
    },
    {
      id: 2,
      name: 'Mike Chen',
      action: 'posted a new job for Product Manager',
      time: '4 hours ago',
    },
    {
      id: 3,
      name: 'Emily Davis',
      action: 'assigned 5 evaluators to UI/UX Designer position',
      time: '6 hours ago',
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow h-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h2>
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="border-b pb-4 last:border-b-0 last:pb-0">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                {activity.name.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  <span className="font-semibold">{activity.name}</span> {activity.action}
                </p>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <ClockIcon className="h-3 w-3 mr-1" />
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivities;