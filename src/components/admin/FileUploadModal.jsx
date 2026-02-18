// // // // import React, { useState } from "react";

// // // // const DEV_LOCAL_PATH = "/mnt/data/84322e27-37ed-48d9-9de5-87fae7e179c6.png";
// // // // const BACKEND_UPLOAD_BY_URL = "https://solutionseekers2.app.n8n.cloud/webhook-test/test";
// // // // const BACKEND_MULTIPART_UPLOAD = "https://solutionseekers2.app.n8n.cloud/webhook-test/test";

// // // // export default function FileUploadModal({ type = "pdf", onClose, onUpload }) {
// // // //   const [file, setFile] = useState(null);
// // // //   const [uploading, setUploading] = useState(false);
// // // //   const [dragActive, setDragActive] = useState(false);

// // // //   const handleDrag = (e) => {
// // // //     e.preventDefault();
// // // //     e.stopPropagation();
// // // //     if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
// // // //     else if (e.type === "dragleave") setDragActive(false);
// // // //   };

// // // //   const handleDrop = (e) => {
// // // //     e.preventDefault();
// // // //     e.stopPropagation();
// // // //     setDragActive(false);
// // // //     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
// // // //       const droppedFile = e.dataTransfer.files[0];
// // // //       if (droppedFile.type === "application/pdf" || droppedFile.type.startsWith("image/")) {
// // // //         setFile(droppedFile);
// // // //       } else {
// // // //         alert("Only PDF or image files are accepted.");
// // // //       }
// // // //     }
// // // //   };

// // // //   const handleFileChange = (e) => {
// // // //     if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
// // // //   };

// // // //   // DEV MODE: send the dev local path as the 'url' to the backend.
// // // //   // Set to false to actually upload file bytes to BACKEND_MULTIPART_UPLOAD.

// // // //  const handleUpload = async () => {
// // // //   if (!file) return alert("Please pick a file first.");
// // // //   setUploading(true);

// // // //   try {
// // // //     // ALWAYS send real binary files
// // // //     const fd = new FormData();
// // // //     fd.append("file", file);                 // <-- real binary file
// // // //     fd.append("type", type);
// // // //     fd.append("timestamp", new Date().toISOString());

// // // //     const resp = await fetch(BACKEND_MULTIPART_UPLOAD, {
// // // //       method: "POST",
// // // //       body: fd, // <-- DO NOT set Content-Type manually
// // // //     });

// // // //     if (!resp.ok) {
// // // //       const t = await resp.text().catch(() => "");
// // // //       throw new Error(`multipart upload failed: ${resp.status} ${resp.statusText} ${t}`);
// // // //     }

// // // //     const json = await resp.json();
// // // //     onUpload && onUpload(json);
// // // //     alert("File uploaded to backend (multipart).");
// // // //   } catch (err) {
// // // //     console.error("Upload error:", err);
// // // //     alert("Upload failed: " + (err.message || err));
// // // //   } finally {
// // // //     setUploading(false);
// // // //   }
// // // // };

// // // //   return (
// // // //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // //       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
// // // //         {/* Header */}
// // // //         <div className="flex items-center justify-between p-6 border-b border-gray-200">
// // // //           <h2 className="text-xl font-bold text-gray-800">
// // // //             Upload {type === "circular" ? "Circular" : "PDF Document"}
// // // //           </h2>
// // // //           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
// // // //             <i className="fas fa-times text-xl"></i>
// // // //           </button>
// // // //         </div>

// // // //         {/* Content */}
// // // //         <div className="p-6">
// // // //           <div
// // // //             className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
// // // //               dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
// // // //             }`}
// // // //             onDragEnter={handleDrag}
// // // //             onDragLeave={handleDrag}
// // // //             onDragOver={handleDrag}
// // // //             onDrop={handleDrop}
// // // //           >
// // // //             <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
// // // //             <p className="text-gray-600 mb-2">
// // // //               Drag and drop your {type === "circular" ? "circular" : "PDF"} here
// // // //             </p>
// // // //             <p className="text-sm text-gray-500 mb-4">or</p>

// // // //             <input type="file" id="file-upload" accept=".pdf,image/*" onChange={handleFileChange} className="hidden" />
// // // //             <label
// // // //               htmlFor="file-upload"
// // // //               className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg cursor-pointer transition-colors duration-200 inline-block"
// // // //             >
// // // //               Browse Files
// // // //             </label>
// // // //           </div>

// // // //           {file && (
// // // //             <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
// // // //               <div className="flex items-center gap-3">
// // // //                 <i className="fas fa-file text-green-600"></i>
// // // //                 <div className="flex-1">
// // // //                   <p className="font-medium text-green-800">{file.name}</p>
// // // //                   <p className="text-sm text-green-600">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
// // // //                 </div>
// // // //                 <button onClick={() => setFile(null)} className="text-green-600 hover:text-green-800">
// // // //                   <i className="fas fa-times"></i>
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           )}

// // // //           <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
// // // //             <div className="flex items-start gap-3">
// // // //               <i className="fas fa-info-circle text-blue-500 mt-1"></i>
// // // //               <div>
// // // //                 <p className="text-sm text-blue-800 font-medium">AI Processing</p>
// // // //                 <p className="text-xs text-blue-600 mt-1">
// // // //                   This file will be processed by our RAG model and stored in Pinecone vector database for intelligent query
// // // //                   responses.
// // // //                 </p>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* Footer */}
// // // //         <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
// // // //           <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
// // // //             Cancel
// // // //           </button>

// // // //           <button
// // // //             onClick={handleUpload}
// // // //             disabled={!file || uploading}
// // // //             className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg flex items-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
// // // //           >
// // // //             {uploading ? (
// // // //               <>
// // // //                 <i className="fas fa-spinner fa-spin"></i>
// // // //                 Uploading...
// // // //               </>
// // // //             ) : (
// // // //               <>
// // // //                 <i className="fas fa-upload"></i>
// // // //                 Upload & Process
// // // //               </>
// // // //             )}
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // import React, { useState, useEffect } from 'react';
// // // import AdminSidebar from '../../components/admin/AdminSidebar';
// // // import AdminTopbar from '../../components/admin/AdminTopbar';
// // // import FileUploadModal from '../../components/admin/FileUploadModal';

// // // const AdminFiles = ({ userData, onLogout }) => {
// // //   const [files, setFiles] = useState([]);
// // //   const [showUploadModal, setShowUploadModal] = useState(false);
// // //   const [uploadType, setUploadType] = useState('');
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     fetchFiles();
// // //   }, []);

// // //   const fetchFiles = async () => {
// // //     try {
// // //       // Demo data
// // //       setFiles([
// // //         {
// // //           id: 1,
// // //           name: 'Scholarship_Notification_2025.pdf',
// // //           type: 'pdf',
// // //           size: '2.4 MB',
// // //           uploadedBy: 'Admin User',
// // //           uploadDate: '2024-01-15',
// // //           category: 'Scholarship',
// // //           downloads: 147,
// // //           status: 'processed'
// // //         },
// // //         {
// // //           id: 2,
// // //           name: 'Fee_Structure_2024-25.pdf',
// // //           type: 'pdf',
// // //           size: '1.8 MB',
// // //           uploadedBy: 'Dr. Sharma',
// // //           uploadDate: '2024-01-10',
// // //           category: 'Fees',
// // //           downloads: 203,
// // //           status: 'processed'
// // //         },
// // //         {
// // //           id: 3,
// // //           name: 'Hostel_Rules_Regulations.pdf',
// // //           type: 'pdf',
// // //           size: '3.1 MB',
// // //           uploadedBy: 'Ms. Patel',
// // //           uploadDate: '2024-01-05',
// // //           category: 'Hostel',
// // //           downloads: 89,
// // //           status: 'processing'
// // //         }
// // //       ]);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const getFileIcon = (fileType) => {
// // //     switch (fileType) {
// // //       case 'pdf': return 'fas fa-file-pdf text-red-500';
// // //       case 'doc': case 'docx': return 'fas fa-file-word text-blue-500';
// // //       case 'xls': case 'xlsx': return 'fas fa-file-excel text-green-500';
// // //       case 'jpg': case 'png': case 'jpeg': return 'fas fa-file-image text-yellow-500';
// // //       default: return 'fas fa-file text-gray-500';
// // //     }
// // //   };

// // //   const getStatusColor = (status) => {
// // //     switch (status) {
// // //       case 'processed': return 'bg-green-100 text-green-800';
// // //       case 'processing': return 'bg-yellow-100 text-yellow-800';
// // //       case 'failed': return 'bg-red-100 text-red-800';
// // //       default: return 'bg-gray-100 text-gray-800';
// // //     }
// // //   };

// // //   const handleDownload = async (file) => {
// // //     // Download logic here
// // //     console.log('Downloading file:', file.name);
// // //   };

// // //   const handleDeleteFile = async (fileId) => {
// // //     if (!window.confirm('Are you sure you want to delete this file?')) return;
// // //     setFiles(prev => prev.filter(file => file.id !== fileId));
// // //   };

// // //   return (
// // //     <div className="flex min-h-screen bg-gray-50">
// // //       <AdminSidebar activePage="files" />
      
// // //       <div className="flex-1 flex flex-col ml-64">
// // //         <AdminTopbar 
// // //           userData={userData} 
// // //           onLogout={onLogout} 
// // //           title="File Management" 
// // //           subtitle="Manage all documents and circulars"
// // //         />
        
// // //         <div className="flex-1 p-6">
// // //           {/* Header with Upload Buttons */}
// // //           <div className="flex justify-between items-center mb-6">
// // //             <div>
// // //               <h2 className="text-2xl font-bold text-gray-800">Document Library</h2>
// // //               <p className="text-gray-600">Manage all uploaded documents and circulars</p>
// // //             </div>
// // //             <div className="flex gap-3">
// // //               <button 
// // //                 onClick={() => {
// // //                   setUploadType('circular');
// // //                   setShowUploadModal(true);
// // //                 }}
// // //                 className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg flex items-center gap-2 transition-colors duration-200"
// // //               >
// // //                 <i className="fas fa-bullhorn"></i>
// // //                 Upload Circular
// // //               </button>
// // //               <button 
// // //                 onClick={() => {
// // //                   setUploadType('pdf');
// // //                   setShowUploadModal(true);
// // //                 }}
// // //                 className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg flex items-center gap-2 transition-colors duration-200"
// // //               >
// // //                 <i className="fas fa-file-pdf"></i>
// // //                 Upload PDF
// // //               </button>
// // //             </div>
// // //           </div>

// // //           {/* Stats */}
// // //           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // //               <div className="flex items-center justify-between">
// // //                 <div>
// // //                   <p className="text-sm font-medium text-gray-600">Total Files</p>
// // //                   <p className="text-2xl font-bold text-gray-900 mt-1">{files.length}</p>
// // //                 </div>
// // //                 <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
// // //                   <i className="fas fa-file text-white text-lg"></i>
// // //                 </div>
// // //               </div>
// // //             </div>
            
// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // //               <div className="flex items-center justify-between">
// // //                 <div>
// // //                   <p className="text-sm font-medium text-gray-600">PDF Documents</p>
// // //                   <p className="text-2xl font-bold text-gray-900 mt-1">{files.filter(f => f.type === 'pdf').length}</p>
// // //                 </div>
// // //                 <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
// // //                   <i className="fas fa-file-pdf text-white text-lg"></i>
// // //                 </div>
// // //               </div>
// // //             </div>
            
// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // //               <div className="flex items-center justify-between">
// // //                 <div>
// // //                   <p className="text-sm font-medium text-gray-600">Total Downloads</p>
// // //                   <p className="text-2xl font-bold text-gray-900 mt-1">
// // //                     {files.reduce((sum, file) => sum + file.downloads, 0)}
// // //                   </p>
// // //                 </div>
// // //                 <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
// // //                   <i className="fas fa-download text-white text-lg"></i>
// // //                 </div>
// // //               </div>
// // //             </div>
            
// // //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // //               <div className="flex items-center justify-between">
// // //                 <div>
// // //                   <p className="text-sm font-medium text-gray-600">Processed</p>
// // //                   <p className="text-2xl font-bold text-gray-900 mt-1">
// // //                     {files.filter(f => f.status === 'processed').length}
// // //                   </p>
// // //                 </div>
// // //                 <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
// // //                   <i className="fas fa-check-circle text-white text-lg"></i>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Files Grid */}
// // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //             {files.map(file => (
// // //               <div key={file.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
// // //                 <div className="flex items-start gap-4 mb-4">
// // //                   <div className="p-3 bg-gray-50 rounded-lg">
// // //                     <i className={text-2xl ${getFileIcon(file.type)}}></i>
// // //                   </div>
// // //                   <div className="flex-1 min-w-0">
// // //                     <h4 className="font-semibold text-gray-800 truncate mb-1">
// // //                       {file.name}
// // //                     </h4>
// // //                     <p className="text-sm text-gray-600 mb-2">
// // //                       {file.size} • {file.category} • {file.downloads} downloads
// // //                     </p>
// // //                     <span className={px-2 py-1 text-xs rounded-full ${getStatusColor(file.status)}}>
// // //                       {file.status}
// // //                     </span>
// // //                   </div>
// // //                   <div className="flex gap-1">
// // //                     <button 
// // //                       className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200"
// // //                       onClick={() => handleDownload(file)}
// // //                       title="Download"
// // //                     >
// // //                       <i className="fas fa-download"></i>
// // //                     </button>
// // //                     <button 
// // //                       className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
// // //                       onClick={() => handleDeleteFile(file.id)}
// // //                       title="Delete"
// // //                     >
// // //                       <i className="fas fa-trash"></i>
// // //                     </button>
// // //                   </div>
// // //                 </div>
                
// // //                 <div className="pt-4 border-t border-gray-200">
// // //                   <div className="flex justify-between text-sm text-gray-500">
// // //                     <span>Uploaded by: {file.uploadedBy}</span>
// // //                     <span>Date: {file.uploadDate}</span>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>

// // //           {files.length === 0 && !loading && (
// // //             <div className="flex flex-col items-center justify-center py-16 text-gray-500">
// // //               <i className="fas fa-folder-open text-5xl mb-4 opacity-40"></i>
// // //               <h3 className="text-xl font-semibold text-gray-600 mb-2">
// // //                 No documents uploaded yet
// // //               </h3>
// // //               <p className="text-gray-500">
// // //                 Upload your first document to get started
// // //               </p>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {showUploadModal && (
// // //         <FileUploadModal 
// // //           type={uploadType}
// // //           onClose={() => setShowUploadModal(false)}
// // //           onUpload={(file) => {
// // //             console.log('Uploading file:', file);
// // //             setShowUploadModal(false);
// // //           }}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default AdminFiles;

// // import React, { useState, useEffect } from "react";
// // import AdminSidebar from "../../components/admin/AdminSidebar";
// // import AdminTopbar from "../../components/admin/AdminTopbar";
// // import FileUploadModal from "../../components/admin/FileUploadModal";

// // // react-icons (no need for fontawesome CSS)
// // import {
// //   FaFile,
// //   FaFilePdf,
// //   FaFileWord,
// //   FaFileExcel,
// //   FaFileImage,
// //   FaDownload,
// //   FaCheckCircle,
// //   FaFolderOpen,
// //   FaBullhorn,
// // } from "react-icons/fa";

// // const AdminFiles = ({ userData, onLogout }) => {
// //   const [files, setFiles] = useState([]);
// //   const [showUploadModal, setShowUploadModal] = useState(false);
// //   const [uploadType, setUploadType] = useState("");
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchFiles();
// //   }, []);

// //   const fetchFiles = async () => {
// //     try {
// //       // Demo data (replace with API call if needed)
// //       setFiles([
// //         {
// //           id: 1,
// //           name: "Scholarship_Notification_2025.pdf",
// //           type: "pdf",
// //           size: "2.4 MB",
// //           uploadedBy: "Admin User",
// //           uploadDate: "2024-01-15",
// //           category: "Scholarship",
// //           downloads: 147,
// //           status: "processed",
// //         },
// //         {
// //           id: 2,
// //           name: "Fee_Structure_2024-25.pdf",
// //           type: "pdf",
// //           size: "1.8 MB",
// //           uploadedBy: "Dr. Sharma",
// //           uploadDate: "2024-01-10",
// //           category: "Fees",
// //           downloads: 203,
// //           status: "processed",
// //         },
// //         {
// //           id: 3,
// //           name: "Hostel_Rules_Regulations.pdf",
// //           type: "pdf",
// //           size: "3.1 MB",
// //           uploadedBy: "Ms. Patel",
// //           uploadDate: "2024-01-05",
// //           category: "Hostel",
// //           downloads: 89,
// //           status: "processing",
// //         },
// //       ]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Return an icon component based on file type
// //   const getFileIconComponent = (fileType) => {
// //     switch (fileType) {
// //       case "pdf":
// //         return FaFilePdf;
// //       case "doc":
// //       case "docx":
// //         return FaFileWord;
// //       case "xls":
// //       case "xlsx":
// //         return FaFileExcel;
// //       case "jpg":
// //       case "png":
// //       case "jpeg":
// //         return FaFileImage;
// //       default:
// //         return FaFile;
// //     }
// //   };

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case "processed":
// //         return "bg-green-100 text-green-800";
// //       case "processing":
// //         return "bg-yellow-100 text-yellow-800";
// //       case "failed":
// //         return "bg-red-100 text-red-800";
// //       default:
// //         return "bg-gray-100 text-gray-800";
// //     }
// //   };

// //   const handleDownload = async (file) => {
// //     // implement real download logic here
// //     console.log("Downloading file:", file.name);
// //   };

// //   const handleDeleteFile = async (fileId) => {
// //     if (!window.confirm("Are you sure you want to delete this file?")) return;
// //     setFiles((prev) => prev.filter((file) => file.id !== fileId));
// //   };

// //   return (
// //     <div className="flex min-h-screen bg-gray-50">
// //       <AdminSidebar activePage="files" />

// //       <div className="flex-1 flex flex-col ml-64">
// //         <AdminTopbar
// //           userData={userData}
// //           onLogout={onLogout}
// //           title="File Management"
// //           subtitle="Manage all documents and circulars"
// //         />

// //         <div className="flex-1 p-6">
// //           {/* Header with Upload Buttons */}
// //           <div className="flex justify-between items-center mb-6">
// //             <div>
// //               <h2 className="text-2xl font-bold text-gray-800">Document Library</h2>
// //               <p className="text-gray-600">Manage all uploaded documents and circulars</p>
// //             </div>
// //             <div className="flex gap-3">
// //               <button
// //                 onClick={() => {
// //                   setUploadType("circular");
// //                   setShowUploadModal(true);
// //                 }}
// //                 className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg flex items-center gap-2 transition-colors duration-200"
// //               >
// //                 <FaBullhorn />
// //                 <span>Upload Circular</span>
// //               </button>
// //               <button
// //                 onClick={() => {
// //                   setUploadType("pdf");
// //                   setShowUploadModal(true);
// //                 }}
// //                 className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg flex items-center gap-2 transition-colors duration-200"
// //               >
// //                 <FaFilePdf />
// //                 <span>Upload PDF</span>
// //               </button>
// //             </div>
// //           </div>

// //           {/* Stats */}
// //           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
// //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-sm font-medium text-gray-600">Total Files</p>
// //                   <p className="text-2xl font-bold text-gray-900 mt-1">{files.length}</p>
// //                 </div>
// //                 <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
// //                   <FaFile className="text-white text-lg" />
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-sm font-medium text-gray-600">PDF Documents</p>
// //                   <p className="text-2xl font-bold text-gray-900 mt-1">
// //                     {files.filter((f) => f.type === "pdf").length}
// //                   </p>
// //                 </div>
// //                 <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
// //                   <FaFilePdf className="text-white text-lg" />
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-sm font-medium text-gray-600">Total Downloads</p>
// //                   <p className="text-2xl font-bold text-gray-900 mt-1">
// //                     {files.reduce((sum, file) => sum + file.downloads, 0)}
// //                   </p>
// //                 </div>
// //                 <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
// //                   <FaDownload className="text-white text-lg" />
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-sm font-medium text-gray-600">Processed</p>
// //                   <p className="text-2xl font-bold text-gray-900 mt-1">
// //                     {files.filter((f) => f.status === "processed").length}
// //                   </p>
// //                 </div>
// //                 <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
// //                   <FaCheckCircle className="text-white text-lg" />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Files Grid */}
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {files.map((file) => {
// //               const IconComp = getFileIconComponent(file.type);
// //               return (
// //                 <div
// //                   key={file.id}
// //                   className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
// //                 >
// //                   <div className="flex items-start gap-4 mb-4">
// //                     <div className="p-3 bg-gray-50 rounded-lg">
// //                       <IconComp className="text-2xl" />
// //                     </div>
// //                     <div className="flex-1 min-w-0">
// //                       <h4 className="font-semibold text-gray-800 truncate mb-1">{file.name}</h4>
// //                       <p className="text-sm text-gray-600 mb-2">
// //                         {file.size} • {file.category} • {file.downloads} downloads
// //                       </p>
// //                       <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(file.status)}`}>
// //                         {file.status}
// //                       </span>
// //                     </div>
// //                     <div className="flex gap-1">
// //                       <button
// //                         className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200"
// //                         onClick={() => handleDownload(file)}
// //                         title="Download"
// //                       >
// //                         <FaDownload />
// //                       </button>
// //                       <button
// //                         className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
// //                         onClick={() => handleDeleteFile(file.id)}
// //                         title="Delete"
// //                       >
// //                         <svg
// //                           xmlns="http://www.w3.org/2000/svg"
// //                           className="h-4 w-4"
// //                           viewBox="0 0 24 24"
// //                           fill="currentColor"
// //                         >
// //                           <path d="M3 6h18v2H3V6zm2 3h14l-1 11H6L5 9zm3-6h6v2H8V3z" />
// //                         </svg>
// //                       </button>
// //                     </div>
// //                   </div>

// //                   <div className="pt-4 border-t border-gray-200">
// //                     <div className="flex justify-between text-sm text-gray-500">
// //                       <span>Uploaded by: {file.uploadedBy}</span>
// //                       <span>Date: {file.uploadDate}</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>

// //           {files.length === 0 && !loading && (
// //             <div className="flex flex-col items-center justify-center py-16 text-gray-500">
// //               <FaFolderOpen className="text-5xl mb-4 opacity-40" />
// //               <h3 className="text-xl font-semibold text-gray-600 mb-2">No documents uploaded yet</h3>
// //               <p className="text-gray-500">Upload your first document to get started</p>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {showUploadModal && (
// //         <FileUploadModal
// //           type={uploadType}
// //           onClose={() => setShowUploadModal(false)}
// //           onUpload={(file) => {
// //             console.log("Uploading file:", file);
// //             setShowUploadModal(false);
// //           }}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default AdminFiles;


// import React, { useState } from "react";

// const DEV_LOCAL_PATH = "/mnt/data/84322e27-37ed-48d9-9de5-87fae7e179c6.png";
// const BACKEND_UPLOAD_BY_URL = "https://solutionseekers2.app.n8n.cloud/webhook-test/test";
// const BACKEND_MULTIPART_UPLOAD = "https://solutionseekers2.app.n8n.cloud/webhook-test/test";

// export default function FileUploadModal({ type = "pdf", onClose, onUpload }) {
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [dragActive, setDragActive] = useState(false);

//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
//     else if (e.type === "dragleave") setDragActive(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const droppedFile = e.dataTransfer.files[0];
//       if (droppedFile.type === "application/pdf" || droppedFile.type.startsWith("image/")) {
//         setFile(droppedFile);
//       } else {
//         alert("Only PDF or image files are accepted.");
//       }
//     }
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
//   };

//   // DEV MODE: send the dev local path as the 'url' to the backend.
//   // Set to false to actually upload file bytes to BACKEND_MULTIPART_UPLOAD.

//  const handleUpload = async () => {
//   if (!file) return alert("Please pick a file first.");
//   setUploading(true);

//   try {
//     // ALWAYS send real binary files
//     const fd = new FormData();
//     fd.append("file", file);                 // <-- real binary file
//     fd.append("type", type);
//     fd.append("timestamp", new Date().toISOString());

//     const resp = await fetch(BACKEND_MULTIPART_UPLOAD, {
//       method: "POST",
//       body: fd, // <-- DO NOT set Content-Type manually
//     });

//     if (!resp.ok) {
//       const t = await resp.text().catch(() => "");
//       throw new Error(multipart upload failed: ${resp.status} ${resp.statusText} ${t});
//     }

//     const json = await resp.json();
//     onUpload && onUpload(json);
//     alert("File uploaded to backend (multipart).");
//   } catch (err) {
//     console.error("Upload error:", err);
//     alert("Upload failed: " + (err.message || err));
//   } finally {
//     setUploading(false);
//   }
// };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <h2 className="text-xl font-bold text-gray-800">
//             Upload {type === "circular" ? "Circular" : "PDF Document"}
//           </h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
//             <i className="fas fa-times text-xl"></i>
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           <div
//             className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
//               dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
//             }`}
//             onDragEnter={handleDrag}
//             onDragLeave={handleDrag}
//             onDragOver={handleDrag}
//             onDrop={handleDrop}
//           >
//             <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
//             <p className="text-gray-600 mb-2">
//               Drag and drop your {type === "circular" ? "circular" : "PDF"} here
//             </p>
//             <p className="text-sm text-gray-500 mb-4">or</p>

//             <input type="file" id="file-upload" accept=".pdf,image/*" onChange={handleFileChange} className="hidden" />
//             <label
//               htmlFor="file-upload"
//               className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg cursor-pointer transition-colors duration-200 inline-block"
//             >
//               Browse Files
//             </label>
//           </div>

//           {file && (
//             <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
//               <div className="flex items-center gap-3">
//                 <i className="fas fa-file text-green-600"></i>
//                 <div className="flex-1">
//                   <p className="font-medium text-green-800">{file.name}</p>
//                   <p className="text-sm text-green-600">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
//                 </div>
//                 <button onClick={() => setFile(null)} className="text-green-600 hover:text-green-800">
//                   <i className="fas fa-times"></i>
//                 </button>
//               </div>
//             </div>
//           )}

//           <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
//             <div className="flex items-start gap-3">
//               <i className="fas fa-info-circle text-blue-500 mt-1"></i>
//               <div>
//                 <p className="text-sm text-blue-800 font-medium">AI Processing</p>
//                 <p className="text-xs text-blue-600 mt-1">
//                   This file will be processed by our RAG model and stored in Pinecone vector database for intelligent query
//                   responses.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
//           <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
//             Cancel
//           </button>

//           <button
//             onClick={handleUpload}
//             disabled={!file || uploading}
//             className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg flex items-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {uploading ? (
//               <>
//                 <i className="fas fa-spinner fa-spin"></i>
//                 Uploading...
//               </>
//             ) : (
//               <>
//                 <i className="fas fa-upload"></i>
//                 Upload & Process
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";

const DEV_LOCAL_PATH = "/mnt/data/84322e27-37ed-48d9-9de5-87fae7e179c6.png";
const BACKEND_UPLOAD_BY_URL = "https://solutionseekers2.app.n8n.cloud/webhook-test/test";
const BACKEND_MULTIPART_UPLOAD = "https://solutionseekers2.app.n8n.cloud/webhook-test/test";

export default function FileUploadModal({ type = "pdf", onClose, onUpload }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (
        droppedFile.type === "application/pdf" ||
        droppedFile.type.startsWith("image/")
      ) {
        setFile(droppedFile);
      } else {
        alert("Only PDF or image files are accepted.");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target?.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  // Upload handler - sends multipart form data to your BACKEND_MULTIPART_UPLOAD
  const handleUpload = async () => {
    if (!file) {
      alert("Please pick a file first.");
      return;
    }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("type", type);
      fd.append("timestamp", new Date().toISOString());

      const resp = await fetch(BACKEND_MULTIPART_UPLOAD, {
        method: "POST",
        body: fd, // DO NOT set Content-Type header with multipart/form-data manually
      });

      if (!resp.ok) {
        const t = await resp.text().catch(() => "");
        throw new Error(
          `multipart upload failed: ${resp.status} ${resp.statusText} ${t}`
        );
      }

      // try parse response JSON, but tolerate non-json
      const json = await resp.json().catch(() => null);
      onUpload && onUpload(json || { success: true, filename: file.name });
      alert("File uploaded to backend.");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed: " + (err.message || String(err)));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            Upload {type === "circular" ? "Circular" : "PDF Document"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Close upload modal"
          >
            <i className="fas fa-times text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            role="button"
            tabIndex={0}
          >
            <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">
              Drag and drop your {type === "circular" ? "circular" : "PDF"} here
            </p>
            <p className="text-sm text-gray-500 mb-4">or</p>

            <input
              type="file"
              id="file-upload"
              accept=".pdf,image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg cursor-pointer transition-colors duration-200 inline-block"
            >
              Browse Files
            </label>
          </div>

          {file && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <i className="fas fa-file text-green-600" />
                <div className="flex-1">
                  <p className="font-medium text-green-800">{file.name}</p>
                  <p className="text-sm text-green-600">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="text-green-600 hover:text-green-800"
                  aria-label="Remove selected file"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <i className="fas fa-info-circle text-blue-500 mt-1" />
              <div>
                <p className="text-sm text-blue-800 font-medium">AI Processing</p>
                <p className="text-xs text-blue-600 mt-1">
                  This file will be processed by our RAG model and stored in the vector database for intelligent query responses.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            disabled={uploading}
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg flex items-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <i className="fas fa-spinner fa-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <i className="fas fa-upload" />
                <span>Upload &amp; Process</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
