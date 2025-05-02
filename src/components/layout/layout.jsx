// import Sidebar from './Sidebar';
// import TopNav from './TopNav';

import Sidebar from "../Sidebar";

// const Layout = ({ children  }) => {
//   return (
//     <div className="flex h-screen bg-gray-50 text-gray-800">
//       <Sidebar userType={userType} />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <TopNav userType={userType} />
//         <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;

import TopNav from "../TopNav";

const Layout = ({ children, userType }) => {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <Sidebar userType={userType} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav userType={userType} />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

