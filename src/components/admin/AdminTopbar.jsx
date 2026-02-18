

// import React from 'react'

// const AdminTopbar = () => {
//   return (
//     <div className="bg-white border-b border-gray-200 px-6 py-4">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-xl font-bold text-gray-900">Welcome back, Admin!</h2>
//         </div>
        
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center space-x-3">
//             <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
//               <span className="text-white text-sm">A</span>
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-900">Administrator</p>
//               <p className="text-xs text-gray-500">System Admin</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminTopbar





import React from 'react'

const AdminTopbar = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Welcome back, Admin!</h2>
        </div>
        
        {/* <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            {/* <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center"> */}
              {/* <img
                src="data:image/jpeg;base64,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"  
                alt="Admin Profile"
                className="h-10 w-20 rounded-full object-cover border-2 border-gray-300"/> */}
              {/* <span className="text-white text-sm">A</span> */}
            {/* </div>  */}
            {/* <div>
              <p className="text-sm font-medium text-gray-900">Administrator</p>
              <p className="text-xs text-gray-500">System Admin</p>
            </div> */}
          {/* </div>  */}
        {/* </div> */}

        <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <img
                    src="data:image/jpeg;base64,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"  
                    alt="Admin Profile"
                    className="h-10 w-20 rounded-full object-cover border-2 border-gray-300"/>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">Super Admin</p>
                </div>
              </div>
      </div>
    </div>
  )
}

export default AdminTopbar