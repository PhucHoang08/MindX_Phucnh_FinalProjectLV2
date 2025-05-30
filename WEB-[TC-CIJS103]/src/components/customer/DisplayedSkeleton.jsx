import React from 'react';
import Skeleton from '@mui/material/Skeleton';

function DisplayedSkeleton() {
    return (
        <div className="w-1/4 h-fit px-4 py-2 flex flex-col justify-between items-center hover:bg-gray-50 text-center rounded gap-2 border-2 border-black shadow"
        >
            {/* Dòng customer, đổi màu khi hover */}
            <div className=" flex flex-col justify-between items-center ">

                {/* Cột tên và email */}
                <div className='flex flex-col h-1/2 justify-between items-center gap-2'>
                    <Skeleton variant="rounded" width={40} height={40} />
                    <Skeleton variant="rounded" width={250} height={20} />
                    <Skeleton variant="rounded" width={250} height={20} />
                </div>

            </div>

            <div className='flex flex-row justify-between items-end w-full gap-4'>
                <div className='flex flex-col items-start gap-2'>
                    <Skeleton variant="rounded" width={170} height={20} />

                    <Skeleton variant="rounded" width={200} height={20} />
                </div>


                <Skeleton variant="rounded" width={65} height={35} />

            </div>
        </div >
    );
}
export default DisplayedSkeleton