import React from 'react'
import { UserIcon } from '../icon/UserIcon'

function DisplayedCustomer({ item,  }) {
  return (
    <div className="w-full h-fit px-4 py-2 mb-4 flex flex-row justify-between items-center hover:bg-gray-50 text-center rounded border-2 border-black ">
      {/* Dòng khách hàng, đổi màu khi hover */}
      <div className="w-full h-1/2 flex flex-row justify-center items-center">
        <UserIcon />
        
        {/* Cột tên và email */}
        <div className="w-full flex flex-row justify-center items-center h-full">
          <span className="text-blue-500 text-lg font-normal">
            {item.fullName || "Chưa có"} {/* Hiển thị tên khách hàng */}
          </span>
        </div>
        
        <div className="w-full flex flex-row justify-center items-center">
          <span className='text-blue-500 font-medium'>
            {item.email || "Chưa có"} {/* Hiển thị email khách hàng */}
          </span>
        </div>
        
        <div className="w-full flex flex-row justify-center items-center">

          <span className='text-blue-500 font-medium'>
            {item.phone || "Chưa có"} {/* Hiển thị PHONE khách hàng */}
          </span>
        </div>
        
        <span className='px-2 py-1 border-2 border-blue-500 text-blue-500 font-futura rounded shadow'>
          {item.role == "user" ? "USER" : "ADMIN"} {/* Hiển thị vai trò */}
        </span>
      </div>
    </div>
  )
}

export default DisplayedCustomer