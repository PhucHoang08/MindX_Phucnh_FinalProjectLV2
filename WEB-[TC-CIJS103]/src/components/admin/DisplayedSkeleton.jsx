import React from 'react';
import Skeleton from '@mui/material/Skeleton';
function DisplayedSkeleton() {
    return (
        <div className="w-1/4 p-2 flex flex-col justify-around items-center hover:bg-gray-50 text-center rounded cursor-pointer border-2 border-gray-200 shadow"
        >
            {/* Dòng sản phẩm, đổi màu khi hover */}


            <div className=" w-full h-9/10">
                {/* Cột tên và ảnh */}
                <div className="w-full flex flex-col justify-between items-center h-full">
                    <div className="w-5/6 h-full flex items-center">
                        {/* Container ảnh */}
                        <Skeleton variant="rounded" width={300} height={330} />
                    </div>
                    {/* Name */}
                    <Skeleton variant="rounded" width={200} height={22} className='mt-1.5'/>
                </div>
            </div>

            {/* Checkbox va ID */}
            <div className='w-full flex flex-row justify-center items-center gap-2 mt-1.5 mb-1.5'>
                <Skeleton variant="rounded" width={50} height={20} />
            </div>

            <div className='flex flex-row justify-between items-center w-full h-1/5'>

                {/* Date va price */}
                <div className='flex flex-col items-start justify-between gap-2.5'>
                    <Skeleton variant="rounded" width={150} height={22} />
                    <Skeleton variant="rounded" width={130} height={22} />
                </div>


                {/* Status va edit */}
                <div className='flex flex-col items-center justify-evenly h-full'>
                    <Skeleton variant="rounded" width={100} height={25} />
                    <div className="flex items-center justify-center space-x-2">
                        {/* Nhóm các nút hành động */}
                        <Skeleton variant="rounded" width={13} height={13} />
                        <Skeleton variant="rounded" width={13} height={13} />
                        <Skeleton variant="rounded" width={13} height={13} />
                    </div>
                </div>

            </div>
        </div>
    );
}
export default DisplayedSkeleton