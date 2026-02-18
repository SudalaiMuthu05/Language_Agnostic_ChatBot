// // // // // // // // // // // // import React, { useState, useContext, useEffect } from 'react';
// // // // // // // // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // // // // // // // import axios from "axios";
// // // // // // // // // // // // import AdminSidebar from '../../components/admin/AdminSidebar';
// // // // // // // // // // // // import { AuthContext } from '../../App';

// // // // // // // // // // // // import {
// // // // // // // // // // // //   FaUsers,
// // // // // // // // // // // //   FaComments,
// // // // // // // // // // // //   FaFileAlt,
// // // // // // // // // // // //   FaFilePdf,
// // // // // // // // // // // //   FaUserCog,
// // // // // // // // // // // //   FaChartBar,
// // // // // // // // // // // //   FaBullhorn,
// // // // // // // // // // // //   FaUserShield,
// // // // // // // // // // // //   FaUserPlus,
// // // // // // // // // // // //   FaCheckCircle,
// // // // // // // // // // // //   FaCloudUploadAlt,
// // // // // // // // // // // //   FaTimes,
// // // // // // // // // // // //   FaUserTie,
// // // // // // // // // // // //   FaBook
// // // // // // // // // // // // } from 'react-icons/fa';

// // // // // // // // // // // // const AdminDashboard = () => {
// // // // // // // // // // // //   const { logout } = useContext(AuthContext);
// // // // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // // // //   const [showUploadModal, setShowUploadModal] = useState(false);
// // // // // // // // // // // //   const [uploadType, setUploadType] = useState('');

// // // // // // // // // // // //   // 🔥 NEW: MongoDB Stats State
// // // // // // // // // // // //   const [dashboardStats, setDashboardStats] = useState({
// // // // // // // // // // // //     totalUsers: 0,
// // // // // // // // // // // //     totalQueries: 0
// // // // // // // // // // // //   });

// // // // // // // // // // // //   // 🔥 NEW: Fetch stats from backend
// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     const fetchStats = async () => {
// // // // // // // // // // // //       try {
// // // // // // // // // // // //         const response = await axios.get("http://localhost:5000/api/dashboard/stats");
// // // // // // // // // // // //         setDashboardStats(response.data);
// // // // // // // // // // // //       } catch (err) {
// // // // // // // // // // // //         console.error("Error fetching stats:", err);
// // // // // // // // // // // //       }
// // // // // // // // // // // //     };

// // // // // // // // // // // //     fetchStats();
// // // // // // // // // // // //   }, []);

// // // // // // // // // // // //   // 🔥 Stats Grid – now uses backend data
// // // // // // // // // // // //   const stats = [
// // // // // // // // // // // //     {
// // // // // // // // // // // //       title: 'Total Students',
// // // // // // // // // // // //       value: dashboardStats.totalUsers,  // <-- dynamic
// // // // // // // // // // // //       icon: FaUsers,
// // // // // // // // // // // //       color: 'bg-blue-500',
// // // // // // // // // // // //       change: '+12%',
// // // // // // // // // // // //       trend: 'up'
// // // // // // // // // // // //     },
// // // // // // // // // // // //     {
// // // // // // // // // // // //       title: 'Total Queries',
// // // // // // // // // // // //       value: dashboardStats.totalQueries,  // <-- dynamic
// // // // // // // // // // // //       icon: FaComments,
// // // // // // // // // // // //       color: 'bg-red-500',
// // // // // // // // // // // //       change: '+8%',
// // // // // // // // // // // //       trend: 'up'
// // // // // // // // // // // //     },
// // // // // // // // // // // //     {
// // // // // // // // // // // //       title: 'Pending Chats',
// // // // // // // // // // // //       value: '23',
// // // // // // // // // // // //       icon: FaComments,
// // // // // // // // // // // //       color: 'bg-yellow-500',
// // // // // // // // // // // //       change: '-8%',
// // // // // // // // // // // //       trend: 'down'
// // // // // // // // // // // //     },
// // // // // // // // // // // //     {
// // // // // // // // // // // //       title: 'Documents',
// // // // // // // // // // // //       value: '156',
// // // // // // // // // // // //       icon: FaFileAlt,
// // // // // // // // // // // //       color: 'bg-green-500',
// // // // // // // // // // // //       change: '+15%',
// // // // // // // // // // // //       trend: 'up'
// // // // // // // // // // // //     }
// // // // // // // // // // // //   ];

// // // // // // // // // // // //   const quickActions = [
// // // // // // // // // // // //     {
// // // // // // // // // // // //       title: 'Knowledge Base',
// // // // // // // // // // // //       description: 'Manage knowledge base content',
// // // // // // // // // // // //       icon: FaBook,
// // // // // // // // // // // //       color: 'bg-blue-100 text-blue-600',
// // // // // // // // // // // //       action: () => navigate('/admin/knowledge-base')
// // // // // // // // // // // //     },
// // // // // // // // // // // //     {
// // // // // // // // // // // //       title: 'File Management',
// // // // // // // // // // // //       description: 'Upload and manage PDF files',
// // // // // // // // // // // //       icon: FaFilePdf,
// // // // // // // // // // // //       color: 'bg-red-100 text-red-600',
// // // // // // // // // // // //       action: () => navigate('/admin/faq-generator')
// // // // // // // // // // // //     },
// // // // // // // // // // // //     {
// // // // // // // // // // // //       title: 'Manage Staff',
// // // // // // // // // // // //       description: 'Add or remove staff members',
// // // // // // // // // // // //       icon: FaUserCog,
// // // // // // // // // // // //       color: 'bg-yellow-100 text-yellow-600',
// // // // // // // // // // // //       action: () => navigate('/admin/staff')
// // // // // // // // // // // //     },
// // // // // // // // // // // //     {
// // // // // // // // // // // //       title: 'View Analytics',
// // // // // // // // // // // //       description: 'Check system performance',
// // // // // // // // // // // //       icon: FaChartBar,
// // // // // // // // // // // //       color: 'bg-green-100 text-green-600',
// // // // // // // // // // // //       action: () => navigate('/admin/analytics')
// // // // // // // // // // // //     }
// // // // // // // // // // // //   ];

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div className="flex min-h-screen bg-gray-50">
// // // // // // // // // // // //       <AdminSidebar activePage="dashboard" />

// // // // // // // // // // // //       <div className="flex-1 flex flex-col ml-64">

// // // // // // // // // // // //         {/* Top bar */}
// // // // // // // // // // // //         <div className="bg-white shadow-sm border-b border-gray-200">
// // // // // // // // // // // //           <div className="flex items-center justify-between px-6 py-4">
// // // // // // // // // // // //             <div>
// // // // // // // // // // // //               <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
// // // // // // // // // // // //               <p className="text-gray-600">Welcome back, Administrator</p>
// // // // // // // // // // // //             </div>

// // // // // // // // // // // //             <div className="flex items-center space-x-4">
// // // // // // // // // // // //               <div className="flex items-center space-x-3">
// // // // // // // // // // // //                 <div className="w-10 h-10 bg-purple-100 rounded-full"></div>
// // // // // // // // // // // //                 <div className="text-right">
// // // // // // // // // // // //                   <p className="text-sm font-medium text-gray-900">Admin User</p>
// // // // // // // // // // // //                   <p className="text-xs text-gray-500">Super Admin</p>
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //               </div>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         </div>

// // // // // // // // // // // //         {/* Main Content */}
// // // // // // // // // // // //         <div className="flex-1 p-6">

// // // // // // // // // // // //           {/* Stats Grid - UPDATED */}
// // // // // // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // // // // // // // // // // //             {stats.map((stat, index) => {
// // // // // // // // // // // //               const Icon = stat.icon;
// // // // // // // // // // // //               return (
// // // // // // // // // // // //                 <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md">
// // // // // // // // // // // //                   <div className="flex items-center justify-between">
// // // // // // // // // // // //                     <div>
// // // // // // // // // // // //                       <p className="text-sm font-medium text-gray-600">{stat.title}</p>
// // // // // // // // // // // //                       <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
// // // // // // // // // // // //                       <p className={`text-sm mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
// // // // // // // // // // // //                         {stat.change} from last month
// // // // // // // // // // // //                       </p>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                     <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
// // // // // // // // // // // //                       <Icon className="text-white text-lg" />
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                   </div>
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //               );
// // // // // // // // // // // //             })}
// // // // // // // // // // // //           </div>

// // // // // // // // // // // //           {/* Quick Actions */}
// // // // // // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // // // // // // // // // // //             {quickActions.map((action, index) => {
// // // // // // // // // // // //               const Icon = action.icon;
// // // // // // // // // // // //               return (
// // // // // // // // // // // //                 <div key={index} className="bg-white rounded-xl shadow-sm p-6 border group cursor-pointer"
// // // // // // // // // // // //                   onClick={action.action}
// // // // // // // // // // // //                 >
// // // // // // // // // // // //                   <div className="flex items-center gap-4">
// // // // // // // // // // // //                     <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
// // // // // // // // // // // //                       <Icon className="text-lg" />
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                     <div>
// // // // // // // // // // // //                       <h3 className="font-semibold text-gray-600 group-hover:text-black">
// // // // // // // // // // // //                         {action.title}
// // // // // // // // // // // //                       </h3>
// // // // // // // // // // // //                       <p className="text-sm text-gray-600 mt-1">{action.description}</p>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                   </div>
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //               );
// // // // // // // // // // // //             })}
// // // // // // // // // // // //           </div>

// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // };

// // // // // // // // // // // // export default AdminDashboard;








// // // // // // // // // // // // // ^ dynamic values







// // // // // // // // // // // // // ? testing working... 

// // // // // // // // // // // // // import { useEffect, useState } from "react";
// // // // // // // // // // // // // import axios from "axios";

// // // // // // // // // // // // // export default function AdminDashboard() {
// // // // // // // // // // // // //   const [stats, setStats] = useState({
// // // // // // // // // // // // //     totalUsers: 0,
// // // // // // // // // // // // //     totalQueries: 0,
// // // // // // // // // // // // //   });

// // // // // // // // // // // //   // useEffect(() => {
// // // // // // // // // // // //   //   axios
// // // // // // // // // // // //   //     .get("http://localhost:5000/api/dashboard/stats")
// // // // // // // // // // // //   //     .then((response) => {
// // // // // // // // // // // //   //       console.log("API Response:", response.data);

// // // // // // // // // // // //   //       setStats({
// // // // // // // // // // // //   //         totalUsers: response.data.totalUsers,
// // // // // // // // // // // //   //         totalQueries: response.data.totalQueries,
// // // // // // // // // // // //   //       });
// // // // // // // // // // // //   //     })
// // // // // // // // // // // //   //     .catch((error) => {
// // // // // // // // // // // //   //       console.error("Error fetching stats:", error);
// // // // // // // // // // // //   //     });
// // // // // // // // // // // //   // }, []);


// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //   const fetchStats = async () => {
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const response = await axios.get("http://localhost:5000/api/dashboard/stats");
// // // // // // // // // // // // //       setStats(response.data);
// // // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // // //       console.error("Error fetching stats:", err);
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   fetchStats();
// // // // // // // // // // // // // }, []);


// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <div>
// // // // // // // // // // // // //       <h2>Dashboard</h2>
// // // // // // // // // // // // //       <p>Total Users: {stats.totalUsers}</p>
// // // // // // // // // // // // //       <p>Total Queries: {stats.totalQueries}</p>
// // // // // // // // // // // // //     </div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // }

// // // // // // // // // // // import React, { useState, useContext, useEffect } from 'react';
// // // // // // // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // // // // // // import axios from "axios";
// // // // // // // // // // // import AdminSidebar from '../../components/admin/AdminSidebar';
// // // // // // // // // // // import { AuthContext } from '../../App';

// // // // // // // // // // // import {
// // // // // // // // // // //   FaUsers,
// // // // // // // // // // //   FaComments,
// // // // // // // // // // //   FaFilePdf,
// // // // // // // // // // //   FaUserCog,
// // // // // // // // // // //   FaChartBar,
// // // // // // // // // // //   FaBook
// // // // // // // // // // // } from 'react-icons/fa';

// // // // // // // // // // // const AdminDashboard = () => {
// // // // // // // // // // //   const { logout } = useContext(AuthContext);
// // // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // // //   const [showUploadModal, setShowUploadModal] = useState(false);
// // // // // // // // // // //   const [uploadType, setUploadType] = useState('');

// // // // // // // // // // //   // MongoDB Stats State
// // // // // // // // // // //   const [dashboardStats, setDashboardStats] = useState({
// // // // // // // // // // //     totalUsers: 0,
// // // // // // // // // // //     totalQueries: 0
// // // // // // // // // // //   });

// // // // // // // // // // //   // Fetch stats from backend
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     const fetchStats = async () => {
// // // // // // // // // // //       try {
// // // // // // // // // // //         const response = await axios.get("http://localhost:5000/api/dashboard/stats");
// // // // // // // // // // //         setDashboardStats(response.data);
// // // // // // // // // // //       } catch (err) {
// // // // // // // // // // //         console.error("Error fetching stats:", err);
// // // // // // // // // // //       }
// // // // // // // // // // //     };

// // // // // // // // // // //     fetchStats();
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   // Stats Grid – removed Pending Chats and Documents
// // // // // // // // // // //   const stats = [
// // // // // // // // // // //     {
// // // // // // // // // // //       title: 'Total Students',
// // // // // // // // // // //       value: dashboardStats.totalUsers,
// // // // // // // // // // //       icon: FaUsers,
// // // // // // // // // // //       color: 'bg-blue-500',
// // // // // // // // // // //       change: '+12%',
// // // // // // // // // // //       trend: 'up'
// // // // // // // // // // //     },
// // // // // // // // // // //     {
// // // // // // // // // // //       title: 'Total Queries',
// // // // // // // // // // //       value: dashboardStats.totalQueries,
// // // // // // // // // // //       icon: FaComments,
// // // // // // // // // // //       color: 'bg-red-500',
// // // // // // // // // // //       change: '+8%',
// // // // // // // // // // //       trend: 'up'
// // // // // // // // // // //     }
// // // // // // // // // // //   ];

// // // // // // // // // // //   const quickActions = [
// // // // // // // // // // //     {
// // // // // // // // // // //       title: 'Knowledge Base',
// // // // // // // // // // //       description: 'Manage knowledge base content',
// // // // // // // // // // //       icon: FaBook,
// // // // // // // // // // //       color: 'bg-blue-100 text-blue-600',
// // // // // // // // // // //       action: () => navigate('/admin/knowledge-base')
// // // // // // // // // // //     },
// // // // // // // // // // //     {
// // // // // // // // // // //       title: 'File Management',
// // // // // // // // // // //       description: 'Upload and manage PDF files',
// // // // // // // // // // //       icon: FaFilePdf,
// // // // // // // // // // //       color: 'bg-red-100 text-red-600',
// // // // // // // // // // //       action: () => navigate('/admin/faq-generator')
// // // // // // // // // // //     },
// // // // // // // // // // //     {
// // // // // // // // // // //       title: 'Manage Staff',
// // // // // // // // // // //       description: 'Add or remove staff members',
// // // // // // // // // // //       icon: FaUserCog,
// // // // // // // // // // //       color: 'bg-yellow-100 text-yellow-600',
// // // // // // // // // // //       action: () => navigate('/admin/staff')
// // // // // // // // // // //     },
// // // // // // // // // // //     {
// // // // // // // // // // //       title: 'View Analytics',
// // // // // // // // // // //       description: 'Check system performance',
// // // // // // // // // // //       icon: FaChartBar,
// // // // // // // // // // //       color: 'bg-green-100 text-green-600',
// // // // // // // // // // //       action: () => navigate('/admin/analytics')
// // // // // // // // // // //     }
// // // // // // // // // // //   ];

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="flex min-h-screen bg-gray-50">
// // // // // // // // // // //       <AdminSidebar activePage="dashboard" />

// // // // // // // // // // //       <div className="flex-1 flex flex-col ml-64">

// // // // // // // // // // //         {/* Top bar */}
// // // // // // // // // // //         <div className="bg-white shadow-sm border-b border-gray-200">
// // // // // // // // // // //           <div className="flex items-center justify-between px-6 py-4">
// // // // // // // // // // //             <div>
// // // // // // // // // // //               <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
// // // // // // // // // // //               <p className="text-gray-600">Welcome back, Administrator</p>
// // // // // // // // // // //             </div>

// // // // // // // // // // //             <div className="flex items-center space-x-4">
// // // // // // // // // // //               <div className="flex items-center space-x-3">
// // // // // // // // // // //                 <div className="w-10 h-10 bg-purple-100 rounded-full"></div>
// // // // // // // // // // //                 <div className="text-right">
// // // // // // // // // // //                   <p className="text-sm font-medium text-gray-900">Admin User</p>
// // // // // // // // // // //                   <p className="text-xs text-gray-500">Super Admin</p>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //               </div>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>

// // // // // // // // // // //         {/* Main Content */}
// // // // // // // // // // //         <div className="flex-1 p-6">

// // // // // // // // // // //           {/* Stats Grid - UPDATED (only 2 cards now) */}
// // // // // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
// // // // // // // // // // //             {stats.map((stat, index) => {
// // // // // // // // // // //               const Icon = stat.icon;
// // // // // // // // // // //               return (
// // // // // // // // // // //                 <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md">
// // // // // // // // // // //                   <div className="flex items-center justify-between">
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                       <p className="text-sm font-medium text-gray-600">{stat.title}</p>
// // // // // // // // // // //                       <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
// // // // // // // // // // //                       <p className={`text-sm mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
// // // // // // // // // // //                         {stat.change} from last month
// // // // // // // // // // //                       </p>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
// // // // // // // // // // //                       <Icon className="text-white text-lg" />
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                   </div>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //               );
// // // // // // // // // // //             })}
// // // // // // // // // // //           </div>

// // // // // // // // // // //           {/* Quick Actions */}
// // // // // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // // // // // // // // // //             {quickActions.map((action, index) => {
// // // // // // // // // // //               const Icon = action.icon;
// // // // // // // // // // //               return (
// // // // // // // // // // //                 <div key={index} className="bg-white rounded-xl shadow-sm p-6 border group cursor-pointer"
// // // // // // // // // // //                   onClick={action.action}
// // // // // // // // // // //                 >
// // // // // // // // // // //                   <div className="flex items-center gap-4">
// // // // // // // // // // //                     <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
// // // // // // // // // // //                       <Icon className="text-lg" />
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                       <h3 className="font-semibold text-gray-600 group-hover:text-black">
// // // // // // // // // // //                         {action.title}
// // // // // // // // // // //                       </h3>
// // // // // // // // // // //                       <p className="text-sm text-gray-600 mt-1">{action.description}</p>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                   </div>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //               );
// // // // // // // // // // //             })}
// // // // // // // // // // //           </div>

// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default AdminDashboard;

// // // // // // // // // // import React, { useState, useContext, useEffect } from 'react';
// // // // // // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // // // // // import axios from "axios";
// // // // // // // // // // import AdminSidebar from '../../components/admin/AdminSidebar';
// // // // // // // // // // import { AuthContext } from '../../App';

// // // // // // // // // // import {
// // // // // // // // // //   FaUsers,
// // // // // // // // // //   FaComments,
// // // // // // // // // //   FaFilePdf,
// // // // // // // // // //   FaUserCog,
// // // // // // // // // //   FaChartBar,
// // // // // // // // // //   FaBook
// // // // // // // // // // } from 'react-icons/fa';

// // // // // // // // // // const AdminDashboard = () => {
// // // // // // // // // //   const { logout } = useContext(AuthContext);
// // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // //   const [dashboardStats, setDashboardStats] = useState({
// // // // // // // // // //     totalUsers: 0,
// // // // // // // // // //     totalQueries: 0
// // // // // // // // // //   });

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     const fetchStats = async () => {
// // // // // // // // // //       try {
// // // // // // // // // //         const response = await axios.get("http://localhost:5000/api/dashboard/stats");
// // // // // // // // // //         setDashboardStats(response.data);
// // // // // // // // // //       } catch (err) {
// // // // // // // // // //         console.error("Error fetching stats:", err);
// // // // // // // // // //       }
// // // // // // // // // //     };
// // // // // // // // // //     fetchStats();
// // // // // // // // // //   }, []);

// // // // // // // // // //   const stats = [
// // // // // // // // // //     {
// // // // // // // // // //       title: 'Total Students',
// // // // // // // // // //       value: dashboardStats.totalUsers,
// // // // // // // // // //       icon: FaUsers,
// // // // // // // // // //       color: 'bg-blue-500',
// // // // // // // // // //       change: '+12%',
// // // // // // // // // //       trend: 'up'
// // // // // // // // // //     },
// // // // // // // // // //     {
// // // // // // // // // //       title: 'Total Queries',
// // // // // // // // // //       value: dashboardStats.totalQueries,
// // // // // // // // // //       icon: FaComments,
// // // // // // // // // //       color: 'bg-red-500',
// // // // // // // // // //       change: '+8%',
// // // // // // // // // //       trend: 'up'
// // // // // // // // // //     }
// // // // // // // // // //   ];

// // // // // // // // // //   const quickActions = [
// // // // // // // // // //     {
// // // // // // // // // //       title: 'Knowledge Base',
// // // // // // // // // //       description: 'Manage knowledge base content',
// // // // // // // // // //       icon: FaBook,
// // // // // // // // // //       color: 'bg-blue-100 text-blue-600',
// // // // // // // // // //       action: () => navigate('/admin/knowledge-base')
// // // // // // // // // //     },
// // // // // // // // // //     {
// // // // // // // // // //       title: 'File Management',
// // // // // // // // // //       description: 'Upload and manage PDF files',
// // // // // // // // // //       icon: FaFilePdf,
// // // // // // // // // //       color: 'bg-red-100 text-red-600',
// // // // // // // // // //       action: () => navigate('/admin/faq-generator')
// // // // // // // // // //     },
// // // // // // // // // //     {
// // // // // // // // // //       title: 'Manage Staff',
// // // // // // // // // //       description: 'Add or remove staff members',
// // // // // // // // // //       icon: FaUserCog,
// // // // // // // // // //       color: 'bg-yellow-100 text-yellow-600',
// // // // // // // // // //       action: () => navigate('/admin/staff')
// // // // // // // // // //     },
// // // // // // // // // //     {
// // // // // // // // // //       title: 'View Analytics',
// // // // // // // // // //       description: 'Check system performance',
// // // // // // // // // //       icon: FaChartBar,
// // // // // // // // // //       color: 'bg-green-100 text-green-600',
// // // // // // // // // //       action: () => navigate('/admin/analytics')
// // // // // // // // // //     }
// // // // // // // // // //   ];

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="flex min-h-screen bg-gray-50 relative overflow-hidden">
      
// // // // // // // // // //       {/* 🔥 KEYFRAME ANIMATION STYLES */}
// // // // // // // // // //       <style>
// // // // // // // // // //         {`
// // // // // // // // // //           @keyframes camelWalk {
// // // // // // // // // //             0% { transform: translateX(-150px); }
// // // // // // // // // //             100% { transform: translateX(100vw); }
// // // // // // // // // //           }
// // // // // // // // // //           .camel-animation {
// // // // // // // // // //             animation: camelWalk 10s linear infinite;
// // // // // // // // // //           }
// // // // // // // // // //         `}
// // // // // // // // // //       </style>

// // // // // // // // // //       <AdminSidebar activePage="dashboard" />

// // // // // // // // // //       <div className="flex-1 flex flex-col ml-64">

// // // // // // // // // //         {/* Top bar */}
// // // // // // // // // //         <div className="bg-white shadow-sm border-b border-gray-200">
// // // // // // // // // //           <div className="flex items-center justify-between px-6 py-4">
// // // // // // // // // //             <div>
// // // // // // // // // //               <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
// // // // // // // // // //               <p className="text-gray-600">Welcome back, Administrator</p>
// // // // // // // // // //             </div>

// // // // // // // // // //             <div className="flex items-center space-x-4">
// // // // // // // // // //               <div className="flex items-center space-x-3">
// // // // // // // // // //                 <div className="w-10 h-10 bg-purple-100 rounded-full"></div>
// // // // // // // // // //                 <div className="text-right">
// // // // // // // // // //                   <p className="text-sm font-medium text-gray-900">Admin User</p>
// // // // // // // // // //                   <p className="text-xs text-gray-500">Super Admin</p>
// // // // // // // // // //                 </div>
// // // // // // // // // //               </div>
// // // // // // // // // //             </div>
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>

// // // // // // // // // //         {/* Main Content */}
// // // // // // // // // //         <div className="flex-1 p-6 pb-24">  {/* extra bottom space for camel */}

// // // // // // // // // //           {/* Stats Grid */}
// // // // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
// // // // // // // // // //             {stats.map((stat, index) => {
// // // // // // // // // //               const Icon = stat.icon;
// // // // // // // // // //               return (
// // // // // // // // // //                 <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md">
// // // // // // // // // //                   <div className="flex items-center justify-between">
// // // // // // // // // //                     <div>
// // // // // // // // // //                       <p className="text-sm font-medium text-gray-600">{stat.title}</p>
// // // // // // // // // //                       <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
// // // // // // // // // //                       <p className={`text-sm mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
// // // // // // // // // //                         {stat.change} from last month
// // // // // // // // // //                       </p>
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
// // // // // // // // // //                       <Icon className="text-white text-lg" />
// // // // // // // // // //                     </div>
// // // // // // // // // //                   </div>
// // // // // // // // // //                 </div>
// // // // // // // // // //               );
// // // // // // // // // //             })}
// // // // // // // // // //           </div>

// // // // // // // // // //           {/* Quick Actions */}
// // // // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // // // // // // // // //             {quickActions.map((action, index) => {
// // // // // // // // // //               const Icon = action.icon;
// // // // // // // // // //               return (
// // // // // // // // // //                 <div key={index} className="bg-white rounded-xl shadow-sm p-6 border group cursor-pointer"
// // // // // // // // // //                   onClick={action.action}
// // // // // // // // // //                 >
// // // // // // // // // //                   <div className="flex items-center gap-4">
// // // // // // // // // //                     <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
// // // // // // // // // //                       <Icon className="text-lg" />
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div>
// // // // // // // // // //                       <h3 className="font-semibold text-gray-600 group-hover:text-black">
// // // // // // // // // //                         {action.title}
// // // // // // // // // //                       </h3>
// // // // // // // // // //                       <p className="text-sm text-gray-600 mt-1">{action.description}</p>
// // // // // // // // // //                     </div>
// // // // // // // // // //                   </div>
// // // // // // // // // //                 </div>
// // // // // // // // // //               );
// // // // // // // // // //             })}
// // // // // // // // // //           </div>

// // // // // // // // // //         </div>

// // // // // // // // // //         {/* 🐪🔥 CAMEL ANIMATION — ALWAYS AT BOTTOM */}
// // // // // // // // // //         <div className="absolute bottom-4 left-0 w-full pointer-events-none">
// // // // // // // // // //           <img
// // // // // // // // // //             src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
// // // // // // // // // //             alt="camel walking"


// // // // // // // // // //             className="camel-animation w-32 opacity-90"
// // // // // // // // // //           />
// // // // // // // // // //         </div>

// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default AdminDashboard;


// // // // // // // // // import React, { useState, useContext, useEffect } from 'react';
// // // // // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // // // // import axios from "axios";
// // // // // // // // // import AdminSidebar from '../../components/admin/AdminSidebar';
// // // // // // // // // import { AuthContext } from '../../App';

// // // // // // // // // import {
// // // // // // // // //   FaUsers,
// // // // // // // // //   FaComments,
// // // // // // // // //   FaFilePdf,
// // // // // // // // //   FaUserCog,
// // // // // // // // //   FaChartBar,
// // // // // // // // //   FaBook
// // // // // // // // // } from 'react-icons/fa';

// // // // // // // // // const AdminDashboard = () => {
// // // // // // // // //   const { logout } = useContext(AuthContext);
// // // // // // // // //   const navigate = useNavigate();

// // // // // // // // //   const [showUploadModal, setShowUploadModal] = useState(false);
// // // // // // // // //   const [uploadType, setUploadType] = useState('');

// // // // // // // // //   // MongoDB Stats State
// // // // // // // // //   const [dashboardStats, setDashboardStats] = useState({
// // // // // // // // //     totalUsers: 0,
// // // // // // // // //     totalQueries: 0
// // // // // // // // //   });

// // // // // // // // //   // Fetch stats from backend
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const fetchStats = async () => {
// // // // // // // // //       try {
// // // // // // // // //         const response = await axios.get("http://localhost:5000/api/dashboard/stats");
// // // // // // // // //         setDashboardStats(response.data);
// // // // // // // // //       } catch (err) {
// // // // // // // // //         console.error("Error fetching stats:", err);
// // // // // // // // //       }
// // // // // // // // //     };

// // // // // // // // //     fetchStats();
// // // // // // // // //   }, []);

// // // // // // // // //   // Stats Grid – removed Pending Chats and Documents
// // // // // // // // //   const stats = [
// // // // // // // // //     {
// // // // // // // // //       title: 'Total Students',
// // // // // // // // //       value: dashboardStats.totalUsers,
// // // // // // // // //       icon: FaUsers,
// // // // // // // // //       color: 'bg-blue-500',
// // // // // // // // //       change: '+12%',
// // // // // // // // //       trend: 'up'
// // // // // // // // //     },
// // // // // // // // //     {
// // // // // // // // //       title: 'Total Queries',
// // // // // // // // //       value: dashboardStats.totalQueries,
// // // // // // // // //       icon: FaComments,
// // // // // // // // //       color: 'bg-red-500',
// // // // // // // // //       change: '+8%',
// // // // // // // // //       trend: 'up'
// // // // // // // // //     }
// // // // // // // // //   ];

// // // // // // // // //   const quickActions = [
// // // // // // // // //     {
// // // // // // // // //       title: 'Knowledge Base',
// // // // // // // // //       description: 'Manage knowledge base content',
// // // // // // // // //       icon: FaBook,
// // // // // // // // //       color: 'bg-blue-100 text-blue-600',
// // // // // // // // //       action: () => navigate('/admin/knowledge-base')
// // // // // // // // //     },
// // // // // // // // //     {
// // // // // // // // //       title: 'File Management',
// // // // // // // // //       description: 'Upload and manage PDF files',
// // // // // // // // //       icon: FaFilePdf,
// // // // // // // // //       color: 'bg-red-100 text-red-600',
// // // // // // // // //       action: () => navigate('/admin/faq-generator')
// // // // // // // // //     },
// // // // // // // // //     {
// // // // // // // // //       title: 'Manage Staff',
// // // // // // // // //       description: 'Add or remove staff members',
// // // // // // // // //       icon: FaUserCog,
// // // // // // // // //       color: 'bg-yellow-100 text-yellow-600',
// // // // // // // // //       action: () => navigate('/admin/staff')
// // // // // // // // //     },
// // // // // // // // //     {
// // // // // // // // //       title: 'View Analytics',
// // // // // // // // //       description: 'Check system performance',
// // // // // // // // //       icon: FaChartBar,
// // // // // // // // //       color: 'bg-green-100 text-green-600',
// // // // // // // // //       action: () => navigate('/admin/analytics')
// // // // // // // // //     }
// // // // // // // // //   ];

// // // // // // // // //   return (
// // // // // // // // //     <div className="flex min-h-screen bg-gray-50">
// // // // // // // // //       <AdminSidebar activePage="dashboard" />

// // // // // // // // //       <div className="flex-1 flex flex-col ml-64">

// // // // // // // // //         {/* Top bar */}
// // // // // // // // //         <div className="bg-white shadow-sm border-b border-gray-200">
// // // // // // // // //           <div className="flex items-center justify-between px-6 py-4">
// // // // // // // // //             <div>
// // // // // // // // //               <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
// // // // // // // // //               <p className="text-gray-600">Welcome back, Administrator</p>
// // // // // // // // //             </div>

// // // // // // // // //             <div className="flex items-center space-x-4">
// // // // // // // // //               <div className="flex items-center space-x-3">
// // // // // // // // //                 <div className="w-10 h-10 bg-purple-100 rounded-full"></div>
// // // // // // // // //                 <div className="text-right">
// // // // // // // // //                   <p className="text-sm font-medium text-gray-900">Admin User</p>
// // // // // // // // //                   <p className="text-xs text-gray-500">Super Admin</p>
// // // // // // // // //                 </div>
// // // // // // // // //               </div>
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         </div>

// // // // // // // // //         {/* Main Content */}
// // // // // // // // //         <div className="flex-1 p-6 pb-28"> {/* pb to make room for the desert */}
          
// // // // // // // // //           {/* Stats Grid - UPDATED (only 2 cards now) */}
// // // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
// // // // // // // // //             {stats.map((stat, index) => {
// // // // // // // // //               const Icon = stat.icon;
// // // // // // // // //               return (
// // // // // // // // //                 <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md">
// // // // // // // // //                   <div className="flex items-center justify-between">
// // // // // // // // //                     <div>
// // // // // // // // //                       <p className="text-sm font-medium text-gray-600">{stat.title}</p>
// // // // // // // // //                       <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
// // // // // // // // //                       <p className={`text-sm mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
// // // // // // // // //                         {stat.change} from last month
// // // // // // // // //                       </p>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
// // // // // // // // //                       <Icon className="text-white text-lg" />
// // // // // // // // //                     </div>
// // // // // // // // //                   </div>
// // // // // // // // //                 </div>
// // // // // // // // //               );
// // // // // // // // //             })}
// // // // // // // // //           </div>

// // // // // // // // //           {/* Quick Actions */}
// // // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // // // // // // // //             {quickActions.map((action, index) => {
// // // // // // // // //               const Icon = action.icon;
// // // // // // // // //               return (
// // // // // // // // //                 <div key={index} className="bg-white rounded-xl shadow-sm p-6 border group cursor-pointer"
// // // // // // // // //                   onClick={action.action}
// // // // // // // // //                 >
// // // // // // // // //                   <div className="flex items-center gap-4">
// // // // // // // // //                     <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
// // // // // // // // //                       <Icon className="text-lg" />
// // // // // // // // //                     </div>
// // // // // // // // //                     <div>
// // // // // // // // //                       <h3 className="font-semibold text-gray-600 group-hover:text-black">
// // // // // // // // //                         {action.title}
// // // // // // // // //                       </h3>
// // // // // // // // //                       <p className="text-sm text-gray-600 mt-1">{action.description}</p>
// // // // // // // // //                     </div>
// // // // // // // // //                   </div>
// // // // // // // // //                 </div>
// // // // // // // // //               );
// // // // // // // // //             })}
// // // // // // // // //           </div>

// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       {/* ---------------------------
// // // // // // // // //           Desert + Camel animation
// // // // // // // // //           --------------------------- */}
// // // // // // // // //       <div className="fixed left-0 right-0 bottom-0 pointer-events-none z-40">
// // // // // // // // //         <div className="camel-desert-container">
// // // // // // // // //           {/* The desert background */}
// // // // // // // // //           <div className="desert-strip">
// // // // // // // // //             <div className="sun" />
// // // // // // // // //             <div className="dunes dune-front" />
// // // // // // // // //             <div className="dunes dune-back" />
// // // // // // // // //           </div>

// // // // // // // // //           {/* the camel - moves across the desert */}
// // // // // // // // //           <div className="camel-wrapper" aria-hidden>
// // // // // // // // //             <svg className="camel" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" role="img">
// // // // // // // // //               {/* camel body */}
// // // // // // // // //               <g className="camel-body" transform="translate(0,0)">
// // // // // // // // //                 <ellipse cx="90" cy="60" rx="46" ry="22" fill="#b98046" />
// // // // // // // // //                 {/* hump */}
// // // // // // // // //                 <ellipse cx="66" cy="50" rx="18" ry="14" fill="#c28f53" />
// // // // // // // // //                 {/* head */}
// // // // // // // // //                 <g className="camel-head" transform="translate(120,28)">
// // // // // // // // //                   <ellipse cx="0" cy="0" rx="10" ry="8" fill="#b98046" />
// // // // // // // // //                   <rect x="-6" y="0" width="12" height="6" rx="3" fill="#b98046" />
// // // // // // // // //                   <circle cx="2" cy="-2" r="1.3" fill="#222" />
// // // // // // // // //                 </g>

// // // // // // // // //                 {/* legs group - animate up/down */}
// // // // // // // // //                 <g className="camel-legs" transform="translate(40,66)">
// // // // // // // // //                   <rect className="leg l1" x="-6" y="0" width="4" height="18" rx="2" fill="#8a5f2e" />
// // // // // // // // //                   <rect className="leg l2" x="6" y="0" width="4" height="18" rx="2" fill="#8a5f2e" />
// // // // // // // // //                   <rect className="leg l3" x="20" y="0" width="4" height="18" rx="2" fill="#8a5f2e" />
// // // // // // // // //                   <rect className="leg l4" x="34" y="0" width="4" height="18" rx="2" fill="#8a5f2e" />
// // // // // // // // //                 </g>

// // // // // // // // //                 {/* tail */}
// // // // // // // // //                 <path d="M38 54 q-8 -6 -12 0" fill="none" stroke="#8a5f2e" strokeWidth="3" strokeLinecap="round" />
// // // // // // // // //               </g>
// // // // // // // // //             </svg>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       {/* Inline styles for animation (scoped class names used) */}
// // // // // // // // //       <style>{`
// // // // // // // // //         /* container sizing */
// // // // // // // // //         .camel-desert-container {
// // // // // // // // //           width: 100%;
// // // // // // // // //           height: 120px;
// // // // // // // // //           display: flex;
// // // // // // // // //           align-items: flex-end;
// // // // // // // // //           justify-content: center;
// // // // // // // // //           overflow: hidden;
// // // // // // // // //           pointer-events: none;
// // // // // // // // //         }

// // // // // // // // //         /* Desert strip */
// // // // // // // // //         .desert-strip {
// // // // // // // // //           position: absolute;
// // // // // // // // //           bottom: 0;
// // // // // // // // //           left: 0;
// // // // // // // // //           right: 0;
// // // // // // // // //           height: 120px;
// // // // // // // // //           background: linear-gradient(180deg, #fff7eb 0%, #fef3c7 40%, #f6e0a6 60%, #f0c97a 100%);
// // // // // // // // //           box-shadow: inset 0 12px 40px rgba(0,0,0,0.03);
// // // // // // // // //         }

// // // // // // // // //         /* Sun */
// // // // // // // // //         .sun {
// // // // // // // // //           position: absolute;
// // // // // // // // //           left: 60px;
// // // // // // // // //           top: -18px;
// // // // // // // // //           width: 72px;
// // // // // // // // //           height: 72px;
// // // // // // // // //           border-radius: 50%;
// // // // // // // // //           background: radial-gradient(circle at 35% 30%, #fff7cc, #ffcc33 40%, #ffb300 100%);
// // // // // // // // //           filter: blur(2px);
// // // // // // // // //           opacity: 0.95;
// // // // // // // // //         }

// // // // // // // // //         /* dunes */
// // // // // // // // //         .dunes {
// // // // // // // // //           position: absolute;
// // // // // // // // //           bottom: 0;
// // // // // // // // //           border-radius: 50%;
// // // // // // // // //         }
// // // // // // // // //         .dune-back {
// // // // // // // // //           height: 70px;
// // // // // // // // //           left: 0;
// // // // // // // // //           right: 0;
// // // // // // // // //           margin: 0 auto;
// // // // // // // // //           width: 70%;
// // // // // // // // //           background: linear-gradient(180deg, #f7deb2 0%, #f0c97a 100%);
// // // // // // // // //           transform: translateY(10px);
// // // // // // // // //           opacity: 0.95;
// // // // // // // // //         }
// // // // // // // // //         .dune-front {
// // // // // // // // //           height: 40px;
// // // // // // // // //           left: 0;
// // // // // // // // //           right: 0;
// // // // // // // // //           margin: 0 auto;
// // // // // // // // //           width: 100%;
// // // // // // // // //           background: linear-gradient(180deg, #f7e3bf 0%, #f4d089 100%);
// // // // // // // // //           transform: translateY(28px);
// // // // // // // // //           opacity: 1;
// // // // // // // // //         }

// // // // // // // // //         /* Camel wrapper controls the horizontal movement */
// // // // // // // // //         .camel-wrapper {
// // // // // // // // //           position: absolute;
// // // // // // // // //           bottom: 10px;
// // // // // // // // //           left: -25%;
// // // // // // // // //           width: 200px;
// // // // // // // // //           height: 120px;
// // // // // // // // //           transform: translateX(0);
// // // // // // // // //           animation: camelMove var(--camel-duration, 12s) linear infinite;
// // // // // // // // //           will-change: transform;
// // // // // // // // //         }

// // // // // // // // //         /* Camel SVG sizing */
// // // // // // // // //         .camel {
// // // // // // // // //           width: 200px;
// // // // // // // // //           height: 120px;
// // // // // // // // //           display: block;
// // // // // // // // //           overflow: visible;
// // // // // // // // //         }

// // // // // // // // //         /* head bob / small body bounce to look more natural */
// // // // // // // // //         .camel-body {
// // // // // // // // //           transform-origin: 50% 50%;
// // // // // // // // //           animation: bodyBounce calc(var(--camel-duration, 12s) / 3) ease-in-out infinite;
// // // // // // // // //         }
// // // // // // // // //         @keyframes bodyBounce {
// // // // // // // // //           0% { transform: translateY(0); }
// // // // // // // // //           50% { transform: translateY(-2px); }
// // // // // // // // //           100% { transform: translateY(0); }
// // // // // // // // //         }

// // // // // // // // //         /* legs walking animation */
// // // // // // // // //         .camel-legs .leg {
// // // // // // // // //           transform-origin: center top;
// // // // // // // // //           animation: legMove 0.6s ease-in-out infinite;
// // // // // // // // //         }
// // // // // // // // //         .camel-legs .l1 { animation-delay: 0s; }
// // // // // // // // //         .camel-legs .l2 { animation-delay: 0.15s; }
// // // // // // // // //         .camel-legs .l3 { animation-delay: 0.3s; }
// // // // // // // // //         .camel-legs .l4 { animation-delay: 0.45s; }

// // // // // // // // //         @keyframes legMove {
// // // // // // // // //           0% { transform: translateY(0) rotate(0deg); }
// // // // // // // // //           50% { transform: translateY(-6px) rotate(-6deg); }
// // // // // // // // //           100% { transform: translateY(0) rotate(0deg); }
// // // // // // // // //         }

// // // // // // // // //         /* main left-to-right movement */
// // // // // // // // //         @keyframes camelMove {
// // // // // // // // //           0% {
// // // // // // // // //             transform: translateX(-30vw) scale(0.9);
// // // // // // // // //             opacity: 0;
// // // // // // // // //           }
// // // // // // // // //           8% {
// // // // // // // // //             opacity: 1;
// // // // // // // // //           }
// // // // // // // // //           50% {
// // // // // // // // //             transform: translateX(50vw) scale(1);
// // // // // // // // //           }
// // // // // // // // //           92% {
// // // // // // // // //             opacity: 1;
// // // // // // // // //           }
// // // // // // // // //           100% {
// // // // // // // // //             transform: translateX(130vw) scale(1.05);
// // // // // // // // //             opacity: 0;
// // // // // // // // //           }
// // // // // // // // //         }

// // // // // // // // //         /* small responsive adjustments */
// // // // // // // // //         @media (max-width: 768px) {
// // // // // // // // //           .camel-wrapper { width: 140px; height: 90px; animation-duration: calc(var(--camel-duration, 12s) * 0.9); }
// // // // // // // // //           .camel { width: 140px; height: 90px; }
// // // // // // // // //           .desert-strip { height: 90px; }
// // // // // // // // //         }
// // // // // // // // //       `}</style>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default AdminDashboard;


// // // // // // // // // src/pages/admin/AdminDashboard.jsx
// // // // // // // // import React, { useState, useContext, useEffect, useMemo } from "react";
// // // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // // import axios from "axios";
// // // // // // // // import AdminSidebar from "../../components/admin/AdminSidebar";
// // // // // // // // import { AuthContext } from "../../App";

// // // // // // // // import {
// // // // // // // //   FaUsers,
// // // // // // // //   FaComments,
// // // // // // // //   FaFilePdf,
// // // // // // // //   FaUserCog,
// // // // // // // //   FaChartBar,
// // // // // // // //   FaBook,
// // // // // // // // } from "react-icons/fa";

// // // // // // // // // <-- Put camel.png in src/assets/ (or change the import path below) -->
// // // // // // // // import camel from "../../assets/camel.png";

// // // // // // // // const NUM_PARTICLES = 36; // change to taste (more = denser sand)

// // // // // // // // const AdminDashboard = () => {
// // // // // // // //   const { logout } = useContext(AuthContext);
// // // // // // // //   const navigate = useNavigate();

// // // // // // // //   const [dashboardStats, setDashboardStats] = useState({
// // // // // // // //     totalUsers: 0,
// // // // // // // //     totalQueries: 0,
// // // // // // // //   });

// // // // // // // //   useEffect(() => {
// // // // // // // //     const fetchStats = async () => {
// // // // // // // //       try {
// // // // // // // //         const response = await axios.get(
// // // // // // // //           "http://localhost:5000/api/dashboard/stats"
// // // // // // // //         );
// // // // // // // //         setDashboardStats(response.data || {});
// // // // // // // //       } catch (err) {
// // // // // // // //         console.error("Error fetching stats:", err);
// // // // // // // //       }
// // // // // // // //     };
// // // // // // // //     fetchStats();
// // // // // // // //   }, []);

// // // // // // // //   const stats = [
// // // // // // // //     {
// // // // // // // //       title: "Total Students",
// // // // // // // //       value: dashboardStats.totalUsers ?? 0,
// // // // // // // //       icon: FaUsers,
// // // // // // // //       color: "bg-blue-500",
// // // // // // // //       change: "+12%",
// // // // // // // //       trend: "up",
// // // // // // // //     },
// // // // // // // //     {
// // // // // // // //       title: "Total Queries",
// // // // // // // //       value: dashboardStats.totalQueries ?? 0,
// // // // // // // //       icon: FaComments,
// // // // // // // //       color: "bg-red-500",
// // // // // // // //       change: "+8%",
// // // // // // // //       trend: "up",
// // // // // // // //     },
// // // // // // // //   ];

// // // // // // // //   const quickActions = [
// // // // // // // //     {
// // // // // // // //       title: "Knowledge Base",
// // // // // // // //       description: "Manage knowledge base content",
// // // // // // // //       icon: FaBook,
// // // // // // // //       color: "bg-blue-100 text-blue-600",
// // // // // // // //       action: () => navigate("/admin/knowledge-base"),
// // // // // // // //     },
// // // // // // // //     {
// // // // // // // //       title: "File Management",
// // // // // // // //       description: "Upload and manage PDF files",
// // // // // // // //       icon: FaFilePdf,
// // // // // // // //       color: "bg-red-100 text-red-600",
// // // // // // // //       action: () => navigate("/admin/faq-generator"),
// // // // // // // //     },
// // // // // // // //     {
// // // // // // // //       title: "Manage Staff",
// // // // // // // //       description: "Add or remove staff members",
// // // // // // // //       icon: FaUserCog,
// // // // // // // //       color: "bg-yellow-100 text-yellow-600",
// // // // // // // //       action: () => navigate("/admin/staff"),
// // // // // // // //     },
// // // // // // // //     {
// // // // // // // //       title: "View Analytics",
// // // // // // // //       description: "Check system performance",
// // // // // // // //       icon: FaChartBar,
// // // // // // // //       color: "bg-green-100 text-green-600",
// // // // // // // //       action: () => navigate("/admin/analytics"),
// // // // // // // //     },
// // // // // // // //   ];

// // // // // // // //   // generate particles once (random positions, sizes, delays)
// // // // // // // //   const particles = useMemo(() => {
// // // // // // // //     const arr = [];
// // // // // // // //     for (let i = 0; i < NUM_PARTICLES; i++) {
// // // // // // // //       arr.push({
// // // // // // // //         id: i,
// // // // // // // //         // left position across the viewport width of the desert area (0..100%)
// // // // // // // //         left: Math.random() * 100,
// // // // // // // //         // vertical start (higher number = closer to ground)
// // // // // // // //         top: 30 + Math.random() * 50,
// // // // // // // //         // size of grain in px
// // // // // // // //         size: 1 + Math.random() * 3,
// // // // // // // //         // how long each particle takes to cross (seconds)
// // // // // // // //         duration: 3 + Math.random() * 5,
// // // // // // // //         // delay before animation starts
// // // // // // // //         delay: Math.random() * 3,
// // // // // // // //         // vertical drift amplitude
// // // // // // // //         drift: 6 + Math.random() * 12,
// // // // // // // //         // opacity
// // // // // // // //         opacity: 0.15 + Math.random() * 0.5,
// // // // // // // //       });
// // // // // // // //     }
// // // // // // // //     return arr;
// // // // // // // //   }, []);

// // // // // // // //   return (
// // // // // // // //     <div className="flex min-h-screen bg-gray-50">
// // // // // // // //       <AdminSidebar activePage="dashboard" />

// // // // // // // //       <div className="flex-1 flex flex-col ml-64">
// // // // // // // //         {/* Top bar */}
// // // // // // // //         <div className="bg-white shadow-sm border-b border-gray-200">
// // // // // // // //           <div className="flex items-center justify-between px-6 py-4">
// // // // // // // //             <div>
// // // // // // // //               <h1 className="text-2xl font-bold text-gray-900">
// // // // // // // //                 Dashboard Overview
// // // // // // // //               </h1>
// // // // // // // //               <p className="text-gray-600">Welcome back, Administrator</p>
// // // // // // // //             </div>
                

// // // // // // // //                 <div className="text-right">
// // // // // // // //                   <p className="text-sm font-medium text-gray-900">Admin User</p>
// // // // // // // //                   <p className="text-xs text-gray-500">Super Admin</p>
// // // // // // // //                 </div>
// // // // // // // //                 </div>



// // // // // // // //             {/* <div className="flex items-center space-x-4">
// // // // // // // //               <div className="flex items-center space-x-3">
// // // // // // // //                 <div className="w-10 h-10 bg-purple-100 rounded-full" />
// // // // // // // //                 <div className="text-right">
// // // // // // // //                   <p className="text-sm font-medium text-gray-900">Admin User</p>
// // // // // // // //                   <p className="text-xs text-gray-500">Super Admin</p>
// // // // // // // //                 </div>
// // // // // // // //               </div>
// // // // // // // //             </div> */}
// // // // // // // //           </div>
// // // // // // // //         </div>

// // // // // // // //         {/* Main Content */}
// // // // // // // //         <div className="flex-1 p-6">
// // // // // // // //           {/* Stats Grid */}
// // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
// // // // // // // //             {stats.map((stat, index) => {
// // // // // // // //               const Icon = stat.icon;
// // // // // // // //               return (
// // // // // // // //                 <div
// // // // // // // //                   key={index}
// // // // // // // //                   className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md"
// // // // // // // //                 >
// // // // // // // //                   <div className="flex items-center justify-between">
// // // // // // // //                     <div>
// // // // // // // //                       <p className="text-sm font-medium text-gray-600">
// // // // // // // //                         {stat.title}
// // // // // // // //                       </p>
// // // // // // // //                       <p className="text-2xl font-bold text-gray-900 mt-1">
// // // // // // // //                         {stat.value}
// // // // // // // //                       </p>
// // // // // // // //                       <p
// // // // // // // //                         className={`text-sm mt-1 ${
// // // // // // // //                           stat.trend === "up" ? "text-green-600" : "text-red-600"
// // // // // // // //                         }`}
// // // // // // // //                       >
// // // // // // // //                         {stat.change} from last month
// // // // // // // //                       </p>
// // // // // // // //                     </div>
// // // // // // // //                     <div
// // // // // // // //                       className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}
// // // // // // // //                     >
// // // // // // // //                       <Icon className="text-white text-lg" />
// // // // // // // //                     </div>
// // // // // // // //                   </div>
// // // // // // // //                 </div>
// // // // // // // //               );
// // // // // // // //             })}
// // // // // // // //           </div>

// // // // // // // //           {/* Quick Actions */}
// // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // // // // // // //             {quickActions.map((action, index) => {
// // // // // // // //               const Icon = action.icon;
// // // // // // // //               return (
// // // // // // // //                 <div
// // // // // // // //                   key={index}
// // // // // // // //                   className="bg-white rounded-xl shadow-sm p-6 border group cursor-pointer"
// // // // // // // //                   onClick={action.action}
// // // // // // // //                 >
// // // // // // // //                   <div className="flex items-center gap-4">
// // // // // // // //                     <div
// // // // // // // //                       className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center`}
// // // // // // // //                     >
// // // // // // // //                       <Icon className="text-lg" />
// // // // // // // //                     </div>
// // // // // // // //                     <div>
// // // // // // // //                       <h3 className="font-semibold text-gray-600 group-hover:text-black">
// // // // // // // //                         {action.title}
// // // // // // // //                       </h3>
// // // // // // // //                       <p className="text-sm text-gray-600 mt-1">
// // // // // // // //                         {action.description}
// // // // // // // //                       </p>
// // // // // // // //                     </div>
// // // // // // // //                   </div>
// // // // // // // //                 </div>
// // // // // // // //               );
// // // // // // // //             })}
// // // // // // // //           </div>

// // // // // // // //           {/* ---------- Desert scene with static camel + moving sand particles ---------- */}
// // // // // // // //           <div className="relative w-full mt-6">
// // // // // // // //             {/* Desert background / dunes */}
// // // // // // // //             <div
// // // // // // // //               className="relative w-full h-64 rounded-xl overflow-hidden shadow-inner"
// // // // // // // //               style={{
// // // // // // // //                 background:
// // // // // // // //                   "linear-gradient(180deg,#fffaf0 0%, #fdf2d5 40%, #f7e1b6 60%, #f1d39a 100%)",
// // // // // // // //               }}
// // // // // // // //             >
// // // // // // // //               {/* layered dunes using SVG-ish shapes (pure CSS) */}
// // // // // // // //               <div
// // // // // // // //                 style={{
// // // // // // // //                   position: "absolute",
// // // // // // // //                   bottom: -10,
// // // // // // // //                   left: "-10%",
// // // // // // // //                   width: "120%",
// // // // // // // //                   height: "50%",
// // // // // // // //                   background:
// // // // // // // //                     "radial-gradient(1200px 200px at 10% 50%, rgba(255,255,255,0.0) 0%, rgba(241,211,154,0.35) 20%, rgba(241,211,154,0.6) 45%, rgba(241,211,154,0.8) 75%, rgba(241,211,154,1) 100%)",
// // // // // // // //                   transform: "skewY(-6deg)",
// // // // // // // //                   borderTopLeftRadius: "40%",
// // // // // // // //                   borderTopRightRadius: "40%",
// // // // // // // //                 }}
// // // // // // // //               />
// // // // // // // //               <div
// // // // // // // //                 style={{
// // // // // // // //                   position: "absolute",
// // // // // // // //                   bottom: -28,
// // // // // // // //                   left: "0%",
// // // // // // // //                   width: "100%",
// // // // // // // //                   height: "42%",
// // // // // // // //                   background:
// // // // // // // //                     "radial-gradient(800px 140px at 80% 70%, rgba(255,255,255,0.0) 0%, rgba(241,211,154,0.35) 20%, rgba(241,211,154,0.6) 45%, rgba(241,211,154,0.8) 75%, rgba(241,211,154,1) 100%)",
// // // // // // // //                   transform: "skewY(-3deg)",
// // // // // // // //                   borderTopLeftRadius: "44%",
// // // // // // // //                   borderTopRightRadius: "44%",
// // // // // // // //                 }}
// // // // // // // //               />

// // // // // // // //               {/* camel image (static) - positioned at bottom-center (foreground) */}
// // // // // // // //               <div
// // // // // // // //                 className="absolute bottom-2 left-1/10 transform -translate-x-1/2"
// // // // // // // //                 style={{ width: 220, pointerEvents: "none" }}
// // // // // // // //               >
// // // // // // // //                 <img
// // // // // // // //                   src={camel}
// // // // // // // //                   alt="camel"
// // // // // // // //                   style={{
// // // // // // // //                     display: "block",
// // // // // // // //                     width: "100%",
// // // // // // // //                     height: "auto",
// // // // // // // //                     objectFit: "contain",
// // // // // // // //                     marginBottom: "-4px",
// // // // // // // //                     marginLeft: "4px",
// // // // // // // //                   }}
// // // // // // // //                 />
// // // // // // // //               </div>

// // // // // // // //               {/* sand particles container (absolute, above dunes, below camel foreground if desired) */}
// // // // // // // //               <div
// // // // // // // //                 className="absolute inset-0 pointer-events-none"
// // // // // // // //                 aria-hidden="true"
// // // // // // // //               >
// // // // // // // //                 {particles.map((p) => {
// // // // // // // //                   // We set a CSS variable to pass random values to animation
// // // // // // // //                   const style = {
// // // // // // // //                     left: `${p.left}%`,
// // // // // // // //                     top: `${p.top}%`,
// // // // // // // //                     width: `${p.size}px`,
// // // // // // // //                     height: `${p.size}px`,
// // // // // // // //                     opacity: p.opacity,
// // // // // // // //                     // custom properties for keyframes
// // // // // // // //                     ["--dur"]: `${p.duration}s`,
// // // // // // // //                     ["--delay"]: `${p.delay}s`,
// // // // // // // //                     ["--drift"]: `${p.drift}px`,
// // // // // // // //                   };
// // // // // // // //                   return (
// // // // // // // //                     <span
// // // // // // // //                       key={p.id}
// // // // // // // //                       className="sand-grain"
// // // // // // // //                       style={style}
// // // // // // // //                     />
// // // // // // // //                   );
// // // // // // // //                 })}
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           </div>

// // // // // // // //           {/* (other page content...) */}
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* --------------------- styles --------------------- */}
// // // // // // // //       <style>{`
// // // // // // // //         /* sand grain base */
// // // // // // // //         .sand-grain{
// // // // // // // //           position: absolute;
// // // // // // // //           background: rgba(194,150,80,0.85);
// // // // // // // //           border-radius: 50%;
// // // // // // // //           transform: translate3d(0,0,0);
// // // // // // // //           filter: blur(0.1px);
// // // // // // // //           /* animation: moveRight var(--dur) linear infinite var(--delay); */
// // // // // // // //           animation-name: sandFloat;
// // // // // // // //           animation-duration: var(--dur, 4s);
// // // // // // // //           animation-timing-function: linear;
// // // // // // // //           animation-iteration-count: infinite;
// // // // // // // //           animation-delay: var(--delay, 0s);
// // // // // // // //           will-change: transform, opacity;
// // // // // // // //         }

// // // // // // // //         /* keyframes: each grain moves right across the desert area,
// // // // // // // //            with subtle vertical sinusoidal drift and fade-in/out at start/end */
// // // // // // // //         @keyframes sandFloat {
// // // // // // // //           0% {
// // // // // // // //             transform: translateX(-6vw) translateY(0);
// // // // // // // //             opacity: 0;
// // // // // // // //           }
// // // // // // // //           8% {
// // // // // // // //             opacity: var(--op, 0.6);
// // // // // // // //           }
// // // // // // // //           50% {
// // // // // // // //             /* use the custom --drift var to create vertical movement */
// // // // // // // //             transform: translateX(20vw) translateY(calc(-1 * var(--drift) / 2));
// // // // // // // //             opacity: 0.9;
// // // // // // // //           }
// // // // // // // //           95% {
// // // // // // // //             opacity: 0.2;
// // // // // // // //           }
// // // // // // // //           100% {
// // // // // // // //             transform: translateX(55vw) translateY(var(--drift));
// // // // // // // //             opacity: 0;
// // // // // // // //           }
// // // // // // // //         }

// // // // // // // //         /* reduce overlap and strengthen visual layering on smaller screens */
// // // // // // // //         @media (max-width: 768px){
// // // // // // // //           .sand-grain { filter: blur(0.2px); }
// // // // // // // //         }
// // // // // // // //       `}</style>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default AdminDashboard;


// // // // // // // import React, { useState, useEffect, useMemo, useContext } from "react";
// // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // import axios from "axios";
// // // // // // // import AdminSidebar from "../../components/admin/AdminSidebar";
// // // // // // // import { AuthContext } from "../../App";

// // // // // // // import {
// // // // // // //   FaUsers,
// // // // // // //   FaComments,
// // // // // // //   FaFilePdf,
// // // // // // //   FaUserCog,
// // // // // // //   FaChartBar,
// // // // // // //   FaBook,
// // // // // // // } from "react-icons/fa";

// // // // // // // // put your camel image at src/assets/camel.png
// // // // // // // import camel from "../../assets/camel.png";

// // // // // // // const NUM_PARTICLES = 36;

// // // // // // // export default function AdminDashboard() {
// // // // // // //   const { logout } = useContext(AuthContext || {});
// // // // // // //   const navigate = useNavigate();

// // // // // // //   const [dashboardStats, setDashboardStats] = useState({
// // // // // // //     totalUsers: 0,
// // // // // // //     totalQueries: 0,
// // // // // // //   });

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchStats = async () => {
// // // // // // //       try {
// // // // // // //         const response = await axios.get(
// // // // // // //           "http://localhost:5000/api/dashboard/stats"
// // // // // // //         );
// // // // // // //         setDashboardStats(response.data || {});
// // // // // // //       } catch (err) {
// // // // // // //         console.error("Error fetching stats:", err);
// // // // // // //       }
// // // // // // //     };
// // // // // // //     fetchStats();
// // // // // // //   }, []);

// // // // // // //   const stats = [
// // // // // // //     {
// // // // // // //       title: "Total Students",
// // // // // // //       value: dashboardStats.totalUsers ?? 0,
// // // // // // //       icon: FaUsers,
// // // // // // //       color: "bg-blue-500",
// // // // // // //       change: "+12%",
// // // // // // //       trend: "up",
// // // // // // //     },
// // // // // // //     {
// // // // // // //       title: "Total Queries",
// // // // // // //       value: dashboardStats.totalQueries ?? 0,
// // // // // // //       icon: FaComments,
// // // // // // //       color: "bg-red-500",
// // // // // // //       change: "+8%",
// // // // // // //       trend: "up",
// // // // // // //     },
// // // // // // //   ];

// // // // // // //   const quickActions = [
// // // // // // //     {
// // // // // // //       title: "Knowledge Base",
// // // // // // //       description: "Manage knowledge base content",
// // // // // // //       icon: FaBook,
// // // // // // //       color: "bg-blue-100 text-blue-600",
// // // // // // //       action: () => navigate("/admin/knowledge-base"),
// // // // // // //     },
// // // // // // //     {
// // // // // // //       title: "File Management",
// // // // // // //       description: "Upload and manage PDF files",
// // // // // // //       icon: FaFilePdf,
// // // // // // //       color: "bg-red-100 text-red-600",
// // // // // // //       action: () => navigate("/admin/faq-generator"),
// // // // // // //     },
// // // // // // //     {
// // // // // // //       title: "Manage Staff",
// // // // // // //       description: "Add or remove staff members",
// // // // // // //       icon: FaUserCog,
// // // // // // //       color: "bg-yellow-100 text-yellow-600",
// // // // // // //       action: () => navigate("/admin/staff"),
// // // // // // //     },
// // // // // // //     {
// // // // // // //       title: "View Analytics",
// // // // // // //       description: "Check system performance",
// // // // // // //       icon: FaChartBar,
// // // // // // //       color: "bg-green-100 text-green-600",
// // // // // // //       action: () => navigate("/admin/analytics"),
// // // // // // //     },
// // // // // // //   ];

// // // // // // //   // generate particles once
// // // // // // //   const particles = useMemo(() => {
// // // // // // //     const arr = [];
// // // // // // //     for (let i = 0; i < NUM_PARTICLES; i++) {
// // // // // // //       arr.push({
// // // // // // //         id: i,
// // // // // // //         left: Math.random() * 100,
// // // // // // //         top: 25 + Math.random() * 55,
// // // // // // //         size: 1 + Math.random() * 3,
// // // // // // //         duration: 3 + Math.random() * 5,
// // // // // // //         delay: Math.random() * 3,
// // // // // // //         drift: 6 + Math.random() * 12,
// // // // // // //         opacity: 0.12 + Math.random() * 0.45,
// // // // // // //       });
// // // // // // //     }
// // // // // // //     return arr;
// // // // // // //   }, []);

// // // // // // //   return (
// // // // // // //     <div className="flex min-h-screen bg-gray-50">
// // // // // // //       <AdminSidebar activePage="dashboard" />

// // // // // // //       <div className="flex-1 flex flex-col ml-64">
// // // // // // //         {/* Top bar */}
// // // // // // //         <div className="bg-white shadow-sm border-b border-gray-200">
// // // // // // //           <div className="flex items-center justify-between px-6 py-4">
// // // // // // //             <div>
// // // // // // //               <h1 className="text-2xl font-bold text-gray-900">
// // // // // // //                 Dashboard Overview
// // // // // // //               </h1>
// // // // // // //               <p className="text-gray-600">Welcome back, Administrator</p>
// // // // // // //             </div>

// // // // // // //             <div className="text-right">
// // // // // // //               <p className="text-sm font-medium text-gray-900">Admin User</p>
// // // // // // //               <p className="text-xs text-gray-500">Super Admin</p>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         {/* Main Content */}
// // // // // // //         <div className="flex-1 p-6">
// // // // // // //           {/* Stats Grid */}
// // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
// // // // // // //             {stats.map((stat, index) => {
// // // // // // //               const Icon = stat.icon;
// // // // // // //               return (
// // // // // // //                 <div
// // // // // // //                   key={index}
// // // // // // //                   className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md"
// // // // // // //                 >
// // // // // // //                   <div className="flex items-center justify-between">
// // // // // // //                     <div>
// // // // // // //                       <p className="text-sm font-medium text-gray-600">
// // // // // // //                         {stat.title}
// // // // // // //                       </p>
// // // // // // //                       <p className="text-2xl font-bold text-gray-900 mt-1">
// // // // // // //                         {stat.value}
// // // // // // //                       </p>
// // // // // // //                       <p
// // // // // // //                         className={`text-sm mt-1 ${
// // // // // // //                           stat.trend === "up" ? "text-green-600" : "text-red-600"
// // // // // // //                         }`}
// // // // // // //                       >
// // // // // // //                         {stat.change} from last month
// // // // // // //                       </p>
// // // // // // //                     </div>
// // // // // // //                     <div
// // // // // // //                       className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}
// // // // // // //                     >
// // // // // // //                       <Icon className="text-white text-lg" />
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //               );
// // // // // // //             })}
// // // // // // //           </div>

// // // // // // //           {/* Quick Actions */}
// // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // // // // // //             {quickActions.map((action, index) => {
// // // // // // //               const Icon = action.icon;
// // // // // // //               return (
// // // // // // //                 <div
// // // // // // //                   key={index}
// // // // // // //                   className="bg-white rounded-xl shadow-sm p-6 border group cursor-pointer"
// // // // // // //                   onClick={action.action}
// // // // // // //                 >
// // // // // // //                   <div className="flex items-center gap-4">
// // // // // // //                     <div
// // // // // // //                       className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center`}
// // // // // // //                     >
// // // // // // //                       <Icon className="text-lg" />
// // // // // // //                     </div>
// // // // // // //                     <div>
// // // // // // //                       <h3 className="font-semibold text-gray-600 group-hover:text-black">
// // // // // // //                         {action.title}
// // // // // // //                       </h3>
// // // // // // //                       <p className="text-sm text-gray-600 mt-1">
// // // // // // //                         {action.description}
// // // // // // //                       </p>
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //               );
// // // // // // //             })}
// // // // // // //           </div>

// // // // // // //           {/* Desert scene: static camel in foreground, sand particles animate */}
// // // // // // //           <div className="relative w-full mt-6">
// // // // // // //             <div
// // // // // // //               className="relative w-full h-64 rounded-xl overflow-hidden shadow-inner"
// // // // // // //               style={{
// // // // // // //                 background:
// // // // // // //                   "linear-gradient(180deg,#fffaf0 0%, #fdf2d5 40%, #f7e1b6 60%, #f1d39a 100%)",
// // // // // // //               }}
// // // // // // //             >
// // // // // // //               {/* decorative dunes */}
// // // // // // //               <div
// // // // // // //                 style={{
// // // // // // //                   position: "absolute",
// // // // // // //                   bottom: -10,
// // // // // // //                   left: "-10%",
// // // // // // //                   width: "120%",
// // // // // // //                   height: "50%",
// // // // // // //                   background:
// // // // // // //                     "radial-gradient(1200px 200px at 10% 50%, rgba(255,255,255,0) 0%, rgba(241,211,154,0.35) 20%, rgba(241,211,154,0.6) 45%, rgba(241,211,154,0.8) 75%, rgba(241,211,154,1) 100%)",
// // // // // // //                   transform: "skewY(-6deg)",
// // // // // // //                   borderTopLeftRadius: "40%",
// // // // // // //                   borderTopRightRadius: "40%",
// // // // // // //                 }}
// // // // // // //               />
// // // // // // //               <div
// // // // // // //                 style={{
// // // // // // //                   position: "absolute",
// // // // // // //                   bottom: -28,
// // // // // // //                   left: "0%",
// // // // // // //                   width: "100%",
// // // // // // //                   height: "42%",
// // // // // // //                   background:
// // // // // // //                     "radial-gradient(800px 140px at 80% 70%, rgba(255,255,255,0) 0%, rgba(241,211,154,0.35) 20%, rgba(241,211,154,0.6) 45%, rgba(241,211,154,0.8) 75%, rgba(241,211,154,1) 100%)",
// // // // // // //                   transform: "skewY(-3deg)",
// // // // // // //                   borderTopLeftRadius: "44%",
// // // // // // //                   borderTopRightRadius: "44%",
// // // // // // //                 }}
// // // // // // //               />

// // // // // // //               {/* static camel in foreground (centered) */}
// // // // // // //               <div
// // // // // // //                 className="absolute bottom-2"
// // // // // // //                 style={{
// // // // // // //                   left: "50%",
// // // // // // //                   transform: "translateX(-50%)",
// // // // // // //                   width: 220,
// // // // // // //                   pointerEvents: "none",
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 <img
// // // // // // //                   src={camel}
// // // // // // //                   alt="camel"
// // // // // // //                   style={{
// // // // // // //                     display: "block",
// // // // // // //                     width: "100%",
// // // // // // //                     height: "auto",
// // // // // // //                     objectFit: "contain",
// // // // // // //                     filter: "drop-shadow(0 6px 8px rgba(0,0,0,0.12))",
// // // // // // //                   }}
// // // // // // //                 />
// // // // // // //               </div>

// // // // // // //               {/* animated sand grains */}
// // // // // // //               <div className="absolute inset-0 pointer-events-none" aria-hidden>
// // // // // // //                 {particles.map((p) => {
// // // // // // //                   const cssVars = {
// // // // // // //                     ["--dur"]: `${p.duration}s`,
// // // // // // //                     ["--delay"]: `${p.delay}s`,
// // // // // // //                     ["--drift"]: `${p.drift}px`,
// // // // // // //                     ["--op"]: p.opacity,
// // // // // // //                   } as React.CSSProperties;

// // // // // // //                   const grainStyle: React.CSSProperties = {
// // // // // // //                     left: `${p.left}%`,
// // // // // // //                     top: `${p.top}%`,
// // // // // // //                     width: `${p.size}px`,
// // // // // // //                     height: `${p.size}px`,
// // // // // // //                     opacity: p.opacity,
// // // // // // //                     ...cssVars,
// // // // // // //                   };

// // // // // // //                   return <span key={p.id} className="sand-grain" style={grainStyle} />;
// // // // // // //                 })}
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* inline styles for sand animation */}
// // // // // // //       <style>{`
// // // // // // //         .sand-grain{
// // // // // // //           position:absolute;
// // // // // // //           background: rgba(194,150,80,0.9);
// // // // // // //           border-radius:50%;
// // // // // // //           transform: translate3d(0,0,0);
// // // // // // //           filter: blur(0.1px);
// // // // // // //           animation-name: sandFloat;
// // // // // // //           animation-duration: var(--dur, 4s);
// // // // // // //           animation-timing-function: linear;
// // // // // // //           animation-iteration-count: infinite;
// // // // // // //           animation-delay: var(--delay, 0s);
// // // // // // //           will-change: transform, opacity;
// // // // // // //         }

// // // // // // //         @keyframes sandFloat {
// // // // // // //           0% {
// // // // // // //             transform: translateX(-8vw) translateY(0);
// // // // // // //             opacity: 0;
// // // // // // //           }
// // // // // // //           8% {
// // // // // // //             opacity: calc(var(--op, 0.5) * 1);
// // // // // // //           }
// // // // // // //           50% {
// // // // // // //             transform: translateX(20vw) translateY(calc(-1 * var(--drift) / 2));
// // // // // // //             opacity: 0.9;
// // // // // // //           }
// // // // // // //           95% {
// // // // // // //             opacity: 0.2;
// // // // // // //           }
// // // // // // //           100% {
// // // // // // //             transform: translateX(55vw) translateY(var(--drift));
// // // // // // //             opacity: 0;
// // // // // // //           }
// // // // // // //         }

// // // // // // //         @media (max-width: 768px) {
// // // // // // //           .sand-grain { filter: blur(0.2px); }
// // // // // // //         }
// // // // // // //       `}</style>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }


// // // // // // // src/pages/admin/AdminDashboard.jsx
// // // // // // import React, { useState, useEffect, useMemo, useContext } from "react";
// // // // // // import { useNavigate } from "react-router-dom";
// // // // // // import axios from "axios";
// // // // // // import AdminSidebar from "../../components/admin/AdminSidebar";
// // // // // // import { AuthContext } from "../../App";

// // // // // // import {
// // // // // //   FaUsers,
// // // // // //   FaComments,
// // // // // //   FaFilePdf,
// // // // // //   FaUserCog,
// // // // // //   FaChartBar,
// // // // // //   FaBook,
// // // // // // } from "react-icons/fa";

// // // // // // // update this path to where your camel PNG actually lives
// // // // // // import camel from "../../assets/camel.png";

// // // // // // const NUM_PARTICLES = 36; // more = denser sand

// // // // // // export default function AdminDashboard() {
// // // // // //   const { logout } = useContext(AuthContext || {});
// // // // // //   const navigate = useNavigate();

// // // // // //   const [dashboardStats, setDashboardStats] = useState({
// // // // // //     totalUsers: 0,
// // // // // //     totalQueries: 0,
// // // // // //   });

// // // // // //   useEffect(() => {
// // // // // //     async function fetchStats() {
// // // // // //       try {
// // // // // //         const res = await axios.get("http://localhost:5000/api/dashboard/stats");
// // // // // //         setDashboardStats(res.data || {});
// // // // // //       } catch (err) {
// // // // // //         console.error("Error fetching stats:", err);
// // // // // //       }
// // // // // //     }
// // // // // //     fetchStats();
// // // // // //   }, []);

// // // // // //   const stats = [
// // // // // //     {
// // // // // //       title: "Total Students",
// // // // // //       value: dashboardStats.totalUsers ?? 0,
// // // // // //       icon: FaUsers,
// // // // // //       color: "bg-blue-500",
// // // // // //       change: "+12%",
// // // // // //       trend: "up",
// // // // // //     },
// // // // // //     {
// // // // // //       title: "Total Queries",
// // // // // //       value: dashboardStats.totalQueries ?? 0,
// // // // // //       icon: FaComments,
// // // // // //       color: "bg-red-500",
// // // // // //       change: "+8%",
// // // // // //       trend: "up",
// // // // // //     },
// // // // // //   ];

// // // // // //   const quickActions = [
// // // // // //     {
// // // // // //       title: "Knowledge Base",
// // // // // //       description: "Manage knowledge base content",
// // // // // //       icon: FaBook,
// // // // // //       color: "bg-blue-100 text-blue-600",
// // // // // //       action: () => navigate("/admin/knowledge-base"),
// // // // // //     },
// // // // // //     {
// // // // // //       title: "File Management",
// // // // // //       description: "Upload and manage PDF files",
// // // // // //       icon: FaFilePdf,
// // // // // //       color: "bg-red-100 text-red-600",
// // // // // //       action: () => navigate("/admin/faq-generator"),
// // // // // //     },
// // // // // //     {
// // // // // //       title: "Manage Staff",
// // // // // //       description: "Add or remove staff members",
// // // // // //       icon: FaUserCog,
// // // // // //       color: "bg-yellow-100 text-yellow-600",
// // // // // //       action: () => navigate("/admin/staff"),
// // // // // //     },
// // // // // //     {
// // // // // //       title: "View Analytics",
// // // // // //       description: "Check system performance",
// // // // // //       icon: FaChartBar,
// // // // // //       color: "bg-green-100 text-green-600",
// // // // // //       action: () => navigate("/admin/analytics"),
// // // // // //     },
// // // // // //   ];

// // // // // //   // generate randomized sand particles once
// // // // // //   const particles = useMemo(() => {
// // // // // //     const arr = [];
// // // // // //     for (let i = 0; i < NUM_PARTICLES; i += 1) {
// // // // // //       arr.push({
// // // // // //         id: i,
// // // // // //         left: Math.random() * 100, // percent
// // // // // //         top: 20 + Math.random() * 60, // percent inside the desert area
// // // // // //         size: 1 + Math.random() * 3, // px
// // // // // //         duration: 3 + Math.random() * 5, // s
// // // // // //         delay: Math.random() * 3, // s
// // // // // //         drift: 6 + Math.random() * 12, // px vertical drift
// // // // // //         opacity: 0.12 + Math.random() * 0.6,
// // // // // //       });
// // // // // //     }
// // // // // //     return arr;
// // // // // //   }, []);

// // // // // //   return (
// // // // // //     <div className="flex min-h-screen bg-gray-50">
// // // // // //       <AdminSidebar activePage="dashboard" />

// // // // // //       <div className="flex-1 flex flex-col ml-64">
// // // // // //         {/* Top bar */}
// // // // // //         <div className="bg-white shadow-sm border-b border-gray-200">
// // // // // //           <div className="flex items-center justify-between px-6 py-4">
// // // // // //             <div>
// // // // // //               <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
// // // // // //               <p className="text-gray-600">Welcome back, Administrator</p>
// // // // // //             </div>

// // // // // //             <div className="text-right">
// // // // // //               <p className="text-sm font-medium text-gray-900">Admin User</p>
// // // // // //               <p className="text-xs text-gray-500">Super Admin</p>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* Main content */}
// // // // // //         <div className="flex-1 p-6">
// // // // // //           {/* Stats */}
// // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
// // // // // //             {stats.map((stat, idx) => {
// // // // // //               const Icon = stat.icon;
// // // // // //               return (
// // // // // //                 <div
// // // // // //                   key={idx}
// // // // // //                   className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md"
// // // // // //                 >
// // // // // //                   <div className="flex items-center justify-between">
// // // // // //                     <div>
// // // // // //                       <p className="text-sm font-medium text-gray-600">{stat.title}</p>
// // // // // //                       <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
// // // // // //                       <p className={`text-sm mt-1 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
// // // // // //                         {stat.change} from last month
// // // // // //                       </p>
// // // // // //                     </div>
// // // // // //                     <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
// // // // // //                       <Icon className="text-white text-lg" />
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               );
// // // // // //             })}
// // // // // //           </div>

// // // // // //           {/* Quick actions */}
// // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // // // // //             {quickActions.map((a, i) => {
// // // // // //               const Icon = a.icon;
// // // // // //               return (
// // // // // //                 <div
// // // // // //                   key={i}
// // // // // //                   className="bg-white rounded-xl shadow-sm p-6 border group cursor-pointer"
// // // // // //                   onClick={a.action}
// // // // // //                 >
// // // // // //                   <div className="flex items-center gap-4">
// // // // // //                     <div className={`${a.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
// // // // // //                       <Icon className="text-lg" />
// // // // // //                     </div>
// // // // // //                     <div>
// // // // // //                       <h3 className="font-semibold text-gray-600 group-hover:text-black">{a.title}</h3>
// // // // // //                       <p className="text-sm text-gray-600 mt-1">{a.description}</p>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               );
// // // // // //             })}
// // // // // //           </div>

// // // // // //           {/* Desert scene - static camel (foreground) + animated sand particles */}
// // // // // //           <div className="relative w-full mt-6">
// // // // // //             <div
// // // // // //               className="relative w-full h-64 rounded-xl overflow-hidden shadow-inner"
// // // // // //               style={{
// // // // // //                 background: "linear-gradient(180deg,#fffaf0 0%, #fdf2d5 40%, #f7e1b6 60%, #f1d39a 100%)",
// // // // // //               }}
// // // // // //             >
// // // // // //               {/* decorative dunes */}
// // // // // //               <div
// // // // // //                 style={{
// // // // // //                   position: "absolute",
// // // // // //                   bottom: -6,
// // // // // //                   left: "-10%",
// // // // // //                   width: "120%",
// // // // // //                   height: "50%",
// // // // // //                   background:
// // // // // //                     "radial-gradient(1200px 200px at 10% 50%, rgba(255,255,255,0.0) 0%, rgba(241,211,154,0.35) 20%, rgba(241,211,154,0.6) 45%, rgba(241,211,154,0.8) 75%, rgba(241,211,154,1) 100%)",
// // // // // //                   transform: "skewY(-6deg)",
// // // // // //                   borderTopLeftRadius: "40%",
// // // // // //                   borderTopRightRadius: "40%",
// // // // // //                 }}
// // // // // //               />
// // // // // //               <div
// // // // // //                 style={{
// // // // // //                   position: "absolute",
// // // // // //                   bottom: -28,
// // // // // //                   left: "0%",
// // // // // //                   width: "100%",
// // // // // //                   height: "42%",
// // // // // //                   background:
// // // // // //                     "radial-gradient(800px 140px at 80% 70%, rgba(255,255,255,0.0) 0%, rgba(241,211,154,0.35) 20%, rgba(241,211,154,0.6) 45%, rgba(241,211,154,0.8) 75%, rgba(241,211,154,1) 100%)",
// // // // // //                   transform: "skewY(-3deg)",
// // // // // //                   borderTopLeftRadius: "44%",
// // // // // //                   borderTopRightRadius: "44%",
// // // // // //                 }}
// // // // // //               />

// // // // // //               {/* static camel in the foreground (center-bottom). Use a transparent PNG for camel. */}
// // // // // //               <div
// // // // // //                 style={{
// // // // // //                   position: "absolute",
// // // // // //                   bottom: 8,
// // // // // //                   left: "50%",
// // // // // //                   transform: "translateX(-50%)",
// // // // // //                   width: 220,
// // // // // //                   pointerEvents: "none",
// // // // // //                 }}
// // // // // //               >
// // // // // //                 <img
// // // // // //                   src={camel}
// // // // // //                   alt="camel"
// // // // // //                   style={{
// // // // // //                     display: "block",
// // // // // //                     width: "100%",
// // // // // //                     height: "auto",
// // // // // //                     objectFit: "contain",
// // // // // //                     // ensure transparency preserved; image should be a PNG with alpha
// // // // // //                     background: "transparent",
// // // // // //                   }}
// // // // // //                 />
// // // // // //               </div>

// // // // // //               {/* sand particles — animated spans placed absolutely */}
// // // // // //               <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
// // // // // //                 {particles.map((p) => {
// // // // // //                   const style = {
// // // // // //                     left: `${p.left}%`,
// // // // // //                     top: `${p.top}%`,
// // // // // //                     width: `${p.size}px`,
// // // // // //                     height: `${p.size}px`,
// // // // // //                     opacity: p.opacity,
// // // // // //                     // CSS variables for animation
// // // // // //                     "--dur": `${p.duration}s`,
// // // // // //                     "--delay": `${p.delay}s`,
// // // // // //                     "--drift": `${p.drift}px`,
// // // // // //                   };
// // // // // //                   return (
// // // // // //                     <span
// // // // // //                       key={p.id}
// // // // // //                       className="sand-grain"
// // // // // //                       style={style}
// // // // // //                     />
// // // // // //                   );
// // // // // //                 })}
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Styles for sand animation (kept in JSX so no extra CSS file needed) */}
// // // // // //       <style>{`
// // // // // //         .sand-grain {
// // // // // //           position: absolute;
// // // // // //           background: rgba(194,150,80,0.85);
// // // // // //           border-radius: 50%;
// // // // // //           transform: translate3d(0,0,0);
// // // // // //           filter: blur(0.1px);
// // // // // //           animation-name: sandFloat;
// // // // // //           animation-duration: var(--dur, 4s);
// // // // // //           animation-timing-function: linear;
// // // // // //           animation-iteration-count: infinite;
// // // // // //           animation-delay: var(--delay, 0s);
// // // // // //           will-change: transform, opacity;
// // // // // //         }

// // // // // //         @keyframes sandFloat {
// // // // // //           0% {
// // // // // //             transform: translateX(-8vw) translateY(0);
// // // // // //             opacity: 0;
// // // // // //           }
// // // // // //           6% { opacity: 0.15; }
// // // // // //           35% {
// // // // // //             transform: translateX(12vw) translateY(calc(-1 * var(--drift) / 2));
// // // // // //             opacity: 0.9;
// // // // // //           }
// // // // // //           80% { opacity: 0.25; }
// // // // // //           100% {
// // // // // //             transform: translateX(55vw) translateY(var(--drift));
// // // // // //             opacity: 0;
// // // // // //           }
// // // // // //         }

// // // // // //         @media (max-width: 768px) {
// // // // // //           .sand-grain { filter: blur(0.25px); }
// // // // // //         }
// // // // // //       `}</style>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // src/pages/admin/AdminDashboard.jsx
// // // // // import React, { useState, useEffect, useMemo, useContext } from "react";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import axios from "axios";
// // // // // import AdminSidebar from "../../components/admin/AdminSidebar";
// // // // // import { AuthContext } from "../../App";

// // // // // import {
// // // // //   FaUsers,
// // // // //   FaComments,
// // // // //   FaFilePdf,
// // // // //   FaUserCog,
// // // // //   FaChartBar,
// // // // //   FaBook,
// // // // // } from "react-icons/fa";

// // // // // // <- update this path to where your camel image actually lives
// // // // // import camel from "../../assets/camel.png";

// // // // // const NUM_PARTICLES = 36;

// // // // // export default function AdminDashboard() {
// // // // //   const { logout } = useContext(AuthContext || {});
// // // // //   const navigate = useNavigate();

// // // // //   const [dashboardStats, setDashboardStats] = useState({
// // // // //     totalUsers: 0,
// // // // //     totalQueries: 0,
// // // // //   });

// // // // //   useEffect(() => {
// // // // //     async function fetchStats() {
// // // // //       try {
// // // // //         const res = await axios.get("http://localhost:5000/api/dashboard/stats");
// // // // //         setDashboardStats(res.data || {});
// // // // //       } catch (err) {
// // // // //         console.error("Error fetching stats:", err);
// // // // //       }
// // // // //     }
// // // // //     fetchStats();
// // // // //   }, []);

// // // // //   const stats = [
// // // // //     {
// // // // //       title: "Total Students",
// // // // //       value: dashboardStats.totalUsers ?? 0,
// // // // //       icon: FaUsers,
// // // // //       color: "bg-blue-500",
// // // // //       change: "+12%",
// // // // //       trend: "up",
// // // // //     },
// // // // //     {
// // // // //       title: "Total Queries",
// // // // //       value: dashboardStats.totalQueries ?? 0,
// // // // //       icon: FaComments,
// // // // //       color: "bg-red-500",
// // // // //       change: "+8%",
// // // // //       trend: "up",
// // // // //     },
// // // // //   ];

// // // // //   const quickActions = [
// // // // //     {
// // // // //       title: "Knowledge Base",
// // // // //       description: "Manage knowledge base content",
// // // // //       icon: FaBook,
// // // // //       color: "bg-blue-100 text-blue-600",
// // // // //       action: () => navigate("/admin/knowledge-base"),
// // // // //     },
// // // // //     {
// // // // //       title: "File Management",
// // // // //       description: "Upload and manage PDF files",
// // // // //       icon: FaFilePdf,
// // // // //       color: "bg-red-100 text-red-600",
// // // // //       action: () => navigate("/admin/faq-generator"),
// // // // //     },
// // // // //     {
// // // // //       title: "Manage Staff",
// // // // //       description: "Add or remove staff members",
// // // // //       icon: FaUserCog,
// // // // //       color: "bg-yellow-100 text-yellow-600",
// // // // //       action: () => navigate("/admin/staff"),
// // // // //     },
// // // // //     {
// // // // //       title: "View Analytics",
// // // // //       description: "Check system performance",
// // // // //       icon: FaChartBar,
// // // // //       color: "bg-green-100 text-green-600",
// // // // //       action: () => navigate("/admin/analytics"),
// // // // //     },
// // // // //   ];

// // // // //   // generate sand particles
// // // // //   const particles = useMemo(() => {
// // // // //     const arr = [];
// // // // //     for (let i = 0; i < NUM_PARTICLES; i++) {
// // // // //       arr.push({
// // // // //         id: i,
// // // // //         left: Math.random() * 100, // percent area
// // // // //         top: 20 + Math.random() * 60, // percent area
// // // // //         size: 1 + Math.random() * 3, // px
// // // // //         duration: 3 + Math.random() * 6, // seconds
// // // // //         delay: Math.random() * 4, // seconds
// // // // //         drift: 6 + Math.random() * 14, // px vertical drift
// // // // //         opacity: 0.12 + Math.random() * 0.6,
// // // // //       });
// // // // //     }
// // // // //     return arr;
// // // // //   }, []);

// // // // //   return (
// // // // //     <div className="flex min-h-screen bg-gray-50">
// // // // //       <AdminSidebar activePage="dashboard" />

// // // // //       <div className="flex-1 flex flex-col ml-64">
// // // // //         {/* Top bar */}
// // // // //         <div className="bg-white shadow-sm border-b border-gray-200">
// // // // //           <div className="flex items-center justify-between px-6 py-4">
// // // // //             <div>
// // // // //               <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
// // // // //               <p className="text-gray-600">Welcome back, Administrator</p>
// // // // //             </div>

// // // // //             <div className="text-right">
// // // // //               <p className="text-sm font-medium text-gray-900">Admin User</p>
// // // // //               <p className="text-xs text-gray-500">Super Admin</p>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Main content */}
// // // // //         <div className="flex-1 p-6">
// // // // //           {/* Stats */}
// // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
// // // // //             {stats.map((s, idx) => {
// // // // //               const Icon = s.icon;
// // // // //               return (
// // // // //                 <div
// // // // //                   key={idx}
// // // // //                   className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md"
// // // // //                 >
// // // // //                   <div className="flex items-center justify-between">
// // // // //                     <div>
// // // // //                       <p className="text-sm font-medium text-gray-600">{s.title}</p>
// // // // //                       <p className="text-2xl font-bold text-gray-900 mt-1">{s.value}</p>
// // // // //                       <p className={`text-sm mt-1 ${s.trend === "up" ? "text-green-600" : "text-red-600"}`}>
// // // // //                         {s.change} from last month
// // // // //                       </p>
// // // // //                     </div>
// // // // //                     <div className={`${s.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
// // // // //                       <Icon className="text-white text-lg" />
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               );
// // // // //             })}
// // // // //           </div>

// // // // //           {/* Quick actions */}
// // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // // // //             {quickActions.map((action, idx) => {
// // // // //               const Icon = action.icon;
// // // // //               return (
// // // // //                 <div
// // // // //                   key={idx}
// // // // //                   className="bg-white rounded-xl shadow-sm p-6 border group cursor-pointer"
// // // // //                   onClick={action.action}
// // // // //                 >
// // // // //                   <div className="flex items-center gap-4">
// // // // //                     <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
// // // // //                       <Icon className="text-lg" />
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <h3 className="font-semibold text-gray-600 group-hover:text-black">{action.title}</h3>
// // // // //                       <p className="text-sm text-gray-600 mt-1">{action.description}</p>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               );
// // // // //             })}
// // // // //           </div>

// // // // //           {/* Desert scene: static camel on left, sand particles moving */}
// // // // //           <div className="relative w-full mt-6">
// // // // //             <div
// // // // //               className="relative w-full h-56 rounded-xl overflow-hidden shadow-inner"
// // // // //               style={{
// // // // //                 background: "linear-gradient(180deg,#fffaf0 0%, #fdf2d5 40%, #f7e1b6 60%, #f1d39a 100%)",
// // // // //               }}
// // // // //             >
// // // // //               {/* dunes (simple layered shapes) */}
// // // // //               <div
// // // // //                 style={{
// // // // //                   position: "absolute",
// // // // //                   bottom: "-6%",
// // // // //                   left: "-5%",
// // // // //                   width: "110%",
// // // // //                   height: "60%",
// // // // //                   background:
// // // // //                     "radial-gradient(900px 160px at 10% 60%, rgba(255,255,255,0) 0%, rgba(241,211,154,0.35) 20%, rgba(241,211,154,1) 100%)",
// // // // //                   transform: "skewY(-3deg)",
// // // // //                   borderTopLeftRadius: "40%",
// // // // //                   borderTopRightRadius: "40%",
// // // // //                 }}
// // // // //               />

// // // // //               <div
// // // // //                 style={{
// // // // //                   position: "absolute",
// // // // //                   bottom: "-14%",
// // // // //                   left: "0%",
// // // // //                   width: "100%",
// // // // //                   height: "48%",
// // // // //                   background:
// // // // //                     "radial-gradient(700px 130px at 80% 70%, rgba(255,255,255,0) 0%, rgba(241,211,154,0.25) 20%, rgba(241,211,154,1) 100%)",
// // // // //                   transform: "skewY(-2deg)",
// // // // //                   borderTopLeftRadius: "44%",
// // // // //                   borderTopRightRadius: "44%",
// // // // //                 }}
// // // // //               />

// // // // //               {/* Camel (static) placed on left foreground */}
// // // // //               <div
// // // // //                 className="absolute"
// // // // //                 style={{
// // // // //                   left: 36, // px from left edge - adjust to move camel left/right
// // // // //                   bottom: 6,
// // // // //                   width: 180,
// // // // //                   pointerEvents: "none",
// // // // //                 }}
// // // // //               >
// // // // //                 <img
// // // // //                   src={camel}
// // // // //                   alt="camel"
// // // // //                   style={{
// // // // //                     width: "100%",
// // // // //                     height: "auto",
// // // // //                     objectFit: "contain",
// // // // //                     opacity: 0.98,
// // // // //                     // If you want transparency in the image, use PNG with alpha or set CSS opacity
// // // // //                   }}
// // // // //                 />
// // // // //               </div>

// // // // //               {/* moving sand particles (above dunes) */}
// // // // //               <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
// // // // //                 {particles.map((p) => {
// // // // //                   const style = {
// // // // //                     left: `${p.left}%`,
// // // // //                     top: `${p.top}%`,
// // // // //                     width: `${p.size}px`,
// // // // //                     height: `${p.size}px`,
// // // // //                     opacity: p.opacity,
// // // // //                     // pass custom values to CSS animation via CSS vars
// // // // //                     ["--dur"]: `${p.duration}s`,
// // // // //                     ["--delay"]: `${p.delay}s`,
// // // // //                     ["--drift"]: `${p.drift}px`,
// // // // //                   };
// // // // //                   return <span key={p.id} className="sand-grain" style={style} />;
// // // // //                 })}
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* styles scoped to this component */}
// // // // //       <style>{`
// // // // //         /* small sand grain */
// // // // //         .sand-grain {
// // // // //           position: absolute;
// // // // //           background: rgba(194,150,80,0.9);
// // // // //           border-radius: 50%;
// // // // //           transform: translate3d(0,0,0);
// // // // //           filter: blur(0.2px);
// // // // //           animation-name: sandFloat;
// // // // //           animation-duration: var(--dur, 4s);
// // // // //           animation-timing-function: linear;
// // // // //           animation-iteration-count: infinite;
// // // // //           animation-delay: var(--delay, 0s);
// // // // //           will-change: transform, opacity;
// // // // //         }

// // // // //         /* each grain drifts rightwards and slightly up/down */
// // // // //         @keyframes sandFloat {
// // // // //           0% {
// // // // //             transform: translateX(-8vw) translateY(0);
// // // // //             opacity: 0;
// // // // //           }
// // // // //           8% {
// // // // //             opacity: 0.2;
// // // // //           }
// // // // //           40% {
// // // // //             transform: translateX(8vw) translateY(calc(-1 * var(--drift)));
// // // // //             opacity: 0.9;
// // // // //           }
// // // // //           70% {
// // // // //             transform: translateX(20vw) translateY(calc(var(--drift) / 2));
// // // // //             opacity: 0.6;
// // // // //           }
// // // // //           95% {
// // // // //             opacity: 0.2;
// // // // //           }
// // // // //           100% {
// // // // //             transform: translateX(52vw) translateY(calc(var(--drift)));
// // // // //             opacity: 0;
// // // // //           }
// // // // //         }

// // // // //         /* responsive tweak */
// // // // //         @media (max-width: 768px) {
// // // // //           .sand-grain { filter: blur(0.3px); }
// // // // //         }
// // // // //       `}</style>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // // src/pages/admin/AdminDashboard.jsx
// // // // import React, { useState, useEffect, useMemo, useContext } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import axios from "axios";
// // // // import AdminSidebar from "../../components/admin/AdminSidebar";
// // // // import { AuthContext } from "../../App";
// // // // import {
// // // //   FaComments,
// // // //   FaFilePdf,
// // // //   FaUserCog,
// // // //   FaChartBar,
// // // //   FaBook,
// // // //   FaUsers,
// // // // } from "react-icons/fa";
// // // // // <- update this path to where your camel image actually lives
// // // // import camel from "../../assets/camel.png";

// // // // const NUM_PARTICLES = 36;

// // // // export default function AdminDashboard() {
// // // //   const { logout } = useContext(AuthContext || {});
// // // //   const navigate = useNavigate();
// // // //   const [dashboardStats, setDashboardStats] = useState({
// // // //     totalUsers: 0,
// // // //     totalQueries: 0,
// // // //   });

// // // //   useEffect(() => {
// // // //     async function fetchStats() {
// // // //       try {
// // // //         const res = await axios.get("http://localhost:5000/api/dashboard/stats");
// // // //         setDashboardStats(res.data || {});
// // // //       } catch (err) {
// // // //         console.error("Error fetching stats:", err);
// // // //       }
// // // //     }
// // // //     fetchStats();
// // // //   }, []);

// // // //   const stats = [
// // // //     {
// // // //       title: "Total Students",
// // // //       value: dashboardStats.totalUsers ?? 0,
// // // //       icon: FaUsers,
// // // //       color: "bg-blue-500",
// // // //       change: "+12%",
// // // //       trend: "up",
// // // //     },
// // // //     {
// // // //       title: "Total Queries",
// // // //       value: dashboardStats.totalQueries ?? 0,
// // // //       icon: FaComments,
// // // //       color: "bg-red-500",
// // // //       change: "+8%",
// // // //       trend: "up",
// // // //     },
// // // //   ];

// // // //   // NOTE: Knowledge Base widget removed from quickActions
// // // //   const quickActions = [
// // // //     {
// // // //       title: "File Management",
// // // //       description: "Upload and manage PDF files",
// // // //       icon: FaFilePdf,
// // // //       color: "bg-red-100 text-red-600",
// // // //       action: () => navigate("/admin/faq-generator"),
// // // //     },
// // // //     {
// // // //       title: "Manage Staff",
// // // //       description: "Add or remove staff members",
// // // //       icon: FaUserCog,
// // // //       color: "bg-yellow-100 text-yellow-600",
// // // //       action: () => navigate("/admin/staff"),
// // // //     },
// // // //     {
// // // //       title: "View Analytics",
// // // //       description: "Check system performance",
// // // //       icon: FaChartBar,
// // // //       color: "bg-green-100 text-green-600",
// // // //       action: () => navigate("/admin/analytics"),
// // // //     },
// // // //   ];

// // // //   // generate sand particles
// // // //   const particles = useMemo(() => {
// // // //     const arr = [];
// // // //     for (let i = 0; i < NUM_PARTICLES; i++) {
// // // //       arr.push({
// // // //         id: i,
// // // //         left: Math.random() * 100, // percent area
// // // //         top: 20 + Math.random() * 60, // percent area
// // // //         size: 1 + Math.random() * 3, // px
// // // //         duration: 3 + Math.random() * 6, // seconds
// // // //         delay: Math.random() * 4, // seconds
// // // //         drift: 6 + Math.random() * 14, // px vertical drift
// // // //         opacity: 0.12 + Math.random() * 0.6,
// // // //       });
// // // //     }
// // // //     return arr;
// // // //   }, []);

// // // //   return (
// // // //     <div className="flex min-h-screen bg-gray-50">
// // // //       <AdminSidebar activePage="dashboard" />
// // // //       <div className="flex-1 flex flex-col ml-64">
// // // //         {/* Top bar */}
// // // //         <div className="bg-white shadow-sm border-b border-gray-200">
// // // //           <div className="flex items-center justify-between px-6 py-4">
// // // //             <div>
// // // //               <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
// // // //               <p className="text-gray-600">Welcome back, Administrator</p>
// // // //             </div>
// // // //             <div className="text-right">
// // // //               <p className="text-sm font-medium text-gray-900">Admin User</p>
// // // //               <p className="text-xs text-gray-500">Super Admin</p>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* Main content */}
// // // //         <div className="flex-1 p-6">
// // // //           {/* Stats */}
// // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
// // // //             {stats.map((s, idx) => {
// // // //               const Icon = s.icon;
// // // //               return (
// // // //                 <div
// // // //                   key={idx}
// // // //                   className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md"
// // // //                 >
// // // //                   <div className="flex items-center justify-between">
// // // //                     <div>
// // // //                       <p className="text-sm font-medium text-gray-600">{s.title}</p>
// // // //                       <p className="text-2xl font-bold text-gray-900 mt-1">{s.value}</p>
// // // //                       <p className={`text-sm mt-1 ${s.trend === "up" ? "text-green-600" : "text-red-600"}`}>
// // // //                         {s.change} from last month
// // // //                       </p>
// // // //                     </div>
// // // //                     <div className={`${s.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
// // // //                       <Icon className="text-white text-lg" />
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               );
// // // //             })}
// // // //           </div>

// // // //           {/* Quick actions (Knowledge Base removed) */}
// // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // // //             {quickActions.map((action, idx) => {
// // // //               const Icon = action.icon;
// // // //               return (
// // // //                 <div
// // // //                   key={idx}
// // // //                   className="bg-white rounded-xl shadow-sm p-6 border group cursor-pointer"
// // // //                   onClick={action.action}
// // // //                 >
// // // //                   <div className="flex items-center gap-4">
// // // //                     <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
// // // //                       <Icon className="text-lg" />
// // // //                     </div>
// // // //                     <div>
// // // //                       <h3 className="font-semibold text-gray-600 group-hover:text-black">{action.title}</h3>
// // // //                       <p className="text-sm text-gray-600 mt-1">{action.description}</p>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               );
// // // //             })}
// // // //           </div>

// // // //           {/* Desert scene: static camel on left, sand particles moving */}
// // // //           <div className="relative w-full mt-6">
// // // //             <div
// // // //               className="relative w-full h-56 rounded-xl overflow-hidden shadow-inner"
// // // //               style={{
// // // //                 background: "linear-gradient(180deg,#fffaf0 0%, #fdf2d5 40%, #f7e1b6 60%, #f1d39a 100%)",
// // // //               }}
// // // //             >
// // // //               {/* dunes (simple layered shapes) */}
// // // //               <div
// // // //                 style={{
// // // //                   position: "absolute",
// // // //                   bottom: "-6%",
// // // //                   left: "-5%",
// // // //                   width: "110%",
// // // //                   height: "60%",
// // // //                   background:
// // // //                     "radial-gradient(900px 160px at 10% 60%, rgba(255,255,255,0) 0%, rgba(241,211,154,0.35) 20%, rgba(241,211,154,1) 100%)",
// // // //                   transform: "skewY(-3deg)",
// // // //                   borderTopLeftRadius: "40%",
// // // //                   borderTopRightRadius: "40%",
// // // //                 }}
// // // //               />
// // // //               <div
// // // //                 style={{
// // // //                   position: "absolute",
// // // //                   bottom: "-14%",
// // // //                   left: "0%",
// // // //                   width: "100%",
// // // //                   height: "48%",
// // // //                   background:
// // // //                     "radial-gradient(700px 130px at 80% 70%, rgba(255,255,255,0) 0%, rgba(241,211,154,0.25) 20%, rgba(241,211,154,1) 100%)",
// // // //                   transform: "skewY(-2deg)",
// // // //                   borderTopLeftRadius: "44%",
// // // //                   borderTopRightRadius: "44%",
// // // //                 }}
// // // //               />

// // // //               {/* Camel (static) placed on left foreground */}
// // // //               <div
// // // //                 className="absolute"
// // // //                 style={{
// // // //                   left: 36, // px from left edge - adjust to move camel left/right
// // // //                   bottom: 6,
// // // //                   width: 180,
// // // //                   pointerEvents: "none",
// // // //                 }}
// // // //               >
// // // //                 <img
// // // //                   src={camel}
// // // //                   alt="camel"
// // // //                   style={{
// // // //                     width: "100%",
// // // //                     height: "auto",
// // // //                     objectFit: "contain",
// // // //                     opacity: 0.98,
// // // //                   }}
// // // //                 />
// // // //               </div>

// // // //               {/* moving sand particles (above dunes) */}
// // // //               <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
// // // //                 {particles.map((p) => {
// // // //                   const style = {
// // // //                     left: `${p.left}%`,
// // // //                     top: `${p.top}%`,
// // // //                     width: `${p.size}px`,
// // // //                     height: `${p.size}px`,
// // // //                     opacity: p.opacity,
// // // //                     // pass custom values to CSS animation via CSS vars
// // // //                     ["--dur"]: `${p.duration}s`,
// // // //                     ["--delay"]: `${p.delay}s`,
// // // //                     ["--drift"]: `${p.drift}px`,
// // // //                   };
// // // //                   return <span key={p.id} className="sand-grain" style={style} />;
// // // //                 })}
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* styles scoped to this component */}
// // // //       <style>{`
// // // //         /* small sand grain */
// // // //         .sand-grain {
// // // //           position: absolute;
// // // //           background: rgba(194,150,80,0.9);
// // // //           border-radius: 50%;
// // // //           transform: translate3d(0,0,0);
// // // //           filter: blur(0.2px);
// // // //           animation-name: sandFloat;
// // // //           animation-duration: var(--dur, 4s);
// // // //           animation-timing-function: linear;
// // // //           animation-iteration-count: infinite;
// // // //           animation-delay: var(--delay, 0s);
// // // //           will-change: transform, opacity;
// // // //         }
// // // //         /* each grain drifts rightwards and slightly up/down */
// // // //         @keyframes sandFloat {
// // // //           0% {
// // // //             transform: translateX(-8vw) translateY(0);
// // // //             opacity: 0;
// // // //           }
// // // //           8% {
// // // //             opacity: 0.2;
// // // //           }
// // // //           40% {
// // // //             transform: translateX(8vw) translateY(calc(-1 * var(--drift)));
// // // //             opacity: 0.9;
// // // //           }
// // // //           70% {
// // // //             transform: translateX(20vw) translateY(calc(var(--drift) / 2));
// // // //             opacity: 0.6;
// // // //           }
// // // //           95% {
// // // //             opacity: 0.2;
// // // //           }
// // // //           100% {
// // // //             transform: translateX(52vw) translateY(calc(var(--drift)));
// // // //             opacity: 0;
// // // //           }
// // // //         }
// // // //         /* responsive tweak */
// // // //         @media (max-width: 768px) {
// // // //           .sand-grain { filter: blur(0.3px); }
// // // //         }
// // // //       `}</style>
// // // //     </div>
// // // //   );
// // // // }

// // // import React, { useState, useContext, useEffect, useMemo } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import axios from "axios";
// // // import AdminSidebar from "../../components/admin/AdminSidebar";
// // // import { AuthContext } from "../../App";

// // // import {
// // //   FaUsers,
// // //   FaComments,
// // //   FaFilePdf,
// // //   FaUserCog,
// // //   FaChartBar,
// // //   FaBook,
// // // } from "react-icons/fa";

// // // import camel from "../../assets/camel.png";

// // // const NUM_PARTICLES = 36;

// // // const AdminDashboard = () => {
// // //   const { logout } = useContext(AuthContext);
// // //   const navigate = useNavigate();

// // //   const [dashboardStats, setDashboardStats] = useState({
// // //     totalUsers: 0,
// // //     totalQueries: 0,
// // //   });

// // //   useEffect(() => {
// // //     const fetchStats = async () => {
// // //       try {
// // //         const response = await axios.get("http://localhost:5000/api/dashboard/stats");
// // //         setDashboardStats(response.data || {});
// // //       } catch (err) {
// // //         console.error("Error fetching stats:", err);
// // //       }
// // //     };
// // //     fetchStats();
// // //   }, []);

// // //   const stats = [
// // //     {
// // //       title: "Total Students",
// // //       value: dashboardStats.totalUsers ?? 0,
// // //       icon: FaUsers,
// // //       color: "bg-blue-500",
// // //       change: "+12%",
// // //       trend: "up",
// // //     },
// // //     {
// // //       title: "Total Queries",
// // //       value: dashboardStats.totalQueries ?? 0,
// // //       icon: FaComments,
// // //       color: "bg-red-500",
// // //       change: "+8%",
// // //       trend: "up",
// // //     },
// // //   ];

// // //   const quickActions = [
// // //     {
// // //       title: "File Management",
// // //       description: "Upload and manage PDF files",
// // //       icon: FaFilePdf,
// // //       color: "bg-red-100 text-red-600",
// // //       action: () => navigate("/admin/faq-generator"),
// // //     },
// // //     {
// // //       title: "Manage Staff",
// // //       description: "Add or remove staff members",
// // //       icon: FaUserCog,
// // //       color: "bg-yellow-100 text-yellow-600",
// // //       action: () => navigate("/admin/staff"),
// // //     },
// // //     {
// // //       title: "Knowledge Base",
// // //       description: "Manage knowledge base content",
// // //       icon: FaBook,
// // //       color: "bg-blue-100 text-blue-600",
// // //       action: () => navigate("/admin/knowledge-base"),
// // //     },
// // //     {
// // //       title: "View Analytics",
// // //       description: "Check system performance",
// // //       icon: FaChartBar,
// // //       color: "bg-green-100 text-green-600",
// // //       action: () => navigate("/admin/analytics"),
// // //     },
// // //   ];

// // //   // Sand particles
// // //   const particles = useMemo(() => {
// // //     const arr = [];
// // //     for (let i = 0; i < NUM_PARTICLES; i++) {
// // //       arr.push({
// // //         id: i,
// // //         left: Math.random() * 100,
// // //         top: 30 + Math.random() * 50,
// // //         size: 1 + Math.random() * 3,
// // //         duration: 3 + Math.random() * 5,
// // //         delay: Math.random() * 3,
// // //         drift: 6 + Math.random() * 12,
// // //         opacity: 0.15 + Math.random() * 0.5,
// // //       });
// // //     }
// // //     return arr;
// // //   }, []);

// // //   return (
// // //     <div className="flex min-h-screen bg-gray-50">
// // //       <AdminSidebar activePage="dashboard" />

// // //       <div className="flex-1 flex flex-col ml-64">
// // //         {/* Top Bar */}
// // //         <div className="bg-white shadow-sm border-b border-gray-200">
// // //           <div className="flex items-center justify-between px-6 py-4">
// // //             <div>
// // //               <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
// // //               <p className="text-gray-600">Welcome back, Administrator</p>
// // //             </div>

// // //             <div className="text-right">
// // //               <p className="text-sm font-medium text-gray-900">Admin User</p>
// // //               <p className="text-xs text-gray-500">Super Admin</p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Main Content */}
// // //         <div className="flex-1 p-6">

// // //           {/* Stats */}
// // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
// // //             {stats.map((stat, i) => {
// // //               const Icon = stat.icon;
// // //               return (
// // //                 <div key={i} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md">
// // //                   <div className="flex justify-between items-center">
// // //                     <div>
// // //                       <p className="text-sm text-gray-600">{stat.title}</p>
// // //                       <p className="text-2xl font-bold mt-1">{stat.value}</p>
// // //                       <p className={`text-sm mt-1 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
// // //                         {stat.change} from last month
// // //                       </p>
// // //                     </div>
// // //                     <div className={`${stat.color} w-12 h-12 flex items-center justify-center rounded-lg`}>
// // //                       <Icon className="text-white text-lg" />
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               );
// // //             })}
// // //           </div>

// // //           {/* Quick Action Widgets — UNIFORM PADDING + HEIGHT */}
// // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // //             {quickActions.map((action, i) => {
// // //               const Icon = action.icon;
// // //               return (
// // //                 <div
// // //                   key={i}
// // //                   onClick={action.action}
// // //                   className="cursor-pointer bg-white rounded-xl shadow-sm border p-6 flex flex-col justify-center hover:shadow-md transition"
// // //                   style={{
// // //                     height: "150px",        // uniform widget height
// // //                   }}
// // //                 >
// // //                   <div className="flex items-center gap-4">
// // //                     <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
// // //                       <Icon className="text-lg" />
// // //                     </div>

// // //                     <div>
// // //                       <h3 className="font-semibold text-gray-700">{action.title}</h3>
// // //                       <p className="text-sm text-gray-500 mt-1">{action.description}</p>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               );
// // //             })}
// // //           </div>

// // //           {/* Desert Background with Camel + Sand Particles */}
// // //           <div className="relative w-full mt-6">
// // //             <div
// // //               className="relative w-full h-64 rounded-xl overflow-hidden shadow-inner"
// // //               style={{
// // //                 background:
// // //                   "linear-gradient(180deg,#fffaf0 0%, #fdf2d5 40%, #f7e1b6 60%, #f1d39a 100%)",
// // //               }}
// // //             >
// // //               {/* Camel */}
// // //               <div className="absolute bottom-3 left-6 w-40 pointer-events-none">
// // //                 <img src={camel} alt="camel" className="w-full h-auto" />
// // //               </div>

// // //               {/* Sand particles animation */}
// // //               <div className="absolute inset-0 pointer-events-none">
// // //                 {particles.map((p) => (
// // //                   <span
// // //                     key={p.id}
// // //                     className="sand-grain"
// // //                     style={{
// // //                       left: `${p.left}%`,
// // //                       top: `${p.top}%`,
// // //                       width: `${p.size}px`,
// // //                       height: `${p.size}px`,
// // //                       opacity: p.opacity,
// // //                       "--dur": `${p.duration}s`,
// // //                       "--delay": `${p.delay}s`,
// // //                       "--drift": `${p.drift}px`,
// // //                     }}
// // //                   />
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </div>

// // //         </div>
// // //       </div>

// // //       {/* Sand Grain Animation CSS */}
// // //       <style>{`
// // //         .sand-grain {
// // //           position: absolute;
// // //           background: rgba(194,150,80,0.85);
// // //           border-radius: 50%;
// // //           animation: sandFloat var(--dur) linear infinite var(--delay);
// // //         }

// // //         @keyframes sandFloat {
// // //           0% { transform: translateX(-4vw) translateY(0); opacity: 0; }
// // //           10% { opacity: 0.8; }
// // //           50% { transform: translateX(25vw) translateY(calc(-1 * var(--drift))); opacity: 1; }
// // //           90% { opacity: 0.3; }
// // //           100% { transform: translateX(55vw) translateY(var(--drift)); opacity: 0; }
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // // export default AdminDashboard;

// // // src/pages/admin/AdminDashboard.jsx
// // import React, { useState, useEffect, useMemo, useContext } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import AdminSidebar from "../../components/admin/AdminSidebar";
// // import { AuthContext } from "../../App";
// // import {
// //   FaUsers,
// //   FaComments,
// //   FaFilePdf,
// //   FaUserCog,
// //   FaChartBar,
// // } from "react-icons/fa";
// // import camel from "../../assets/camel.png"; // update path if needed

// // const NUM_PARTICLES = 36;

// // export default function AdminDashboard() {
// //   const { logout } = useContext(AuthContext || {});
// //   const navigate = useNavigate();
// //   const [dashboardStats, setDashboardStats] = useState({
// //     totalUsers: 0,
// //     totalQueries: 0,
// //   });

// //   useEffect(() => {
// //     async function fetchStats() {
// //       try {
// //         const res = await axios.get("http://localhost:5000/api/dashboard/stats");
// //         setDashboardStats(res.data || {});
// //       } catch (err) {
// //         console.error("Error fetching stats:", err);
// //       }
// //     }
// //     fetchStats();
// //   }, []);

// //   const stats = [
// //     {
// //       title: "Total Students",
// //       value: dashboardStats.totalUsers ?? 0,
// //       icon: FaUsers,
// //       color: "bg-blue-500",
// //       change: "+12%",
// //       trend: "up",
// //     },
// //     {
// //       title: "Total Queries",
// //       value: dashboardStats.totalQueries ?? 0,
// //       icon: FaComments,
// //       color: "bg-red-500",
// //       change: "+8%",
// //       trend: "up",
// //     },
// //   ];

// //   // QUICK ACTIONS: removed Knowledge Base (only 3 widgets remain)
// //   const quickActions = [
// //     {
// //       title: "File Management",
// //       description: "Upload and manage PDF files",
// //       icon: FaFilePdf,
// //       color: "bg-red-100 text-red-600",
// //       action: () => navigate("/admin/faq-generator"),
// //     },
// //     {
// //       title: "Manage Staff",
// //       description: "Add or remove staff members",
// //       icon: FaUserCog,
// //       color: "bg-yellow-100 text-yellow-600",
// //       action: () => navigate("/admin/staff"),
// //     },
// //     {
// //       title: "View Analytics",
// //       description: "Check system performance",
// //       icon: FaChartBar,
// //       color: "bg-green-100 text-green-600",
// //       action: () => navigate("/admin/analytics"),
// //     },
// //   ];

// //   // generate sand particles
// //   const particles = useMemo(() => {
// //     const arr = [];
// //     for (let i = 0; i < NUM_PARTICLES; i += 1) {
// //       arr.push({
// //         id: i,
// //         left: Math.random() * 100,
// //         top: 20 + Math.random() * 60,
// //         size: 1 + Math.random() * 3,
// //         duration: 3 + Math.random() * 6,
// //         delay: Math.random() * 4,
// //         drift: 6 + Math.random() * 14,
// //         opacity: 0.12 + Math.random() * 0.6,
// //       });
// //     }
// //     return arr;
// //   }, []);

// //   return (
// //     <div className="flex min-h-screen bg-gray-50">
// //       <AdminSidebar activePage="dashboard" />

// //       <div className="flex-1 flex flex-col ml-64">
// //         {/* Top bar */}
// //         <div className="bg-white shadow-sm border-b border-gray-200">
// //           <div className="flex items-center justify-between px-6 py-4">
// //             <div>
// //               <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
// //               <p className="text-gray-600">Welcome back, Administrator</p>
// //             </div>
// //             <div className="text-right">
// //               <p className="text-sm font-medium text-gray-900">Admin User</p>
// //               <p className="text-xs text-gray-500">Super Admin</p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Main content */}
// //         <div className="flex-1 p-6">
// //           {/* Stats */}
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">

// //   {stats.map((stat, index) => {
// //     const Icon = stat.icon;

// //     return (
// //       <div
// //         key={index}
// //         className="bg-white rounded-xl shadow-sm 
// //                    p-4            
// //                    border border-gray-200 
// //                    hover:shadow-md
// //                    max-w-sm       
// //                    w-full"
// //       >
// //         <div className="flex items-center justify-between">
// //           <div>
// //             <p className="text-sm font-medium text-gray-600">{stat.title}</p>

// //             <p className="text-xl font-bold text-gray-900 mt-1"> {/* Smaller text */}
// //               {stat.value}
// //             </p>

// //             <p
// //               className={`text-xs mt-1 ${
// //                 stat.trend === "up" ? "text-green-600" : "text-red-600"
// //               }`}
// //             >
// //               {stat.change} from last month
// //             </p>
// //           </div>

// //           <div
// //             className={`${stat.color} 
// //                        w-10 h-10  
// //                        rounded-lg flex items-center justify-center`}
// //           >
// //             <Icon className="text-white text-md" />
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   })}

// // </div>

// //                   <div className="flex items-center justify-between">
// //                     <div>
// //                       <p className="text-sm font-medium text-gray-600">{s.title}</p>
// //                       <p className="text-2xl font-bold text-gray-900 mt-1">{s.value}</p>
// //                       <p className={`text-sm mt-1 ${s.trend === "up" ? "text-green-600" : "text-red-600"}`}>
// //                         {s.change} from last month
// //                       </p>
// //                     </div>
// //                     <div className={`${s.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
// //                       <Icon className="text-white text-lg" />
// //                     </div>
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>

// //           {/* Quick actions: uniform padding + sizing for all three widgets */}
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //             {quickActions.map((action, idx) => {
// //               const Icon = action.icon;
// //               return (
// //                 <button
// //                   key={idx}
// //                   onClick={action.action}
// //                   className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md p-6 min-h-[88px] flex items-center gap-4 text-left"
// //                   type="button"
// //                 >
// //                   {/* left icon box */}
// //                   <div className={`${action.color} w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0`}>
// //                     <Icon className="text-lg" />
// //                   </div>

// //                   {/* title + description */}
// //                   <div className="flex-1">
// //                     <h3 className="font-semibold text-gray-700">{action.title}</h3>
// //                     <p className="text-sm text-gray-500 mt-1">{action.description}</p>
// //                   </div>
// //                 </button>
// //               );
// //             })}
// //           </div>

// //           {/* Desert scene: static camel on left, sand particles moving */}
// //           <div className="relative w-full mt-6">
// //             <div
// //               className="relative w-full h-56 rounded-xl overflow-hidden shadow-inner"
// //               style={{
// //                 background: "linear-gradient(180deg,#fffaf0 0%, #fdf2d5 40%, #f7e1b6 60%, #f1d39a 100%)",
// //               }}
// //             >
// //               {/* dunes */}
// //               <div
// //                 style={{
// //                   position: "absolute",
// //                   bottom: "-6%",
// //                   left: "-5%",
// //                   width: "110%",
// //                   height: "60%",
// //                   background:
// //                     "radial-gradient(900px 160px at 10% 60%, rgba(255,255,255,0) 0%, rgba(241,211,154,0.35) 20%, rgba(241,211,154,1) 100%)",
// //                   transform: "skewY(-3deg)",
// //                   borderTopLeftRadius: "40%",
// //                   borderTopRightRadius: "40%",
// //                 }}
// //               />
// //               <div
// //                 style={{
// //                   position: "absolute",
// //                   bottom: "-14%",
// //                   left: "0%",
// //                   width: "100%",
// //                   height: "48%",
// //                   background:
// //                     "radial-gradient(700px 130px at 80% 70%, rgba(255,255,255,0) 0%, rgba(241,211,154,0.25) 20%, rgba(241,211,154,1) 100%)",
// //                   transform: "skewY(-2deg)",
// //                   borderTopLeftRadius: "44%",
// //                   borderTopRightRadius: "44%",
// //                 }}
// //               />

// //               {/* Camel - placed on left foreground */}
// //               <div
// //                 style={{
// //                   position: "absolute",
// //                   bottom: 6,
// //                   left: 28,
// //                   width: 180,
// //                   pointerEvents: "none",
// //                 }}
// //               >
// //                 <img
// //                   src={camel}
// //                   alt="camel"
// //                   style={{
// //                     width: "100%",
// //                     height: "auto",
// //                     objectFit: "contain",
// //                   }}
// //                 />
// //               </div>

// //               {/* animated sand grains */}
// //               <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
// //                 {particles.map((p) => {
// //                   const style = {
// //                     left: `${p.left}%`,
// //                     top: `${p.top}%`,
// //                     width: `${p.size}px`,
// //                     height: `${p.size}px`,
// //                     opacity: p.opacity,
// //                     // CSS variables for animation (React accepts them as keys)
// //                     "--dur": `${p.duration}s`,
// //                     "--delay": `${p.delay}s`,
// //                     "--drift": `${p.drift}px`,
// //                   };
// //                   return <span key={p.id} className="sand-grain" style={style} />;
// //                 })}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* scoped styles for sand animation */}
// //       <style>{`
// //         .sand-grain {
// //           position: absolute;
// //           background: rgba(194,150,80,0.9);
// //           border-radius: 50%;
// //           transform: translate3d(0,0,0);
// //           filter: blur(0.2px);
// //           animation-name: sandFloat;
// //           animation-duration: var(--dur, 4s);
// //           animation-timing-function: linear;
// //           animation-iteration-count: infinite;
// //           animation-delay: var(--delay, 0s);
// //           will-change: transform, opacity;
// //         }
// //         @keyframes sandFloat {
// //           0% {
// //             transform: translateX(-8vw) translateY(0);
// //             opacity: 0;
// //           }
// //           8% {
// //             opacity: 0.2;
// //           }
// //           40% {
// //             transform: translateX(8vw) translateY(calc(-1 * var(--drift)));
// //             opacity: 0.9;
// //           }
// //           70% {
// //             transform: translateX(20vw) translateY(calc(var(--drift) / 2));
// //             opacity: 0.6;
// //           }
// //           95% {
// //             opacity: 0.2;
// //           }
// //           100% {
// //             transform: translateX(52vw) translateY(calc(var(--drift)));
// //             opacity: 0;
// //           }
// //         }
// //         @media (max-width: 768px) {
// //           .sand-grain { filter: blur(0.3px); }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }

// // src/pages/admin/AdminDashboard.jsx
// import React, { useState, useEffect, useMemo, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import { AuthContext } from "../../App";
// import { FaUsers, FaComments, FaFilePdf, FaUserCog, FaChartBar } from "react-icons/fa";
// import camel from "../../assets/camel.png"; // update path if needed

// const NUM_PARTICLES = 36;

// export default function AdminDashboard() {
//   const { logout } = useContext(AuthContext || {});
//   const navigate = useNavigate();

//   const [dashboardStats, setDashboardStats] = useState({
//     totalUsers: 0,
//     totalQueries: 0,
//   });

//   useEffect(() => {
//     async function fetchStats() {
//       try {
//         const res = await axios.get("http://localhost:5000/api/dashboard/stats");
//         setDashboardStats(res.data || {});
//       } catch (err) {
//         console.error("Error fetching stats:", err);
//       }
//     }
//     fetchStats();
//   }, []);

//   const stats = [
//     {
//       id: "students",
//       title: "Total Students",
//       value: dashboardStats.totalUsers ?? 0,
//       icon: FaUsers,
//       color: "bg-blue-500",
//       change: "+12%",
//       trend: "up",
//     },
//     {
//       id: "queries",
//       title: "Total Queries",
//       value: dashboardStats.totalQueries ?? 0,
//       icon: FaComments,
//       color: "bg-red-500",
//       change: "+8%",
//       trend: "up",
//     },
//   ];

//   // QUICK ACTIONS: Knowledge Base removed (3 widgets)
//   const quickActions = [
//     {
//       title: "File Management",
//       description: "Upload and manage PDF files",
//       icon: FaFilePdf,
//       color: "bg-red-100 text-red-600",
//       action: () => navigate("/admin/faq-generator"),
//     },
//     {
//       title: "Manage Staff",
//       description: "Add or remove staff members",
//       icon: FaUserCog,
//       color: "bg-yellow-100 text-yellow-600",
//       action: () => navigate("/admin/staff"),
//     },
//     {
//       title: "View Analytics",
//       description: "Check system performance",
//       icon: FaChartBar,
//       color: "bg-green-100 text-green-600",
//       action: () => navigate("/admin/analytics"),
//     },
//   ];

//   // Sand particles generator (visual only)
//   const particles = useMemo(() => {
//     const arr = [];
//     for (let i = 0; i < NUM_PARTICLES; i++) {
//       arr.push({
//         id: i,
//         left: Math.random() * 100,
//         top: 20 + Math.random() * 60,
//         size: 1 + Math.random() * 3,
//         duration: 3 + Math.random() * 6,
//         delay: Math.random() * 4,
//         drift: 6 + Math.random() * 14,
//         opacity: 0.12 + Math.random() * 0.6,
//       });
//     }
//     return arr;
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <AdminSidebar activePage="dashboard" />
//       <div className="flex-1 flex flex-col ml-64">
//         {/* Top bar */}
//         <div className="bg-white shadow-sm border-b border-gray-200">
//           <div className="flex items-center gap-4 justify-between px-10 py-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
//               <p className="text-gray-600">Welcome back, Administrator</p>
//             </div>
//             {/* <div className="text-right">
//                 <img
//               src="data:image/jpeg;base64,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"  
//               alt="Admin Profile"
//               className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-md"
//                />
//               <div>
//                 <p className="text-sm font-medium text-gray-900">Admin User</p>
//               <p className="text-xs text-gray-500">Super Admin</p>
//               </div> */}

//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
//                   <img
//                     src="data:image/jpeg;base64,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"  
//                     alt="Admin Profile"
//                     className="h-10 w-20 rounded-full object-cover border-2 border-gray-300"/>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm font-medium text-gray-900">Admin User</p>
//                   <p className="text-xs text-gray-500">Super Admin</p>
//                 </div>
//               </div>

            

//           </div>
//         </div>

//         {/* Main content */}
//         <div className="flex-1 p-6">
//           {/* Stats row (only two stat cards) */}
//           <div className="flex flex-col md:flex-row md:items-start md:gap-6 mb-8">
//             {stats.map((stat) => {
//               const Icon = stat.icon;
//               return (
//                 // -- Only these stat cards are set to smaller width and consistent padding --
//                 <div
//                   key={stat.id}
//                   className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md mb-4 md:mb-0 flex-shrink-0"
//                   style={{
//                     maxWidth: 420, // reduced width for stat cards
//                     width: "100%",
//                     padding: "16px", // consistent padding
//                   }}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">{stat.title}</p>
//                       <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
//                       <p className={`text-sm mt-1 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
//                         {stat.change} from last month
//                       </p>
//                     </div>
//                     <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center ml-4`}>
//                       <Icon className="text-white text-lg" />
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Quick action widgets — unchanged styling except they are uniform */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             {quickActions.map((action, idx) => {
//               const Icon = action.icon;
//               return (
//                 <button
//                   key={idx}
//                   onClick={action.action}
//                   type="button"
//                   className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md p-6 min-h-[88px] flex items-center gap-4 text-left transition"
//                 >
//                   <div className={`${action.color} w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0`}>
//                     <Icon className="text-lg" />
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="font-semibold text-gray-700">{action.title}</h3>
//                     <p className="text-sm text-gray-500 mt-1">{action.description}</p>
//                   </div>
//                 </button>
//               );
//             })}
//           </div>

//           {/* Decorative desert + camel area */}
//           <div className="relative w-full mt-20 ">
//             <div
//               className="relative w-full h-68 rounded-xl overflow-hidden "
//               style={{
//                 background: "linear-gradient(180deg,#fffaf0 0%, #fdf2d5 40%, #f7e1b6 60%, #f1d39a 100%)",
//               }}
//             >
//               {/* dunes */}
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: "-2%",
//                   left: "-10%",
//                   width: "100%",
//                   height: "40%",
//                   background:
//                     "radial-gradient(900px 160px at 10% 60%, rgba(255,255,255,0) 0%, rgba(241,211,154,0.35) 20%, rgba(241,211,154,1) 100%)",
//                   transform: "skewY(-3deg)",
//                   borderTopLeftRadius: "40%",
//                   borderTopRightRadius: "40%",
//                 }}
//               />
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: "-16%",
//                   left: "0%",
//                   width: "100%",
//                   height: "58%",
//                   background:
//                     "radial-gradient(700px 130px at 80% 70%, rgba(255,255,255,0) 0%, rgba(241,211,154,0.25) 20%, rgba(241,211,154,1) 100%)",
//                   transform: "skewY(-2deg)",
//                   borderTopLeftRadius: "44%",
//                   borderTopRightRadius: "44%",
//                 }}
//               />
//               {/* Camel (foreground on left) */}
//               <div
//                 style={{
//                   position: "absolut",
//                   bottom: 2,
//                   left: 25,
//                   width: 180,
//                   pointerEvents: "none",
//                 }}
//               >
//                 <img src={camel} alt="camel" style={{ width: "100%", height: "auto", objectFit: "contain" }} />
//               </div>

//               {/* animated sand grains */}
//               <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
//                 {particles.map((p) => {
//                   const style = {
//                     left: `${p.left}%`,
//                     top: `${p.top}%`,
//                     width: `${p.size}px`,
//                     height: `${p.size}px`,
//                     opacity: p.opacity,
//                     // CSS vars for animation
//                     "--dur": `${p.duration}s`,
//                     "--delay": `${p.delay}s`,
//                     "--drift": `${p.drift}px`,
//                   };
//                   return <span key={p.id} className="sand-grain" style={style} />;
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* component-scoped styles (sand animation) */}
//       <style>{`
//         .sand-grain {
//           position: absolute;
//           background: rgba(194,150,80,0.9);
//           border-radius: 50%;
//           transform: translate3d(0,0,0);
//           filter: blur(0.2px);
//           animation-name: sandFloat;
//           animation-duration: var(--dur, 4s);
//           animation-timing-function: linear;
//           animation-iteration-count: infinite;
//           animation-delay: var(--delay, 0s);
//           will-change: transform, opacity;
//         }
//         @keyframes sandFloat {
//           0% {
//             transform: translateX(-8vw) translateY(0);
//             opacity: 0;
//           }
//           8% {
//             opacity: 0.2;
//           }
//           40% {
//             transform: translateX(8vw) translateY(calc(-1 * var(--drift)));
//             opacity: 0.9;
//           }
//           70% {
//             transform: translateX(20vw) translateY(calc(var(--drift) / 2));
//             opacity: 0.6;
//           }
//           95% {
//             opacity: 0.2;
//           }
//           100% {
//             transform: translateX(52vw) translateY(calc(var(--drift)));
//             opacity: 0;
//           }
//         }
//         @media (max-width: 768px) {
//           .sand-grain { filter: blur(0.3px); }
//         }
//       `}</style>
//     </div>
//   );
// }


// --------------------------------
// import React, { useState, useEffect, useMemo, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import { AuthContext } from "../../App";
// import { FaUsers, FaComments, FaFilePdf, FaUserCog, FaChartBar } from "react-icons/fa";
// import camel from "../../assets/camel.png";
// import StarSpinner from "../../components/common/StarSpinner";

// const NUM_PARTICLES = 36;

// export default function AdminDashboard() {
//   const { logout } = useContext(AuthContext || {});
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [statsLoading, setStatsLoading] = useState(false);
//   const [dashboardStats, setDashboardStats] = useState({
//     totalUsers: 0,
//     totalQueries: 0,
//   });

//   useEffect(() => {
//     async function fetchStats() {
//       try {
//         setLoading(true);
//         const res = await axios.get("http://localhost:5000/api/dashboard/stats");
//         setDashboardStats(res.data || {});
//       } catch (err) {
//         console.error("Error fetching stats:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchStats();
//   }, []);

//   const handleRefreshStats = async () => {
//     setStatsLoading(true);
//     try {
//       const res = await axios.get("http://localhost:5000/api/dashboard/stats");
//       setDashboardStats(res.data || {});
//     } catch (err) {
//       console.error("Error refreshing stats:", err);
//     } finally {
//       setStatsLoading(false);
//     }
//   };

//   const stats = [
//     {
//       id: "students",
//       title: "Total Students",
//       value: dashboardStats.totalUsers ?? 0,
//       icon: FaUsers,
//       color: "bg-blue-500",
//       change: "+12%",
//       trend: "up",
//     },
//     {
//       id: "queries",
//       title: "Total Queries",
//       value: dashboardStats.totalQueries ?? 0,
//       icon: FaComments,
//       color: "bg-red-500",
//       change: "+8%",
//       trend: "up",
//     },
//   ];

//   const quickActions = [
//     {
//       title: "File Management",
//       description: "Upload and manage PDF files",
//       icon: FaFilePdf,
//       color: "bg-red-100 text-red-600",
//       action: () => navigate("/admin/faq-generator"),
//     },
//     {
//       title: "Manage Staff",
//       description: "Add or remove staff members",
//       icon: FaUserCog,
//       color: "bg-yellow-100 text-yellow-600",
//       action: () => navigate("/admin/staff"),
//     },
//     {
//       title: "View Analytics",
//       description: "Check system performance",
//       icon: FaChartBar,
//       color: "bg-green-100 text-green-600",
//       action: () => navigate("/admin/analytics"),
//     },
//   ];

//   const particles = useMemo(() => {
//     const arr = [];
//     for (let i = 0; i < NUM_PARTICLES; i++) {
//       arr.push({
//         id: i,
//         left: Math.random() * 100,
//         top: 20 + Math.random() * 60,
//         size: 1 + Math.random() * 3,
//         duration: 3 + Math.random() * 6,
//         delay: Math.random() * 4,
//         drift: 6 + Math.random() * 14,
//         opacity: 0.12 + Math.random() * 0.6,
//       });
//     }
//     return arr;
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex min-h-screen bg-gray-50">
//         <AdminSidebar activePage="dashboard" />
//         <div className="flex-1 flex flex-col ml-64">
//           <div className="bg-white shadow-sm border-b border-gray-200">
//             <div className="flex items-center gap-4 justify-between px-10 py-4">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
//                 <p className="text-gray-600">Loading...</p>
//               </div>
//             </div>
//           </div>
//           <div className="flex-1 flex items-center justify-center">
//             <StarSpinner 
//               size="large" 
//               text="Loading dashboard data..." 
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const sandStyles = `
//     .sand-grain {
//       position: absolute;
//       background: rgba(194,150,80,0.9);
//       border-radius: 50%;
//       transform: translate3d(0,0,0);
//       filter: blur(0.2px);
//       animation-name: sandFloat;
//       animation-duration: var(--dur, 4s);
//       animation-timing-function: linear;
//       animation-iteration-count: infinite;
//       animation-delay: var(--delay, 0s);
//       will-change: transform, opacity;
//     }
//     @keyframes sandFloat {
//       0% {
//         transform: translateX(-8vw) translateY(0);
//         opacity: 0;
//       }
//       8% {
//         opacity: 0.2;
//       }
//       40% {
//         transform: translateX(8vw) translateY(calc(-1 * var(--drift)));
//         opacity: 0.9;
//       }
//       70% {
//         transform: translateX(20vw) translateY(calc(var(--drift) / 2));
//         opacity: 0.6;
//       }
//       95% {
//         opacity: 0.2;
//       }
//       100% {
//         transform: translateX(52vw) translateY(calc(var(--drift)));
//         opacity: 0;
//       }
//     }
//     @media (max-width: 768px) {
//       .sand-grain { filter: blur(0.3px); }
//     }
//   `;

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <AdminSidebar activePage="dashboard" />
//       <div className="flex-1 flex flex-col ml-64">
//         <div className="bg-white shadow-sm border-b border-gray-200">
//           <div className="flex items-center gap-4 justify-between px-10 py-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
//               <p className="text-gray-600">Welcome back, Administrator</p>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={handleRefreshStats}
//                 className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-sm hover:shadow min-w-[120px] justify-center"
//                 disabled={statsLoading}
//               >
//                 {statsLoading ? (
//                   <>
//                     <div className="w-4 h-4">
//                       <StarSpinner size="small" text="" />
//                     </div>
//                     <span>Refreshing...</span>
//                   </>
//                 ) : (
//                   <>
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                     </svg>
//                     <span>Refresh</span>
//                   </>
//                 )}
//               </button>
              
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
//                   <img
//                     src="data:image/jpeg;base64,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"  
//                     alt="Admin Profile"
//                     className="h-10 w-20 rounded-full object-cover border-2 border-gray-300"/>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm font-medium text-gray-900">Admin User</p>
//                   <p className="text-xs text-gray-500">Super Admin</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//         <div className="flex-1 p-6">
//           {statsLoading && (
//             <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
//               <div className="bg-white rounded-xl shadow-xl p-8">
//                 <StarSpinner size="large" text="Refreshing dashboard..." />
//               </div>
//             </div>
//           )}

//           <div className="flex flex-col md:flex-row md:items-start md:gap-6 mb-8">
//             {stats.map((stat) => {
//               const Icon = stat.icon;
//               return (
//                 <div
//                   key={stat.id}
//                   className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md mb-4 md:mb-0 flex-shrink-0"
//                   style={{
//                     maxWidth: 420,
//                     width: "100%",
//                     padding: "16px",
//                   }}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">{stat.title}</p>
//                       <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
//                       <p className={text-sm mt-1 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}}>
//                         {stat.change} from last month
//                       </p>
//                     </div>
//                     <div className={${stat.color} w-12 h-12 rounded-lg flex items-center justify-center ml-4}>
//                       <Icon className="text-white text-lg" />
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             {quickActions.map((action, idx) => {
//               const Icon = action.icon;
//               return (
//                 <button
//                   key={idx}
//                   onClick={action.action}
//                   type="button"
//                   className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md p-6 min-h-[88px] flex items-center gap-4 text-left transition"
//                 >
//                   <div className={${action.color} w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0}>
//                     <Icon className="text-lg" />
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="font-semibold text-gray-700">{action.title}</h3>
//                     <p className="text-sm text-gray-500 mt-1">{action.description}</p>
//                   </div>
//                 </button>
//               );
//             })}
//           </div>

//           <div className="relative w-full mt-6">
//             <div
//               className="relative w-full h-56 rounded-xl overflow-hidden shadow-inner"
//               style={{
//                 background: "linear-gradient(180deg,#fffaf0 0%, #fdf2d5 40%, #f7e1b6 60%, #f1d39a 100%)",
//               }}
//             >
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: "-6%",
//                   left: "-5%",
//                   width: "110%",
//                   height: "60%",
//                   background:
//                     "radial-gradient(900px 160px at 10% 60%, rgba(255,255,255,0) 0%, rgba(241,211,154,0.35) 20%, rgba(241,211,154,1) 100%)",
//                   transform: "skewY(-3deg)",
//                   borderTopLeftRadius: "40%",
//                   borderTopRightRadius: "40%",
//                 }}
//               />
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: "-14%",
//                   left: "0%",
//                   width: "100%",
//                   height: "48%",
//                   background:
//                     "radial-gradient(700px 130px at 80% 70%, rgba(255,255,255,0) 0%, rgba(241,211,154,0.25) 20%, rgba(241,211,154,1) 100%)",
//                   transform: "skewY(-2deg)",
//                   borderTopLeftRadius: "44%",
//                   borderTopRightRadius: "44%",
//                 }}
//               />
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: 6,
//                   left: 28,
//                   width: 180,
//                   pointerEvents: "none",
//                 }}
//               >
//                 <img src={camel} alt="camel" style={{ width: "100%", height: "auto", objectFit: "contain" }} />
//               </div>

//               <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
//                 {particles.map((p) => {
//                   const style = {
//                     left: ${p.left}%,
//                     top: ${p.top}%,
//                     width: ${p.size}px,
//                     height: ${p.size}px,
//                     opacity: p.opacity,
//                     "--dur": ${p.duration}s,
//                     "--delay": ${p.delay}s,
//                     "--drift": ${p.drift}px,
//                   };
//                   return <span key={p.id} className="sand-grain" style={style} />;
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>{sandStyles}</style>
//     </div>
//   );
// }



// -------------------------------------------------------------------

import React, { useState, useEffect, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { AuthContext } from "../../App";
import { FaUsers, FaComments, FaFilePdf, FaUserCog, FaChartBar } from "react-icons/fa";
import camel from "../../assets/camel.png";
import StarSpinner from "../../components/common/StarSpinner";

const NUM_PARTICLES = 36;

export default function AdminDashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalQueries: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/dashboard/stats");
        setDashboardStats(res.data || {});
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const handleRefreshStats = async () => {
    setStatsLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard/stats");
      setDashboardStats(res.data || {});
    } catch (err) {
      console.error("Error refreshing stats:", err);
    } finally {
      setStatsLoading(false);
    }
  };

  const stats = [
    {
      id: "students",
      title: "Total Students",
      value: dashboardStats.totalUsers ?? 0,
      icon: FaUsers,
      color: "bg-blue-500",
      change: "+12%",
      trend: "up",
    },
    {
      id: "queries",
      title: "Total Queries",
      value: dashboardStats.totalQueries ?? 0,
      icon: FaComments,
      color: "bg-red-500",
      change: "+8%",
      trend: "up",
    },
  ];

  const quickActions = [
    {
      title: "File Management",
      description: "Upload and manage PDF files",
      icon: FaFilePdf,
      color: "bg-red-100 text-red-600",
      action: () => navigate("/admin/faq-generator"),
    },
    {
      title: "Manage Staff",
      description: "Add or remove staff members",
      icon: FaUserCog,
      color: "bg-yellow-100 text-yellow-600",
      action: () => navigate("/admin/staff"),
    },
    {
      title: "View Analytics",
      description: "Check system performance",
      icon: FaChartBar,
      color: "bg-green-100 text-green-600",
      action: () => navigate("/admin/analytics"),
    },
  ];

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      arr.push({
        id: i,
        left: Math.random() * 100,
        top: 20 + Math.random() * 60,
        size: 1 + Math.random() * 3,
        duration: 3 + Math.random() * 6,
        delay: Math.random() * 4,
        drift: 6 + Math.random() * 14,
        opacity: 0.12 + Math.random() * 0.6,
      });
    }
    return arr;
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar activePage="dashboard" />
        <div className="flex-1 flex flex-col ml-64">
          <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="flex items-center gap-4 justify-between px-10 py-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-600">Loading...</p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <StarSpinner size="large" text="Loading dashboard data..." />
          </div>
        </div>
      </div>
    );
  }

  const sandStyles = `
    .sand-grain {
      position: absolute;
      background: rgba(194,150,80,0.9);
      border-radius: 50%;
      transform: translate3d(0,0,0);
      filter: blur(0.2px);
      animation-name: sandFloat;
      animation-duration: var(--dur, 4s);
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      animation-delay: var(--delay, 0s);
      will-change: transform, opacity;
    }
    @keyframes sandFloat {
      0% {
        transform: translateX(-8vw) translateY(0);
        opacity: 0;
      }
      8% {
        opacity: 0.2;
      }
      40% {
        transform: translateX(8vw) translateY(calc(-1 * var(--drift)));
        opacity: 0.9;
      }
      70% {
        transform: translateX(20vw) translateY(calc(var(--drift) / 2));
        opacity: 0.6;
      }
      95% {
        opacity: 0.2;
      }
      100% {
        transform: translateX(52vw) translateY(calc(var(--drift)));
        opacity: 0;
      }
    }
    @media (max-width: 768px) {
      .sand-grain { filter: blur(0.3px); }
    }
  `;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar activePage="dashboard" />
      <div className="flex-1 flex flex-col ml-64">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center gap-4 justify-between px-10 py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-gray-600">Welcome back, Administrator</p>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefreshStats}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-sm hover:shadow min-w-[120px] justify-center"
                disabled={statsLoading}
              >
                {statsLoading ? (
                  <>
                    <div className="w-4 h-4">
                      <StarSpinner size="small" text="" />
                    </div>
                    <span>Refreshing...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Refresh</span>
                  </>
                )}
              </button>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <img
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhISEw0QExETFxASEBYSEBAPFhAOGRIXGBUTFxUZHTQgGBoxGxUTITEhJykrLi4uFx8zODMsNygtLi0BCgoKDg0OGhAQGi0fICUyKys3LystKy0tLTQvNy0tKy0tLS0rLy8tLSs2Ny0tLS0tLSsrLSstLS0tLSs3Ky0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQcCAYQAAj/xAA8EAACAQICBwYEAwcEAwAAAAAAAQIDEQQhBRIxQVFhcQYTIoGRoQexwdEyUvBTYoKSosLhI0JyshQWc//EABkBAQEAAwEAAAAAAAAAAAAAAAABAgQFA//EACARAQEAAgIDAQADAAAAAAAAAAABAhEDBBIhQTEiYXH/2gAMAwEAAhEDEQA/ALxAAAAAAAAAAAAAAAAAAAAAAAA... (truncated for brevity)"
                    alt="Admin Profile"
                    className="h-10 w-20 rounded-full object-cover border-2 border-gray-300"
                  />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">Super Admin</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          {statsLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-xl p-8">
                <StarSpinner size="large" text="Refreshing dashboard..." />
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row md:items-start md:gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md mb-4 md:mb-0 flex-shrink-0"
                  style={{
                    maxWidth: 420,
                    width: "100%",
                    padding: 16,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      <p className={`text-sm mt-1 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center ml-4`}>
                      <Icon className="text-white text-lg" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  onClick={action.action}
                  type="button"
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md p-6 min-h-[88px] flex items-center gap-4 text-left transition"
                >
                  <div className={`${action.color} w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className="text-lg" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-700">{action.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="relative w-full mt-6">
            <div
              className="relative w-full h-56 rounded-xl overflow-hidden shadow-inner"
              style={{
                background: "linear-gradient(180deg,#fffaf0 0%, #fdf2d5 40%, #f7e1b6 60%, #f1d39a 100%)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: "-6%",
                  left: "-5%",
                  width: "110%",
                  height: "60%",
                  background:
                    "radial-gradient(900px 160px at 10% 60%, rgba(255,255,255,0) 0%, rgba(241,211,154,0.35) 20%, rgba(241,211,154,1) 100%)",
                  transform: "skewY(-3deg)",
                  borderTopLeftRadius: "40%",
                  borderTopRightRadius: "40%",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-14%",
                  left: "0%",
                  width: "100%",
                  height: "48%",
                  background:
                    "radial-gradient(700px 130px at 80% 70%, rgba(255,255,255,0) 0%, rgba(241,211,154,0.25) 20%, rgba(241,211,154,1) 100%)",
                  transform: "skewY(-2deg)",
                  borderTopLeftRadius: "44%",
                  borderTopRightRadius: "44%",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 6,
                  left: 28,
                  width: 180,
                  pointerEvents: "none",
                }}
              >
                <img src={camel} alt="camel" style={{ width: "100%", height: "auto", objectFit: "contain" }} />
              </div>

              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {particles.map((p) => {
                  const style = {
                    left: `${p.left}%`,
                    top: `${p.top}%`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    opacity: p.opacity,
                    ['--dur']: `${p.duration}s`,
                    ['--delay']: `${p.delay}s`,
                    ['--drift']: `${p.drift}px`,
                  };
                  return <span key={p.id} className="sand-grain" style={style} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{sandStyles}</style>
    </div>
  );
}
