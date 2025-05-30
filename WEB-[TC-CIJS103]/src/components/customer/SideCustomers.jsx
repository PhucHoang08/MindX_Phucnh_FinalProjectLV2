import React, { useEffect, useRef } from "react";
import gsap from "gsap";
// import DisplayedProduct from './DisplayedProduct'
import Skeleton from '@mui/material/Skeleton';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRightSquareIcon } from '../icon/ArrowRightSquareIcon'
import { ArrowLeftSquareIcon } from '../icon/ArrowLeftSquareIcon'
import DisplayedSkeleton from "./DisplayedSkeleton";
import DisplayedCustomer from "./DisplayedCustomer";
import FilterBar from "./FilterBar";

function SideCustomers({
    isLoading,
    customers,
    setShowAddModal,
    filteredCustomers,
    displayedCustomers,
    statusFilter,
    setStatusFilter,
    nextPage,
    prevPage,
    paginate,
    currentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage
}) {
    const cardRef = useRef(null);
    gsap.registerPlugin(ScrollTrigger);
    useEffect(()=>{    
        const el = cardRef.current;

        gsap.fromTo(
          el,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse", // hoặc "restart none none none" nếu bạn muốn chạy mỗi lần xuất hiện
            },
          }
        );
    })
    // add skeleton trong luc loading
    if (isLoading) {
        return (

            <div className="p-4 sm:ml-20 mt-[90px]">
                {/* Container chính */}
                <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
                    {" "}
                    {/* Container cho các nút và bộ lọc */}
                    <div className="flex gap-4">
                        {" "}
                        {/* Nhóm nút Soft Delete All và Add New */}
                        <Skeleton variant="rounded" width={105} height={45} />

                        <Skeleton variant="rounded" width={105} height={45} />
                    </div>

                    <div className='flex flex-wrap gap-4'>
                        <Skeleton variant="rounded" width={200} height={45} />
                        
                        <Skeleton variant="rounded" width={160} height={45} />
                    </div>


                </div>
                <div className="w-full mx-auto bg-white rounded ">
                    {" "}
                    <div className="w-full h-fit">
                        {" "}
                        {/* Container bảng, hỗ trợ cuộn ngang nếu bảng quá rộng */}
                        {filteredCustomers.length === 0 && searchTerm ? ( // Kiểm tra nếu không tìm thấy sản phẩm và có từ khóa tìm kiếm
                            <Skeleton variant="rounded" width={300} height={20} />
                        ) : (

                            <div className='w-full justify-center flex flex-row flex-wrap gap-2'>
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <DisplayedSkeleton key={index} />
                                ))}
                            </div>


                        )}
                    </div>


                    {/* Pagination */}
                    {isLoading && ( // Hiển thị phân trang nếu có sản phẩm
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={prevPage}
                                disabled={currentPage === 1}
                                className="px-4 py-2 text-blue-500 rounded hover:text-red-500 disabled:text-gray-400 transition-all duration-300"
                            >
                                <Skeleton variant="rounded" width={40} height={40} />
                            </button>
                            <div className="flex gap-2">
                                {Array.from({ length: 3 }, (_, i) => i + 1).map(
                                    (
                                        number // Tạo danh sách số trang
                                    ) => (
                                        <button
                                            key={number}
                                            onClick={() => paginate(number)}
                                        >
                                            <Skeleton variant="rounded" width={35} height={40} />
                                        </button>
                                    )
                                )}
                            </div>

                            <button
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 text-blue-500 rounded hover:text-red-500 disabled:text-gray-400 transition-all duration-300"
                            >
                                <Skeleton variant="rounded" width={40} height={40} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

        )

    }
    return (

        <div className="p-4 sm:ml-20 mt-[90px] ">
            {/* Container chính */}
            <div className=" flex flex-wrap gap-4 items-center justify-between mb-4">
                {" "}
                {/* Container cho các nút và bộ lọc */}
                <div className="flex gap-4">
                    {" "}

                    <button
                        onClick={() => setShowAddModal(true)} // Mở modal thêm sản phẩm
                        className="border-2 border-black text-black px-4 py-2 rounded-lg hover:!text-blue-500 hover:!border-blue-500 shadow font-futura transition-all duration-300"
                        disabled={isLoading}
                    >
                        CREATE
                        
                    </button>
                    <h1>USERS: {filteredCustomers.length}</h1>
                </div>
                <FilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                setCurrentPage={setCurrentPage}
                />
            </div>
            <div className="w-full mx-auto rounded ">
                {" "}
                <div ref={cardRef} className="w-full h-fit">
                    {" "}
                    {/* Container bảng, hỗ trợ cuộn ngang nếu bảng quá rộng */}
                    {filteredCustomers.length === 0 && searchTerm ? ( // Kiểm tra nếu không tìm thấy sản phẩm và có từ khóa tìm kiếm
                        <p className="text-center text-gray-600 text-lg h-dvh font-futura">
                            NO CUSTOMERS FOUND
                        </p>
                    ) : (
                        <div ref={cardRef}  className='w-full justify-center flex flex-row flex-wrap gap-2'>
                            {/* Phần thân bảng */}
                            {displayedCustomers.filter(c => c.role === 'user').map((item) => (
                                <DisplayedCustomer
                                    key={item.email}
                                    item={item}
                                    isLoading={isLoading}
                                />
                            ))}
                        </div>
                    )}
                </div>


                {/* Pagination */}
                {filteredCustomers.length > 0 && ( // Hiển thị phân trang nếu có sản phẩm
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-blue-500 rounded hover:text-red-500 disabled:text-gray-400 transition-all duration-300"
                        >
                            <ArrowLeftSquareIcon />
                        </button>
                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                (
                                    number // Tạo danh sách số trang
                                ) => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number)}
                                        className={`px-2.5 py-1.5 shadow font-futura text-sm rounded transition-all duration-300 ${currentPage === number
                                            ? "border-3 border-red-500 text-red-500"
                                            : "border-3 border-black hover:!text-red-500 hover:!border-red-500"
                                            }`}
                                    >
                                        {number}
                                    </button>
                                )
                            )}
                        </div>

                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 text-blue-500 rounded hover:text-red-500 disabled:text-gray-400 transition-all duration-300"
                        >
                            <ArrowRightSquareIcon />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SideCustomers
