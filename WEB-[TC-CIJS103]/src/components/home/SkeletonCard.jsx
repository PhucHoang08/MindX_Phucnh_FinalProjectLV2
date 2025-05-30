import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

function SkeletonCard() {
    return (
        <Stack spacing={1}>
            <Skeleton variant="rounded" width={300} height={350} />
            <Skeleton variant="rounded" width={300} height={20} />
            <div className='w-[300px] h-[50px] flex flex-row justify-between items-center gap-2'>
                <Skeleton variant="rounded" width={100} height={50} />
                <Skeleton variant="rounded" width={100} height={50} />
            </div>

        </Stack>
    );
}
export default SkeletonCard