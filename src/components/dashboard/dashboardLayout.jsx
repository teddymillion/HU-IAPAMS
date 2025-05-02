// src/components/dashboard/DashboardLayout.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet, Link, useLocation } from 'react-router-dom';

export const DashboardLayout = ({
  title,
  navItems,
  profileContent,
}) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.nav className="bg-green-600 p-4 shadow-lg">
        {/* Header content */}
      </motion.nav>

      <div className="flex max-w-7xl mx-auto">
        <motion.aside className="w-64 bg-white shadow-md h-[calc(100vh-64px)] sticky top-16">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <motion.div key={item.path}>
                <Link to={item.path}>{item.name}</Link>
              </motion.div>
            ))}
          </nav>
        </motion.aside>

        <main className="flex-1 p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {profileContent}
    </div>
  );
};