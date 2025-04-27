import ApplicationsChart from './_components/ApplicationsChart';
import RecentActivities from './_components/RecentActivities';
import RecentJobPosts from './_components/RecentJobPosts';

import StatsCards from "./_components/StatsCards";



const Overview = () => {
  return (
    <div className="flex h-screen bg-gray-100">
        
        {/* Dashboard Content */}
        <main className="flex-1  p-6 bg-gray-50">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Welcome Back, Admin</h1>
            <p className="text-gray-600">Here's what's happening today</p>
          </div>

          {/* Stats Cards */}
          <StatsCards />

          {/* First Row - Chart and Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <ApplicationsChart />
            </div>
            <div>
              <RecentActivities />
            </div>
          </div>

          {/* Second Row - Job Posts and Reports */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <RecentJobPosts />
            </div>
            
          </div>
        </main>
   
    </div>
  );
};

export default Overview;