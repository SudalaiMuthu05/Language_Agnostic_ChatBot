// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../App';
// import {
//   FaCog,
//   FaUserCog,
//   FaRobot,
//   FaBell,
//   FaShieldAlt,
//   FaDatabase,
//   FaPlug,
//   FaSignOutAlt,
//   FaPalette,
//   FaLanguage,
//   FaSave,
//   FaEye,
//   FaEyeSlash
// } from 'react-icons/fa';

// const AdminSettings = () => {
//   const { logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('general');
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [settings, setSettings] = useState({
//     // General Settings
//     chatbotName: 'College Assistant',
//     welcomeMessage: 'Hello! How can I help you today?',
//     defaultLanguage: 'english',
    
//     // AI Model Settings
//     modelTemperature: 0.7,
//     maxResponseLength: 500,
//     enableContextMemory: true,
    
//     // Appearance
//     theme: 'light',
//     primaryColor: '#4F46E5',
//     showAvatar: true,
    
//     // Notifications
//     emailNotifications: true,
//     queryAlerts: true,
//     weeklyReports: true,
    
//     // Security
//     twoFactorAuth: false,
//     sessionTimeout: 30,
//     ipWhitelisting: false,
    
//     // Password Change
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });

//   const tabs = [
//     { id: 'general', label: 'General', icon: FaCog },
//     { id: 'ai', label: 'AI Model', icon: FaRobot },
//     { id: 'appearance', label: 'Appearance', icon: FaPalette },
//     { id: 'notifications', label: 'Notifications', icon: FaBell },
//     { id: 'security', label: 'Security', icon: FaShieldAlt },
//     { id: 'integrations', label: 'Integrations', icon: FaPlug },
//     { id: 'account', label: 'Account', icon: FaUserCog }
//   ];

//   const languages = [
//     { value: 'english', label: 'English' },
//     { value: 'spanish', label: 'Spanish' },
//     { value: 'french', label: 'French' },
//     { value: 'german', label: 'German' },
//     { value: 'hindi', label: 'Hindi' }
//   ];

//   const themes = [
//     { value: 'light', label: 'Light' },
//     { value: 'dark', label: 'Dark' },
//     { value: 'auto', label: 'Auto (System)' }
//   ];

//   const handleInputChange = (field, value) => {
//     setSettings(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSaveSettings = async () => {
//     try {
//       // Here you would make an API call to save settings
//       console.log('Saving settings:', settings);
//       alert('Settings saved successfully!');
//     } catch (error) {
//       console.error('Error saving settings:', error);
//       alert('Failed to save settings');
//     }
//   };

//   const handlePasswordChange = async () => {
//     if (settings.newPassword !== settings.confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }
    
//     if (settings.newPassword.length < 8) {
//       alert('Password must be at least 8 characters long');
//       return;
//     }

//     try {
//       // API call to change password
//       console.log('Changing password...');
//       alert('Password changed successfully!');
//       setSettings(prev => ({ 
//         ...prev, 
//         currentPassword: '', 
//         newPassword: '', 
//         confirmPassword: '' 
//       }));
//     } catch (error) {
//       console.error('Error changing password:', error);
//       alert('Failed to change password');
//     }
//   };

//   const handleExportData = () => {
//     // Export settings as JSON
//     const dataStr = JSON.stringify(settings, null, 2);
//     const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
//     const exportFileDefaultName = 'chatbot-settings.json';
    
//     const linkElement = document.createElement('a');
//     linkElement.setAttribute('href', dataUri);
//     linkElement.setAttribute('download', exportFileDefaultName);
//     linkElement.click();
//   };

//   const renderGeneralSettings = () => (
//     <div className="space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Chatbot Name
//         </label>
//         <input
//           type="text"
//           value={settings.chatbotName}
//           onChange={(e) => handleInputChange('chatbotName', e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//           placeholder="Enter chatbot name"
//         />
//         <p className="text-sm text-gray-500 mt-1">This name will be displayed to users</p>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Welcome Message
//         </label>
//         <textarea
//           value={settings.welcomeMessage}
//           onChange={(e) => handleInputChange('welcomeMessage', e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-24"
//           placeholder="Enter welcome message"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Default Language
//         </label>
//         <select
//           value={settings.defaultLanguage}
//           onChange={(e) => handleInputChange('defaultLanguage', e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//         >
//           {languages.map(lang => (
//             <option key={lang.value} value={lang.value}>
//               {lang.label}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );

//   const renderAIModelSettings = () => (
//     <div className="space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Model Temperature: {settings.modelTemperature.toFixed(1)}
//         </label>
//         <input
//           type="range"
//           min="0"
//           max="1"
//           step="0.1"
//           value={settings.modelTemperature}
//           onChange={(e) => handleInputChange('modelTemperature', parseFloat(e.target.value))}
//           className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//         />
//         <div className="flex justify-between text-xs text-gray-500 mt-1">
//           <span>More Deterministic</span>
//           <span>More Creative</span>
//         </div>
//         <p className="text-sm text-gray-500 mt-1">Controls response creativity (0.0-1.0)</p>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Maximum Response Length: {settings.maxResponseLength} characters
//         </label>
//         <input
//           type="range"
//           min="100"
//           max="2000"
//           step="100"
//           value={settings.maxResponseLength}
//           onChange={(e) => handleInputChange('maxResponseLength', parseInt(e.target.value))}
//           className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//         />
//       </div>

//       <div className="flex items-center justify-between">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Enable Context Memory
//           </label>
//           <p className="text-sm text-gray-500">Chatbot remembers conversation history</p>
//         </div>
//         <button
//           onClick={() => handleInputChange('enableContextMemory', !settings.enableContextMemory)}
//           className={`relative inline-flex h-6 w-11 items-center rounded-full ${settings.enableContextMemory ? 'bg-purple-600' : 'bg-gray-300'}`}
//         >
//           <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.enableContextMemory ? 'translate-x-6' : 'translate-x-1'}`} />
//         </button>
//       </div>
//     </div>
//   );

//   const renderAppearanceSettings = () => (
//     <div className="space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Theme
//         </label>
//         <div className="grid grid-cols-3 gap-4">
//           {themes.map(theme => (
//             <button
//               key={theme.value}
//               onClick={() => handleInputChange('theme', theme.value)}
//               className={`p-4 border rounded-lg text-center ${settings.theme === theme.value ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-gray-400'}`}
//             >
//               <div className="text-sm font-medium mb-1">{theme.label}</div>
//             </button>
//           ))}
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Primary Color
//         </label>
//         <div className="flex items-center gap-4">
//           <input
//             type="color"
//             value={settings.primaryColor}
//             onChange={(e) => handleInputChange('primaryColor', e.target.value)}
//             className="w-12 h-12 cursor-pointer rounded border"
//           />
//           <input
//             type="text"
//             value={settings.primaryColor}
//             onChange={(e) => handleInputChange('primaryColor', e.target.value)}
//             className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
//           />
//         </div>
//       </div>

//       <div className="flex items-center justify-between">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Show Chatbot Avatar
//           </label>
//           <p className="text-sm text-gray-500">Display chatbot icon in conversations</p>
//         </div>
//         <button
//           onClick={() => handleInputChange('showAvatar', !settings.showAvatar)}
//           className={`relative inline-flex h-6 w-11 items-center rounded-full ${settings.showAvatar ? 'bg-purple-600' : 'bg-gray-300'}`}
//         >
//           <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.showAvatar ? 'translate-x-6' : 'translate-x-1'}`} />
//         </button>
//       </div>
//     </div>
//   );

//   const renderNotificationsSettings = () => (
//     <div className="space-y-4">
//       {[
//         { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive email updates' },
//         { key: 'queryAlerts', label: 'Query Alerts', description: 'Get alerts for unanswered queries' },
//         { key: 'weeklyReports', label: 'Weekly Reports', description: 'Receive weekly performance reports' }
//       ].map(item => (
//         <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">{item.label}</label>
//             <p className="text-sm text-gray-500">{item.description}</p>
//           </div>
//           <button
//             onClick={() => handleInputChange(item.key, !settings[item.key])}
//             className={`relative inline-flex h-6 w-11 items-center rounded-full ${settings[item.key] ? 'bg-purple-600' : 'bg-gray-300'}`}
//           >
//             <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings[item.key] ? 'translate-x-6' : 'translate-x-1'}`} />
//           </button>
//         </div>
//       ))}
//     </div>
//   );

//   const renderSecuritySettings = () => (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Two-Factor Authentication</label>
//           <p className="text-sm text-gray-500">Add an extra layer of security</p>
//         </div>
//         <button
//           onClick={() => handleInputChange('twoFactorAuth', !settings.twoFactorAuth)}
//           className={`relative inline-flex h-6 w-11 items-center rounded-full ${settings.twoFactorAuth ? 'bg-purple-600' : 'bg-gray-300'}`}
//         >
//           <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'}`} />
//         </button>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Session Timeout: {settings.sessionTimeout} minutes
//         </label>
//         <select
//           value={settings.sessionTimeout}
//           onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//         >
//           <option value={15}>15 minutes</option>
//           <option value={30}>30 minutes</option>
//           <option value={60}>1 hour</option>
//           <option value={120}>2 hours</option>
//         </select>
//       </div>

//       <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">IP Whitelisting</label>
//           <p className="text-sm text-gray-500">Restrict access to specific IP addresses</p>
//         </div>
//         <button
//           onClick={() => handleInputChange('ipWhitelisting', !settings.ipWhitelisting)}
//           className={`relative inline-flex h-6 w-11 items-center rounded-full ${settings.ipWhitelisting ? 'bg-purple-600' : 'bg-gray-300'}`}
//         >
//           <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.ipWhitelisting ? 'translate-x-6' : 'translate-x-1'}`} />
//         </button>
//       </div>
//     </div>
//   );

//   const renderAccountSettings = () => (
//     <div className="space-y-6">
//       <div className="p-4 border border-gray-200 rounded-lg">
//         <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
//         <div className="space-y-3">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <p className="text-gray-900 mt-1">admin@college.edu</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Role</label>
//             <p className="text-gray-900 mt-1">Super Administrator</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Last Login</label>
//             <p className="text-gray-900 mt-1">Today, 14:32 PM</p>
//           </div>
//         </div>
//       </div>

//       <div className="p-4 border border-gray-200 rounded-lg">
//         <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
//             <div className="relative">
//               <input
//                 type={showCurrentPassword ? "text" : "password"}
//                 value={settings.currentPassword}
//                 onChange={(e) => handleInputChange('currentPassword', e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowCurrentPassword(!showCurrentPassword)}
//                 className="absolute right-3 top-2.5 text-gray-500"
//               >
//                 {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
//             <div className="relative">
//               <input
//                 type={showNewPassword ? "text" : "password"}
//                 value={settings.newPassword}
//                 onChange={(e) => handleInputChange('newPassword', e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowNewPassword(!showNewPassword)}
//                 className="absolute right-3 top-2.5 text-gray-500"
//               >
//                 {showNewPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
//             <input
//               type="password"
//               value={settings.confirmPassword}
//               onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             />
//           </div>

//           <button
//             onClick={handlePasswordChange}
//             className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
//           >
//             Update Password
//           </button>
//         </div>
//       </div>

//       <div className="space-y-4">
//         <button
//           onClick={handleExportData}
//           className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
//         >
//           <FaDatabase /> Export Settings Data
//         </button>

//         <button
//           onClick={logout}
//           className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
//         >
//           <FaSignOutAlt /> Logout
//         </button>
//       </div>
//     </div>
//   );

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'general': return renderGeneralSettings();
//       case 'ai': return renderAIModelSettings();
//       case 'appearance': return renderAppearanceSettings();
//       case 'notifications': return renderNotificationsSettings();
//       case 'security': return renderSecuritySettings();
//       case 'account': return renderAccountSettings();
//       default: return renderGeneralSettings();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
//           <p className="text-gray-600 mt-2">Configure your chatbot system preferences and security settings</p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Sidebar Tabs */}
//           <div className="lg:w-64">
//             <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//               <div className="p-4 border-b border-gray-200">
//                 <h2 className="font-semibold text-gray-900">Settings Categories</h2>
//               </div>
//               <nav className="p-2">
//                 {tabs.map(tab => {
//                   const Icon = tab.icon;
//                   return (
//                     <button
//                       key={tab.id}
//                       onClick={() => setActiveTab(tab.id)}
//                       className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
//                         activeTab === tab.id 
//                           ? 'bg-purple-50 text-purple-700 border border-purple-200' 
//                           : 'text-gray-700 hover:bg-gray-50'
//                       }`}
//                     >
//                       <Icon className="text-lg" />
//                       <span className="font-medium">{tab.label}</span>
//                     </button>
//                   );
//                 })}
//               </nav>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="flex-1">
//             <div className="bg-white rounded-lg border border-gray-200">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h2 className="text-xl font-bold text-gray-900">
//                       {tabs.find(t => t.id === activeTab)?.label} Settings
//                     </h2>
//                     <p className="text-gray-600 mt-1">
//                       Configure {tabs.find(t => t.id === activeTab)?.label.toLowerCase()} preferences
//                     </p>
//                   </div>
//                   <button
//                     onClick={handleSaveSettings}
//                     className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2"
//                   >
//                     <FaSave /> Save Changes
//                   </button>
//                 </div>
//               </div>

//               <div className="p-6">
//                 {renderTabContent()}
//               </div>
//             </div>

//             {/* Quick Stats */}
//             <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="bg-white p-4 rounded-lg border border-gray-200">
//                 <p className="text-sm text-gray-500">Settings Modified</p>
//                 <p className="text-2xl font-bold text-gray-900">12</p>
//               </div>
//               <div className="bg-white p-4 rounded-lg border border-gray-200">
//                 <p className="text-sm text-gray-500">Last Saved</p>
//                 <p className="text-2xl font-bold text-gray-900">2 min ago</p>
//               </div>
//               <div className="bg-white p-4 rounded-lg border border-gray-200">
//                 <p className="text-sm text-gray-500">Active Sessions</p>
//                 <p className="text-2xl font-bold text-gray-900">3</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminSettings;



// -------------------------------------









import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'

const AdminSettings = () => {
  const { logout, updateTheme, currentTheme, updateAdminCredentials } = useContext(AuthContext)
  const navigate = useNavigate()
  
  // State for various settings
  const [settings, setSettings] = useState({
    email: localStorage.getItem('adminEmail') || 'admin@college.edu',
    passwordLastChanged: localStorage.getItem('passwordLastChanged') || '2 days ago',
    chatbotLanguages: ['English', 'Hindi', 'Tamil', 'Telugu', 'Gujarati', 'Marathi'],
    selectedLanguages: JSON.parse(localStorage.getItem('selectedLanguages') || '["English", "Hindi"]'),
    notifications: localStorage.getItem('notifications') !== 'false',
    autoBackup: localStorage.getItem('autoBackup') !== 'false',
    dataRetention: localStorage.getItem('dataRetention') || '30 days',
    theme: currentTheme
  })

  const [isChangingEmail, setIsChangingEmail] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  // Update settings when theme changes
  useEffect(() => {
    setSettings(prev => ({ ...prev, theme: currentTheme }))
  }, [currentTheme])

  // Load saved settings from localStorage
  useEffect(() => {
    const loadSettings = () => {
      const savedSettings = {
        email: localStorage.getItem('adminEmail') || 'admin@college.edu',
        passwordLastChanged: localStorage.getItem('passwordLastChanged') || '2 days ago',
        selectedLanguages: JSON.parse(localStorage.getItem('selectedLanguages') || '["English", "Hindi"]'),
        notifications: localStorage.getItem('notifications') !== 'false',
        autoBackup: localStorage.getItem('autoBackup') !== 'false',
        dataRetention: localStorage.getItem('dataRetention') || '30 days',
        theme: currentTheme
      }
      setSettings(prev => ({ ...prev, ...savedSettings }))
    }

    loadSettings()
  }, [currentTheme])

  // Save individual settings to localStorage
  const saveSetting = (key, value) => {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.setItem(key, value.toString())
    }
  }

  const handleLogout = () => {
    console.log('Logout button clicked')
    logout()
  }

  const handleClose = () => {
    navigate('/admin/dashboard')
  }

  const handleEmailChange = () => {
    if (!newEmail) {
      alert('Please enter a new email address')
      return
    }
    
    if (!/\S+@\S+\.\S+/.test(newEmail)) {
      alert('Please enter a valid email address')
      return
    }
    
    // Update email in settings and localStorage
    setSettings(prev => ({ ...prev, email: newEmail }))
    saveSetting('adminEmail', newEmail)
    updateAdminCredentials(newEmail, null)
    
    setNewEmail('')
    setIsChangingEmail(false)
    alert('Email updated successfully! You will need to use this email for future logins.')
  }

  const handlePasswordChange = async () => {
    setPasswordError('')

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Please fill all password fields')
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match!')
      return
    }

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long')
      return
    }

    // Verify current password
    const currentStoredPassword = localStorage.getItem('adminPassword') || 'admin123'
    if (currentPassword !== currentStoredPassword) {
      setPasswordError('Current password is incorrect')
      return
    }

    // Check if new password is same as current
    if (currentPassword === newPassword) {
      setPasswordError('New password must be different from current password')
      return
    }

    try {
      // Update password in localStorage
      saveSetting('adminPassword', newPassword)
      saveSetting('passwordLastChanged', 'just now')
      updateAdminCredentials(null, newPassword)

      setSettings(prev => ({ 
        ...prev, 
        passwordLastChanged: 'just now' 
      }))
      
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setIsChangingPassword(false)
      setPasswordError('')
      
      alert('Password updated successfully! You will need to use this new password for future logins.')
    } catch (error) {
      setPasswordError('Failed to update password. Please try again.')
      console.error('Password change error:', error)
    }
  }

  const toggleLanguage = (language) => {
    setSettings(prev => {
      const updatedLanguages = prev.selectedLanguages.includes(language)
        ? prev.selectedLanguages.filter(lang => lang !== language)
        : [...prev.selectedLanguages, language]
      
      saveSetting('selectedLanguages', updatedLanguages)
      return { ...prev, selectedLanguages: updatedLanguages }
    })
  }

  const toggleNotification = () => {
    setSettings(prev => {
      const newValue = !prev.notifications
      saveSetting('notifications', newValue)
      return { ...prev, notifications: newValue }
    })
  }

  const toggleAutoBackup = () => {
    setSettings(prev => {
      const newValue = !prev.autoBackup
      saveSetting('autoBackup', newValue)
      return { ...prev, autoBackup: newValue }
    })
  }

  const handleDataRetentionChange = (value) => {
    setSettings(prev => {
      saveSetting('dataRetention', value)
      return { ...prev, dataRetention: value }
    })
  }

  const handleThemeChange = (theme) => {
    updateTheme(theme)
  }

  const exportData = () => {
    const data = {
      settings,
      exportedAt: new Date().toISOString(),
      version: '1.0.0'
    }
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `raj-sahayak-settings-${new Date().getTime()}.json`,
    link.click()
    URL.revokeObjectURL(url)
    alert('Settings exported successfully!')
  }

  const resetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default? This will reset theme, languages, and preferences.')) {
      // Reset to default values
      const defaultSettings = {
        email: 'admin@college.edu',
        passwordLastChanged: 'just now',
        selectedLanguages: ['English', 'Hindi'],
        notifications: true,
        autoBackup: true,
        dataRetention: '30 days',
        theme: 'light'
      }
      
      // Update state
      setSettings(defaultSettings)
      
      // Update localStorage
      saveSetting('adminEmail', 'admin@college.edu')
      saveSetting('passwordLastChanged', 'just now')
      saveSetting('selectedLanguages', ['English', 'Hindi'])
      saveSetting('notifications', true)
      saveSetting('autoBackup', true)
      saveSetting('dataRetention', '30 days')
      
      // Update theme
      updateTheme('light')
      
      alert('Settings reset to default!')
    }
  }

  // Function to get theme display name
  const getThemeDisplayName = (theme) => {
    switch (theme) {
      case 'light': return 'Light'
      case 'dark': return 'Dark'
      case 'auto': return 'Auto (System)'
      default: return theme
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header with Close Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Settings</h1>
          <button
            onClick={handleClose}
            className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Close
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
          <div className="space-y-6">
            {/* Account Settings */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
              <div className="space-y-4">
                {/* Email Change */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{settings.email}</p>
                  </div>
                  {!isChangingEmail ? (
                    <button 
                      onClick={() => setIsChangingEmail(true)}
                      className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors duration-200"
                    >
                      Change
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="New email"
                        className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded px-3 py-1 text-sm transition-colors duration-200"
                      />
                      <button 
                        onClick={handleEmailChange}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
                      >
                        Save
                      </button>
                      <button 
                        onClick={() => setIsChangingEmail(false)}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Password Change */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Password</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last changed {settings.passwordLastChanged}</p>
                  </div>
                  {!isChangingPassword ? (
                    <button 
                      onClick={() => setIsChangingPassword(true)}
                      className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors duration-200"
                    >
                      Change
                    </button>
                  ) : (
                    <div className="space-y-2 w-64">
                      {passwordError && (
                        <div className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded">
                          {passwordError}
                        </div>
                      )}
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Current password"
                        className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded px-3 py-2 text-sm block w-full transition-colors duration-200"
                      />
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New password"
                        className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded px-3 py-2 text-sm block w-full transition-colors duration-200"
                      />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded px-3 py-2 text-sm block w-full transition-colors duration-200"
                      />
                      <div className="flex gap-2">
                        <button 
                          onClick={handlePasswordChange}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded text-sm transition-colors duration-200 flex-1"
                        >
                          Update Password
                        </button>
                        <button 
                          onClick={() => {
                            setIsChangingPassword(false)
                            setPasswordError('')
                          }}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* System Preferences */}
            

            {/* Danger Zone */}
            <div>
              <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">Danger Zone</h2>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 transition-colors duration-200">
                <p className="text-red-800 dark:text-red-400 mb-3">
                  Once you logout, you'll need to sign in again to access the admin panel.
                </p>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Current Theme Display */}
        
      </div>
    </div>
  )
}

export default AdminSettings