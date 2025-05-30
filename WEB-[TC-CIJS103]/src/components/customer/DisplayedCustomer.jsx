import React from 'react'
import { UserIcon } from '../icon/UserIcon'

function DisplayedCustomer({ item,handleEditProduct }) {
    return (
        <div className="w-1/4 h-fit px-4 py-2 flex flex-col justify-between items-center hover:bg-gray-50 text-center rounded  border-2 border-black shadow"
        >
            {/* Dòng customer, đổi màu khi hover */}
            <div className=" w-full h-1/2 flex flex-col justify-center items-center">
                <UserIcon />
                {/* Cột tên và email */}
                <div className="w-full flex flex-row justify-center items-center h-full">
                    <p className='font-futura'>FULL NAME: </p>
                    <span className="text-blue-500 text-lg font-normal">
                        {item.fullName || "N/A"} {/* Hiển thị tên customer */}
                    </span>
                </div>
                <div className="w-full flex flex-row justify-center items-center">
                    <p className='font-futura'>EMAIL: </p>
                    <span className=' text-blue-500 font-medium'>
                        {item.email || "N/A"} {/* Hiển thị email customer */}
                    </span>
                </div>
                <div className="w-full flex flex-row justify-center items-center">
                    <p className='font-futura'>PHONE: </p>
                    <span className=' text-blue-500 font-medium'>
                        {item.phone || "N/A"} {/* Hiển thị phone customer */}
                    </span>
                </div>
                <span
                        className='px-2 py-1 border-2 border-blue-500 text-blue-500 font-futura rounded shadow '
                    >
                        {item.role=="user"?"USER":"NOT USER"} {/* Hiển thị password */}
                    </span>
            </div>

        </div >
    )
}

export default DisplayedCustomer
