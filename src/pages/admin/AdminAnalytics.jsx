// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import AdminSidebar from "../../components/admin/AdminSidebar";

// // // // // // const AdminAnalytics = () => {
// // // // // //   const [data, setData] = useState(null);
// // // // // //   const [loading, setLoading] = useState(true);

// // // // // //   useEffect(() => {
// // // // // //     const fetchStats = async () => {
// // // // // //       try {
// // // // // //         const res = await fetch("http://localhost:5000/api/dashboard/stats");
// // // // // //         const json = await res.json();
// // // // // //         setData(json);
// // // // // //       } catch (err) {
// // // // // //         console.error("Fetch Error:", err);
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     };
// // // // // //     fetchStats();
// // // // // //   }, []);

// // // // // //   if (loading) return <div className="p-10 text-center">Loading...</div>;
// // // // // //   if (!data) return <div className="p-10 text-center text-red-500">No Data</div>;

// // // // // //   // ✅ REMOVE FOOD & TEACHING
// // // // // //   const filteredCategories = data.categories.filter(
// // // // // //     c => c.category !== "Food" && c.category !== "Teaching"
// // // // // //   );

// // // // // //   const maxCategory = Math.max(...filteredCategories.map(c => c.count), 1);

// // // // // //   // ✅ REQUIRED LANGUAGES ONLY
// // // // // //   const allowedLanguages = [
// // // // // //     "English",
// // // // // //     "Tamil",
// // // // // //     "Hindi",
// // // // // //     "Gujarati",
// // // // // //     "Marathi",
// // // // // //     "Telugu",
// // // // // //     "Others"
// // // // // //   ];

// // // // // //   const filteredLanguages = data.languages.filter(l =>
// // // // // //     allowedLanguages.includes(l.language)
// // // // // //   );

// // // // // //   // ✅ COLORS
// // // // // //   const languageColors = {
// // // // // //     English: "#2563eb",
// // // // // //     Tamil: "#059669",
// // // // // //     Hindi: "#7c3aed",
// // // // // //     Gujarati: "#14b8a6",
// // // // // //     Marathi: "#f97316",
// // // // // //     Telugu: "#f59e0b",
// // // // // //     Others: "#6b7280"
// // // // // //   };

// // // // // //   // ✅ PIE CHART MATH (NO ARC ERROR)
// // // // // //   const totalLang = filteredLanguages.reduce((s, l) => s + l.percentage, 0) || 1;
// // // // // //   let cumulativeAngle = 0;

// // // // // //   const pieData = filteredLanguages.map(l => {
// // // // // //     const start = cumulativeAngle;
// // // // // //     const angle = (l.percentage / totalLang) * 360;
// // // // // //     cumulativeAngle += angle;
// // // // // //     return { ...l, start, angle };
// // // // // //   });

// // // // // //   const polar = (cx, cy, r, angle) => {
// // // // // //     const rad = (angle - 90) * Math.PI / 180;
// // // // // //     return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
// // // // // //   };

// // // // // //   const arcPath = (cx, cy, r, start, end) => {
// // // // // //     const s = polar(cx, cy, r, end);
// // // // // //     const e = polar(cx, cy, r, start);
// // // // // //     const large = end - start > 180 ? 1 : 0;

// // // // // //     return `
// // // // // //       M ${cx} ${cy}
// // // // // //       L ${s.x} ${s.y}
// // // // // //       A ${r} ${r} 0 ${large} 0 ${e.x} ${e.y}
// // // // // //       Z
// // // // // //     `;
// // // // // //   };

// // // // // //   // ✅ ACCURACY & ESCALATION CIRCLES
// // // // // //   const circle = 2 * Math.PI * 40;
// // // // // //   const accuracyStroke = (circle * data.accuracy) / 100;
// // // // // //   const escalationStroke = (circle * data.human_escalations) / 100;

// // // // // //   return (
// // // // // //     <div className="flex min-h-screen bg-gray-100">
// // // // // //       <AdminSidebar activePage="analytics" />

// // // // // //       <div className="flex-1 p-8 ml-64">
// // // // // //         <h1 className="text-3xl font-bold mb-6">Admin Analytics Dashboard</h1>

// // // // // //         {/* ✅ TOP CARDS */}
// // // // // //         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
// // // // // //           <StatCard title="Total Users" value={data.totalUsers} />
// // // // // //           <StatCard title="Total Queries" value={data.totalQueries} />
// // // // // //           <StatCard title="AI Accuracy" value={`${data.accuracy}%`} />
// // // // // //           <StatCard title="Human Escalations" value={data.human_escalations} />
// // // // // //         </div>

// // // // // //         {/* ✅ CHARTS */}
// // // // // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

// // // // // //           {/* ✅ PERFECT PIE CHART */}
// // // // // //           <div className="bg-white p-6 rounded shadow text-center">
// // // // // //             <h2 className="font-semibold mb-4">Language Distribution</h2>

// // // // // //             <svg viewBox="0 0 200 200" className="w-64 mx-auto">
// // // // // //               {pieData.map(l => (
// // // // // //                 <path
// // // // // //                   key={l.language}
// // // // // //                   d={arcPath(100, 100, 90, l.start, l.start + l.angle)}
// // // // // //                   fill={languageColors[l.language] || "#999"}
// // // // // //                 />
// // // // // //               ))}
// // // // // //             </svg>

// // // // // //             <div className="mt-4 space-y-2 text-sm">
// // // // // //               {filteredLanguages.map(l => (
// // // // // //                 <div key={l.language} className="flex justify-between">
// // // // // //                   <span>{l.language}</span>
// // // // // //                   <span>{l.percentage}%</span>
// // // // // //                 </div>
// // // // // //               ))}
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {/* ✅ CATEGORY BAR CHART */}
// // // // // //           <div className="bg-white p-6 rounded shadow">
// // // // // //             <h2 className="font-semibold mb-4">Query Categories</h2>
// // // // // //             {filteredCategories.map(cat => (
// // // // // //               <div key={cat.category} className="mb-3">
// // // // // //                 <div className="flex justify-between text-sm mb-1">
// // // // // //                   <span>{cat.category}</span>
// // // // // //                   <span>{cat.count}</span>
// // // // // //                 </div>
// // // // // //                 <div className="w-full bg-gray-200 rounded h-3">
// // // // // //                   <div
// // // // // //                     className="h-3 rounded"
// // // // // //                     style={{
// // // // // //                       width: `${(cat.count / maxCategory) * 100}%`,
// // // // // //                       backgroundColor: cat.color
// // // // // //                     }}
// // // // // //                   />
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* ✅ BEST UI — CIRCULAR GRAPHS */}
// // // // // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

// // // // // //           {/* ✅ AI ACCURACY CIRCLE */}
// // // // // //           <div className="bg-white p-6 rounded shadow text-center">
// // // // // //             <h2 className="font-semibold mb-3">AI Accuracy</h2>
// // // // // //             <svg width="120" height="120">
// // // // // //               <circle cx="60" cy="60" r="40" stroke="#e5e7eb" strokeWidth="10" fill="none" />
// // // // // //               <circle
// // // // // //                 cx="60"
// // // // // //                 cy="60"
// // // // // //                 r="40"
// // // // // //                 stroke="#22c55e"
// // // // // //                 strokeWidth="10"
// // // // // //                 fill="none"
// // // // // //                 strokeDasharray={`${accuracyStroke} ${circle}`}
// // // // // //                 transform="rotate(-90 60 60)"
// // // // // //               />
// // // // // //             </svg>
// // // // // //             <p className="mt-2 text-xl font-bold">{data.accuracy}%</p>
// // // // // //           </div>

// // // // // //           {/* ✅ HUMAN ESCALATION CIRCLE */}
// // // // // //           <div className="bg-white p-6 rounded shadow text-center">
// // // // // //             <h2 className="font-semibold mb-3">Human Escalation</h2>
// // // // // //             <svg width="120" height="120">
// // // // // //               <circle cx="60" cy="60" r="40" stroke="#e5e7eb" strokeWidth="10" fill="none" />
// // // // // //               <circle
// // // // // //                 cx="60"
// // // // // //                 cy="60"
// // // // // //                 r="40"
// // // // // //                 stroke="#f97316"
// // // // // //                 strokeWidth="10"
// // // // // //                 fill="none"
// // // // // //                 strokeDasharray={`${escalationStroke} ${circle}`}
// // // // // //                 transform="rotate(-90 60 60)"
// // // // // //               />
// // // // // //             </svg>
// // // // // //             <p className="mt-2 text-xl font-bold">{data.human_escalations}</p>
// // // // // //           </div>

// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default AdminAnalytics;

// // // // // // /* ✅ CARD */
// // // // // // const StatCard = ({ title, value }) => (
// // // // // //   <div className="bg-white p-6 rounded shadow">
// // // // // //     <p className="text-sm text-gray-500">{title}</p>
// // // // // //     <p className="text-2xl font-bold">{value}</p>
// // // // // //   </div>
// // // // // // );





// // // // // // // //  stati valuss--------------------------------------

// // // // // // // // import React, { useState, useContext } from 'react';
// // // // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // // // import AdminSidebar from '../../components/admin/AdminSidebar';
// // // // // // // // import { AuthContext } from '../../App';
// // // // // // // // import { 
// // // // // // // //   FaUsers, 
// // // // // // // //   FaComments, 
// // // // // // // //   FaFileAlt, 
// // // // // // // //   FaFilePdf, 
// // // // // // // //   FaUserCog, 
// // // // // // // //   FaChartBar,
// // // // // // // //   FaBullhorn,
// // // // // // // //   FaUserShield,
// // // // // // // //   FaUserPlus,
// // // // // // // //   FaCheckCircle,
// // // // // // // //   FaCloudUploadAlt,
// // // // // // // //   FaTimes,
// // // // // // // //   FaUserTie,
// // // // // // // //   FaBook
// // // // // // // // } from 'react-icons/fa';

// // // // // // // // const AdminDashboard = () => {
// // // // // // // //   const { logout } = useContext(AuthContext);
// // // // // // // //   const navigate = useNavigate();
// // // // // // // //   const [showUploadModal, setShowUploadModal] = useState(false);
// // // // // // // //   const [uploadType, setUploadType] = useState('');

// // // // // // // //   const stats = [
// // // // // // // //     {
// // // // // // // //       title: 'Total Students',
// // // // // // // //       value: '1,287',
// // // // // // // //       icon: FaUsers,
// // // // // // // //       color: 'bg-blue-500',
// // // // // // // //       change: '+12%',
// // // // // // // //       trend: 'up'
// // // // // // // //     },
// // // // // // // //     {
// // // // // // // //       title: 'Total Queries',
// // // // // // // //       value: '1,287',
// // // // // // // //       icon: FaComments,
// // // // // // // //       color: 'bg-red-500',
// // // // // // // //       change: '+8%',
// // // // // // // //       trend: 'up'
// // // // // // // //     },
// // // // // // // //     {
// // // // // // // //       title: 'Pending Chats',
// // // // // // // //       value: '23',
// // // // // // // //       icon: FaComments,
// // // // // // // //       color: 'bg-yellow-500',
// // // // // // // //       change: '-8%',
// // // // // // // //       trend: 'down'
// // // // // // // //     },
// // // // // // // //     {
// // // // // // // //       title: 'Documents',
// // // // // // // //       value: '156',
// // // // // // // //       icon: FaFileAlt,
// // // // // // // //       color: 'bg-green-500',
// // // // // // // //       change: '+15%',
// // // // // // // //       trend: 'up'
// // // // // // // //     }
// // // // // // // //   ];

// // // // // // // //   const quickActions = [
// // // // // // // //     {
// // // // // // // //       title: 'Knowledge Base',
// // // // // // // //       description: 'Manage knowledge base content',
// // // // // // // //       icon: FaBook,
// // // // // // // //       color: 'bg-blue-100 text-blue-600',
// // // // // // // //       action: () => navigate('/admin/knowledge-base')
// // // // // // // //     },
// // // // // // // //     {
// // // // // // // //       title: 'File Management',
// // // // // // // //       description: 'Upload and manage PDF files',
// // // // // // // //       icon: FaFilePdf,
// // // // // // // //       color: 'bg-red-100 text-red-600',
// // // // // // // //       action: () => navigate('/admin/files')
// // // // // // // //     },
// // // // // // // //     {
// // // // // // // //       title: 'Manage Staff',
// // // // // // // //       description: 'Add or remove staff members',
// // // // // // // //       icon: FaUserCog,
// // // // // // // //       color: 'bg-yellow-100 text-yellow-600',
// // // // // // // //       action: () => navigate('/admin/staff')
// // // // // // // //     },
// // // // // // // //     {
// // // // // // // //       title: 'View Analytics',
// // // // // // // //       description: 'Check system performance',
// // // // // // // //       icon: FaChartBar,
// // // // // // // //       color: 'bg-green-100 text-green-600',
// // // // // // // //       action: () => navigate('/admin/analytics')
// // // // // // // //     }
// // // // // // // //   ];

// // // // // // // //   const handleFileUpload = (file) => {
// // // // // // // //     console.log('Uploading file:', file, 'Type:', uploadType);
// // // // // // // //     setShowUploadModal(false);
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className="flex min-h-screen bg-gray-50">
// // // // // // // //       <AdminSidebar activePage="dashboard" />
      
// // // // // // // //       <div className="flex-1 flex flex-col ml-64">
// // // // // // // //         {/* Custom Topbar since we removed AdminTopbar */}
// // // // // // // //         <div className="bg-white shadow-sm border-b border-gray-200">
// // // // // // // //           <div className="flex items-center justify-between px-6 py-4">
// // // // // // // //             <div>
// // // // // // // //               <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
// // // // // // // //               <p className="text-gray-600">Welcome back, Administrator</p>
// // // // // // // //             </div>
// // // // // // // //             <div className="flex items-center space-x-4">
// // // // // // // //               <div className="flex items-center space-x-3">
// // // // // // // //                 <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
// // // // // // // //                   {/* <FaUserShield className="text-purple-600 text-lg" /> */}
// // // // // // // //                   <img
// // // // // // // //               src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhISEw0QExETFxASEBYSEBAPFhAOGRIXGBUTFxUZHTQgGBoxGxUTITEhJykrLi4uFx8zODMsNygtLi0BCgoKDg0OGhAQGi0fICUyKys3LystKy0tLTQvNy0tKy0tLS0rLy8tLSs2Ny0tLS0tLSsrLSstLS0tLSs3Ky0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQcCBAYDAQj/xAA8EAACAQICBwYEAwcEAwAAAAAAAQIDEQQhBRIxQVFhcQYTIoGRoQexwdEyUvBTYoKSosLhI0JyshQWc//EABkBAQEAAwEAAAAAAAAAAAAAAAABAgQFA//EACARAQEAAgIDAQADAAAAAAAAAAABAhEDBBIhQTEiYXH/2gAMAwEAAhEDEQA/ALxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwxmMp0oudSpGEFvk1FX4c3yPDTWlIYajKtPYsopbZzeyK/XF7indMaWq4qo6lWV9urFfhpx4RX12ssm0td9pH4hUIZUaU6z4v8A0o+rWt7EHW+ImJb8NHDxX7yqTfqpL5HHgz8Ym3Z4f4i10/Hh6El+73lN+rb+R0/ZztlQxcu7tKlXz8E7eO23UkspdMnyKlNavJxlGUZOMlZpxbi4yWxprYxcYbfocFNYDtTi6UtZYmpNb41ZOrGS4Z5ryaLP7N6dhi6WvFas45VIN3cJfVPc/szCzS7SwAIoAAAAAAAAAAAAAAAAAAAAAAAAD5KSSu3ZEfXx+6OXN/RAVx8VNLOeJjQjLw0IpytvrTV8+kdX+ZnHQxT3q/sbPaKu54rESbu3VqLyjJxXskR56z8YVuLEx5+g/wDJjz9CPdZbs3yzMZ1LbXbks2yjdqYu2xev2PlKjKeu0m9SLnN8Imto7Czr1FGEclm/yx5yZZOidCwpUZQau6iam3lrXVvJcjX5uecfr69+HgvJ7+OIoyul+szoexGku4xdO78FVqjPrJ2g/wCbV8mzmKkXQqypTyaeT/NHdJfr5HrUxGpqyTzTjKPWLTv7HtuWbjxssuq/QQIyhj2vxZr3X3JGnUUldO6PNkyAAAAAAAAAAAAAAAAAAAAADCrUUVd7PmZSds3sREYqu5vktiA+YjEObz2blwPIAoozTqksXiI3lfv66Su99WVl7o3v/V6/7PXf/ONvmSundFtaUpz1f9OvUjUg/wB6KTmnzur9Gju0jw5uxcdeLZ4OtMpfPat6XZTFSytTprrKT9lYlMB2GinerOU3wv3cX1s3L3R2gNbLs8l+6bWPW48fm/8AWngtHQpJKMYpLYklFJ8bceZuAHg90J2l0HDEQzyks4ySzi+PNcUVniqdSE5UpN66erbbm9luWa9S5zhsboZ1dKRUV4IdxXqt/s4ySt1erZG31eXVst9NPtcXlJlJ7WalbLhkelGs4u6fXmecZXz4n03GimaFZTV15rgz1ISjVcXdefNcCZp1FJJrYyDIAAAAAAAAAAAAAAAAAxnKybe7MDS0lW/2rrL6I0D7OV229rzPhQMZ7H0ZkCUjh+7csRSTb8NaUvPu6iv6M6Mwxej0qneJO98uHB352Zmcqy4+q7MymX8p9AARQAACA0tBqvKSbvKnSTtvcZVLf9ifPNYBTqKbTurLkrNu/XMSW+obmPu/Ephl4I322Vz1PiR9OtjNSRxsru2ht6PrWeq9j2cpGoCongeeHqa0U/XrvPQgAAAAAAAAAAAAABqaSnaNuL9v1Y2yN0pLxJcFf1f+ANMAFAAAfGiNnGza4Ema2LpXzW1beaNfscfljufGz1uTxy1frTABoOiAAD6kSVONklwNbCUv9z8vubZu9bj1PK/XP7XJu+M+AANpqgAA39Fz/FHzX1+hvkTo+Vprmmvr9CWIAAAAAAAAAAAAAARWkH430RKkVpBeN9EBrAAoAAAAAIjS2JjSlC8XaSk21uaa3eZ8pVoyV4yT6fY9dLYeNRpSWxZNZNXIStomSzjJPr4X9jl83rO6dfg1eObvtL1KiirtpLm7GGjsXGpU1Em0ouV9l2mla3mQFXDTW2Eutm/c3Oz07V4ripL2v9DHju85tny4647ZfjrQAdZxQAAAAB64R+OPUmSGwi8cepMkAAAAAAAAAAAAAAI3ScfEnxVvR/5JI1NJQvG/B+36sBGAGM5pJttJLa20kvMoyBDYvtRhqeXeub4U4uf9X4fch8V22/Z4fo6kv7Y/cuqm3YnPdo+1NPDXhG1Sv+W/hp85tbOm3ptOUx/aTE1E71nGO9U13a9Vn7nMyzvzv6lmKbXBVndt/qxgYUJXhCX5oQmualFNP0ZmcfLe7t2sdamgyjKzT4GJlTg20ks20l1JP6W/ntpaO7VUp1qlCpanONScKbb8NRKTSzf4Zct+7gdAUnjp61SpLbrTqPreTZNaM07iKcY6leWqreGVpx6JS2eVjs+Ppxd+1pA4vCdtpLKrQi+dOTj/AEu/zJvB9p8NUy73u3wqLU/q/D7k1TaZB8hJNJppp7GndPzPpFbGj43muSb+n1JY0NFw/FLyX1+hvkAAAAAAAAAAAAAAMZxumnseRkAIKpHVbT3bfuVfp3SssRUlLWfdptU43yUVsduL235lnds7xwtapG99RxduEnq63lcqAzxY0ABmjxxMrR65GmSE4J7UeKwy3+i+4Fs9lqMcRgMM00qkKfd/wwk4JPl4T7Xwc4bYPqldeqNb4cpSw6jmtSVRKzs09ZS/vOrdKotlVPql9jU5eDHK7/G1xdjLCa/Y5ulh5yyjCT8n8yQdGOGpVK05LXjCcklnq2i365El3FR7aqXQge20FTwtXNvWjqu+/WlGP9zJx9fHG7/V5OxllNfimIrJG3hJZNcD7LDLdl7o9Y00tiNxqMgABt6O0lVoSUqc2s7uN/DPk1s89paOHqqcYzjmpqMo801dfMqMtH4eXnhoyknanKcI3/3JO6fRXt5GGSx1OHp6sUvXrvPQAwZAAAAAAAAAAAAAAAAMakFJOMknFpqSaunF5NNcCou1/Z14SreKboTb7qW3Ve+m3xW7iujLfNfH4KFanKnUgpQkrNP2ae58yy6SxRIJ3tP2YqYSV850G/BO2zhGfB89j9lBHoxYSqWaXH5mZ5YiF1zWaM4SukyjvPhjiM6sP3oS/mi1/YixCpuwOI1cRJfmg3/FGUWvbWLYTPPL9ZR9OJ+JuItRjD814J9EpSfyidsVn8ScRepSj/8ASXvGK/6smP6Vxpg5+K3K/QybPKgr3lx+R6sXsASmgNA1cXPVpq0FbvKjXhgvrLl8lmQOzuhJ4uqqcbqKs6s90Ifd7EvomXHgsLClCNOEdWEEoxXL6vma+htE08LTVKnHLbJv8U575SfE3zzt2ykAARQAAAAAAAAAAAAAAAAAAY1aaknGUVKLTUlJJpremntOD7QdgL3nhWlvdKby/gk9nR+qO+BZdCh8XhKlKThUpyhNbpJp24riuaNSlk3HzXQvzGYKnVjq1KUJx4TipZ8VfYzlNJfDvDzetSqVKMtyv3sPSXi/qMpkx04jstV1cVRfFuP80Wl7tFxYKd4R5ZehXsewWJpVIThVozUJwltlTllJPZZrdxLAwNKUU01vus0yZLHtWnaLfBP1Kj7b1b4m35IQj5u8v7kWxjIOUbJXu1fYsjg9KdicTXxFSpr0YQk1a8pSlqqKWxK27iMSq+xD2RW1/I2MPQlJqEISlJ5RjFOTfRIsTR/w3oxetWr1Kj4RSpR6b37o63R2jKNBatKjCC36qzfWW1+ZbkmnB6A7AzlaeJepHb3cWnOX/KSyiul30LBwmFhSgoU4RhCOSUVZL/PM9gY27ZAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9k="  
// // // // // // // //               alt="Admin Profile"
// // // // // // // //               className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-md"
// // // // // // // //             />
// // // // // // // //                 </div>
// // // // // // // //                 <div className="text-right">
// // // // // // // //                   <p className="text-sm font-medium text-gray-900">Admin User</p>
// // // // // // // //                   <p className="text-xs text-gray-500">Super Admin</p>
// // // // // // // //                 </div>
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>
        
// // // // // // // //         <div className="flex-1 p-6">
// // // // // // // //           {/* Stats Grid */}
// // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // // // // // // //             {stats.map((stat, index) => {
// // // // // // // //               const Icon = stat.icon;
// // // // // // // //               return (
// // // // // // // //                 <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
// // // // // // // //                   <div className="flex items-center justify-between">
// // // // // // // //                     <div>
// // // // // // // //                       <p className="text-sm font-medium text-gray-600">{stat.title}</p>
// // // // // // // //                       <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
// // // // // // // //                       <p className={`text-sm mt-1 ${
// // // // // // // //                         stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
// // // // // // // //                       }`}>
// // // // // // // //                         {stat.change} from last month
// // // // // // // //                       </p>
// // // // // // // //                     </div>
// // // // // // // //                     <div className={${stat.color} w-12 h-12 rounded-lg flex items-center justify-center}>
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
// // // // // // // //                   className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer group"
// // // // // // // //                   onClick={action.action}
// // // // // // // //                 >
// // // // // // // //                   <div className="flex items-center gap-4">
// // // // // // // //                     <div className={${action.color} w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200}>
// // // // // // // //                       <Icon className="text-lg" />
// // // // // // // //                     </div>
// // // // // // // //                     <div>
// // // // // // // //                       <h3 className="font-semibold text-gray-600 group-hover:text-black transition-colors duration-200">
// // // // // // // //                         {action.title}
// // // // // // // //                       </h3>
// // // // // // // //                       <p className="text-sm text-gray-600 mt-1">{action.description}</p>
// // // // // // // //                     </div>
// // // // // // // //                   </div>
// // // // // // // //                 </div>
// // // // // // // //               );
// // // // // // // //             })}
// // // // // // // //           </div>

// // // // // // // //           {/* Recent Activity & System Status */}
// // // // // // // //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // // // // // // //             {/* Recent Activity */}
// // // // // // // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // // // // // // //               <div className="flex items-center justify-between mb-4">
// // // // // // // //                 <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
// // // // // // // //                 <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
// // // // // // // //                   View All
// // // // // // // //                 </button>
// // // // // // // //               </div>
// // // // // // // //               <div className="space-y-4">
// // // // // // // //                 {[
// // // // // // // //                   { 
// // // // // // // //                     action: 'Knowledge base updated', 
// // // // // // // //                     time: '2 min ago', 
// // // // // // // //                     user: 'You',
// // // // // // // //                     icon: FaBook,
// // // // // // // //                     color: 'text-blue-500'
// // // // // // // //                   },
// // // // // // // //                   { 
// // // // // // // //                     action: 'Staff member added', 
// // // // // // // //                     time: '1 hour ago', 
// // // // // // // //                     user: 'You',
// // // // // // // //                     icon: FaUserPlus,
// // // // // // // //                     color: 'text-green-500'
// // // // // // // //                   },
// // // // // // // //                   { 
// // // // // // // //                     action: 'PDF document uploaded', 
// // // // // // // //                     time: '3 hours ago', 
// // // // // // // //                     user: 'System',
// // // // // // // //                     icon: FaFilePdf,
// // // // // // // //                     color: 'text-red-500'
// // // // // // // //                   },
// // // // // // // //                   { 
// // // // // // // //                     action: 'Chat resolved', 
// // // // // // // //                     time: '5 hours ago', 
// // // // // // // //                     user: 'Dr. Sharma',
// // // // // // // //                     icon: FaCheckCircle,
// // // // // // // //                     color: 'text-purple-500'
// // // // // // // //                   }
// // // // // // // //                 ].map((activity, index) => {
// // // // // // // //                   const Icon = activity.icon;
// // // // // // // //                   return (
// // // // // // // //                     <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
// // // // // // // //                       <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
// // // // // // // //                         <Icon className={${activity.color}} />
// // // // // // // //                       </div>
// // // // // // // //                       <div className="flex-1">
// // // // // // // //                         <p className="text-sm font-medium text-gray-800">{activity.action}</p>
// // // // // // // //                         <p className="text-xs text-gray-500">{activity.time} • by {activity.user}</p>
// // // // // // // //                       </div>
// // // // // // // //                     </div>
// // // // // // // //                   );
// // // // // // // //                 })}
// // // // // // // //               </div>
// // // // // // // //             </div>

// // // // // // // //             {/* Language Distribution */}
// // // // // // // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // // // // // // //               <h3 className="text-lg font-semibold text-gray-800 mb-4">Language Distribution</h3>
// // // // // // // //               <div className="space-y-3">
// // // // // // // //                 {[
// // // // // // // //                   { language: 'Hindi', percentage: 42, color: 'bg-purple-500', users: '540' },
// // // // // // // //                   { language: 'English', percentage: 38, color: 'bg-blue-500', users: '489' },
// // // // // // // //                   { language: 'Tamil', percentage: 12, color: 'bg-green-500', users: '154' },
// // // // // // // //                   { language: 'Gujarati', percentage: 5, color: 'bg-orange-500', users: '64' },
// // // // // // // //                   { language: 'Marathi', percentage: 3, color: 'bg-red-500', users: '40' }
// // // // // // // //                 ].map((item, index) => (
// // // // // // // //                   <div key={index} className="flex items-center justify-between">
// // // // // // // //                     <div className="flex items-center space-x-3 flex-1">
// // // // // // // //                       <div className={w-3 h-3 rounded-full ${item.color}}></div>
// // // // // // // //                       <span className="text-sm font-medium text-gray-700 w-20">{item.language}</span>
// // // // // // // //                       <div className="flex-1 max-w-xs">
// // // // // // // //                         <div className="w-full bg-gray-200 rounded-full h-2">
// // // // // // // //                           <div 
// // // // // // // //                             className={h-2 rounded-full ${item.color}}
// // // // // // // //                             style={{ width: ${item.percentage}% }}
// // // // // // // //                           ></div>
// // // // // // // //                         </div>
// // // // // // // //                       </div>
// // // // // // // //                       <div className="text-right w-16">
// // // // // // // //                         <span className="text-sm font-medium text-gray-700">{item.percentage}%</span>
// // // // // // // //                         <p className="text-xs text-gray-500">{item.users} users</p>
// // // // // // // //                       </div>
// // // // // // // //                     </div>
// // // // // // // //                   </div>
// // // // // // // //                 ))}
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default AdminDashboard;

// // // // // // // 




// // // // // // ------------------------------->

// // // // // import React, { useState, useEffect, useContext } from 'react';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import AdminSidebar from '../../components/admin/AdminSidebar';
// // // // // import { AuthContext } from '../../App';
// // // // // import StarSpinner from '../../components/common/StarSpinner';

// // // // // const AdminAnalytics = () => {
// // // // //   const { logout } = useContext(AuthContext);
// // // // //   const navigate = useNavigate();
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [refreshing, setRefreshing] = useState(false);
// // // // //   const [analyticsData, setAnalyticsData] = useState(null);

// // // // //   // Static demo data matching your structure
// // // // //   const staticAnalyticsData = {
// // // // //     overview: {
// // // // //       total_users: 1287,
// // // // //       daily_queries: 212,
// // // // //       accuracy: 94.8,
// // // // //       human_escalations: 4.7
// // // // //     },
// // // // //     languages: [
// // // // //       { language: 'Hindi', percentage: 42, color: '#8b5cf6' },
// // // // //       { language: 'English', percentage: 38, color: '#3b82f6' },
// // // // //       { language: 'Tamil', percentage: 12, color: '#10b981' },
// // // // //       { language: 'Gujarati', percentage: 5, color: '#f59e0b' },
// // // // //       { language: 'Marathi', percentage: 3, color: '#ef4444' }
// // // // //     ],
// // // // //     growth: [
// // // // //       { month: 'Jan', users: 800, queries: 150 },
// // // // //       { month: 'Feb', users: 950, queries: 180 },
// // // // //       { month: 'Mar', users: 1100, queries: 195 },
// // // // //       { month: 'Apr', users: 1200, queries: 2100 },
// // // // //       { month: 'May', users: 1250, queries: 205 },
// // // // //       { month: 'Jun', users: 1287, queries: 212 }
// // // // //     ],
// // // // //     categories: [
// // // // //       { category: 'Scholarship', count: 45, color: '#8b5cf6' },
// // // // //       { category: 'Exams', count: 38, color: '#3b82f6' },
// // // // //       { category: 'Hostel', count: 32, color: '#10b981' },
// // // // //       { category: 'Library', count: 28, color: '#f59e0b' },
// // // // //       { category: 'Fees', count: 25, color: '#ef4444' },
// // // // //       { category: 'Others', count: 44, color: '#6b7280' }
// // // // //     ],
// // // // //     peak_hours: [
// // // // //       { hour: '8-9 AM', queries: 15 },
// // // // //       { hour: '9-10 AM', queries: 28 },
// // // // //       { hour: '10-11 AM', queries: 35 },
// // // // //       { hour: '11-12 PM', queries: 42 },
// // // // //       { hour: '12-1 PM', queries: 38 },
// // // // //       { hour: '1-2 PM', queries: 25 },
// // // // //       { hour: '2-3 PM', queries: 32 },
// // // // //       { hour: '3-4 PM', queries: 29 },
// // // // //       { hour: '4-5 PM', queries: 18 }
// // // // //     ],
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     // Simulate API call to fetch analytics data
// // // // //     const fetchAnalyticsData = async () => {
// // // // //       setLoading(true);
// // // // //       try {
// // // // //         // Simulate network delay
// // // // //         await new Promise(resolve => setTimeout(resolve, 1500));
// // // // //         setAnalyticsData(staticAnalyticsData);
// // // // //       } catch (error) {
// // // // //         console.error('Error fetching analytics:', error);
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //     fetchAnalyticsData();
// // // // //   }, []);

// // // // //   const handleRefresh = async () => {
// // // // //     setRefreshing(true);
// // // // //     try {
// // // // //       // Simulate refresh delay
// // // // //       await new Promise(resolve => setTimeout(resolve, 1000));
// // // // //       // You can add actual refresh logic here
// // // // //     } catch (error) {
// // // // //       console.error('Error refreshing data:', error);
// // // // //     } finally {
// // // // //       setRefreshing(false);
// // // // //     }
// // // // //   };

// // // // //   // Loading state
// // // // //   if (loading || !analyticsData) {
// // // // //     return (
// // // // //       <div className="flex min-h-screen bg-gray-50">
// // // // //         <AdminSidebar activePage="analytics" />
// // // // //         <div className="flex-1 flex flex-col ml-64">
// // // // //           <div className="bg-white shadow-sm border-b border-gray-200">
// // // // //             <div className="flex items-center justify-between px-6 py-4">
// // // // //               <div>
// // // // //                 <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
// // // // //                 <p className="text-gray-600">Loading insights...</p>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //           <div className="flex-1 flex items-center justify-center">
// // // // //             <StarSpinner 
// // // // //               size="large" 
// // // // //               text="Loading analytics data..." 
// // // // //             />
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   // Calculate maximum values for scaling
// // // // //   const maxQueries = Math.max(...analyticsData.peak_hours.map(h => h.queries));
// // // // //   const maxCategory = Math.max(...analyticsData.categories.map(c => c.count));

// // // // //   return (
// // // // //     <div className="flex min-h-screen bg-gray-50 font-sans">
// // // // //       <AdminSidebar activePage="analytics" />
      
// // // // //       <div className="flex-1 flex flex-col ml-64">
// // // // //         {/* Custom Topbar */}
// // // // //         <div className="bg-white shadow-sm border-b border-gray-200">
// // // // //           <div className="flex items-center justify-between px-6 py-4">
// // // // //             <div>
// // // // //               <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
// // // // //               <p className="text-gray-600">Live system performance and user insights</p>
// // // // //             </div>
// // // // //             <div className="flex items-center space-x-4">
// // // // //               <button
// // // // //                 onClick={handleRefresh}
// // // // //                 className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-sm hover:shadow min-w-[120px] justify-center"
// // // // //                 disabled={refreshing}
// // // // //               >
// // // // //                 {refreshing ? (
// // // // //                   <>
// // // // //                     <div className="w-4 h-4">
// // // // //                       <StarSpinner size="small" text="" />
// // // // //                     </div>
// // // // //                     <span>Refreshing...</span>
// // // // //                   </>
// // // // //                 ) : (
// // // // //                   <>
// // // // //                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
// // // // //                     </svg>
// // // // //                     <span>Refresh</span>
// // // // //                   </>
// // // // //                 )}
// // // // //               </button>
// // // // //               <div className="flex items-center space-x-3">
// // // // //                 <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
// // // // //                   <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
// // // // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
// // // // //                   </svg>
// // // // //                 </div>
// // // // //                 <div className="text-right">
// // // // //                   <p className="text-sm font-medium text-gray-900">Admin User</p>
// // // // //                   <p className="text-xs text-gray-500">Super Admin</p>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
        
// // // // //         <div className="flex-1 p-6">
// // // // //           {/* Refresh overlay spinner */}
// // // // //           {refreshing && (
// // // // //             <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
// // // // //               <div className="bg-white rounded-xl shadow-xl p-8">
// // // // //                 <StarSpinner size="large" text="Updating analytics..." />
// // // // //               </div>
// // // // //             </div>
// // // // //           )}

// // // // //           {/* Key Metrics Cards */}
// // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // // // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
// // // // //               <div className="flex items-center justify-between">
// // // // //                 <div>
// // // // //                   <p className="text-sm font-medium text-gray-600">Total Users</p>
// // // // //                   <p className="text-2xl font-bold text-gray-900 mt-1">
// // // // //                     {analyticsData.overview.total_users.toLocaleString()}
// // // // //                   </p>
// // // // //                   <p className="text-sm text-teal-600 mt-1 flex items-center">
// // // // //                     <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
// // // // //                       <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
// // // // //                     </svg>
// // // // //                     12% from last month
// // // // //                   </p>
// // // // //                 </div>
// // // // //                 <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-sm">
// // // // //                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-7.645a10.025 10.025 0 01-3.5 7.645" />
// // // // //                   </svg>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
            
// // // // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
// // // // //               <div className="flex items-center justify-between">
// // // // //                 <div>
// // // // //                   <p className="text-sm font-medium text-gray-600">Daily Queries</p>
// // // // //                   <p className="text-2xl font-bold text-gray-900 mt-1">
// // // // //                     {analyticsData.overview.daily_queries}
// // // // //                   </p>
// // // // //                   <p className="text-sm text-red-600 mt-1 flex items-center">
// // // // //                     <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
// // // // //                       <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
// // // // //                     </svg>
// // // // //                     8% from yesterday
// // // // //                   </p>
// // // // //                 </div>
// // // // //                 <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-sm">
// // // // //                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h8M8 14h5m9-2a9 9 0 11-18 0 9 9 0 0118 0z" />
// // // // //                   </svg>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
            
// // // // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
// // // // //               <div className="flex items-center justify-between">
// // // // //                 <div>
// // // // //                   <p className="text-sm font-medium text-gray-600">Accuracy Rate</p>
// // // // //                   <p className="text-2xl font-bold text-gray-900 mt-1">
// // // // //                     {analyticsData.overview.accuracy}%
// // // // //                   </p>
// // // // //                   <p className="text-sm text-green-600 mt-1 flex items-center">
// // // // //                     <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
// // // // //                       <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
// // // // //                     </svg>
// // // // //                     2.3% improvement
// // // // //                   </p>
// // // // //                 </div>
// // // // //                 <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-sm">
// // // // //                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
// // // // //                   </svg>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
            
// // // // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
// // // // //               <div className="flex items-center justify-between">
// // // // //                 <div>
// // // // //                   <p className="text-sm font-medium text-gray-600">Human Escalations</p>
// // // // //                   <p className="text-2xl font-bold text-gray-900 mt-1">
// // // // //                     {analyticsData.overview.human_escalations}%
// // // // //                   </p>
// // // // //                   <p className="text-sm text-orange-600 mt-1 flex items-center">
// // // // //                     <svg className="w-4 h-4 mr-1 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
// // // // //                       <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
// // // // //                     </svg>
// // // // //                     1.2% from last month
// // // // //                   </p>
// // // // //                 </div>
// // // // //                 <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-sm">
// // // // //                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
// // // // //                   </svg>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* Charts Grid */}
// // // // //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
// // // // //             {/* Language Distribution - Donut Chart */}
// // // // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // // // //               <div className="flex items-center justify-between mb-4">
// // // // //                 <h3 className="text-lg font-semibold text-gray-800">Language Distribution</h3>
// // // // //                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">6 Languages</span>
// // // // //               </div>
// // // // //               <div className="flex flex-col lg:flex-row items-center">
// // // // //                 <div className="relative w-48 h-48 mb-4 lg:mb-0 lg:mr-6">
// // // // //                   <svg className="w-full h-full" viewBox="0 0 100 100">
// // // // //                     <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="20" />
// // // // //                     {analyticsData.languages.reduce((acc, lang, index) => {
// // // // //                       const previousPercent = acc.reduce((sum, l) => sum + l.percentage, 0);
// // // // //                       const circumference = 2 * Math.PI * 40;
// // // // //                       const strokeDasharray = ${(lang.percentage / 100) * circumference} ${circumference};
// // // // //                       const strokeDashoffset = circumference - (previousPercent / 100) * circumference;
                      
// // // // //                       return [
// // // // //                         ...acc,
// // // // //                         <circle
// // // // //                           key={lang.language}
// // // // //                           cx="50"
// // // // //                           cy="50"
// // // // //                           r="40"
// // // // //                           fill="none"
// // // // //                           stroke={lang.color}
// // // // //                           strokeWidth="20"
// // // // //                           strokeDasharray={strokeDasharray}
// // // // //                           strokeDashoffset={strokeDashoffset}
// // // // //                           transform="rotate(-90 50 50)"
// // // // //                         />
// // // // //                       ];
// // // // //                     }, [])}
// // // // //                   </svg>
// // // // //                   <div className="absolute inset-0 flex items-center justify-center">
// // // // //                     <div className="text-center">
// // // // //                       <div className="text-2xl font-bold text-gray-900">6</div>
// // // // //                       <div className="text-sm text-gray-500">Languages</div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <div className="flex-1 space-y-3">
// // // // //                   {analyticsData.languages.map((lang, index) => (
// // // // //                     <div key={index} className="flex items-center justify-between">
// // // // //                       <div className="flex items-center space-x-3">
// // // // //                         <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }}></div>
// // // // //                         <span className="text-sm font-medium text-gray-700">{lang.language}</span>
// // // // //                       </div>
// // // // //                       <div className="flex items-center space-x-3">
// // // // //                         <span className="text-sm font-bold text-gray-900">{lang.percentage}%</span>
// // // // //                         <div className="w-24 bg-gray-200 rounded-full h-2">
// // // // //                           <div 
// // // // //                             className="h-2 rounded-full transition-all duration-500"
// // // // //                             style={{ 
// // // // //                               width: ${lang.percentage}%,
// // // // //                               backgroundColor: lang.color
// // // // //                             }}
// // // // //                           ></div>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* Query Categories - Horizontal Bar Chart */}
// // // // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // // // //               <div className="flex items-center justify-between mb-4">
// // // // //                 <h3 className="text-lg font-semibold text-gray-800">Query Categories</h3>
// // // // //                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Top 6 Categories</span>
// // // // //               </div>
// // // // //               <div className="space-y-4">
// // // // //                 {analyticsData.categories.map((category, index) => (
// // // // //                   <div key={index} className="space-y-2">
// // // // //                     <div className="flex items-center justify-between">
// // // // //                       <div className="flex items-center space-x-3">
// // // // //                         <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
// // // // //                         <span className="text-sm font-medium text-gray-700">{category.category}</span>
// // // // //                       </div>
// // // // //                       <span className="text-sm text-gray-500">{category.count} queries</span>
// // // // //                     </div>
// // // // //                     <div className="w-full bg-gray-200 rounded-full h-3">
// // // // //                       <div 
// // // // //                         className="h-3 rounded-full transition-all duration-500"
// // // // //                         style={{ 
// // // // //                           width: ${(category.count / maxCategory) * 100}%,
// // // // //                           backgroundColor: category.color
// // // // //                         }}
// // // // //                       ></div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 ))}
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* Accuracy and Escalation Gauges */}
// // // // //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // // // //             {/* Accuracy Gauge */}
// // // // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // // // //               <div className="flex items-center justify-between mb-4">
// // // // //                 <h3 className="text-lg font-semibold text-gray-800">AI Accuracy Gauge</h3>
// // // // //                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Overall Performance</span>
// // // // //               </div>
// // // // //               <div className="flex flex-col items-center">
// // // // //                 <div className="relative w-48 h-24 mb-4">
// // // // //                   <div className="w-full h-24 bg-gray-200 rounded-t-full overflow-hidden">
// // // // //                     <div 
// // // // //                       className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 transition-all duration-1000 ease-out"
// // // // //                       style={{ width: ${analyticsData.overview.accuracy}% }}
// // // // //                     ></div>
// // // // //                   </div>
// // // // //                   <div 
// // // // //                     className="absolute top-0 w-1 h-24 bg-gray-800 transform origin-bottom transition-all duration-1000 ease-out"
// // // // //                     style={{ 
// // // // //                       left: '50%', 
// // // // //                       transform: translateX(-50%) rotate(${(analyticsData.overview.accuracy / 100) * 180 - 90}deg) 
// // // // //                     }}
// // // // //                   ></div>
// // // // //                   <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-6 h-6 bg-gray-800 rounded-full"></div>
// // // // //                 </div>
// // // // //                 <div className="text-center">
// // // // //                   <div className="text-3xl font-bold text-gray-900">{analyticsData.overview.accuracy}%</div>
// // // // //                   <div className="text-sm text-gray-500">Excellent performance threshold: 90%</div>
// // // // //                 </div>
// // // // //                 <div className="w-full mt-4 flex justify-between text-xs text-gray-400">
// // // // //                   <span>0%</span>
// // // // //                   <span>50%</span>
// // // // //                   <span>100%</span>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* Escalation Rate */}
// // // // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // // // //               <div className="flex items-center justify-between mb-4">
// // // // //                 <h3 className="text-lg font-semibold text-gray-800">Human Escalation Rate</h3>
// // // // //                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Low is Better</span>
// // // // //               </div>
// // // // //               <div className="flex flex-col items-center">
// // // // //                 <div className="relative w-32 h-32 mb-4">
// // // // //                   <svg className="w-full h-full" viewBox="0 0 128 128">
// // // // //                     <circle cx="64" cy="64" r="56" fill="none" stroke="#f3f4f6" strokeWidth="12" />
// // // // //                     <circle
// // // // //                       cx="64"
// // // // //                       cy="64"
// // // // //                       r="56"
// // // // //                       fill="none"
// // // // //                       stroke="#f97316"
// // // // //                       strokeWidth="12"
// // // // //                       strokeDasharray={`${(2 * Math.PI * 56) * (analyticsData.overview.human_escalations / `100`)} ${2 * Math.PI * 56}}
// // // // //                       strokeDashoffset={2 * Math.PI * 56 * 0.25}
// // // // //                       transform="rotate(-90 64 64)"
// // // // //                     />
// // // // //                   </svg>
// // // // //                   <div className="absolute inset-0 flex items-center justify-center">
// // // // //                     <div className="text-center">
// // // // //                       <div className="text-2xl font-bold text-gray-900">{analyticsData.overview.human_escalations}%</div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <div className="text-center">
// // // // //                   <div className="text-sm text-gray-500">Only {analyticsData.overview.human_escalations}% conversations need human help</div>
// // // // //                   <div className="mt-2 flex items-center justify-center space-x-4">
// // // // //                     <div className="flex items-center">
// // // // //                       <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
// // // // //                       <span className="text-xs text-gray-500">Escalated</span>
// // // // //                     </div>
// // // // //                     <div className="flex items-center">
// // // // //                       <div className="w-3 h-3 bg-gray-200 rounded-full mr-2"></div>
// // // // //                       <span className="text-xs text-gray-500">Resolved by AI</span>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default AdminAnalytics;







































// // // // import React, { useState, useEffect, useContext } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import AdminSidebar from '../../components/admin/AdminSidebar';
// // // // import { AuthContext } from '../../App';
// // // // import StarSpinner from '../../components/common/StarSpinner';

// // // // const AdminAnalytics = () => {
// // // //   const { logout } = useContext(AuthContext);
// // // //   const navigate = useNavigate();
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [refreshing, setRefreshing] = useState(false);
// // // //   const [analyticsData, setAnalyticsData] = useState(null);

// // // //   // Static demo data matching your structure
// // // //   const staticAnalyticsData = {
// // // //     overview: {
// // // //       total_users: 1287,
// // // //       daily_queries: 212,
// // // //       accuracy: 94.8,
// // // //       human_escalations: 4.7
// // // //     },
// // // //     languages: [
// // // //       { language: 'Hindi', percentage: 42, color: '#8b5cf6' },
// // // //       { language: 'English', percentage: 38, color: '#3b82f6' },
// // // //       { language: 'Tamil', percentage: 12, color: '#10b981' },
// // // //       { language: 'Gujarati', percentage: 5, color: '#f59e0b' },
// // // //       { language: 'Marathi', percentage: 3, color: '#ef4444' }
// // // //     ],
// // // //     growth: [
// // // //       { month: 'Jan', users: 800, queries: 150 },
// // // //       { month: 'Feb', users: 950, queries: 180 },
// // // //       { month: 'Mar', users: 1100, queries: 195 },
// // // //       { month: 'Apr', users: 1200, queries: 2100 },
// // // //       { month: 'May', users: 1250, queries: 205 },
// // // //       { month: 'Jun', users: 1287, queries: 212 }
// // // //     ],
// // // //     categories: [
// // // //       { category: 'Scholarship', count: 45, color: '#8b5cf6' },
// // // //       { category: 'Exams', count: 38, color: '#3b82f6' },
// // // //       { category: 'Hostel', count: 32, color: '#10b981' },
// // // //       { category: 'Library', count: 28, color: '#f59e0b' },
// // // //       { category: 'Fees', count: 25, color: '#ef4444' },
// // // //       { category: 'Others', count: 44, color: '#6b7280' }
// // // //     ],
// // // //     peak_hours: [
// // // //       { hour: '8-9 AM', queries: 15 },
// // // //       { hour: '9-10 AM', queries: 28 },
// // // //       { hour: '10-11 AM', queries: 35 },
// // // //       { hour: '11-12 PM', queries: 42 },
// // // //       { hour: '12-1 PM', queries: 38 },
// // // //       { hour: '1-2 PM', queries: 25 },
// // // //       { hour: '2-3 PM', queries: 32 },
// // // //       { hour: '3-4 PM', queries: 29 },
// // // //       { hour: '4-5 PM', queries: 18 }
// // // //     ],
// // // //   };

// // // //   useEffect(() => {
// // // //     // Simulate API call to fetch analytics data
// // // //     const fetchAnalyticsData = async () => {
// // // //       setLoading(true);
// // // //       try {
// // // //         // Simulate network delay
// // // //         await new Promise(resolve => setTimeout(resolve, 1500));
// // // //         setAnalyticsData(staticAnalyticsData);
// // // //       } catch (error) {
// // // //         console.error('Error fetching analytics:', error);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchAnalyticsData();
// // // //   }, []);

// // // //   const handleRefresh = async () => {
// // // //     setRefreshing(true);
// // // //     try {
// // // //       // Simulate refresh delay
// // // //       await new Promise(resolve => setTimeout(resolve, 1000));
// // // //       // You can add actual refresh logic here
// // // //     } catch (error) {
// // // //       console.error('Error refreshing data:', error);
// // // //     } finally {
// // // //       setRefreshing(false);
// // // //     }
// // // //   };

// // // //   // Loading state
// // // //   if (loading || !analyticsData) {
// // // //     return (
// // // //       <div className="flex min-h-screen bg-gray-50">
// // // //         <AdminSidebar activePage="analytics" />
// // // //         <div className="flex-1 flex flex-col ml-64">
// // // //           <div className="bg-white shadow-sm border-b border-gray-200">
// // // //             <div className="flex items-center justify-between px-6 py-4">
// // // //               <div>
// // // //                 <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
// // // //                 <p className="text-gray-600">Loading insights...</p>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //           <div className="flex-1 flex items-center justify-center">
// // // //             <StarSpinner 
// // // //               size="large" 
// // // //               text="Loading analytics data..." 
// // // //             />
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // Calculate maximum values for scaling
// // // //   const maxQueries = Math.max(...analyticsData.peak_hours.map(h => h.queries));
// // // //   const maxCategory = Math.max(...analyticsData.categories.map(c => c.count));

// // // //   return (
// // // //     <div className="flex min-h-screen bg-gray-50 font-sans">
// // // //       <AdminSidebar activePage="analytics" />
      
// // // //       <div className="flex-1 flex flex-col ml-64">
// // // //         {/* Custom Topbar */}
// // // //         <div className="bg-white shadow-sm border-b border-gray-200">
// // // //           <div className="flex items-center justify-between px-6 py-4">
// // // //             <div>
// // // //               <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
// // // //               <p className="text-gray-600">Live system performance and user insights</p>
// // // //             </div>
// // // //             <div className="flex items-center space-x-4">
// // // //               <button
// // // //                 onClick={handleRefresh}
// // // //                 className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-sm hover:shadow min-w-[120px] justify-center"
// // // //                 disabled={refreshing}
// // // //               >
// // // //                 {refreshing ? (
// // // //                   <>
// // // //                     <div className="w-4 h-4">
// // // //                       <StarSpinner size="small" text="" />
// // // //                     </div>
// // // //                     <span>Refreshing...</span>
// // // //                   </>
// // // //                 ) : (
// // // //                   <>
// // // //                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
// // // //                     </svg>
// // // //                     <span>Refresh</span>
// // // //                   </>
// // // //                 )}
// // // //               </button>
// // // //               <div className="flex items-center space-x-3">
// // // //                 <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
// // // //                   <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
// // // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
// // // //                   </svg>
// // // //                 </div>
// // // //                 <div className="text-right">
// // // //                   <p className="text-sm font-medium text-gray-900">Admin User</p>
// // // //                   <p className="text-xs text-gray-500">Super Admin</p>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
        
// // // //         <div className="flex-1 p-6">
// // // //           {/* Refresh overlay spinner */}
// // // //           {refreshing && (
// // // //             <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
// // // //               <div className="bg-white rounded-xl shadow-xl p-8">
// // // //                 <StarSpinner size="large" text="Updating analytics..." />
// // // //               </div>
// // // //             </div>
// // // //           )}

// // // //           {/* Key Metrics Cards */}
// // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
// // // //               <div className="flex items-center justify-between">
// // // //                 <div>
// // // //                   <p className="text-sm font-medium text-gray-600">Total Users</p>
// // // //                   <p className="text-2xl font-bold text-gray-900 mt-1">
// // // //                     {analyticsData.overview.total_users.toLocaleString()}
// // // //                   </p>
// // // //                   <p className="text-sm text-teal-600 mt-1 flex items-center">
// // // //                     <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
// // // //                       <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
// // // //                     </svg>
// // // //                     12% from last month
// // // //                   </p>
// // // //                 </div>
// // // //                 <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-sm">
// // // //                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-7.645a10.025 10.025 0 01-3.5 7.645" />
// // // //                   </svg>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
            
// // // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
// // // //               <div className="flex items-center justify-between">
// // // //                 <div>
// // // //                   <p className="text-sm font-medium text-gray-600">Daily Queries</p>
// // // //                   <p className="text-2xl font-bold text-gray-900 mt-1">
// // // //                     {analyticsData.overview.daily_queries}
// // // //                   </p>
// // // //                   <p className="text-sm text-red-600 mt-1 flex items-center">
// // // //                     <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
// // // //                       <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
// // // //                     </svg>
// // // //                     8% from yesterday
// // // //                   </p>
// // // //                 </div>
// // // //                 <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-sm">
// // // //                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h8M8 14h5m9-2a9 9 0 11-18 0 9 9 0 0118 0z" />
// // // //                   </svg>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
            
// // // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
// // // //               <div className="flex items-center justify-between">
// // // //                 <div>
// // // //                   <p className="text-sm font-medium text-gray-600">Accuracy Rate</p>
// // // //                   <p className="text-2xl font-bold text-gray-900 mt-1">
// // // //                     {analyticsData.overview.accuracy}%
// // // //                   </p>
// // // //                   <p className="text-sm text-green-600 mt-1 flex items-center">
// // // //                     <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
// // // //                       <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
// // // //                     </svg>
// // // //                     2.3% improvement
// // // //                   </p>
// // // //                 </div>
// // // //                 <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-sm">
// // // //                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
// // // //                   </svg>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
            
// // // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
// // // //               <div className="flex items-center justify-between">
// // // //                 <div>
// // // //                   <p className="text-sm font-medium text-gray-600">Human Escalations</p>
// // // //                   <p className="text-2xl font-bold text-gray-900 mt-1">
// // // //                     {analyticsData.overview.human_escalations}%
// // // //                   </p>
// // // //                   <p className="text-sm text-orange-600 mt-1 flex items-center">
// // // //                     <svg className="w-4 h-4 mr-1 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
// // // //                       <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
// // // //                     </svg>
// // // //                     1.2% from last month
// // // //                   </p>
// // // //                 </div>
// // // //                 <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-sm">
// // // //                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
// // // //                   </svg>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           {/* Charts Grid */}
// // // //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
// // // //             {/* Language Distribution - Donut Chart */}
// // // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // // //               <div className="flex items-center justify-between mb-4">
// // // //                 <h3 className="text-lg font-semibold text-gray-800">Language Distribution</h3>
// // // //                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">6 Languages</span>
// // // //               </div>
// // // //               <div className="flex flex-col lg:flex-row items-center">
// // // //                 <div className="relative w-48 h-48 mb-4 lg:mb-0 lg:mr-6">
// // // //                   <svg className="w-full h-full" viewBox="0 0 100 100">
// // // //                     <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="20" />
// // // //                     {analyticsData.languages.reduce((acc, lang, index) => {
// // // //                       const previousPercent = acc.reduce((sum, l) => sum + l.percentage, 0);
// // // //                       const circumference = 2 * Math.PI * 40;
// // // //                       const strokeDasharray = ${(lang.percentage / 100) * circumference} ${circumference};
// // // //                       const strokeDashoffset = circumference - (previousPercent / 100) * circumference;
                      
// // // //                       return [
// // // //                         ...acc,
// // // //                         <circle
// // // //                           key={lang.language}
// // // //                           cx="50"
// // // //                           cy="50"
// // // //                           r="40"
// // // //                           fill="none"
// // // //                           stroke={lang.color}
// // // //                           strokeWidth="20"
// // // //                           strokeDasharray={strokeDasharray}
// // // //                           strokeDashoffset={strokeDashoffset}
// // // //                           transform="rotate(-90 50 50)"
// // // //                         />
// // // //                       ];
// // // //                     }, [])}
// // // //                   </svg>
// // // //                   <div className="absolute inset-0 flex items-center justify-center">
// // // //                     <div className="text-center">
// // // //                       <div className="text-2xl font-bold text-gray-900">6</div>
// // // //                       <div className="text-sm text-gray-500">Languages</div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //                 <div className="flex-1 space-y-3">
// // // //                   {analyticsData.languages.map((lang, index) => (
// // // //                     <div key={index} className="flex items-center justify-between">
// // // //                       <div className="flex items-center space-x-3">
// // // //                         <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }}></div>
// // // //                         <span className="text-sm font-medium text-gray-700">{lang.language}</span>
// // // //                       </div>
// // // //                       <div className="flex items-center space-x-3">
// // // //                         <span className="text-sm font-bold text-gray-900">{lang.percentage}%</span>
// // // //                         <div className="w-24 bg-gray-200 rounded-full h-2">
// // // //                           <div 
// // // //                             className="h-2 rounded-full transition-all duration-500"
// // // //                             style={{ 
// // // //                               width: ${lang.percentage}%,
// // // //                               backgroundColor: lang.color
// // // //                             }}
// // // //                           ></div>
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //             {/* Query Categories - Horizontal Bar Chart */}
// // // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // // //               <div className="flex items-center justify-between mb-4">
// // // //                 <h3 className="text-lg font-semibold text-gray-800">Query Categories</h3>
// // // //                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Top 6 Categories</span>
// // // //               </div>
// // // //               <div className="space-y-4">
// // // //                 {analyticsData.categories.map((category, index) => (
// // // //                   <div key={index} className="space-y-2">
// // // //                     <div className="flex items-center justify-between">
// // // //                       <div className="flex items-center space-x-3">
// // // //                         <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
// // // //                         <span className="text-sm font-medium text-gray-700">{category.category}</span>
// // // //                       </div>
// // // //                       <span className="text-sm text-gray-500">{category.count} queries</span>
// // // //                     </div>
// // // //                     <div className="w-full bg-gray-200 rounded-full h-3">
// // // //                       <div 
// // // //                         className="h-3 rounded-full transition-all duration-500"
// // // //                         style={{ 
// // // //                           width: ${(category.count / maxCategory) * 100}%,
// // // //                           backgroundColor: category.color
// // // //                         }}
// // // //                       ></div>
// // // //                     </div>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           {/* Accuracy and Escalation Gauges */}
// // // //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // // //             {/* Accuracy Gauge */}
// // // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // // //               <div className="flex items-center justify-between mb-4">
// // // //                 <h3 className="text-lg font-semibold text-gray-800">AI Accuracy Gauge</h3>
// // // //                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Overall Performance</span>
// // // //               </div>
// // // //               <div className="flex flex-col items-center">
// // // //                 <div className="relative w-48 h-24 mb-4">
// // // //                   <div className="w-full h-24 bg-gray-200 rounded-t-full overflow-hidden">
// // // //                     <div 
// // // //                       className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 transition-all duration-1000 ease-out"
// // // //                       style={{ width: ${analyticsData.overview.accuracy}% }}
// // // //                     ></div>
// // // //                   </div>
// // // //                   <div 
// // // //                     className="absolute top-0 w-1 h-24 bg-gray-800 transform origin-bottom transition-all duration-1000 ease-out"
// // // //                     style={{ 
// // // //                       left: '50%', 
// // // //                       transform: translateX(-50%) rotate(${(analyticsData.overview.accuracy / 100) * 180 - 90}deg) 
// // // //                     }}
// // // //                   ></div>
// // // //                   <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-6 h-6 bg-gray-800 rounded-full"></div>
// // // //                 </div>
// // // //                 <div className="text-center">
// // // //                   <div className="text-3xl font-bold text-gray-900">{analyticsData.overview.accuracy}%</div>
// // // //                   <div className="text-sm text-gray-500">Excellent performance threshold: 90%</div>
// // // //                 </div>
// // // //                 <div className="w-full mt-4 flex justify-between text-xs text-gray-400">
// // // //                   <span>0%</span>
// // // //                   <span>50%</span>
// // // //                   <span>100%</span>
// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //             {/* Escalation Rate */}
// // // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // // //               <div className="flex items-center justify-between mb-4">
// // // //                 <h3 className="text-lg font-semibold text-gray-800">Human Escalation Rate</h3>
// // // //                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Low is Better</span>
// // // //               </div>
// // // //               <div className="flex flex-col items-center">
// // // //                 <div className="relative w-32 h-32 mb-4">
// // // //                   <svg className="w-full h-full" viewBox="0 0 128 128">
// // // //                     <circle cx="64" cy="64" r="56" fill="none" stroke="#f3f4f6" strokeWidth="12" />
// // // //                     <circle
// // // //                       cx="64"
// // // //                       cy="64"
// // // //                       r="56"
// // // //                       fill="none"
// // // //                       stroke="#f97316"
// // // //                       strokeWidth="12"
// // // //                       strokeDasharray={${(2 * Math.PI * 56) * (analyticsData.overview.human_escalations / 100)} ${2 * Math.PI * 56}}
// // // //                       strokeDashoffset={2 * Math.PI * 56 * 0.25}
// // // //                       transform="rotate(-90 64 64)"
// // // //                     />
// // // //                   </svg>
// // // //                   <div className="absolute inset-0 flex items-center justify-center">
// // // //                     <div className="text-center">
// // // //                       <div className="text-2xl font-bold text-gray-900">{analyticsData.overview.human_escalations}%</div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //                 <div className="text-center">
// // // //                   <div className="text-sm text-gray-500">Only {analyticsData.overview.human_escalations}% conversations need human help</div>
// // // //                   <div className="mt-2 flex items-center justify-center space-x-4">
// // // //                     <div className="flex items-center">
// // // //                       <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
// // // //                       <span className="text-xs text-gray-500">Escalated</span>
// // // //                     </div>
// // // //                     <div className="flex items-center">
// // // //                       <div className="w-3 h-3 bg-gray-200 rounded-full mr-2"></div>
// // // //                       <span className="text-xs text-gray-500">Resolved by AI</span>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default AdminAnalytics;







// // // import React, { useState, useEffect, useContext } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import AdminSidebar from '../../components/admin/AdminSidebar';
// // // import { AuthContext } from '../../App';
// // // import StarSpinner from '../../components/common/StarSpinner';

// // // const AdminAnalytics = () => {
// // //   const { logout } = useContext(AuthContext);
// // //   const navigate = useNavigate();
// // //   const [loading, setLoading] = useState(true);
// // //   const [refreshing, setRefreshing] = useState(false);
// // //   const [analyticsData, setAnalyticsData] = useState(null);

// // //   // Static demo data matching your structure
// // //   const staticAnalyticsData = {
// // //     overview: {
// // //       total_users: 1287,
// // //       daily_queries: 212,
// // //       accuracy: 94.8,
// // //       human_escalations: 4.7
// // //     },
// // //     languages: [
// // //       { language: 'Hindi', percentage: 42, color: '#8b5cf6' },
// // //       { language: 'English', percentage: 38, color: '#3b82f6' },
// // //       { language: 'Tamil', percentage: 12, color: '#10b981' },
// // //       { language: 'Gujarati', percentage: 5, color: '#f59e0b' },
// // //       { language: 'Marathi', percentage: 3, color: '#ef4444' }
// // //     ],
// // //     growth: [
// // //       { month: 'Jan', users: 800, queries: 150 },
// // //       { month: 'Feb', users: 950, queries: 180 },
// // //       { month: 'Mar', users: 1100, queries: 195 },
// // //       { month: 'Apr', users: 1200, queries: 2100 },
// // //       { month: 'May', users: 1250, queries: 205 },
// // //       { month: 'Jun', users: 1287, queries: 212 }
// // //     ],
// // //     categories: [
// // //       { category: 'Scholarship', count: 45, color: '#8b5cf6' },
// // //       { category: 'Exams', count: 38, color: '#3b82f6' },
// // //       { category: 'Hostel', count: 32, color: '#10b981' },
// // //       { category: 'Library', count: 28, color: '#f59e0b' },
// // //       { category: 'Fees', count: 25, color: '#ef4444' },
// // //       { category: 'Others', count: 44, color: '#6b7280' }
// // //     ],
// // //     peak_hours: [
// // //       { hour: '8-9 AM', queries: 15 },
// // //       { hour: '9-10 AM', queries: 28 },
// // //       { hour: '10-11 AM', queries: 35 },
// // //       { hour: '11-12 PM', queries: 42 },
// // //       { hour: '12-1 PM', queries: 38 },
// // //       { hour: '1-2 PM', queries: 25 },
// // //       { hour: '2-3 PM', queries: 32 },
// // //       { hour: '3-4 PM', queries: 29 },
// // //       { hour: '4-5 PM', queries: 18 }
// // //     ],
// // //   };

// // //   useEffect(() => {
// // //     // Simulate API call to fetch analytics data
// // //     const fetchAnalyticsData = async () => {
// // //       setLoading(true);
// // //       try {
// // //         // Simulate network delay
// // //         await new Promise(resolve => setTimeout(resolve, 1500));
// // //         setAnalyticsData(staticAnalyticsData);
// // //       } catch (error) {
// // //         console.error('Error fetching analytics:', error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchAnalyticsData();
// // //   }, []);

// // //   const handleRefresh = async () => {
// // //     setRefreshing(true);
// // //     try {
// // //       // Simulate refresh delay
// // //       await new Promise(resolve => setTimeout(resolve, 1000));
// // //       // You can add actual refresh logic here
// // //     } catch (error) {
// // //       console.error('Error refreshing data:', error);
// // //     } finally {
// // //       setRefreshing(false);
// // //     }
// // //   };

// // //   // Loading state
// // //   if (loading || !analyticsData) {
// // //     return (
// // //       <div className="flex min-h-screen bg-gray-50">
// // //         <AdminSidebar activePage="analytics" />
// // //         <div className="flex-1 flex flex-col ml-64">
// // //           <div className="bg-white shadow-sm border-b border-gray-200">
// // //             <div className="flex items-center justify-between px-6 py-4">
// // //               <div>
// // //                 <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
// // //                 <p className="text-gray-600">Loading insights...</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //           <div className="flex-1 flex items-center justify-center">
// // //             <StarSpinner 
// // //               size="large" 
// // //               text="Loading analytics data..." 
// // //             />
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   // Calculate maximum values for scaling
// // //   const maxQueries = Math.max(...analyticsData.peak_hours.map(h => h.queries));
// // //   const maxCategory = Math.max(...analyticsData.categories.map(c => c.count));

// // //   // --- Precompute values for SVG charts to avoid messy inline template literals ---

// // //   // Donut (language distribution)
// // //   const donutRadius = 40;
// // //   const donutCircumference = 2 * Math.PI * donutRadius;
// // //   // build circles with cumulative offset so slices don't overlap incorrectly
// // //   let cumulativePercent = 0;
// // //   const languageCircles = analyticsData.languages.map((lang) => {
// // //     const slicePercent = lang.percentage;
// // //     const sliceLength = (slicePercent / 100) * donutCircumference;
// // //     const dashArray = `${sliceLength} ${donutCircumference - sliceLength}`;
// // //     // strokeDashoffset is the amount to offset from the start of the circle:
// // //     const dashOffset = donutCircumference - (cumulativePercent / 100) * donutCircumference;
// // //     // after computing, update cumulative
// // //     cumulativePercent += slicePercent;
// // //     return {
// // //       ...lang,
// // //       strokeDasharray: dashArray,
// // //       strokeDashoffset: dashOffset
// // //     };
// // //   });

// // //   // Escalation gauge (circle)
// // //   const gaugeRadius = 56;
// // //   const gaugeCircumference = 2 * Math.PI * gaugeRadius;
// // //   const escalationPercent = analyticsData.overview.human_escalations; // e.g. 4.7
// // //   const escalationDash = (escalationPercent / 100) * gaugeCircumference;
// // //   const escalationDasharray = `${escalationDash} ${gaugeCircumference - escalationDash}`;
// // //   const escalationOffset = gaugeCircumference * 0.25; // keep same visual offset you used

// // //   // Accuracy gauge needle rotation
// // //   const accuracy = analyticsData.overview.accuracy; // 0-100
// // //   const needleDeg = (accuracy / 100) * 180 - 90; // -90..90 degrees

// // //   return (
// // //     <div className="flex min-h-screen bg-gray-50 font-sans">
// // //       <AdminSidebar activePage="analytics" />
      
// // //       <div className="flex-1 flex flex-col ml-64">
// // //         {/* Custom Topbar */}
// // //         <div className="bg-white shadow-sm border-b border-gray-200">
// // //           <div className="flex items-center justify-between px-6 py-4">
// // //             <div>
// // //               <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
// // //               <p className="text-gray-600">Live system performance and user insights</p>
// // //             </div>
// // //             <div className="flex items-center space-x-4">
// // //               <button
// // //                 onClick={handleRefresh}
// // //                 className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-sm hover:shadow min-w-[120px] justify-center"
// // //                 disabled={refreshing}
// // //               >
// // //                 {refreshing ? (
// // //                   <>
// // //                     <div className="w-4 h-4">
// // //                       <StarSpinner size="small" text="" />
// // //                     </div>
// // //                     <span>Refreshing...</span>
// // //                   </>
// // //                 ) : (
// // //                   <>
// // //                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
// // //                     </svg>
// // //                     <span>Refresh</span>
// // //                   </>
// // //                 )}
// // //               </button>
// // //               <div className="flex items-center space-x-3">
// // //                 <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
// // //                   <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
// // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
// // //                   </svg>
// // //                 </div>
// // //                 <div className="text-right">
// // //                   <p className="text-sm font-medium text-gray-900">Admin User</p>
// // //                   <p className="text-xs text-gray-500">Super Admin</p>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
        
// // //         <div className="flex-1 p-6">
// // //           {/* Refresh overlay spinner */}
// // //           {refreshing && (
// // //             <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
// // //               <div className="bg-white rounded-xl shadow-xl p-8">
// // //                 <StarSpinner size="large" text="Updating analytics..." />
// // //               </div>
// // //             </div>
// // //           )}

// // //           {/* Key Metrics Cards */}
// // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
// // //               <div className="flex items-center justify-between">
// // //                 <div>
// // //                   <p className="text-sm font-medium text-gray-600">Total Users</p>
// // //                   <p className="text-2xl font-bold text-gray-900 mt-1">
// // //                     {analyticsData.overview.total_users.toLocaleString()}
// // //                   </p>
// // //                   <p className="text-sm text-teal-600 mt-1 flex items-center">
// // //                     <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
// // //                       <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
// // //                     </svg>
// // //                     12% from last month
// // //                   </p>
// // //                 </div>
// // //                 <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-sm">
// // //                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-7.645a10.025 10.025 0 01-3.5 7.645" />
// // //                   </svg>
// // //                 </div>
// // //               </div>
// // //             </div>
            
// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
// // //               <div className="flex items-center justify-between">
// // //                 <div>
// // //                   <p className="text-sm font-medium text-gray-600">Daily Queries</p>
// // //                   <p className="text-2xl font-bold text-gray-900 mt-1">
// // //                     {analyticsData.overview.daily_queries}
// // //                   </p>
// // //                   <p className="text-sm text-red-600 mt-1 flex items-center">
// // //                     <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
// // //                       <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
// // //                     </svg>
// // //                     8% from yesterday
// // //                   </p>
// // //                 </div>
// // //                 <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-sm">
// // //                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h8M8 14h5m9-2a9 9 0 11-18 0 9 9 0 0118 0z" />
// // //                   </svg>
// // //                 </div>
// // //               </div>
// // //             </div>
            
// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
// // //               <div className="flex items-center justify-between">
// // //                 <div>
// // //                   <p className="text-sm font-medium text-gray-600">Accuracy Rate</p>
// // //                   <p className="text-2xl font-bold text-gray-900 mt-1">
// // //                     {analyticsData.overview.accuracy}%
// // //                   </p>
// // //                   <p className="text-sm text-green-600 mt-1 flex items-center">
// // //                     <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
// // //                       <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
// // //                     </svg>
// // //                     2.3% improvement
// // //                   </p>
// // //                 </div>
// // //                 <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-sm">
// // //                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
// // //                   </svg>
// // //                 </div>
// // //               </div>
// // //             </div>
            
// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
// // //               <div className="flex items-center justify-between">
// // //                 <div>
// // //                   <p className="text-sm font-medium text-gray-600">Human Escalations</p>
// // //                   <p className="text-2xl font-bold text-gray-900 mt-1">
// // //                     {analyticsData.overview.human_escalations}%
// // //                   </p>
// // //                   <p className="text-sm text-orange-600 mt-1 flex items-center">
// // //                     <svg className="w-4 h-4 mr-1 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
// // //                       <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
// // //                     </svg>
// // //                     1.2% from last month
// // //                   </p>
// // //                 </div>
// // //                 <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-sm">
// // //                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
// // //                   </svg>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Charts Grid */}
// // //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
// // //             {/* Language Distribution - Donut Chart */}
// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // //               <div className="flex items-center justify-between mb-4">
// // //                 <h3 className="text-lg font-semibold text-gray-800">Language Distribution</h3>
// // //                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">6 Languages</span>
// // //               </div>
// // //               <div className="flex flex-col lg:flex-row items-center">
// // //                 <div className="relative w-48 h-48 mb-4 lg:mb-0 lg:mr-6">
// // //                   <svg className="w-full h-full" viewBox="0 0 100 100">
// // //                     <circle cx="50" cy="50" r={donutRadius} fill="none" stroke="#f3f4f6" strokeWidth="20" />
// // //                     {languageCircles.map((c) => (
// // //                       <circle
// // //                         key={c.language}
// // //                         cx="50"
// // //                         cy="50"
// // //                         r={donutRadius}
// // //                         fill="none"
// // //                         stroke={c.color}
// // //                         strokeWidth="20"
// // //                         strokeDasharray={c.strokeDasharray}
// // //                         strokeDashoffset={c.strokeDashoffset}
// // //                         transform="rotate(-90 50 50)"
// // //                       />
// // //                     ))}
// // //                   </svg>
// // //                   <div className="absolute inset-0 flex items-center justify-center">
// // //                     <div className="text-center">
// // //                       <div className="text-2xl font-bold text-gray-900">{analyticsData.languages.length}</div>
// // //                       <div className="text-sm text-gray-500">Languages</div>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //                 <div className="flex-1 space-y-3">
// // //                   {analyticsData.languages.map((lang, index) => (
// // //                     <div key={index} className="flex items-center justify-between">
// // //                       <div className="flex items-center space-x-3">
// // //                         <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }}></div>
// // //                         <span className="text-sm font-medium text-gray-700">{lang.language}</span>
// // //                       </div>
// // //                       <div className="flex items-center space-x-3">
// // //                         <span className="text-sm font-bold text-gray-900">{lang.percentage}%</span>
// // //                         <div className="w-24 bg-gray-200 rounded-full h-2">
// // //                           <div 
// // //                             className="h-2 rounded-full transition-all duration-500"
// // //                             style={{ 
// // //                               width: `${lang.percentage}%`,
// // //                               backgroundColor: lang.color
// // //                             }}
// // //                           ></div>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Query Categories - Horizontal Bar Chart */}
// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // //               <div className="flex items-center justify-between mb-4">
// // //                 <h3 className="text-lg font-semibold text-gray-800">Query Categories</h3>
// // //                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Top 6 Categories</span>
// // //               </div>
// // //               <div className="space-y-4">
// // //                 {analyticsData.categories.map((category, index) => (
// // //                   <div key={index} className="space-y-2">
// // //                     <div className="flex items-center justify-between">
// // //                       <div className="flex items-center space-x-3">
// // //                         <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
// // //                         <span className="text-sm font-medium text-gray-700">{category.category}</span>
// // //                       </div>
// // //                       <span className="text-sm text-gray-500">{category.count} queries</span>
// // //                     </div>
// // //                     <div className="w-full bg-gray-200 rounded-full h-3">
// // //                       <div 
// // //                         className="h-3 rounded-full transition-all duration-500"
// // //                         style={{ 
// // //                           width: `${(category.count / maxCategory) * 100}%`,
// // //                           backgroundColor: category.color
// // //                         }}
// // //                       ></div>
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Accuracy and Escalation Gauges */}
// // //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //             {/* Accuracy Gauge */}
// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // //               <div className="flex items-center justify-between mb-4">
// // //                 <h3 className="text-lg font-semibold text-gray-800">AI Accuracy Gauge</h3>
// // //                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Overall Performance</span>
// // //               </div>
// // //               <div className="flex flex-col items-center">
// // //                 <div className="relative w-48 h-24 mb-4">
// // //                   <div className="w-full h-24 bg-gray-200 rounded-t-full overflow-hidden">
// // //                     <div 
// // //                       className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 transition-all duration-1000 ease-out"
// // //                       style={{ width: `${analyticsData.overview.accuracy}%` }}
// // //                     ></div>
// // //                   </div>
// // //                   <div 
// // //                     className="absolute top-0 w-1 h-24 bg-gray-800 transform origin-bottom transition-all duration-1000 ease-out"
// // //                     style={{ 
// // //                       left: '50%', 
// // //                       transform: `translateX(-50%) rotate(${needleDeg}deg)` 
// // //                     }}
// // //                   />
// // //                   <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-6 h-6 bg-gray-800 rounded-full"></div>
// // //                 </div>
// // //                 <div className="text-center">
// // //                   <div className="text-3xl font-bold text-gray-900">{analyticsData.overview.accuracy}%</div>
// // //                   <div className="text-sm text-gray-500">Excellent performance threshold: 90%</div>
// // //                 </div>
// // //                 <div className="w-full mt-4 flex justify-between text-xs text-gray-400">
// // //                   <span>0%</span>
// // //                   <span>50%</span>
// // //                   <span>100%</span>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Escalation Rate */}
// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // //               <div className="flex items-center justify-between mb-4">
// // //                 <h3 className="text-lg font-semibold text-gray-800">Human Escalation Rate</h3>
// // //                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Low is Better</span>
// // //               </div>
// // //               <div className="flex flex-col items-center">
// // //                 <div className="relative w-32 h-32 mb-4">
// // //                   <svg className="w-full h-full" viewBox="0 0 128 128">
// // //                     <circle cx="64" cy="64" r={gaugeRadius} fill="none" stroke="#f3f4f6" strokeWidth="12" />
// // //                     <circle
// // //                       cx="64"
// // //                       cy="64"
// // //                       r={gaugeRadius}
// // //                       fill="none"
// // //                       stroke="#f97316"
// // //                       strokeWidth="12"
// // //                       strokeDasharray={escalationDasharray}
// // //                       strokeDashoffset={escalationOffset}
// // //                       transform="rotate(-90 64 64)"
// // //                     />
// // //                   </svg>
// // //                   <div className="absolute inset-0 flex items-center justify-center">
// // //                     <div className="text-center">
// // //                       <div className="text-2xl font-bold text-gray-900">{analyticsData.overview.human_escalations}%</div>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //                 <div className="text-center">
// // //                   <div className="text-sm text-gray-500">Only {analyticsData.overview.human_escalations}% conversations need human help</div>
// // //                   <div className="mt-2 flex items-center justify-center space-x-4">
// // //                     <div className="flex items-center">
// // //                       <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
// // //                       <span className="text-xs text-gray-500">Escalated</span>
// // //                     </div>
// // //                     <div className="flex items-center">
// // //                       <div className="w-3 h-3 bg-gray-200 rounded-full mr-2"></div>
// // //                       <span className="text-xs text-gray-500">Resolved by AI</span>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div> 
// // //     </div>
// // //   );
// // // };

// // // export default AdminAnalytics;

// // // -----------------------------------------------------------------------------


// // // src/pages/admin/AdminAnalytics.jsx
// // // import React, { useState, useEffect, useContext } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import AdminSidebar from "../../components/admin/AdminSidebar";
// // // import { AuthContext } from "../../App";
// // // import StarSpinner from "../../components/common/StarSpinner";
// // // import axios from "axios";

// // // const AdminAnalytics = () => {
// // //   const { logout } = useContext(AuthContext);
// // //   const navigate = useNavigate();

// // //   const [loading, setLoading] = useState(true);
// // //   const [refreshing, setRefreshing] = useState(false);
// // //   const [analyticsData, setAnalyticsData] = useState(null);
// // //   const [error, setError] = useState(null);

// // //   // Default data structure (fallback)
// // //   const defaultData = {
// // //     overview: {
// // //       total_users: 0,
// // //       daily_queries: 0,
// // //       accuracy: 0,
// // //       human_escalations: 0
// // //     },
// // //     languages: [],
// // //     growth: [],
// // //     categories: [],
// // //     peak_hours: []
// // //   };

// // //   const fetchAnalyticsData = async () => {
// // //     try {
// // //       setLoading(true);
// // //       setError(null);

// // //       // replace with your real endpoint
// // //       const res = await axios.get("http://localhost:5000/api/analytics");
// // //       const d = res.data || {};

// // //       // transform API payload into the shape this component expects
// // //       const transformed = {
// // //         overview: {
// // //           total_users: d.totalUsers ?? d.overview?.total_users ?? 0,
// // //           daily_queries: d.dailyQueries ?? d.overview?.daily_queries ?? 0,
// // //           accuracy: d.accuracy ?? d.overview?.accuracy ?? 0,
// // //           human_escalations:
// // //             d.humanEscalations ?? d.overview?.human_escalations ?? 0
// // //         },
// // //         languages:
// // //           d.languages ??
// // //           d.languageDistribution ??
// // //           [
// // //             { language: "Hindi", percentage: 42, color: "#8b5cf6" },
// // //             { language: "English", percentage: 38, color: "#3b82f6" },
// // //             { language: "Tamil", percentage: 12, color: "#10b981" },
// // //             { language: "Gujarati", percentage: 5, color: "#f59e0b" },
// // //             { language: "Marathi", percentage: 3, color: "#ef4444" }
// // //           ],
// // //         growth: d.growth ?? [],
// // //         categories:
// // //           d.categories ??
// // //           [
// // //             { category: "Scholarship", count: 45, color: "#8b5cf6" },
// // //             { category: "Exams", count: 38, color: "#3b82f6" },
// // //             { category: "Hostel", count: 32, color: "#10b981" },
// // //             { category: "Library", count: 28, color: "#f59e0b" },
// // //             { category: "Fees", count: 25, color: "#ef4444" },
// // //             { category: "Others", count: 44, color: "#6b7280" }
// // //           ],
// // //         peak_hours: d.peak_hours ?? d.peakHours ?? []
// // //       };

// // //       setAnalyticsData(transformed);
// // //     } catch (err) {
// // //       console.error("Error fetching analytics:", err);
// // //       setError("Failed to load analytics data. Using defaults.");
// // //       setAnalyticsData(defaultData);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchAnalyticsData();
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, []);

// // //   const handleRefresh = async () => {
// // //     setRefreshing(true);
// // //     try {
// // //       await fetchAnalyticsData();
// // //     } finally {
// // //       setRefreshing(false);
// // //     }
// // //   };

// // //   // Loading UI
// // //   if (loading || !analyticsData) {
// // //     return (
// // //       <div className="flex min-h-screen bg-gray-50">
// // //         <AdminSidebar activePage="analytics" />
// // //         <div className="flex-1 flex flex-col ml-64">
// // //           <div className="bg-white shadow-sm border-b border-gray-200">
// // //             <div className="flex items-center justify-between px-6 py-4">
// // //               <div>
// // //                 <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
// // //                 <p className="text-gray-600">Loading insights...</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //           <div className="flex-1 flex items-center justify-center">
// // //             <StarSpinner size="large" text="Loading analytics data..." />
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   // defensive min values
// // //   const maxQueries =
// // //     analyticsData.peak_hours && analyticsData.peak_hours.length > 0
// // //       ? Math.max(...analyticsData.peak_hours.map((h) => h.queries || 0))
// // //       : 1;
// // //   const maxCategory =
// // //     analyticsData.categories && analyticsData.categories.length > 0
// // //       ? Math.max(...analyticsData.categories.map((c) => c.count || 0))
// // //       : 1;

// // //   // Donut values
// // //   const donutRadius = 40;
// // //   const donutCircumference = 2 * Math.PI * donutRadius;
// // //   let cumulativePercent = 0;

// // //   const languageCircles = analyticsData.languages.map((lang) => {
// // //     const slicePercent = Number(lang.percentage) || 0;
// // //     const sliceLength = (slicePercent / 100) * donutCircumference;
// // //     const dashArray = `${sliceLength} ${Math.max(0, donutCircumference - sliceLength)}`;
// // //     const dashOffset = donutCircumference - (cumulativePercent / 100) * donutCircumference;
// // //     cumulativePercent += slicePercent;
// // //     return {
// // //       ...lang,
// // //       strokeDasharray: dashArray,
// // //       strokeDashoffset: dashOffset
// // //     };
// // //   });

// // //   // Escalation gauge
// // //   const gaugeRadius = 56;
// // //   const gaugeCircumference = 2 * Math.PI * gaugeRadius;
// // //   const escalationPercent = Number(analyticsData.overview.human_escalations) || 0;
// // //   const escalationDash = (escalationPercent / 100) * gaugeCircumference;
// // //   const escalationDasharray = `${escalationDash} ${Math.max(0, gaugeCircumference - escalationDash)}`;
// // //   const escalationOffset = gaugeCircumference * 0.25;

// // //   // Accuracy needle
// // //   const accuracy = Number(analyticsData.overview.accuracy) || 0;
// // //   const needleDeg = (accuracy / 100) * 180 - 90;

// // //   return (
// // //     <div className="flex min-h-screen bg-gray-50 font-sans">
// // //       <AdminSidebar activePage="analytics" />

// // //       <div className="flex-1 flex flex-col ml-64">
// // //         {/* Topbar */}
// // //         <div className="bg-white shadow-sm border-b border-gray-200">
// // //           <div className="flex items-center justify-between px-6 py-4">
// // //             <div>
// // //               <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
// // //               <p className="text-gray-600">Live system performance and user insights</p>
// // //               {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
// // //             </div>

// // //             <div className="flex items-center space-x-4">
// // //               <button
// // //                 onClick={handleRefresh}
// // //                 className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-sm min-w-[120px] justify-center"
// // //                 disabled={refreshing}
// // //               >
// // //                 {refreshing ? (
// // //                   <>
// // //                     <div className="w-4 h-4">
// // //                       <StarSpinner size="small" text="" />
// // //                     </div>
// // //                     <span>Refreshing...</span>
// // //                   </>
// // //                 ) : (
// // //                   <>
// // //                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
// // //                     </svg>
// // //                     <span>Refresh</span>
// // //                   </>
// // //                 )}
// // //               </button>

// // //               <div className="flex items-center space-x-3">
// // //                 <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
// // //                   <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
// // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
// // //                   </svg>
// // //                 </div>

// // //                 <div className="text-right">
// // //                   <p className="text-sm font-medium text-gray-900">Admin User</p>
// // //                   <p className="text-xs text-gray-500">Super Admin</p>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Body */}
// // //         <div className="flex-1 p-6">
// // //           {/* Key metric cards */}
// // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // //               <div className="flex items-center justify-between">
// // //                 <div>
// // //                   <p className="text-sm font-medium text-gray-600">Total Users</p>
// // //                   <p className="text-2xl font-bold text-gray-900 mt-1">
// // //                     {analyticsData.overview.total_users.toLocaleString()}
// // //                   </p>
// // //                   <p className="text-sm text-teal-600 mt-1 flex items-center">12% from last month</p>
// // //                 </div>
// // //                 <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-sm">
// // //                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1z" />
// // //                   </svg>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // //               <div className="flex items-center justify-between">
// // //                 <div>
// // //                   <p className="text-sm font-medium text-gray-600">Daily Queries</p>
// // //                   <p className="text-2xl font-bold text-gray-900 mt-1">{analyticsData.overview.daily_queries}</p>
// // //                   <p className="text-sm text-red-600 mt-1 flex items-center">8% from yesterday</p>
// // //                 </div>
// // //                 <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-sm">
// // //                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h8M8 14h5m9-2a9 9 0 11-18 0 9 9 0 0118 0z" />
// // //                   </svg>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // //               <div className="flex items-center justify-between">
// // //                 <div>
// // //                   <p className="text-sm font-medium text-gray-600">Accuracy Rate</p>
// // //                   <p className="text-2xl font-bold text-gray-900 mt-1">{analyticsData.overview.accuracy}%</p>
// // //                   <p className="text-sm text-green-600 mt-1 flex items-center">2.3% improvement</p>
// // //                 </div>
// // //                 <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-sm">
// // //                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5" />
// // //                   </svg>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // //               <div className="flex items-center justify-between">
// // //                 <div>
// // //                   <p className="text-sm font-medium text-gray-600">Human Escalations</p>
// // //                   <p className="text-2xl font-bold text-gray-900 mt-1">{analyticsData.overview.human_escalations}%</p>
// // //                   <p className="text-sm text-orange-600 mt-1 flex items-center">1.2% from last month</p>
// // //                 </div>
// // //                 <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-sm">
// // //                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536" />
// // //                   </svg>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Charts Grid */}
// // //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
// // //             {/* Language Donut */}
// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // //               <div className="flex items-center justify-between mb-4">
// // //                 <h3 className="text-lg font-semibold text-gray-800">Language Distribution</h3>
// // //                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
// // //                   {analyticsData.languages.length} Languages
// // //                 </span>
// // //               </div>

// // //               <div className="flex flex-col lg:flex-row items-center">
// // //                 <div className="relative w-48 h-48 mb-4 lg:mb-0 lg:mr-6">
// // //                   <svg className="w-full h-full" viewBox="0 0 100 100">
// // //                     <circle cx="50" cy="50" r={donutRadius} fill="none" stroke="#f3f4f6" strokeWidth="20" />
// // //                     {languageCircles.map((c) => (
// // //                       <circle
// // //                         key={c.language}
// // //                         cx="50"
// // //                         cy="50"
// // //                         r={donutRadius}
// // //                         fill="none"
// // //                         stroke={c.color}
// // //                         strokeWidth="20"
// // //                         strokeDasharray={c.strokeDasharray}
// // //                         strokeDashoffset={c.strokeDashoffset}
// // //                         transform="rotate(-90 50 50)"
// // //                       />
// // //                     ))}
// // //                   </svg>

// // //                   <div className="absolute inset-0 flex items-center justify-center">
// // //                     <div className="text-center">
// // //                       <div className="text-2xl font-bold text-gray-900">{analyticsData.languages.length}</div>
// // //                       <div className="text-sm text-gray-500">Languages</div>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 <div className="flex-1 space-y-3 w-full">
// // //                   {analyticsData.languages.map((lang, index) => (
// // //                     <div key={index} className="flex items-center justify-between">
// // //                       <div className="flex items-center space-x-3">
// // //                         <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }} />
// // //                         <span className="text-sm font-medium text-gray-700">{lang.language}</span>
// // //                       </div>

// // //                       <div className="flex items-center space-x-3">
// // //                         <span className="text-sm font-bold text-gray-900">{lang.percentage}%</span>
// // //                         <div className="w-24 bg-gray-200 rounded-full h-2">
// // //                           <div
// // //                             className="h-2 rounded-full transition-all duration-500"
// // //                             style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
// // //                           />
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Categories */}
// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // //               <div className="flex items-center justify-between mb-4">
// // //                 <h3 className="text-lg font-semibold text-gray-800">Query Categories</h3>
// // //                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
// // //                   Top {analyticsData.categories.length} Categories
// // //                 </span>
// // //               </div>

// // //               <div className="space-y-4">
// // //                 {analyticsData.categories.map((category, index) => (
// // //                   <div key={index} className="space-y-2">
// // //                     <div className="flex items-center justify-between">
// // //                       <div className="flex items-center space-x-3">
// // //                         <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
// // //                         <span className="text-sm font-medium text-gray-700">{category.category}</span>
// // //                       </div>
// // //                       <span className="text-sm text-gray-500">{category.count} queries</span>
// // //                     </div>

// // //                     <div className="w-full bg-gray-200 rounded-full h-3">
// // //                       <div
// // //                         className="h-3 rounded-full transition-all duration-500"
// // //                         style={{ width: `${(category.count / maxCategory) * 100}%`, backgroundColor: category.color }}
// // //                       />
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Accuracy and Escalation */}
// // //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //             {/* Accuracy */}
// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // //               <div className="flex items-center justify-between mb-4">
// // //                 <h3 className="text-lg font-semibold text-gray-800">AI Accuracy Gauge</h3>
// // //                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Overall Performance</span>
// // //               </div>

// // //               <div className="flex flex-col items-center">
// // //                 <div className="relative w-48 h-24 mb-4">
// // //                   <div className="w-full h-24 bg-gray-200 rounded-t-full overflow-hidden">
// // //                     <div
// // //                       className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 transition-all duration-1000 ease-out"
// // //                       style={{ width: `${analyticsData.overview.accuracy}%` }}
// // //                     />
// // //                   </div>

// // //                   <div
// // //                     className="absolute top-0 w-1 h-24 bg-gray-800 transform origin-bottom transition-all duration-1000 ease-out"
// // //                     style={{ left: "50%", transform: `translateX(-50%) rotate(${needleDeg}deg)` }}
// // //                   />

// // //                   <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-6 h-6 bg-gray-800 rounded-full" />
// // //                 </div>

// // //                 <div className="text-center">
// // //                   <div className="text-3xl font-bold text-gray-900">{analyticsData.overview.accuracy}%</div>
// // //                   <div className="text-sm text-gray-500">Excellent performance threshold: 90%</div>
// // //                 </div>

// // //                 <div className="w-full mt-4 flex justify-between text-xs text-gray-400">
// // //                   <span>0%</span>
// // //                   <span>50%</span>
// // //                   <span>100%</span>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Escalation */}
// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // //               <div className="flex items-center justify-between mb-4">
// // //                 <h3 className="text-lg font-semibold text-gray-800">Human Escalation Rate</h3>
// // //                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Low is Better</span>
// // //               </div>

// // //               <div className="flex flex-col items-center">
// // //                 <div className="relative w-32 h-32 mb-4">
// // //                   <svg className="w-full h-full" viewBox="0 0 128 128">
// // //                     <circle cx="64" cy="64" r={gaugeRadius} fill="none" stroke="#f3f4f6" strokeWidth="12" />
// // //                     <circle
// // //                       cx="64"
// // //                       cy="64"
// // //                       r={gaugeRadius}
// // //                       fill="none"
// // //                       stroke="#f97316"
// // //                       strokeWidth="12"
// // //                       strokeDasharray={escalationDasharray}
// // //                       strokeDashoffset={escalationOffset}
// // //                       transform="rotate(-90 64 64)"
// // //                     />
// // //                   </svg>

// // //                   <div className="absolute inset-0 flex items-center justify-center">
// // //                     <div className="text-center">
// // //                       <div className="text-2xl font-bold text-gray-900">{analyticsData.overview.human_escalations}%</div>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 <div className="text-center">
// // //                   <div className="text-sm text-gray-500">Only {analyticsData.overview.human_escalations}% conversations need human help</div>
// // //                   <div className="mt-2 flex items-center justify-center space-x-4">
// // //                     <div className="flex items-center">
// // //                       <div className="w-3 h-3 bg-orange-500 rounded-full mr-2" />
// // //                       <span className="text-xs text-gray-500">Escalated</span>
// // //                     </div>
// // //                     <div className="flex items-center">
// // //                       <div className="w-3 h-3 bg-gray-200 rounded-full mr-2" />
// // //                       <span className="text-xs text-gray-500">Resolved by AI</span>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>

// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default AdminAnalytics;










// // // // src/pages/admin/AdminAnalytics.jsx
// // // import React, { useState, useEffect, useContext } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import AdminSidebar from '../../components/admin/AdminSidebar';
// // // import { AuthContext } from '../../App';
// // // import StarSpinner from '../../components/common/StarSpinner';
// // // import axios from 'axios';

// // // const AdminAnalytics = () => {
// // //   const { logout } = useContext(AuthContext || {});
// // //   const navigate = useNavigate();
// // //   const [loading, setLoading] = useState(true);
// // //   const [refreshing, setRefreshing] = useState(false);
// // //   const [analyticsData, setAnalyticsData] = useState(null);
// // //   const [error, setError] = useState(null);

// // //   const defaultData = {
// // //     overview: {
// // //       total_users: 1287,
// // //       daily_queries: 212,
// // //       accuracy: 94.8,
// // //       human_escalations: 4.7
// // //     },
// // //     languages: [
// // //       { language: 'Hindi', percentage: 42, color: '#8b5cf6' },
// // //       { language: 'English', percentage: 38, color: '#3b82f6' },
// // //       { language: 'Tamil', percentage: 12, color: '#10b981' },
// // //       { language: 'Gujarati', percentage: 5, color: '#f59e0b' },
// // //       { language: 'Marathi', percentage: 3, color: '#ef4444' }
// // //     ],
// // //     growth: [
// // //       { month: 'Jan', users: 800, queries: 150 },
// // //       { month: 'Feb', users: 950, queries: 180 },
// // //       { month: 'Mar', users: 1100, queries: 195 },
// // //       { month: 'Apr', users: 1200, queries: 210 },
// // //       { month: 'May', users: 1250, queries: 205 },
// // //       { month: 'Jun', users: 1287, queries: 212 }
// // //     ],
// // //     categories: [
// // //       { category: 'Scholarship', count: 45, color: '#8b5cf6' },
// // //       { category: 'Exams', count: 38, color: '#3b82f6' },
// // //       { category: 'Hostel', count: 32, color: '#10b981' },
// // //       { category: 'Library', count: 28, color: '#f59e0b' },
// // //       { category: 'Fees', count: 25, color: '#ef4444' },
// // //       { category: 'Others', count: 44, color: '#6b7280' }
// // //     ],
// // //     peak_hours: [
// // //       { hour: '8-9 AM', queries: 15 },
// // //       { hour: '9-10 AM', queries: 28 },
// // //       { hour: '10-11 AM', queries: 35 },
// // //       { hour: '11-12 PM', queries: 42 },
// // //       { hour: '12-1 PM', queries: 38 },
// // //       { hour: '1-2 PM', queries: 25 },
// // //       { hour: '2-3 PM', queries: 32 },
// // //       { hour: '3-4 PM', queries: 29 },
// // //       { hour: '4-5 PM', queries: 18 }
// // //     ]
// // //   };

// // //   const fetchAnalyticsData = async () => {
// // //     setLoading(true);
// // //     setError(null);
// // //     try {
// // //       // Try the API; if it 404s or errors, we fallback to defaultData
// // //       const res = await axios.get('http://localhost:5000/api/analytics', { timeout: 4000 });
// // //       if (res && res.data) {
// // //         // Map fields if API structure differs
// // //         const api = res.data;
// // //         const transformed = {
// // //           overview: {
// // //             total_users: api.totalUsers ?? defaultData.overview.total_users,
// // //             daily_queries: api.dailyQueries ?? defaultData.overview.daily_queries,
// // //             accuracy: api.accuracy ?? defaultData.overview.accuracy,
// // //             human_escalations: api.humanEscalations ?? defaultData.overview.human_escalations
// // //           },
// // //           languages: api.languages ?? defaultData.languages,
// // //           growth: api.growth ?? defaultData.growth,
// // //           categories: api.categories ?? defaultData.categories,
// // //           peak_hours: api.peak_hours ?? defaultData.peak_hours
// // //         };
// // //         setAnalyticsData(transformed);
// // //       } else {
// // //         setAnalyticsData(defaultData);
// // //       }
// // //     } catch (err) {
// // //       console.warn('Error fetching analytics, using fallback data:', err.message || err);
// // //       setError('Could not load analytics from server — showing static demo data.');
// // //       setAnalyticsData(defaultData);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchAnalyticsData();
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, []);

// // //   const handleRefresh = async () => {
// // //     setRefreshing(true);
// // //     await fetchAnalyticsData();
// // //     setRefreshing(false);
// // //   };

// // //   if (loading || !analyticsData) {
// // //     return (
// // //       <div className="flex min-h-screen bg-gray-50">
// // //         <AdminSidebar activePage="analytics" />
// // //         <div className="flex-1 flex flex-col ml-64">
// // //           <div className="bg-white shadow-sm border-b border-gray-200">
// // //             <div className="flex items-center justify-between px-6 py-4">
// // //               <div>
// // //                 <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
// // //                 <p className="text-gray-600">Loading insights...</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //           <div className="flex-1 flex items-center justify-center">
// // //             <StarSpinner size="large" text="Loading analytics data..." />
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   // safe maxima
// // //   const maxQueries = analyticsData.peak_hours.length ? Math.max(...analyticsData.peak_hours.map(h => h.queries)) : 1;
// // //   const maxCategory = analyticsData.categories.length ? Math.max(...analyticsData.categories.map(c => c.count)) : 1;

// // //   // donut math
// // //   const donutRadius = 18; // in SVG units
// // //   const donutCircumference = 2 * Math.PI * donutRadius;
// // //   let cumPercent = 0;
// // //   const languageCircles = analyticsData.languages.map((lang) => {
// // //     const slicePercent = Number(lang.percentage) || 0;
// // //     const sliceLen = (slicePercent / 100) * donutCircumference;
// // //     const dashArray = `${sliceLen} ${Math.max(0, donutCircumference - sliceLen)}`;
// // //     const dashOffset = donutCircumference - (cumPercent / 100) * donutCircumference;
// // //     cumPercent += slicePercent;
// // //     return {
// // //       ...lang,
// // //       strokeDasharray: dashArray,
// // //       strokeDashoffset: String(dashOffset)
// // //     };
// // //   });

// // //   // escalation gauge
// // //   const gaugeRadius = 28;
// // //   const gaugeCircumference = 2 * Math.PI * gaugeRadius;
// // //   const escalationPercent = Number(analyticsData.overview.human_escalations) || 0;
// // //   const escalationDash = (escalationPercent / 100) * gaugeCircumference;
// // //   const escalationDasharray = `${escalationDash} ${Math.max(0, gaugeCircumference - escalationDash)}`;
// // //   const escalationOffset = gaugeCircumference * 0.25;

// // //   const accuracy = Number(analyticsData.overview.accuracy) || 0;
// // //   const needleDeg = (accuracy / 100) * 180 - 90;

// // //   return (
// // //     <div className="flex min-h-screen bg-gray-50 font-sans">
// // //       <AdminSidebar activePage="analytics" />
// // //       <div className="flex-1 flex flex-col ml-64">
// // //         <div className="bg-white shadow-sm border-b border-gray-200">
// // //           <div className="flex items-center justify-between px-6 py-4">
// // //             <div>
// // //               <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
// // //               <p className="text-gray-600">Live system performance and user insights</p>
// // //               {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
// // //             </div>

// // //             <div className="flex items-center space-x-4">
// // //               <button
// // //                 onClick={handleRefresh}
// // //                 disabled={refreshing}
// // //                 className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
// // //               >
// // //                 {refreshing ? <><StarSpinner size="small" text=""/><span>Refreshing...</span></> : <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581"/></svg><span>Refresh</span></>}
// // //               </button>
// // //               <div className="flex items-center space-x-3">
// // //                 <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
// // //                   <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
// // //                 </div>
// // //                 <div className="text-right">
// // //                   <p className="text-sm font-medium text-gray-900">Admin User</p>
// // //                   <p className="text-xs text-gray-500">Super Admin</p>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="flex-1 p-6">
// // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // //               <p className="text-sm font-medium text-gray-600">Total Users</p>
// // //               <p className="text-2xl font-bold text-gray-900 mt-1">{analyticsData.overview.total_users.toLocaleString()}</p>
// // //               <p className="text-sm text-teal-600 mt-1">12% from last month</p>
// // //             </div>

// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // //               <p className="text-sm font-medium text-gray-600">Daily Queries</p>
// // //               <p className="text-2xl font-bold text-gray-900 mt-1">{analyticsData.overview.daily_queries}</p>
// // //             </div>

// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // //               <p className="text-sm font-medium text-gray-600">Accuracy Rate</p>
// // //               <p className="text-2xl font-bold text-gray-900 mt-1">{analyticsData.overview.accuracy}%</p>
// // //             </div>

// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // //               <p className="text-sm font-medium text-gray-600">Human Escalations</p>
// // //               <p className="text-2xl font-bold text-gray-900 mt-1">{analyticsData.overview.human_escalations}%</p>
// // //             </div>
// // //           </div>

// // //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
// // //             {/* Language Donut */}
// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // //               <div className="flex items-center justify-between mb-4">
// // //                 <h3 className="text-lg font-semibold text-gray-800">Language Distribution</h3>
// // //                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{analyticsData.languages.length} Languages</span>
// // //               </div>

// // //               <div className="flex items-center space-x-6">
// // //                 <div style={{ width: 120, height: 120 }} className="relative">
// // //                   <svg viewBox="0 0 100 100" className="w-full h-full">
// // //                     <circle cx="50" cy="50" r={donutRadius} fill="none" stroke="#f3f4f6" strokeWidth="20" />
// // //                     {languageCircles.map((c, idx) => (
// // //                       <circle
// // //                         key={c.language + idx}
// // //                         cx="50"
// // //                         cy="50"
// // //                         r={donutRadius}
// // //                         fill="none"
// // //                         stroke={c.color}
// // //                         strokeWidth="20"
// // //                         strokeDasharray={c.strokeDasharray}
// // //                         strokeDashoffset={c.strokeDashoffset}
// // //                         transform="rotate(-90 50 50)"
// // //                       />
// // //                     ))}
// // //                   </svg>
// // //                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
// // //                     <div className="text-center">
// // //                       <div className="text-2xl font-bold text-gray-900">{analyticsData.languages.length}</div>
// // //                       <div className="text-sm text-gray-500">Languages</div>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 <div className="flex-1 space-y-3">
// // //                   {analyticsData.languages.map((lang, i) => (
// // //                     <div key={i} className="flex items-center justify-between">
// // //                       <div className="flex items-center space-x-3">
// // //                         <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }} />
// // //                         <span className="text-sm font-medium text-gray-700">{lang.language}</span>
// // //                       </div>
// // //                       <div className="flex items-center space-x-3">
// // //                         <span className="text-sm font-bold text-gray-900">{lang.percentage}%</span>
// // //                         <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
// // //                           <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }} />
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Query Categories */}
// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // //               <div className="flex items-center justify-between mb-4">
// // //                 <h3 className="text-lg font-semibold text-gray-800">Query Categories</h3>
// // //                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Top {analyticsData.categories.length}</span>
// // //               </div>

// // //               <div className="space-y-4">
// // //                 {analyticsData.categories.map((category, idx) => (
// // //                   <div key={idx}>
// // //                     <div className="flex items-center justify-between mb-1">
// // //                       <div className="flex items-center space-x-3">
// // //                         <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
// // //                         <span className="text-sm font-medium text-gray-700">{category.category}</span>
// // //                       </div>
// // //                       <span className="text-sm text-gray-500">{category.count} queries</span>
// // //                     </div>
// // //                     <div className="w-full bg-gray-200 rounded-full h-3">
// // //                       <div className="h-3 rounded-full transition-all duration-500" style={{ width: `${(category.count / maxCategory) * 100}%`, backgroundColor: category.color }} />
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Gauges */}
// // //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // //               <div className="flex items-center justify-between mb-4">
// // //                 <h3 className="text-lg font-semibold text-gray-800">AI Accuracy Gauge</h3>
// // //                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Overall Performance</span>
// // //               </div>

// // //               <div className="flex flex-col items-center">
// // //                 <div className="relative w-48 h-24 mb-4">
// // //                   <div className="w-full h-24 bg-gray-200 rounded-t-full overflow-hidden">
// // //                     <div className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 transition-all duration-1000" style={{ width: `${analyticsData.overview.accuracy}%` }} />
// // //                   </div>

// // //                   <div style={{ left: '50%', transform: `translateX(-50%) rotate(${needleDeg}deg)` }} className="absolute top-0 w-1 h-24 bg-gray-800 transform-origin-bottom" />
// // //                   <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-6 h-6 bg-gray-800 rounded-full" />
// // //                 </div>

// // //                 <div className="text-center">
// // //                   <div className="text-3xl font-bold text-gray-900">{analyticsData.overview.accuracy}%</div>
// // //                   <div className="text-sm text-gray-500">Excellent performance threshold: 90%</div>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // //               <div className="flex items-center justify-between mb-4">
// // //                 <h3 className="text-lg font-semibold text-gray-800">Human Escalation Rate</h3>
// // //                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Low is Better</span>
// // //               </div>

// // //               <div className="flex flex-col items-center">
// // //                 <div className="relative w-32 h-32 mb-4">
// // //                   <svg className="w-full h-full" viewBox="0 0 128 128">
// // //                     <circle cx="64" cy="64" r={gaugeRadius} fill="none" stroke="#f3f4f6" strokeWidth="12" />
// // //                     <circle
// // //                       cx="64"
// // //                       cy="64"
// // //                       r={gaugeRadius}
// // //                       fill="none"
// // //                       stroke="#f97316"
// // //                       strokeWidth="12"
// // //                       strokeDasharray={escalationDasharray}
// // //                       strokeDashoffset={escalationOffset}
// // //                       transform="rotate(-90 64 64)"
// // //                     />
// // //                   </svg>

// // //                   <div className="absolute inset-0 flex items-center justify-center">
// // //                     <div className="text-center">
// // //                       <div className="text-2xl font-bold text-gray-900">{analyticsData.overview.human_escalations}%</div>
// // //                       <div className="text-sm text-gray-500">Need human help</div>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 <div className="text-center">
// // //                   <div className="text-sm text-gray-500">Only {analyticsData.overview.human_escalations}% conversations need human help</div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div> 
// // //     </div>
// // //   );
// // // };

// // // export default AdminAnalytics;









// // // src/pages/admin/AdminAnalytics.jsx
// // import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
// // import { useNavigate } from "react-router-dom";
// // import AdminSidebar from "../../components/admin/AdminSidebar";
// // import { AuthContext } from "../../App";
// // import StarSpinner from "../../components/common/StarSpinner";
// // import axios from "axios";

// // const AdminAnalytics = () => {
// //   const { logout } = useContext(AuthContext); // keep for later use
// //   const navigate = useNavigate();

// //   const [loading, setLoading] = useState(true);
// //   const [refreshing, setRefreshing] = useState(false);
// //   const [analyticsData, setAnalyticsData] = useState(null);

// //   // Keep error internally for logs only — do NOT show demo error to UI
// //   const errorRef = useRef(null);
// //   const controllerRef = useRef(null);

// //   const defaultData = {
// //     overview: {
// //       total_users: 1287,
// //       daily_queries: 212,
// //       accuracy: 94.8,
// //       human_escalations: 4.7,
// //     },
// //     languages: [
// //       { language: "Hindi", percentage: 42, color: "#8b5cf6" },
// //       { language: "English", percentage: 38, color: "#3b82f6" },
// //       { language: "Tamil", percentage: 12, color: "#10b981" },
// //       { language: "Gujarati", percentage: 5, color: "#f59e0b" },
// //       { language: "Marathi", percentage: 3, color: "#ef4444" },
// //     ],
// //     growth: [
// //       { month: "Jan", users: 800, queries: 150 },
// //       { month: "Feb", users: 950, queries: 180 },
// //       { month: "Mar", users: 1100, queries: 195 },
// //       { month: "Apr", users: 1200, queries: 210 },
// //       { month: "May", users: 1250, queries: 205 },
// //       { month: "Jun", users: 1287, queries: 212 },
// //     ],
// //     categories: [
// //       { category: "Scholarship", count: 45, color: "#8b5cf6" },
// //       { category: "Exams", count: 38, color: "#3b82f6" },
// //       { category: "Hostel", count: 32, color: "#10b981" },
// //       { category: "Library", count: 28, color: "#f59e0b" },
// //       { category: "Fees", count: 25, color: "#ef4444" },
// //       { category: "Others", count: 44, color: "#6b7280" },
// //     ],
// //     peak_hours: [
// //       { hour: "8-9 AM", queries: 15 },
// //       { hour: "9-10 AM", queries: 28 },
// //       { hour: "10-11 AM", queries: 35 },
// //       { hour: "11-12 PM", queries: 42 },
// //       { hour: "12-1 PM", queries: 38 },
// //       { hour: "1-2 PM", queries: 25 },
// //       { hour: "2-3 PM", queries: 32 },
// //       { hour: "3-4 PM", queries: 29 },
// //       { hour: "4-5 PM", queries: 18 },
// //     ],
// //   };

// //   const transformApi = useCallback((api) => {
// //     // map a few possible shapes to our UI model
// //     if (!api) return defaultData;
// //     return {
// //       overview: {
// //         total_users: api.totalUsers ?? api.total_queries ?? defaultData.overview.total_users,
// //         daily_queries: api.dailyQueries ?? defaultData.overview.daily_queries,
// //         accuracy: api.accuracy ?? defaultData.overview.accuracy,
// //         human_escalations: api.human_escalations ?? api.humanEscalations ?? defaultData.overview.human_escalations,
// //       },
// //       languages: api.languages ?? defaultData.languages,
// //       growth: api.growth ?? defaultData.growth,
// //       categories: api.categories ?? defaultData.categories,
// //       peak_hours: api.peak_hours ?? api.peakHours ?? defaultData.peak_hours,
// //     };
// //   }, []);

// //   const fetchAnalyticsData = useCallback(async () => {
// //     setLoading(true);

// //     // abort previous request
// //     if (controllerRef.current) {
// //       controllerRef.current.abort();
// //     }
// //     const controller = new AbortController();
// //     controllerRef.current = controller;

// //     try {
// //       // try the dashboard endpoint first (your backend -> /api/dashboard/stats)
// //       // fallback to legacy /api/analytics if needed
// //       const endpoints = ["/api/dashboard/stats", "/api/analytics"];
// //       let response = null;
// //       for (const ep of endpoints) {
// //         try {
// //           response = await axios.get(`http://localhost:5000${ep}`, {
// //             timeout: 8000,
// //             signal: controller.signal,
// //           });
// //           if (response && response.data) break;
// //         } catch (e) {
// //           // if cancelled, rethrow
// //           if (e.name === "CanceledError" || e.message === "canceled") throw e;
// //           // else try next endpoint
// //           response = null;
// //         }
// //       }

// //       if (response && response.data) {
// //         console.log("Analytics API response:", response.data);
// //         setAnalyticsData(transformApi(response.data));
// //       } else {
// //         // silently fall back to defaultData (no visible "demo" banner)
// //         console.log("Analytics API not available — using default data");
// //         errorRef.current = "api_unavailable";
// //         setAnalyticsData(defaultData);
// //       }
// //     } catch (err) {
// //       if (err.name === "CanceledError" || err.message === "canceled") {
// //         console.log("Analytics fetch aborted");
// //         return;
// //       }
// //       console.warn("Analytics fetch error — using default data", err);
// //       errorRef.current = err;
// //       setAnalyticsData(defaultData);
// //     } finally {
// //       setLoading(false);
// //       controllerRef.current = null;
// //     }
// //   }, [transformApi]);

// //   useEffect(() => {
// //     fetchAnalyticsData();
// //     return () => {
// //       if (controllerRef.current) controllerRef.current.abort();
// //     };
// //   }, [fetchAnalyticsData]);

// //   const handleRefresh = async () => {
// //     setRefreshing(true);
// //     await fetchAnalyticsData();
// //     setRefreshing(false);
// //   };

// //   // loading spinner
// //   if (loading || !analyticsData) {
// //     return (
// //       <div className="flex min-h-screen bg-gray-50">
// //         <AdminSidebar activePage="analytics" />
// //         <div className="flex-1 flex flex-col ml-64">
// //           <div className="bg-white shadow-sm border-b border-gray-200">
// //             <div className="flex items-center justify-between px-6 py-4">
// //               <div>
// //                 <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
// //                 <p className="text-gray-600">Loading insights...</p>
// //               </div>
// //             </div>
// //           </div>
// //           <div className="flex-1 flex items-center justify-center">
// //             <StarSpinner size="large" text="Loading analytics data..." />
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // derived values
// //   const maxCategory = analyticsData.categories.length ? Math.max(...analyticsData.categories.map(c => Number(c.count) || 0)) : 1;
// //   const maxPeak = analyticsData.peak_hours.length ? Math.max(...analyticsData.peak_hours.map(p => Number(p.queries) || 0)) : 1;

// //   // Larger donut settings
// //   const donutRadius = 30; // visual increase
// //   const donutCircumference = 2 * Math.PI * donutRadius;
// //   let cumPercent = 0;
// //   const languageCircles = analyticsData.languages.map(lang => {
// //     const pct = Number(lang.percentage) || 0;
// //     const len = (pct / 100) * donutCircumference;
// //     const dashArray = `${len} ${Math.max(0, donutCircumference - len)}`;
// //     const dashOffset = donutCircumference - (cumPercent / 100) * donutCircumference;
// //     cumPercent += pct;
// //     return { ...lang, strokeDasharray: dashArray, strokeDashoffset: String(dashOffset) };
// //   });

// //   // gauge values for escalation (same approach)
// //   const gaugeRadius = 28;
// //   const gaugeCircumference = 2 * Math.PI * gaugeRadius;
// //   const escalationPercent = Number(analyticsData.overview.human_escalations) || 0;
// //   const escalationDash = (escalationPercent / 100) * gaugeCircumference;
// //   const escalationDasharray = `${escalationDash} ${Math.max(0, gaugeCircumference - escalationDash)}`;
// //   const escalationOffset = gaugeCircumference * 0.25;
// //   const accuracy = Number(analyticsData.overview.accuracy) || 0;
// //   const needleDeg = (accuracy / 100) * 180 - 90;

// //   return (
// //     <div className="flex min-h-screen bg-gray-50 font-sans">
// //       <AdminSidebar activePage="analytics" />
// //       <div className="flex-1 flex flex-col ml-64">
// //         <div className="bg-white shadow-sm border-b border-gray-200">
// //           <div className="flex items-center justify-between px-6 py-4">
// //             <div>
// //               <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
// //               <p className="text-gray-600">Live system performance and user insights</p>
// //             </div>

// //             <div className="flex items-center space-x-4">
// //               <button
// //                 onClick={handleRefresh}
// //                 disabled={refreshing}
// //                 className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
// //               >
// //                 {refreshing ? (
// //                   <>
// //                     <StarSpinner size="small" text="" />
// //                     <span>Refreshing...</span>
// //                   </>
// //                 ) : (
// //                   <>
// //                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581" />
// //                     </svg>
// //                     <span>Refresh</span>
// //                   </>
// //                 )}
// //               </button>

// //               <div className="flex items-center space-x-3">
// //                 <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
// //                   <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
// //                   </svg>
// //                 </div>
// //                 <div className="text-right">
// //                   <p className="text-sm font-medium text-gray-900">Admin User</p>
// //                   <p className="text-xs text-gray-500">Super Admin</p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="flex-1 p-6">
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// //             <StatCard title="Total Users" value={analyticsData.overview.total_users.toLocaleString()} extra="12% from last month" />
// //             <StatCard title="Daily Queries" value={analyticsData.overview.daily_queries} />
// //             <StatCard title="Accuracy Rate" value={`${analyticsData.overview.accuracy}%`} />
// //             <StatCard title="Human Escalations" value={`${analyticsData.overview.human_escalations}%`} />
// //           </div>

// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
// //             {/* Language Donut — BIGGER with bigger legend */}
// //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 flex flex-col">
// //               <div className="flex items-center justify-between mb-4">
// //                 <h3 className="text-lg font-semibold text-gray-800">Language Distribution</h3>
// //                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{analyticsData.languages.length} Languages</span>
// //               </div>

// //               <div className="flex items-center gap-6">
// //                 <div style={{ width: 200, height: 200 }} className="relative">
// //                   <svg viewBox="0 0 100 100" className="w-full h-full">
// //                     {/* background ring */}
// //                     <circle cx="50" cy="50" r={donutRadius} fill="none" stroke="#f3f4f6" strokeWidth="22" />
// //                     {languageCircles.map((c, idx) => (
// //                       <circle
// //                         key={c.language + idx}
// //                         cx="50"
// //                         cy="50"
// //                         r={donutRadius}
// //                         fill="none"
// //                         stroke={c.color}
// //                         strokeWidth="22"
// //                         strokeDasharray={c.strokeDasharray}
// //                         strokeDashoffset={c.strokeDashoffset}
// //                         transform="rotate(-90 50 50)"
// //                         style={{ transition: "stroke-dasharray 0.6s, stroke-dashoffset 0.6s" }}
// //                       />
// //                     ))}
// //                   </svg>

// //                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
// //                     <div className="text-center">
// //                       <div className="text-3xl font-bold text-gray-900">{analyticsData.languages.length}</div>
// //                       <div className="text-sm text-gray-500">Languages</div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="flex-1 grid grid-cols-1 gap-3">
// //                   {analyticsData.languages.map((lang, i) => (
// //                     <div key={i} className="flex items-center justify-between">
// //                       <div className="flex items-center gap-3">
// //                         <div className="w-4 h-4 rounded-full" style={{ backgroundColor: lang.color }} />
// //                         <div>
// //                           <div className="text-sm font-medium text-gray-700">{lang.language}</div>
// //                           <div className="text-xs text-gray-500">Share: {lang.percentage}%</div>
// //                         </div>
// //                       </div>
// //                       <div className="w-40 bg-gray-100 rounded-full h-3 overflow-hidden">
// //                         <div className="h-3 rounded-full" style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }} />
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Query Categories — elegant horizontal bars */}
// //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// //               <div className="flex items-center justify-between mb-4">
// //                 <h3 className="text-lg font-semibold text-gray-800">Query Categories</h3>
// //                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Top {analyticsData.categories.length}</span>
// //               </div>

// //               <div className="space-y-4">
// //                 {analyticsData.categories.map((cat, idx) => (
// //                   <div key={idx}>
// //                     <div className="flex items-center justify-between mb-1">
// //                       <div className="flex items-center gap-3">
// //                         <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
// //                         <div className="text-sm font-medium text-gray-700">{cat.category}</div>
// //                       </div>
// //                       <div className="text-sm text-gray-500">{cat.count} queries</div>
// //                     </div>
// //                     <div className="w-full bg-gray-100 rounded-full h-3">
// //                       <div
// //                         className="h-3 rounded-full transition-all duration-500"
// //                         style={{ width: `${(cat.count / Math.max(1, maxCategory)) * 100}%`, backgroundColor: cat.color }}
// //                       />
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Gauges / peak hours */}
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// //               <div className="flex items-center justify-between mb-4">
// //                 <h3 className="text-lg font-semibold text-gray-800">AI Accuracy</h3>
// //                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Overall Performance</span>
// //               </div>

// //               <div className="flex flex-col items-center">
// //                 <div className="relative w-56 h-28 mb-4">
// //                   <div className="w-full h-28 bg-gray-200 rounded-t-full overflow-hidden">
// //                     <div
// //                       className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 transition-all duration-700"
// //                       style={{ width: `${analyticsData.overview.accuracy}%` }}
// //                     />
// //                   </div>

// //                   <div
// //                     style={{ left: "50%", transform: `translateX(-50%) rotate(${needleDeg}deg)` }}
// //                     className="absolute top-0 w-1 h-28 bg-gray-800 transform-origin-bottom"
// //                   />
// //                   <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-6 h-6 bg-gray-800 rounded-full" />
// //                 </div>

// //                 <div className="text-center">
// //                   <div className="text-3xl font-bold text-gray-900">{analyticsData.overview.accuracy}%</div>
// //                   <div className="text-sm text-gray-500">Excellent threshold: 90%</div>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// //               <div className="flex items-center justify-between mb-4">
// //                 <h3 className="text-lg font-semibold text-gray-800">Peak Hours</h3>
// //                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Queries by hour</span>
// //               </div>

// //               <div className="grid gap-3">
// //                 <svg viewBox={`0 0 100 ${analyticsData.peak_hours.length * 12}`} className="w-full">
// //                   {analyticsData.peak_hours.map((p, idx) => {
// //                     const barMaxWidth = 70; // percent of svg width used for bars
// //                     const barWidth = ((Number(p.queries) || 0) / Math.max(1, maxPeak)) * barMaxWidth;
// //                     const y = idx * 12 + 6;
// //                     return (
// //                       <g key={idx}>
// //                         <text x="0" y={y + 4} fontSize="6" fill="#374151">{p.hour}</text>
// //                         <rect x="28" y={y - 6} width={`${barWidth}%`} height="8" rx="3" ry="3" fill="#4f46e5" />
// //                         <text x={`${28 + barWidth + 2}%`} y={y + 4} fontSize="6" fill="#374151">{p.queries}</text>
// //                       </g>
// //                     );
// //                   })}
// //                 </svg>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // /* small helper stat card */
// // const StatCard = ({ title, value, extra }) => (
// //   <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// //     <p className="text-sm font-medium text-gray-600">{title}</p>
// //     <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
// //     {extra && <p className="text-sm text-teal-600 mt-1">{extra}</p>}
// //   </div>
// // );

// // export default AdminAnalytics;



// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import AdminSidebar from '../../components/admin/AdminSidebar';
// import { AuthContext } from '../../App';
// import StarSpinner from '../../components/common/StarSpinner';

// const AdminAnalytics = () => {
//   const { logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [analyticsData, setAnalyticsData] = useState(null);
//   const [error, setError] = useState(null);

//   const fetchAnalyticsData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // Fetch analytics data from your dashboard API
//       const response = await axios.get('http://localhost:5000/api/dashboard/stats');
      
//       if (response.data) {
//         // Transform the API data to match your component structure
//         const transformedData = {
//           overview: {
//             total_users: response.data.totalUsers || 0,
//             daily_queries: response.data.totalQueries || 0,
//             accuracy: response.data.accuracy || 0,
//             human_escalations: response.data.human_escalations || 0
//           },
//           languages: response.data.languages ? response.data.languages.map(lang => ({
//             language: lang.language,
//             percentage: lang.percentage,
//             color: getLanguageColor(lang.language)
//           })) : [],
//           categories: response.data.categories ? response.data.categories
//             .filter(cat => !isGreetingCategory(cat.category)) // Remove greeting categories
//             .sort((a, b) => b.count - a.count) // Sort by count descending
//             .map(cat => ({
//               category: cat.category,
//               count: cat.count,
//               color: cat.color
//             })) : []
//         };
        
//         setAnalyticsData(transformedData);
//       } else {
//         setAnalyticsData({
//           overview: { total_users: 0, daily_queries: 0, accuracy: 0, human_escalations: 0 },
//           languages: [],
//           categories: []
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching analytics:', error);
//       setError('Failed to load analytics data. Please try again.');
//       setAnalyticsData({
//         overview: { total_users: 0, daily_queries: 0, accuracy: 0, human_escalations: 0 },
//         languages: [],
//         categories: []
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function to assign colors to languages
//   const getLanguageColor = (language) => {
//     const colorMap = {
//       'English': '#3b82f6',
//       'Hindi': '#8b5cf6', 
//       'Tamil': '#10b981',
//       'Telugu': '#f59e0b',
//       'Kannada': '#ef4444',
//       'Gujarati': '#6366f1',
//       'Bengali': '#14b8a6',
//       'Malayalam': '#9333ea',
//       'Others': '#6b7280'
//     };
//     return colorMap[language] || '#6b7280';
//   };

//   // Helper function to filter out greeting categories
//   const isGreetingCategory = (category) => {
//     const greetingCategories = [
//       'hi', 'hii', 'hiii', 'hello', 'hey', 'good morning', 'good evening',
//       'vanakkam', 'namaste', 'namaskar', 'hai', 'hola', 'bonjour',
//       // Add more greeting words/phrases in different languages
//       'greetings', 'hi there', 'hey there', 'good day', 'good afternoon',
//       'sup', 'yo', 'what\'s up', 'howdy', 'welcome'
//     ];
    
//     // Check if category name contains any greeting word
//     const lowerCategory = category.toLowerCase();
//     return greetingCategories.some(greeting => 
//       lowerCategory.includes(greeting.toLowerCase())
//     );
//   };

//   useEffect(() => {
//     fetchAnalyticsData();
//   }, []);

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     try {
//       await fetchAnalyticsData();
//     } catch (error) {
//       console.error('Error refreshing data:', error);
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   // Loading state
//   if (loading || !analyticsData) {
//     return (
//       <div className="flex min-h-screen bg-gray-50">
//         <AdminSidebar activePage="analytics" />
//         <div className="flex-1 flex flex-col ml-64">
//           <div className="bg-white shadow-sm border-b border-gray-200">
//             <div className="flex items-center justify-between px-6 py-4">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
//                 <p className="text-gray-600">Loading insights...</p>
//               </div>
//             </div>
//           </div>
//           <div className="flex-1 flex items-center justify-center">
//             <StarSpinner 
//               size="large" 
//               text="Loading analytics data..." 
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Precompute values for language pie chart (medium size)
//   const pieRadius = 60;
//   const pieCircumference = 2 * Math.PI * pieRadius;
  
//   let cumulativePercent = 0;
//   const languageSlices = analyticsData.languages.map((lang) => {
//     const slicePercent = lang.percentage;
//     const sliceLength = (slicePercent / 100) * pieCircumference;
//     const dashArray = ${sliceLength} ${pieCircumference - sliceLength};
//     const dashOffset = pieCircumference - (cumulativePercent / 100) * pieCircumference;
//     cumulativePercent += slicePercent;
//     return {
//       ...lang,
//       strokeDasharray: dashArray,
//       strokeDashoffset: dashOffset
//     };
//   });

//   // Calculate maximum category for scaling
//   const maxCategory = analyticsData.categories.length > 0
//     ? Math.max(...analyticsData.categories.map(c => c.count))
//     : 1;

//   // Accuracy gauge needle rotation
//   const accuracy = analyticsData.overview.accuracy;
//   const needleDeg = (accuracy / 100) * 180 - 90;

//   return (
//     <div className="flex min-h-screen bg-gray-50 font-sans">
//       <AdminSidebar activePage="analytics" />
      
//       <div className="flex-1 flex flex-col ml-64">
//         {/* Custom Topbar */}
//         <div className="bg-white shadow-sm border-b border-gray-200">
//           <div className="flex items-center justify-between px-6 py-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
//               <p className="text-gray-600">Live system performance and user insights</p>
//               {error && (
//                 <p className="text-sm text-red-600 mt-1">{error}</p>
//               )}
//             </div>
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={handleRefresh}
//                 className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-sm hover:shadow min-w-[120px] justify-center"
//                 disabled={refreshing}
//               >
//                 {refreshing ? (
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
//                 <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
//                   <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm font-medium text-gray-900">Admin User</p>
//                   <p className="text-xs text-gray-500">Super Admin</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="flex-1 p-6">
//           {/* Refresh overlay spinner */}
//           {refreshing && (
//             <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
//               <div className="bg-white rounded-xl shadow-xl p-8">
//                 <StarSpinner size="large" text="Updating analytics..." />
//               </div>
//             </div>
//           )}

//           {/* Key Metrics Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Total Users</p>
//                   <p className="text-2xl font-bold text-gray-900 mt-1">
//                     {analyticsData.overview.total_users.toLocaleString()}
//                   </p>
//                   <p className="text-sm text-teal-600 mt-1 flex items-center">
//                     <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                     </svg>
//                     12% from last month
//                   </p>
//                 </div>
//                 <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-sm">
//                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-7.645a10.025 10.025 0 01-3.5 7.645" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Daily Queries</p>
//                   <p className="text-2xl font-bold text-gray-900 mt-1">
//                     {analyticsData.overview.daily_queries}
//                   </p>
//                   <p className="text-sm text-red-600 mt-1 flex items-center">
//                     <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                     </svg>
//                     8% from yesterday
//                   </p>
//                 </div>
//                 <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-sm">
//                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h8M8 14h5m9-2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Accuracy Rate</p>
//                   <p className="text-2xl font-bold text-gray-900 mt-1">
//                     {analyticsData.overview.accuracy}%
//                   </p>
//                   <p className="text-sm text-green-600 mt-1 flex items-center">
//                     <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                     </svg>
//                     2.3% improvement
//                   </p>
//                 </div>
//                 <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-sm">
//                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Human Escalations</p>
//                   <p className="text-2xl font-bold text-gray-900 mt-1">
//                     {analyticsData.overview.human_escalations}%
//                   </p>
//                   <p className="text-sm text-orange-600 mt-1 flex items-center">
//                     <svg className="w-4 h-4 mr-1 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                     </svg>
//                     1.2% from last month
//                   </p>
//                 </div>
//                 <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-sm">
//                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Charts Grid - Only 2 columns now */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//             {/* Language Distribution - Medium Size Pie Chart */}
//             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Language Distribution</h3>
//                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//                   {analyticsData.languages.length} Languages
//                 </span>
//               </div>
//               <div className="flex flex-col lg:flex-row items-center">
//                 <div className="relative w-40 h-40 mb-4 lg:mb-0 lg:mr-6 mx-auto">
//                   <svg className="w-full h-full" viewBox="0 0 100 100">
//                     <circle cx="50" cy="50" r={pieRadius} fill="none" stroke="#f3f4f6" strokeWidth="20" />
//                     {languageSlices.map((c) => (
//                       <circle
//                         key={c.language}
//                         cx="50"
//                         cy="50"
//                         r={pieRadius}
//                         fill="none"
//                         stroke={c.color}
//                         strokeWidth="20"
//                         strokeDasharray={c.strokeDasharray}
//                         strokeDashoffset={c.strokeDashoffset}
//                         transform="rotate(-90 50 50)"
//                       />
//                     ))}
//                   </svg>
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="text-center">
//                       <div className="text-2xl font-bold text-gray-900">{analyticsData.languages.length}</div>
//                       <div className="text-sm text-gray-500">Languages</div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex-1 space-y-3">
//                   {analyticsData.languages.map((lang, index) => (
//                     <div key={index} className="flex items-center">
//                       <div className="flex items-center space-x-3 w-full">
//                         <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: lang.color }}></div>
//                         <span className="text-sm font-medium text-gray-700 flex-1">{lang.language}</span>
//                         <span className="text-sm font-bold text-gray-900">{lang.percentage}%</span>
//                       </div>
//                       {/* Removed the bar line */}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Query Categories - Horizontal Bar Chart */}
//             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Query Categories</h3>
//                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//                   Top {analyticsData.categories.length} Categories
//                 </span>
//               </div>
//               <div className="space-y-4">
//                 {analyticsData.categories.map((category, index) => (
//                   <div key={index} className="space-y-2">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-3">
//                         <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
//                         <span className="text-sm font-medium text-gray-700">{category.category}</span>
//                       </div>
//                       <span className="text-sm text-gray-500">{category.count} queries</span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-3">
//                       <div 
//                         className="h-3 rounded-full transition-all duration-500"
//                         style={{ 
//                           width: ${(category.count / maxCategory) * 100}%,
//                           backgroundColor: category.color
//                         }}
//                       ></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Accuracy Gauge Only (removed escalation gauge) */}
//           <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
//             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-gray-800">AI Accuracy Gauge</h3>
//                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Overall Performance</span>
//               </div>
//               <div className="flex flex-col items-center">
//                 <div className="relative w-48 h-24 mb-4">
//                   <div className="w-full h-24 bg-gray-200 rounded-t-full overflow-hidden">
//                     <div 
//                       className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 transition-all duration-1000 ease-out"
//                       style={{ width: ${analyticsData.overview.accuracy}% }}
//                     ></div>
//                   </div>
//                   <div 
//                     className="absolute top-0 w-1 h-24 bg-gray-800 transform origin-bottom transition-all duration-1000 ease-out"
//                     style={{ 
//                       left: '50%', 
//                       transform: translateX(-50%) rotate(${needleDeg}deg) 
//                     }}
//                   />
//                   <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-6 h-6 bg-gray-800 rounded-full"></div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-gray-900">{analyticsData.overview.accuracy}%</div>
//                   <div className="text-sm text-gray-500">Excellent performance threshold: 90%</div>
//                 </div>
//                 <div className="w-full mt-4 flex justify-between text-xs text-gray-400">
//                   <span>0%</span>
//                   <span>50%</span>
//                   <span>100%</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div> 
//     </div>
//   );
// };

// export default AdminAnalytics;


// src/pages/admin/AdminAnalytics.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { AuthContext } from '../../App';
import StarSpinner from '../../components/common/StarSpinner';

const AdminAnalytics = () => {
  const { logout } = useContext(AuthContext || {});
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [error, setError] = useState(null);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get('http://localhost:5000/api/dashboard/stats', { timeout: 5000 });
      const data = response?.data;

      if (data) {
        const transformedData = {
          overview: {
            total_users: Number(data.totalUsers ?? 0),
            daily_queries: Number(data.totalQueries ?? 0),
            accuracy: Number(data.accuracy ?? 0),
            human_escalations: Number(data.human_escalations ?? 0)
          },
          languages: Array.isArray(data.languages)
            ? data.languages.map((lang) => ({
                language: lang.language,
                percentage: Number(lang.percentage ?? 0),
                color: getLanguageColor(lang.language)
              }))
            : [],
          categories: Array.isArray(data.categories)
            ? data.categories
                // optional: filter greetings if any (server should not return them as categories, but keep safe)
                .filter((cat) => !isGreetingCategory(String(cat.category || '')))
                .sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
                .map((cat) => ({
                  category: cat.category,
                  count: Number(cat.count ?? 0),
                  color: cat.color ?? '#6b7280'
                }))
            : []
        };

        setAnalyticsData(transformedData);
      } else {
        setAnalyticsData({
          overview: { total_users: 0, daily_queries: 0, accuracy: 0, human_escalations: 0 },
          languages: [],
          categories: []
        });
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Failed to load analytics data. Please try again later.');
      setAnalyticsData({
        overview: { total_users: 0, daily_queries: 0, accuracy: 0, human_escalations: 0 },
        languages: [],
        categories: []
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchAnalyticsData();
    } catch (err) {
      console.error('Refresh error:', err);
    } finally {
      setRefreshing(false);
    }
  };

  // helper color map for languages
  const getLanguageColor = (language) => {
    const map = {
      English: '#3b82f6',
      Hindi: '#8b5cf6',
      Tamil: '#10b981',
      Telugu: '#f59e0b',
      Kannada: '#ef4444',
      Gujarati: '#6366f1',
      Bengali: '#14b8a6',
      Malayalam: '#9333ea',
      Others: '#6b7280'
    };
    return map[language] || '#6b7280';
  };

  // greeting filter guard (used when server returns stray greeting categories)
  const isGreetingCategory = (category) => {
    if (!category) return false;
    const greetingCategories = [
      'hi','hii','hello','hey','good morning','good evening',
      'vanakkam','namaste','namaskar','hai','hola','bonjour',
      'greetings','hi there','hey there','good day','good afternoon'
    ];
    const lower = category.toLowerCase();
    return greetingCategories.some((g) => lower.includes(g));
  };

  // Loading fallback UI
  if (loading || !analyticsData) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar activePage="analytics" />
        <div className="flex-1 flex flex-col ml-64">
          <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-gray-600">Loading insights...</p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <StarSpinner size="large" text="Loading analytics data..." />
          </div>
        </div>
      </div>
    );
  }

  // Prepare pie/donut math safely
  const pieRadius = 60;
  const pieCircumference = 2 * Math.PI * pieRadius;

  let cumulativePercent = 0;
  const languageSlices = analyticsData.languages.map((lang) => {
    const slicePercent = Number(lang.percentage) || 0;
    const sliceLength = (slicePercent / 100) * pieCircumference;
    const dashArray = `${sliceLength} ${Math.max(0, pieCircumference - sliceLength)}`;
    const dashOffset = pieCircumference - (cumulativePercent / 100) * pieCircumference;
    cumulativePercent += slicePercent;
    return {
      ...lang,
      strokeDasharray: dashArray,
      strokeDashoffset: String(dashOffset)
    };
  });

  const maxCategory = analyticsData.categories.length > 0
    ? Math.max(...analyticsData.categories.map(c => c.count || 0))
    : 1;

  const accuracy = Number(analyticsData.overview.accuracy || 0);
  const needleDeg = (accuracy / 100) * 180 - 90;

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <AdminSidebar activePage="analytics" />

      <div className="flex-1 flex flex-col ml-64">
        {/* Topbar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Live system performance and user insights</p>
              {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-sm min-w-[120px] justify-center"
                disabled={refreshing}
              >
                {refreshing ? (
                  <>
                    <div className="w-4 h-4">
                      <StarSpinner size="small" text="" />
                    </div>
                    <span>Refreshing...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Refresh</span>
                  </>
                )}
              </button>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
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
          {/* overlay spinner while refreshing */}
          {refreshing && (
            <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-xl p-8">
                <StarSpinner size="large" text="Updating analytics..." />
              </div>
            </div>
          )}

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{(analyticsData.overview.total_users || 0).toLocaleString()}</p>
                  <p className="text-sm text-teal-600 mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    12% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-sm">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 21H3v-1a6 6 0 0112 0v1z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Queries</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{analyticsData.overview.daily_queries || 0}</p>
                  <p className="text-sm text-red-600 mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    8% from yesterday
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-sm">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h8M8 14h5" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Accuracy Rate</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{analyticsData.overview.accuracy ?? 0}%</p>
                  <p className="text-sm text-green-600 mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    2.3% improvement
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-sm">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Human Escalations</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{analyticsData.overview.human_escalations ?? 0}</p>
                  <p className="text-sm text-orange-600 mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1 transform rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    1.2% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-sm">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Language distribution */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Language Distribution</h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {analyticsData.languages.length} Languages
                </span>
              </div>

              <div className="flex flex-col lg:flex-row items-center">
                <div className="relative w-40 h-40 mb-4 lg:mb-0 lg:mr-6 mx-auto">
                  <svg className="w-full h-full" viewBox="0 0 100 100" aria-hidden>
                    <circle cx="50" cy="50" r={pieRadius} fill="none" stroke="#f3f4f6" strokeWidth="20" />
                    {languageSlices.map((c) => (
                      <circle
                        key={c.language}
                        cx="50"
                        cy="50"
                        r={pieRadius}
                        fill="none"
                        stroke={c.color}
                        strokeWidth="20"
                        strokeDasharray={c.strokeDasharray}
                        strokeDashoffset={c.strokeDashoffset}
                        transform="rotate(-90 50 50)"
                      />
                    ))}
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{analyticsData.languages.length}</div>
                      <div className="text-sm text-gray-500">Languages</div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-3 w-full">
                  {analyticsData.languages.map((lang, idx) => (
                    <div key={idx} className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }} />
                        <span className="text-sm font-medium text-gray-700">{lang.language}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-bold text-gray-900">{lang.percentage}%</span>
                        <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-2 rounded-full transition-all duration-500"
                            style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Query Categories</h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Top {analyticsData.categories.length}
                </span>
              </div>

              <div className="space-y-4">
                {analyticsData.categories.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                        <span className="text-sm font-medium text-gray-700">{category.category}</span>
                      </div>
                      <span className="text-sm text-gray-500">{category.count} queries</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all duration-500"
                        style={{
                          width: `${(category.count / maxCategory) * 100}%`,
                          backgroundColor: category.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Accuracy Gauge */}
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">AI Accuracy Gauge</h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Overall Performance</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative w-48 h-24 mb-4">
                  <div className="w-full h-24 bg-gray-200 rounded-t-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 transition-all duration-1000 ease-out"
                      style={{ width: `${analyticsData.overview.accuracy ?? 0}%` }}
                    />
                  </div>

                  <div
                    className="absolute top-0 w-1 h-24 bg-gray-800 transform-origin-bottom transition-all duration-1000 ease-out"
                    style={{ left: '50%', transform: `translateX(-50%) rotate(${needleDeg}deg)` }}
                  />

                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-6 h-6 bg-gray-800 rounded-full" />
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{analyticsData.overview.accuracy ?? 0}%</div>
                  <div className="text-sm text-gray-500">Excellent performance threshold: 90%</div>
                </div>

                <div className="w-full mt-4 flex justify-between text-xs text-gray-400">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default AdminAnalytics;
