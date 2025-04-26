import { ArrowUpIcon , ArrowDownIcon} from '@heroicons/react/16/solid';
import React from 'react';
// import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/solid';


const StatsCards = () => {
  const stats = [
    { title: 'Total Jobs', value: '248', change: '12', trend: 'up' },
    { title: 'New Applications', value: '1,257', change: '8', trend: 'up' },
    { title: 'Hired', value: '145', change: '24', trend: 'up' },
    { title: 'Active Evaluators', value: '36', change: '2', trend: 'down' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            <span
              className={`ml-2 flex items-baseline text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {stat.trend === 'up' ? (
                <ArrowUpIcon className="h-4 w-4 flex-shrink-0 self-center" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 flex-shrink-0 self-center" />
              )}
              <span className="sr-only">{stat.trend === 'up' ? 'Increased' : 'Decreased'} by</span>
              {stat.change}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;