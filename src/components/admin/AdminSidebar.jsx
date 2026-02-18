
// // // // // // // import React, { useContext } from 'react';
// // // // // // // import { useNavigate, useLocation } from 'react-router-dom';
// // // // // // // import { AuthContext } from '../../App'; // Import AuthContext

// // // // // // // const AdminSidebar = ({ activePage }) => { // Remove onLogout from props
// // // // // // //   const navigate = useNavigate();
// // // // // // //   const location = useLocation();
// // // // // // //   const { logout } = useContext(AuthContext); // Use logout from context

// // // // // // //   const menuItems = [
// // // // // // //     {
// // // // // // //       id: 'dashboard',
// // // // // // //       label: 'Dashboard',
// // // // // // //       icon: 'fas fa-tachometer-alt',
// // // // // // //       path: '/admin/dashboard'
// // // // // // //     },
// // // // // // //     // In AdminSidebar.jsx, add to the menuItems array:
// // // // // // // {
// // // // // // //   id: 'faq-generator',
// // // // // // //   label: 'FAQ Generator',
// // // // // // //   icon: 'fas fa-question-circle',
// // // // // // //   path: '/admin/faq-generator'
// // // // // // // },
    
// // // // // // //     {
// // // // // // //       id: 'staff',
// // // // // // //       label: 'Staff Management',
// // // // // // //       icon: 'fas fa-user-tie',
// // // // // // //       path: '/admin/staff'
// // // // // // //     },
 
// // // // // // //     {
// // // // // // //       id: 'analytics',
// // // // // // //       label: 'Analytics',
// // // // // // //       icon: 'fas fa-chart-bar',
// // // // // // //       path: '/admin/analytics'
// // // // // // //     },
    
// // // // // // //     {
// // // // // // //       id: 'settings',
// // // // // // //       label: 'Settings',
// // // // // // //       icon: 'fas fa-cog',
// // // // // // //       path: '/admin/settings'
// // // // // // //     }
// // // // // // //   ];

// // // // // // //   const handleNavigation = (path) => {
// // // // // // //     navigate(path);
// // // // // // //   };

// // // // // // //   const handleLogout = () => {
// // // // // // //     console.log('Logout clicked from sidebar');
// // // // // // //     logout(); // Use logout from context
// // // // // // //   };

// // // // // // //   const isActive = (item) => {
// // // // // // //     if (activePage) {
// // // // // // //       return item.id === activePage;
// // // // // // //     }
// // // // // // //     return location.pathname === item.path;
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="w-64 bg-linear-to-br from-purple-600 to-purple-800 text-white fixed h-screen left-0 top-0 flex flex-col z-50">
// // // // // // //       <div className="p-5 border-b border-purple-400">
// // // // // // //         <div className="flex items-center gap-3">
// // // // // // //           <div className="w-10 h-10 bg-purple-400 rounded-lg flex items-center justify-center font-bold text-lg">
// // // // // // //             RS
// // // // // // //           </div>
// // // // // // //           <div>
// // // // // // //             <h2 className="text-lg font-bold">RAJ-Sahayak</h2>
// // // // // // //             <p className="text-purple-200 text-sm">Admin Panel</p>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       <nav className="flex-1 p-4">
// // // // // // //         <ul className="space-y-1">
// // // // // // //           {menuItems.map(item => (
// // // // // // //             <li key={item.id}>
// // // // // // //               <button
// // // // // // //                 className={`w-full text-left py-3 px-4 rounded-lg flex items-center gap-3 transition-all duration-200 relative ${
// // // // // // //                   isActive(item) 
// // // // // // //                     ? 'bg-purple-400 text-white shadow-lg' 
// // // // // // //                     : 'text-purple-100 hover:bg-purple-400 hover:bg-opacity-30'
// // // // // // //                 }`}
// // // // // // //                 onClick={() => handleNavigation(item.path)}
// // // // // // //               >
// // // // // // //                 <i className={`${item.icon} w-5 text-center`}></i>
// // // // // // //                 <span className="flex-1">{item.label}</span>
// // // // // // //                 {isActive(item) && (
// // // // // // //                   <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-lg"></div>
// // // // // // //                 )}
// // // // // // //               </button>
// // // // // // //             </li>
// // // // // // //           ))}
// // // // // // //         </ul>
// // // // // // //       </nav>

// // // // // // //       <div className="p-5 border-t border-purple-400">
// // // // // // //         <div className="flex items-center gap-3 mb-4">
// // // // // // //           <div className="w-10 h-10 bg-purple-400 rounded-full flex items-center justify-center">
            
// // // // // // //             <i className="fas fa-user-shield text-sm"></i>
// // // // // // //           </div>
// // // // // // //           <div>
// // // // // // //             <div className="font-semibold text-sm">Administrator</div>
// // // // // // //             <div className="text-purple-200 text-xs">Super Admin</div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //         <button 
// // // // // // //           className="w-full bg-purple-400 bg-opacity-30 border border-purple-300 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-400 transition-all duration-200"
// // // // // // //           onClick={handleLogout}
// // // // // // //         >
// // // // // // //           <i className="fas fa-sign-out-alt"></i>
// // // // // // //           Logout
// // // // // // //         </button>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default AdminSidebar;

// // // // // // import React, { useContext } from 'react';
// // // // // // import { useNavigate, useLocation } from 'react-router-dom';
// // // // // // import { AuthContext } from '../../App';

// // // // // // const AdminSidebar = ({ activePage }) => {
// // // // // //   const navigate = useNavigate();
// // // // // //   const location = useLocation();
// // // // // //   const { logout } = useContext(AuthContext);

// // // // // //   const menuItems = [
// // // // // //     {
// // // // // //       id: 'dashboard',
// // // // // //       label: 'Dashboard',
// // // // // //       icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FF6B6B'%3E%3Cpath d='M3 13h1v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h1c.6 0 1-.4 1-1s-.4-1-1-1h-1V4c0-1.1-.9-2-2-2H6C4.9 2 4 2.9 4 4v7H3c-.6 0-1 .4-1 1s.4 1 1 1zm4-9h10v5H7V4zm2 7h6v2H9v-2zm-2 5h10v5H7v-5zm2 2h6v1H9v-1z'/%3E%3C/svg%3E",
// // // // // //       path: '/admin/dashboard'
// // // // // //     },
// // // // // //     {
// // // // // //       id: 'staff',
// // // // // //       label: 'Staff Management',
// // // // // //       icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234ECDC4'%3E%3Cpath d='M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z'/%3E%3C/svg%3E",
// // // // // //       path: '/admin/staff'
// // // // // //     },
// // // // // //     {
// // // // // //       id: 'files',
// // // // // //       label: 'File Management',
// // // // // //       icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23003F7A'%3E%3Cpath d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'/%3E%3C/svg%3E",
// // // // // //       path: '/admin/files'
// // // // // //     },
// // // // // //     {
// // // // // //       id: 'analytics',
// // // // // //       label: 'Analytics',
// // // // // //       icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FFA500'%3E%3Cpath d='M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0 4h2v-2H3v2zm12-8h2v-2h-2v2zm0 4h2v-2h-2v2zm0 4h2v-2h-2v2zm-8 0h2v-2H7v2zm0-4h2v-2H7v2zm0-4h2v-2H7v2zm8 8h2v-2h-2v2zm4-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z'/%3E%3C/svg%3E",
// // // // // //       path: '/admin/analytics'
// // // // // //     },
// // // // // //     {
// // // // // //       id: 'knowledge-base',
// // // // // //       label: 'Knowledge Base',
// // // // // //       icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239B59B6'%3E%3Cpath d='M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z'/%3E%3C/svg%3E",
// // // // // //       path: '/admin/knowledge-base'
// // // // // //     },
// // // // // //     {
// // // // // //       id: 'settings',
// // // // // //       label: 'Settings',
// // // // // //       icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23E74C3C'%3E%3Cpath d='M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z'/%3E%3C/svg%3E",
// // // // // //       path: '/admin/settings'
// // // // // //     }
// // // // // //   ];

// // // // // //   const handleNavigation = (path) => {
// // // // // //     navigate(path);
// // // // // //   };

// // // // // //   const handleLogout = () => {
// // // // // //     console.log('Logout clicked from sidebar');
// // // // // //     logout();
// // // // // //   };

// // // // // //   const isActive = (item) => {
// // // // // //     if (activePage) {
// // // // // //       return item.id === activePage;
// // // // // //     }
// // // // // //     return location.pathname === item.path;
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="w-64 bg-linear-to-br from-purple-700 to-purple-600 text-white fixed h-screen left-0 top-0 flex flex-col z-50">
// // // // // //       {/* Header */}
// // // // // //       <div className="p-5 border-b border-purple-400">
// // // // // //         <div className="flex items-center gap-3">
// // // // // //           <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-lg">
// // // // // //             <img
// // // // // //               src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%237B61FF'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'/%3E%3C/svg%3E"
// // // // // //               alt="RAJ-Sahayak Logo"
// // // // // //               className="h-6 w-6 object-cover"
// // // // // //             />
// // // // // //           </div>
// // // // // //           <div>
// // // // // //             <h2 className="text-lg font-bold">RAJ-Sahayak</h2>
// // // // // //             <p className="text-purple-200 text-sm">Admin Panel</p>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Navigation Menu */}
// // // // // //       <nav className="flex-1 p-4">
// // // // // //         <ul className="space-y-1">
// // // // // //           {menuItems.map(item => (
// // // // // //             <li key={item.id}>
// // // // // //               <button
// // // // // //                 className={`w-full text-left py-3 px-4 rounded-lg flex items-center gap-3 transition-all duration-200 relative ${
// // // // // //                   isActive(item) 
// // // // // //                     ? 'bg-white bg-opacity-20 text-purple-800 shadow-lg' 
// // // // // //                     : 'text-purple-100 hover:bg-purple-400 hover:bg-opacity-30'
// // // // // //                 }`}
// // // // // //                 onClick={() => handleNavigation(item.path)}
// // // // // //               >
// // // // // //                 <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-md ">
// // // // // //                   <img
// // // // // //                     src={item.icon}
// // // // // //                     alt={${item.label} icon}
// // // // // //                     className="h-5 w-5 object-cover"
// // // // // //                   />
// // // // // //                 </div>
// // // // // //                 <span className="flex-1">{item.label}</span>
// // // // // //                 {isActive(item) && (
// // // // // //                   <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-yellow-400 rounded-l-lg"></div>
// // // // // //                 )}
// // // // // //               </button>
// // // // // //             </li>
// // // // // //           ))}
// // // // // //         </ul>
// // // // // //       </nav>

// // // // // //       {/* Footer with User Info and Logout */}
// // // // // //       <div className="p-5 border-t border-purple-400">
// // // // // //         <div className="flex items-center gap-3 mb-4">
// // // // // //           <div className="w-10 h-10 bg-linear-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center overflow-hidden shadow-lg">
// // // // // //             <img
// // // // // //               src="data:image/jpeg;base64,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"  
// // // // // //               alt="Admin Profile"
// // // // // //               className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-md"
// // // // // //             />
// // // // // //           </div>
// // // // // //           <div>
// // // // // //             <div className="font-semibold text-sm">Administrator</div>
// // // // // //             <div className="text-purple-200 text-xs">Super Admin</div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //         <button 
// // // // // //           className="w-full bg-linear-to-r from-red-400 to-pink-500 border border-white text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:from-red-500 hover:to-pink-600 transition-all duration-200 shadow-md"
// // // // // //           onClick={handleLogout}
// // // // // //         >
// // // // // //           <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center overflow-hidden">
// // // // // //             <img
// // // // // //               src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23E74C3C'%3E%3Cpath d='M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z'/%3E%3C/svg%3E"
// // // // // //               alt="Logout"
// // // // // //               className="h-3 w-3 object-cover"
// // // // // //             />
// // // // // //           </div>
// // // // // //           Logout
// // // // // //         </button>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default AdminSidebar;

// // // // // import React, { useContext } from 'react';
// // // // // import { useNavigate, useLocation } from 'react-router-dom';
// // // // // import { AuthContext } from '../../App';

// // // // // const AdminSidebar = ({ activePage }) => {
// // // // //   const navigate = useNavigate();
// // // // //   const location = useLocation();
// // // // //   const { logout } = useContext(AuthContext);

// // // // //   const menuItems = [
// // // // //     {
// // // // //       id: 'dashboard',
// // // // //       label: 'Dashboard',
// // // // //       icon:
// // // // //         "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FF6B6B'%3E%3Cpath d='M3 13h1v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h1c.6 0 1-.4 1-1s-.4-1-1-1h-1V4c0-1.1-.9-2-2-2H6C4.9 2 4 2.9 4 4v7H3c-.6 0-1 .4-1 1s.4 1 1 1zm4-9h10v5H7V4zm2 7h6v2H9v-2zm-2 5h10v5H7v-5zm2 2h6v1H9v-1z'/%3E%3C/svg%3E",
// // // // //       path: '/admin/dashboard'
// // // // //     },
// // // // //     {
// // // // //       id: 'staff',
// // // // //       label: 'Staff Management',
// // // // //       icon:
// // // // //         "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234ECDC4'%3E%3Cpath d='M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z'/%3E%3C/svg%3E",
// // // // //       path: '/admin/staff'
// // // // //     },
// // // // //     {
// // // // //       id: 'files',
// // // // //       label: 'File Management',
// // // // //       icon:
// // // // //         "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23003F7A'%3E%3Cpath d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'/%3E%3C/svg%3E",
// // // // //       path: '/admin/files'
// // // // //     },
// // // // //     {
// // // // //       id: 'analytics',
// // // // //       label: 'Analytics',
// // // // //       icon:
// // // // //         "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FFA500'%3E%3Cpath d='M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0 4h2v-2H3v2zm12-8h2v-2h-2v2zm0 4h2v-2h-2v2zm0 4h2v-2h-2v2zm-8 0h2v-2H7v2zm0-4h2v-2H7v2zm0-4h2v-2H7v2zm8 8h2v-2h-2v2zm4-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z'/%3E%3C/svg%3E",
// // // // //       path: '/admin/analytics'
// // // // //     },
// // // // //     {
// // // // //       id: 'settings',
// // // // //       label: 'Settings',
// // // // //       icon:
// // // // //         "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23E74C3C'%3E%3Cpath d='M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z'/%3E%3C/svg%3E",
// // // // //       path: '/admin/settings'
// // // // //     }
// // // // //   ];

// // // // //   const handleNavigation = (path) => {
// // // // //     navigate(path);
// // // // //   };

// // // // //   const handleLogout = () => {
// // // // //     console.log('Logout clicked from sidebar');
// // // // //     logout();
// // // // //   };

// // // // //   const isActive = (item) => {
// // // // //     if (activePage) {
// // // // //       return item.id === activePage;
// // // // //     }
// // // // //     return location.pathname === item.path;
// // // // //   };

// // // // //   return (
// // // // //     <div className="w-64 bg-gradient-to-br from-purple-700 to-purple-600 text-white fixed h-screen left-0 top-0 flex flex-col z-50">
// // // // //       {/* Header */}
// // // // //       <div className="p-5 border-b border-purple-400">
// // // // //         <div className="flex items-center gap-3">
// // // // //           <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-lg">
// // // // //             <img
// // // // //               src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%237B61FF'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'/%3E%3C/svg%3E"
// // // // //               alt="RAJ-Sahayak Logo"
// // // // //               className="h-6 w-6 object-cover"
// // // // //             />
// // // // //           </div>
// // // // //           <div>
// // // // //             <h2 className="text-lg font-bold">RAJ-Sahayak</h2>
// // // // //             <p className="text-purple-200 text-sm">Admin Panel</p>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Navigation Menu */}
// // // // //       <nav className="flex-1 p-4">
// // // // //         <ul className="space-y-1">
// // // // //           {menuItems.map(item => (
// // // // //             <li key={item.id}>
// // // // //               <button
// // // // //                 className={`w-full text-left py-3 px-4 rounded-lg flex items-center gap-3 transition-all duration-200 relative ${
// // // // //                   isActive(item)
// // // // //                     ? 'bg-white bg-opacity-20 text-purple-800 shadow-lg'
// // // // //                     : 'text-purple-100 hover:bg-purple-400 hover:bg-opacity-30'
// // // // //                 }`}
// // // // //                 onClick={() => handleNavigation(item.path)}
// // // // //                 aria-current={isActive(item) ? 'page' : undefined}
// // // // //               >
// // // // //                 <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-md ">
// // // // //                   <img
// // // // //                     src={item.icon}
// // // // //                     alt={`${item.label} icon`}
// // // // //                     className="h-5 w-5 object-cover"
// // // // //                   />
// // // // //                 </div>
// // // // //                 <span className="flex-1">{item.label}</span>
// // // // //                 {isActive(item) && (
// // // // //                   <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-yellow-400 rounded-l-lg" />
// // // // //                 )}
// // // // //               </button>
// // // // //             </li>
// // // // //           ))}
// // // // //         </ul>
// // // // //       </nav>

// // // // //       {/* Footer with User Info and Logout */}
// // // // //       <div className="p-5 border-t border-purple-400">
// // // // //         <div className="flex items-center gap-3 mb-4">
// // // // //           <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center overflow-hidden shadow-lg">
// // // // //             <img
// // // // //               src="data:image/jpeg;base64,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"
// // // // //               alt="Admin Profile"
// // // // //               className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-md"
// // // // //             />
// // // // //           </div>
// // // // //           <div>
// // // // //             <div className="font-semibold text-sm">Administrator</div>
// // // // //             <div className="text-purple-200 text-xs">Super Admin</div>
// // // // //           </div>
// // // // //         </div>
// // // // //         <button
// // // // //           className="w-full bg-gradient-to-r from-red-400 to-pink-500 border border-white text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:from-red-500 hover:to-pink-600 transition-all duration-200 shadow-md"
// // // // //           onClick={handleLogout}
// // // // //         >
// // // // //           <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center overflow-hidden">
// // // // //             <img
// // // // //               src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23E74C3C'%3E%3Cpath d='M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z'/%3E%3C/svg%3E"
// // // // //               alt="Logout"
// // // // //               className="h-3 w-3 object-cover"
// // // // //             />
// // // // //           </div>
// // // // //           Logout
// // // // //         </button>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default AdminSidebar;

// // // // import React, { useContext } from 'react';
// // // // import { useNavigate, useLocation } from 'react-router-dom';
// // // // import { AuthContext } from '../../App';

// // // // const AdminSidebar = ({ activePage }) => {
// // // //   const navigate = useNavigate();
// // // //   const location = useLocation();
// // // //   const { logout } = useContext(AuthContext);

// // // //   const menuItems = [
// // // //     {
// // // //       id: 'dashboard',
// // // //       label: 'Dashboard',
// // // //       icon: 'fas fa-tachometer-alt',
// // // //       path: '/admin/dashboard'
// // // //     },
// // // //     {
// // // //       id: 'faq-generator',
// // // //       label: 'FAQ Generator',
// // // //       icon: 'fas fa-question-circle',
// // // //       path: '/admin/faq-generator'
// // // //     },
// // // //     {
// // // //       id: 'staff',
// // // //       label: 'Staff Management',
// // // //       icon: 'fas fa-user-tie',
// // // //       path: '/admin/staff'
// // // //     },
// // // //     {
// // // //       id: 'analytics',
// // // //       label: 'Analytics',
// // // //       icon: 'fas fa-chart-bar',
// // // //       path: '/admin/analytics'
// // // //     },
// // // //     {
// // // //       id: 'settings',
// // // //       label: 'Settings',
// // // //       icon: 'fas fa-cog',
// // // //       path: '/admin/settings'
// // // //     }
// // // //   ];

// // // //   const handleNavigation = (path) => {
// // // //     navigate(path);
// // // //   };

// // // //   const handleLogout = () => {
// // // //     console.log('Logout clicked from sidebar');
// // // //     logout && logout();
// // // //   };

// // // //   const isActive = (item) => {
// // // //     if (activePage) return item.id === activePage;
// // // //     // use startsWith so nested routes still mark parent active
// // // //     return location.pathname === item.path || location.pathname.startsWith(item.path + '/');
// // // //   };

// // // //   return (
// // // //     <div className="w-64 bg-gradient-to-br from-purple-600 to-purple-800 text-white fixed h-screen left-0 top-0 flex flex-col z-50">
// // // //       <div className="p-5 border-b border-purple-400">
// // // //         <div className="flex items-center gap-3">
// // // //           <div className="w-10 h-10 bg-purple-400 rounded-lg flex items-center justify-center font-bold text-lg">
// // // //             RS
// // // //           </div>
// // // //           <div>
// // // //             <h2 className="text-lg font-bold">RAJ-Sahayak</h2>
// // // //             <p className="text-purple-200 text-sm">Admin Panel</p>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <nav className="flex-1 p-4">
// // // //         <ul className="space-y-1">
// // // //           {menuItems.map((item) => (
// // // //             <li key={item.id}>
// // // //               <button
// // // //                 type="button"
// // // //                 className={`w-full text-left py-3 px-4 rounded-lg flex items-center gap-3 transition-all duration-200 relative ${
// // // //                   isActive(item)
// // // //                     ? 'bg-purple-400 text-white shadow-lg'
// // // //                     : 'text-purple-100 hover:bg-purple-400 hover:bg-opacity-30'
// // // //                 }`}
// // // //                 onClick={() => handleNavigation(item.path)}
// // // //                 aria-current={isActive(item) ? 'page' : undefined}
// // // //               >
// // // //                 {/* Font Awesome icon classes combined with small sizing helper */}
// // // //                 <i className={`${item.icon} text-sm w-5 text-center`} aria-hidden="true" />
// // // //                 <span className="flex-1">{item.label}</span>
// // // //                 {isActive(item) && (
// // // //                   <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-lg" />
// // // //                 )}
// // // //               </button>
// // // //             </li>
// // // //           ))}
// // // //         </ul>
// // // //       </nav>

// // // //       <div className="p-5 border-t border-purple-400">
// // // //         <div className="flex items-center gap-3 mb-4">
// // // //           <div className="w-10 h-10 bg-purple-400 rounded-full flex items-center justify-center">
// // // //             <i className="fas fa-user-shield text-sm" aria-hidden="true" />
// // // //           </div>
// // // //           <div>
// // // //             <div className="font-semibold text-sm">Administrator</div>
// // // //             <div className="text-purple-200 text-xs">Super Admin</div>
// // // //           </div>
// // // //         </div>
// // // //         <button
// // // //           type="button"
// // // //           className="w-full bg-purple-400 bg-opacity-30 border border-purple-300 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-400 transition-all duration-200"
// // // //           onClick={handleLogout}
// // // //         >
// // // //           <i className="fas fa-sign-out-alt" aria-hidden="true" />
// // // //           Logout
// // // //         </button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default AdminSidebar;










// // // // import React, { useContext } from 'react';
// // // // import { useNavigate, useLocation } from 'react-router-dom';
// // // // import { AuthContext } from '../../App';

// // // // const AdminSidebar = ({ activePage }) => {
// // // //   const navigate = useNavigate();
// // // //   const location = useLocation();
// // // //   const { logout } = useContext(AuthContext);

// // // //   const menuItems = [
// // // //     {
// // // //       id: 'dashboard',
// // // //       label: 'Dashboard',
// // // //       icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FF6B6B'%3E%3Cpath d='M3 13h1v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h1c.6 0 1-.4 1-1s-.4-1-1-1h-1V4c0-1.1-.9-2-2-2H6C4.9 2 4 2.9 4 4v7H3c-.6 0-1 .4-1 1s.4 1 1 1zm4-9h10v5H7V4zm2 7h6v2H9v-2zm-2 5h10v5H7v-5zm2 2h6v1H9v-1z'/%3E%3C/svg%3E",
// // // //       path: '/admin/dashboard'
// // // //     },
// // // //     {
// // // //       id: 'staff',
// // // //       label: 'Staff Management',
// // // //       icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234ECDC4'%3E%3Cpath d='M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z'/%3E%3C/svg%3E",
// // // //       path: '/admin/staff'
// // // //     },
// // // //     {
// // // //       id: 'files',
// // // //       label: 'File Management',
// // // //       icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23003F7A'%3E%3Cpath d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'/%3E%3C/svg%3E",
// // // //       path: '/admin/files'
// // // //     },
// // // //     {
// // // //       id: 'analytics',
// // // //       label: 'Analytics',
// // // //       icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FFA500'%3E%3Cpath d='M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0 4h2v-2H3v2zm12-8h2v-2h-2v2zm0 4h2v-2h-2v2zm0 4h2v-2h-2v2zm-8 0h2v-2H7v2zm0-4h2v-2H7v2zm0-4h2v-2H7v2zm8 8h2v-2h-2v2zm4-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z'/%3E%3C/svg%3E",
// // // //       path: '/admin/analytics'
// // // //     },
// // // //     {
// // // //       id: 'knowledge-base',
// // // //       label: 'Knowledge Base',
// // // //       icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239B59B6'%3E%3Cpath d='M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z'/%3E%3C/svg%3E",
// // // //       path: '/admin/knowledge-base'
// // // //     },
// // // //     {
// // // //       id: 'settings',
// // // //       label: 'Settings',
// // // //       icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23E74C3C'%3E%3Cpath d='M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z'/%3E%3C/svg%3E",
// // // //       path: '/admin/settings'
// // // //     }
// // // //   ];

// // // //   const handleNavigation = (path) => {
// // // //     navigate(path);
// // // //   };

// // // //   const handleLogout = () => {
// // // //     console.log('Logout clicked from sidebar');
// // // //     logout();
// // // //   };

// // // //   const isActive = (item) => {
// // // //     if (activePage) {
// // // //       return item.id === activePage;
// // // //     }
// // // //     return location.pathname === item.path;
// // // //   };

// // // //   return (
// // // //     <div className="w-64 bg-linear-to-br from-purple-700 to-purple-600 text-white fixed h-screen left-0 top-0 flex flex-col z-50">
// // // //       {/* Header */}
// // // //       <div className="p-5 border-b border-purple-400">
// // // //         <div className="flex items-center gap-3">
// // // //           <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-lg">
// // // //             <img
// // // //               src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%237B61FF'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'/%3E%3C/svg%3E"
// // // //               alt="RAJ-Sahayak Logo"
// // // //               className="h-6 w-6 object-cover"
// // // //             />
// // // //           </div>
// // // //           <div>
// // // //             <h2 className="text-lg font-bold">RAJ-Sahayak</h2>
// // // //             <p className="text-purple-200 text-sm">Admin Panel</p>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Navigation Menu */}
// // // //       <nav className="flex-1 p-4">
// // // //         <ul className="space-y-1">
// // // //           {menuItems.map(item => (
// // // //             <li key={item.id}>
// // // //               <button
// // // //                 className={`w-full text-left py-3 px-4 rounded-lg flex items-center gap-3 transition-all duration-200 relative ${
// // // //                   isActive(item) 
// // // //                     ? 'bg-white bg-opacity-20 text-purple-800 shadow-lg' 
// // // //                     : 'text-purple-100 hover:bg-purple-400 hover:bg-opacity-30'
// // // //                 }`}
// // // //                 onClick={() => handleNavigation(item.path)}
// // // //               >
// // // //                 <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-md ">
// // // //                   <img
// // // //                     src={item.icon}
// // // //                     alt={`${item.label} icon`}
// // // //                     className="h-5 w-5 object-cover"
// // // //                   />
// // // //                 </div>
// // // //                 <span className="flex-1">{item.label}</span>
// // // //                 {isActive(item) && (
// // // //                   <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-yellow-400 rounded-l-lg"></div>
// // // //                 )}
// // // //               </button>
// // // //             </li>
// // // //           ))}
// // // //         </ul>
// // // //       </nav>

// // // //       {/* Footer with User Info and Logout */}
// // // //       <div className="p-5 border-t border-purple-400">
// // // //         <div className="flex items-center gap-3 mb-4">
// // // //           <div className="w-10 h-10 bg-linear-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center overflow-hidden shadow-lg">
// // // //             <img
// // // //               src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhISEw0QExETFxASEBYSEBAPFhAOGRIXGBUTFxUZHTQgGBoxGxUTITEhJykrLi4uFx8zODMsNygtLi0BCgoKDg0OGhAQGi0fICUyKys3LystKy0tLTQvNy0tKy0tLS0rLy8tLSs2Ny0tLS0tLSsrLSstLS0tLSs3Ky0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQcCBAYDAQj/xAA8EAACAQICBwYEAwcEAwAAAAAAAQIDEQQhBRIxQVFhcQYTIoGRoQexwdEyUvBTYoKSosLhI0JyshQWc//EABkBAQEAAwEAAAAAAAAAAAAAAAABAgQFA//EACARAQEAAgIDAQADAAAAAAAAAAABAhEDBBIhQTEiYXH/2gAMAwEAAhEDEQA/ALxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwxmMp0oudSpGEFvk1FX4c3yPDTWlIYajKtPYsopbZzeyK/XF7indMaWq4qo6lWV9urFfhpx4RX12ssm0td9pH4hUIZUaU6z4v8A0o+rWt7EHW+ImJb8NHDxX7yqTfqpL5HHgz8Ym3Z4f4i10/Hh6El+73lN+rb+R0/ZztlQxcu7tKlXz8E7eO23UkspdMnyKlNavJxlGUZOMlZpxbi4yWxprYxcYbfocFNYDtTi6UtZYmpNb41ZOrGS4Z5ryaLP7N6dhi6WvFas45VIN3cJfVPc/szCzS7SwAIoAAAAAAAAAAAAAAAAAAAAAAAAD5KSSu3ZEfXx+6OXN/RAVx8VNLOeJjQjLw0IpytvrTV8+kdX+ZnHQxT3q/sbPaKu54rESbu3VqLyjJxXskR56z8YVuLEx5+g/wDJjz9CPdZbs3yzMZ1LbXbks2yjdqYu2xev2PlKjKeu0m9SLnN8Imto7Czr1FGEclm/yx5yZZOidCwpUZQau6iam3lrXVvJcjX5uecfr69+HgvJ7+OIoyul+szoexGku4xdO78FVqjPrJ2g/wCbV8mzmKkXQqypTyaeT/NHdJfr5HrUxGpqyTzTjKPWLTv7HtuWbjxssuq/QQIyhj2vxZr3X3JGnUUldO6PNkyAAAAAAAAAAAAAAAAAAAAADCrUUVd7PmZSds3sREYqu5vktiA+YjEObz2blwPIAoozTqksXiI3lfv66Su99WVl7o3v/V6/7PXf/ONvmSundFtaUpz1f9OvUjUg/wB6KTmnzur9Gju0jw5uxcdeLZ4OtMpfPat6XZTFSytTprrKT9lYlMB2GinerOU3wv3cX1s3L3R2gNbLs8l+6bWPW48fm/8AWngtHQpJKMYpLYklFJ8bceZuAHg90J2l0HDEQzyks4ySzi+PNcUVniqdSE5UpN66erbbm9luWa9S5zhsboZ1dKRUV4IdxXqt/s4ySt1erZG31eXVst9NPtcXlJlJ7WalbLhkelGs4u6fXmecZXz4n03GimaFZTV15rgz1ISjVcXdefNcCZp1FJJrYyDIAAAAAAAAAAAAAAAAAxnKybe7MDS0lW/2rrL6I0D7OV229rzPhQMZ7H0ZkCUjh+7csRSTb8NaUvPu6iv6M6Mwxej0qneJO98uHB352Zmcqy4+q7MymX8p9AARQAACA0tBqvKSbvKnSTtvcZVLf9ifPNYBTqKbTurLkrNu/XMSW+obmPu/Ephl4I322Vz1PiR9OtjNSRxsru2ht6PrWeq9j2cpGoCongeeHqa0U/XrvPQgAAAAAAAAAAAAABqaSnaNuL9v1Y2yN0pLxJcFf1f+ANMAFAAAfGiNnGza4Ema2LpXzW1beaNfscfljufGz1uTxy1frTABoOiAAD6kSVONklwNbCUv9z8vubZu9bj1PK/XP7XJu+M+AANpqgAA39Fz/FHzX1+hvkTo+Vprmmvr9CWIAAAAAAAAAAAAAARWkH430RKkVpBeN9EBrAAoAAAAAIjS2JjSlC8XaSk21uaa3eZ8pVoyV4yT6fY9dLYeNRpSWxZNZNXIStomSzjJPr4X9jl83rO6dfg1eObvtL1KiirtpLm7GGjsXGpU1Em0ouV9l2mla3mQFXDTW2Eutm/c3Oz07V4ripL2v9DHju85tny4647ZfjrQAdZxQAAAAB64R+OPUmSGwi8cepMkAAAAAAAAAAAAAAI3ScfEnxVvR/5JI1NJQvG/B+36sBGAGM5pJttJLa20kvMoyBDYvtRhqeXeub4U4uf9X4fch8V22/Z4fo6kv7Y/cuqm3YnPdo+1NPDXhG1Sv+W/hp85tbOm3ptOUx/aTE1E71nGO9U13a9Vn7nMyzvzv6lmKbXBVndt/qxgYUJXhCX5oQmualFNP0ZmcfLe7t2sdamgyjKzT4GJlTg20ks20l1JP6W/ntpaO7VUp1qlCpanONScKbb8NRKTSzf4Zct+7gdAUnjp61SpLbrTqPreTZNaM07iKcY6leWqreGVpx6JS2eVjs+Ppxd+1pA4vCdtpLKrQi+dOTj/AEu/zJvB9p8NUy73u3wqLU/q/D7k1TaZB8hJNJppp7GndPzPpFbGj43muSb+n1JY0NFw/FLyX1+hvkAAAAAAAAAAAAAAMZxumnseRkAIKpHVbT3bfuVfp3SssRUlLWfdptU43yUVsduL235lnds7xwtapG99RxduEnq63lcqAzxY0ABmjxxMrR65GmSE4J7UeKwy3+i+4Fs9lqMcRgMM00qkKfd/wwk4JPl4T7Xwc4bYPqldeqNb4cpSw6jmtSVRKzs09ZS/vOrdKotlVPql9jU5eDHK7/G1xdjLCa/Y5ulh5yyjCT8n8yQdGOGpVK05LXjCcklnq2i365El3FR7aqXQge20FTwtXNvWjqu+/WlGP9zJx9fHG7/V5OxllNfimIrJG3hJZNcD7LDLdl7o9Y00tiNxqMgABt6O0lVoSUqc2s7uN/DPk1s89paOHqqcYzjmpqMo801dfMqMtH4eXnhoyknanKcI3/3JO6fRXt5GGSx1OHp6sUvXrvPQAwZAAAAAAAAAAAAAAAAMakFJOMknFpqSaunF5NNcCou1/Z14SreKboTb7qW3Ve+m3xW7iujLfNfH4KFanKnUgpQkrNP2ae58yy6SxRIJ3tP2YqYSV850G/BO2zhGfB89j9lBHoxYSqWaXH5mZ5YiF1zWaM4SukyjvPhjiM6sP3oS/mi1/YixCpuwOI1cRJfmg3/FGUWvbWLYTPPL9ZR9OJ+JuItRjD814J9EpSfyidsVn8ScRepSj/8ASXvGK/6smP6Vxpg5+K3K/QybPKgr3lx+R6sXsASmgNA1cXPVpq0FbvKjXhgvrLl8lmQOzuhJ4uqqcbqKs6s90Ifd7EvomXHgsLClCNOEdWEEoxXL6vma+htE08LTVKnHLbJv8U575SfE3zzt2ykAARQAAAAAAAAAAAAAAAAAAY1aaknGUVKLTUlJJpremntOD7QdgL3nhWlvdKby/gk9nR+qO+BZdCh8XhKlKThUpyhNbpJp24riuaNSlk3HzXQvzGYKnVjq1KUJx4TipZ8VfYzlNJfDvDzetSqVKMtyv3sPSXi/qMpkx04jstV1cVRfFuP80Wl7tFxYKd4R5ZehXsewWJpVIThVozUJwltlTllJPZZrdxLAwNKUU01vus0yZLHtWnaLfBP1Kj7b1b4m35IQj5u8v7kWxjIOUbJXu1fYsjg9KdicTXxFSpr0YQk1a8pSlqqKWxK27iMSq+xD2RW1/I2MPQlJqEISlJ5RjFOTfRIsTR/w3oxetWr1Kj4RSpR6b37o63R2jKNBatKjCC36qzfWW1+ZbkmnB6A7AzlaeJepHb3cWnOX/KSyiul30LBwmFhSgoU4RhCOSUVZL/PM9gY27ZAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9k="  
// // // //               alt="Admin Profile"
// // // //               className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-md"
// // // //             />
// // // //           </div>
// // // //           <div>
// // // //             <div className="font-semibold text-sm">Administrator</div>
// // // //             <div className="text-purple-200 text-xs">Super Admin</div>
// // // //           </div>
// // // //         </div>
// // // //         <button 
// // // //           className="w-full bg-linear-to-r from-red-400 to-pink-500 border border-white text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:from-red-500 hover:to-pink-600 transition-all duration-200 shadow-md"
// // // //           onClick={handleLogout}
// // // //         >
// // // //           <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center overflow-hidden">
// // // //             <img
// // // //               src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23E74C3C'%3E%3Cpath d='M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z'/%3E%3C/svg%3E"
// // // //               alt="Logout"
// // // //               className="h-3 w-3 object-cover"
// // // //             />
// // // //           </div>
// // // //           Logout
// // // //         </button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default AdminSidebar;\


// // // // src/components/admin/AdminSidebar.jsx
// // // import React, { useContext } from "react";
// // // import { useNavigate, useLocation } from "react-router-dom";
// // // import { AuthContext } from "../../App";

// // // const AdminSidebar = ({ activePage }) => {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();
// // //   const { logout } = useContext(AuthContext || {});

// // //   const menuItems = [
// // //     {
// // //       id: "dashboard",
// // //       label: "Dashboard",
// // //       icon:
// // //         "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FF6B6B'%3E%3Cpath d='M3 13h1v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h1c.6 0 1-.4 1-1s-.4-1-1-1h-1V4c0-1.1-.9-2-2-2H6C4.9 2 4 2.9 4 4v7H3c-.6 0-1 .4-1 1s.4 1 1 1zm4-9h10v5H7V4zm2 7h6v2H9v-2zm-2 5h10v5H7v-5zm2 2h6v1H9v-1z'/%3E%3C/svg%3E",
// // //       path: "/admin/dashboard",
// // //     },
// // //     {
// // //       id: "faq-generator",
// // //       label: "FAQ Generator",
// // //       icon:
// // //         "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234A90E2'%3E%3Cpath d='M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1 .45-1.8 1.17-2.5l1.24-1.26A1.5 1.5 0 0011.5 7c-.83 0-1.5.67-1.5 1.5H8A3.5 3.5 0 0111.5 5 3.5 3.5 0 0116 8.5c0 .93-.36 1.77-.93 2.38z'/%3E%3C/svg%3E",
// // //       path: "/admin/faq-generator",
// // //     },
// // //     {
// // //       id: "staff",
// // //       label: "Staff Management",
// // //       icon:
// // //         "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234ECDC4'%3E%3Cpath d='M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z'/%3E%3C/svg%3E",
// // //       path: "/admin/staff",
// // //     },
// // //     {
// // //       id: "files",
// // //       label: "File Management",
// // //       icon:
// // //         "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23003F7A'%3E%3Cpath d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'/%3E%3C/svg%3E",
// // //       path: "/admin/files",
// // //     },
// // //     {
// // //       id: "analytics",
// // //       label: "Analytics",
// // //       icon:
// // //         "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FFA500'%3E%3Cpath d='M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0 4h2v-2H3v2zm12-8h2v-2h-2v2zm0 4h2v-2h-2v2zm0 4h2v-2h-2v2zm-8 0h2v-2H7v2zm0-4h2v-2H7v2zm0-4h2v-2H7v2zm8 8h2v-2h-2v2zm4-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z'/%3E%3C/svg%3E",
// // //       path: "/admin/analytics",
// // //     },
// // //     {
// // //       id: "knowledge-base",
// // //       label: "Knowledge Base",
// // //       icon:
// // //         "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239B59B6'%3E%3Cpath d='M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z'/%3E%3C/svg%3E",
// // //       path: "/admin/knowledge-base",
// // //     },
// // //     {
// // //       id: "settings",
// // //       label: "Settings",
// // //       icon:
// // //         "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23E74C3C'%3E%3Cpath d='M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z'/%3E%3C/svg%3E",
// // //       path: "/admin/settings",
// // //     },
// // //   ];

// // //   const handleNavigation = (path) => {
// // //     navigate(path);
// // //   };

// // //   const handleLogout = () => {
// // //     console.log("Logout clicked from sidebar");
// // //     if (typeof logout === "function") logout();
// // //   };

// // //   const isActive = (item) => {
// // //     if (activePage) return item.id === activePage;
// // //     // treat nested routes as active for parent (e.g. /admin/faq-generator/edit)
// // //     return location.pathname === item.path || location.pathname.startsWith(item.path + "/");
// // //   };

// // //   return (
// // //     <div className="w-64 bg-gradient-to-br from-purple-700 to-purple-600 text-white fixed h-screen left-0 top-0 flex flex-col z-50">
// // //       {/* Header */}
// // //       <div className="p-5 border-b border-purple-400">
// // //         <div className="flex items-center gap-3">
// // //           <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-lg">
// // //             <img
// // //               src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%237B61FF'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'/%3E%3C/svg%3E"
// // //               alt="RAJ-Sahayak Logo"
// // //               className="h-6 w-6 object-cover"
// // //             />
// // //           </div>
// // //           <div>
// // //             <h2 className="text-lg font-bold">RAJ-Sahayak</h2>
// // //             <p className="text-purple-200 text-sm">Admin Panel</p>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Navigation Menu */}
// // //       <nav className="flex-1 p-4">
// // //         <ul className="space-y-1">
// // //           {menuItems.map((item) => (
// // //             <li key={item.id}>
// // //               <button
// // //                 type="button"
// // //                 onClick={() => handleNavigation(item.path)}
// // //                 className={`w-full text-left py-3 px-4 rounded-lg flex items-center gap-3 transition-all duration-200 relative ${
// // //                   isActive(item)
// // //                     ? "bg-white bg-opacity-20 text-purple-800 shadow-lg"
// // //                     : "text-purple-100 hover:bg-purple-400 hover:bg-opacity-30"
// // //                 }`}
// // //               >
// // //                 <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-md">
// // //                   {/* icons are data-URI svgs */}
// // //                   <img src={item.icon} alt={`${item.label} icon`} className="h-5 w-5 object-cover" />
// // //                 </div>
// // //                 <span className="flex-1">{item.label}</span>
// // //                 {isActive(item) && <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-yellow-400 rounded-l-lg" />}
// // //               </button>
// // //             </li>
// // //           ))}
// // //         </ul>
// // //       </nav>

// // //       {/* Footer with User Info and Logout */}
// // //       <div className="p-5 border-t border-purple-400">
// // //         <div className="flex items-center gap-3 mb-4">
// // //           <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center overflow-hidden shadow-lg">
// // //             <img
// // //               src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/..." // keep your full base64 if you want
// // //               alt="Admin Profile"
// // //               className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-md"
// // //             />
// // //           </div>
// // //           <div>
// // //             <div className="font-semibold text-sm">Administrator</div>
// // //             <div className="text-purple-200 text-xs">Super Admin</div>
// // //           </div>
// // //         </div>

// // //         <button
// // //           onClick={handleLogout}
// // //           className="w-full bg-gradient-to-r from-red-400 to-pink-500 border border-white text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:from-red-500 hover:to-pink-600 transition-all duration-200 shadow-md"
// // //         >
// // //           <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center overflow-hidden">
// // //             <img
// // //               src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23E74C3C'%3E%3Cpath d='M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z'/%3E%3C/svg%3E"
// // //               alt="Logout"
// // //               className="h-3 w-3 object-cover"
// // //             />
// // //           </div>
// // //           Logout
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default AdminSidebar;


// // import React, { useContext } from 'react';
// // import { useNavigate, useLocation } from 'react-router-dom';
// // import { AuthContext } from '../../App'; // Import AuthContext

// // const AdminSidebar = ({ activePage }) => { // Remove onLogout from props
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const { logout } = useContext(AuthContext); // Use logout from context

// //   const menuItems = [
// //     {
// //       id: 'dashboard',
// //       label: 'Dashboard',
// //       icon: 'fas fa-tachometer-alt',
// //       path: '/admin/dashboard'
// //     },
// //     // In AdminSidebar.jsx, add to the menuItems array:
// // {
// //   id: 'faq-generator',
// //   label: 'FAQ Generator',
// //   icon: 'fas fa-question-circle',
// //   path: '/admin/faq-generator'
// // },
    
// //     {
// //       id: 'staff',
// //       label: 'Staff Management',
// //       icon: 'fas fa-user-tie',
// //       path: '/admin/staff'
// //     },
 
// //     {
// //       id: 'analytics',
// //       label: 'Analytics',
// //       icon: 'fas fa-chart-bar',
// //       path: '/admin/analytics'
// //     },
    
// //     {
// //       id: 'settings',
// //       label: 'Settings',
// //       icon: 'fas fa-cog',
// //       path: '/admin/settings'
// //     }
// //   ];

// //   const handleNavigation = (path) => {
// //     navigate(path);
// //   };

// //   const handleLogout = () => {
// //     console.log('Logout clicked from sidebar');
// //     logout(); // Use logout from context
// //   };

// //   const isActive = (item) => {
// //     if (activePage) {
// //       return item.id === activePage;
// //     }
// //     return location.pathname === item.path;
// //   };

// //   return (
// //     <div className="w-64 bg-linear-to-br from-purple-600 to-purple-800 text-white fixed h-screen left-0 top-0 flex flex-col z-50">
// //       <div className="p-5 border-b border-purple-400">
// //         <div className="flex items-center gap-3">
// //           <div className="w-10 h-10 bg-purple-400 rounded-lg flex items-center justify-center font-bold text-lg">
// //             RS
// //           </div>
// //           <div>
// //             <h2 className="text-lg font-bold">RAJ-Sahayak</h2>
// //             <p className="text-purple-200 text-sm">Admin Panel</p>
// //           </div>
// //         </div>
// //       </div>

// //       <nav className="flex-1 p-4">
// //         <ul className="space-y-1">
// //           {menuItems.map(item => (
// //             <li key={item.id}>
// //               <button
// //                 className={`w-full text-left py-3 px-4 rounded-lg flex items-center gap-3 transition-all duration-200 relative ${
// //                   isActive(item) 
// //                     ? 'bg-purple-400 text-white shadow-lg' 
// //                     : 'text-purple-100 hover:bg-purple-400 hover:bg-opacity-30'
// //                 }`}
// //                 onClick={() => handleNavigation(item.path)}
// //               >
// //                 <i className={${item.icon} w-5 text-center}></i>
// //                 <span className="flex-1">{item.label}</span>
// //                 {isActive(item) && (
// //                   <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-lg"></div>
// //                 )}
// //               </button>
// //             </li>
// //           ))}
// //         </ul>
// //       </nav>

// //       <div className="p-5 border-t border-purple-400">
// //         <div className="flex items-center gap-3 mb-4">
// //           <div className="w-10 h-10 bg-purple-400 rounded-full flex items-center justify-center">
            
// //             <i className="fas fa-user-shield text-sm"></i>
// //           </div>
// //           <div>
// //             <div className="font-semibold text-sm">Administrator</div>
// //             <div className="text-purple-200 text-xs">Super Admin</div>
// //           </div>
// //         </div>
// //         <button 
// //           className="w-full bg-purple-400 bg-opacity-30 border border-purple-300 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-400 transition-all duration-200"
// //           onClick={handleLogout}
// //         >
// //           <i className="fas fa-sign-out-alt"></i>
// //           Logout
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminSidebar;


// import React, { useContext } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { AuthContext } from '../../App'; // Import AuthContext

// const AdminSidebar = ({ activePage }) => { // Remove onLogout from props
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { logout } = useContext(AuthContext); // Use logout from context

//   const menuItems = [
//     {
//       id: 'dashboard',
//       label: 'Dashboard',
//       icon: 'fas fa-tachometer-alt',
//       path: '/admin/dashboard'
//     },
//     {
//       id: 'faq-generator',
//       label: 'FAQ Generator',
//       icon: 'fas fa-question-circle',
//       path: '/admin/faq-generator'
//     },
//     {
//       id: 'staff',
//       label: 'Staff Management',
//       icon: 'fas fa-user-tie',
//       path: '/admin/staff'
//     },
//     {
//       id: 'analytics',
//       label: 'Analytics',
//       icon: 'fas fa-chart-bar',
//       path: '/admin/analytics'
//     },
//     {
//       id: 'settings',
//       label: 'Settings',
//       icon: 'fas fa-cog',
//       path: '/admin/settings'
//     }
//   ];

//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   const handleLogout = () => {
//     console.log('Logout clicked from sidebar');
//     if (logout) {
//       logout(); // Use logout from context
//     } else {
//       console.error('Logout function is not available in AuthContext');
//       // Fallback: redirect to login
//       navigate('/login');
//     }
//   };

//   const isActive = (item) => {
//     if (activePage) {
//       return item.id === activePage;
//     }
//     return location.pathname === item.path || location.pathname.startsWith(item.path + '/');
//   };

//   return (
//     <div className="w-64 bg-gradient-to-br from-purple-600 to-purple-800 text-white fixed h-screen left-0 top-0 flex flex-col z-50">
//       <div className="p-5 border-b border-purple-400">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-purple-400 rounded-lg flex items-center justify-center font-bold text-lg">
//             RS
//           </div>
//           <div>
//             <h2 className="text-lg font-bold">RAJ-Sahayak</h2>
//             <p className="text-purple-200 text-sm">Admin Panel</p>
//           </div>
//         </div>
//       </div>

//       <nav className="flex-1 p-4 overflow-y-auto">
//         <ul className="space-y-1">
//           {menuItems.map(item => (
//             <li key={item.id}>
//               <button
//                 className={`w-full text-left py-3 px-4 rounded-lg flex items-center gap-3 transition-all duration-200 relative ${
//                   isActive(item) 
//                     ? 'bg-purple-400 text-white shadow-lg' 
//                     : 'text-purple-100 hover:bg-purple-400 hover:bg-opacity-30'
//                 }`}
//                 onClick={() => handleNavigation(item.path)}
//               >
//                 <i className={`${item.icon} w-5 text-center`}></i>
//                 <span className="flex-1">{item.label}</span>
//                 {isActive(item) && (
//                   <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-lg"></div>
//                 )}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       <div className="p-5 border-t border-purple-400">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="w-10 h-10 bg-purple-400 rounded-full flex items-center justify-center">
//             <i className="fas fa-user-shield text-sm"></i>
//           </div>
//           <div>
//             <div className="font-semibold text-sm">Administrator</div>
//             <div className="text-purple-200 text-xs">Super Admin</div>
//           </div>
//         </div>
//         <button 
//           className="w-full bg-purple-400 bg-opacity-30 border border-purple-300 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-400 transition-all duration-200"
//           onClick={handleLogout}
//         >
//           <i className="fas fa-sign-out-alt"></i>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;














import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../App';
import { 
  FaTachometerAlt, 
  FaQuestionCircle, 
  FaUserTie, 
  FaChartBar, 
  FaCog,
  FaUserShield,
  FaSignOutAlt,
  FaHome
} from 'react-icons/fa';

const AdminSidebar = ({ activePage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <FaTachometerAlt className="w-5 h-5" />,
      path: '/admin/dashboard'
    },
    {
      id: 'faq-generator',
      label: 'FAQ Generator',
      icon: <FaQuestionCircle className="w-5 h-5" />,
      path: '/admin/faq-generator'
    },
    {
      id: 'staff',
      label: 'Staff Management',
      icon: <FaUserTie className="w-5 h-5" />,
      path: '/admin/staff'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <FaChartBar className="w-5 h-5" />,
      path: '/admin/analytics'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <FaCog className="w-5 h-5" />,
      path: '/admin/settings'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    console.log('Logout clicked from sidebar');
    if (logout) {
      logout();
    } else {
      console.error('Logout function is not available in AuthContext');
      navigate('/login');
    }
  };

  const isActive = (item) => {
    if (activePage) {
      return item.id === activePage;
    }
    return location.pathname === item.path || location.pathname.startsWith(item.path + '/');
  };

  return (
    <div className="w-64 bg-gradient-to-br from-purple-600 to-purple-800 text-white fixed h-screen left-0 top-0 flex flex-col z-50">
      <div className="p-5 border-b border-purple-400">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-400 rounded-lg flex items-center justify-center font-bold text-lg">
            <FaHome className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold">RAJ-Sahayak</h2>
            <p className="text-purple-200 text-sm">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map(item => (
            <li key={item.id}>
              <button
                className={`w-full text-left py-3 px-4 rounded-lg flex items-center gap-3 transition-all duration-200 relative ${
                  isActive(item) 
                    ? 'bg-purple-400 text-white shadow-lg' 
                    : 'text-purple-100 hover:bg-purple-400 hover:bg-opacity-30'
                }`}
                onClick={() => handleNavigation(item.path)}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="flex-1">{item.label}</span>
                {isActive(item) && (
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-lg"></div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-5 border-t border-purple-400">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-purple-400 rounded-full flex items-center justify-center">
            <FaUserShield className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-sm">Administrator</div>
            <div className="text-purple-200 text-xs">Super Admin</div>
          </div>
        </div>
        <button 
          className="w-full bg-purple-400 bg-opacity-30 border border-purple-300 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-400 transition-all duration-200"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;