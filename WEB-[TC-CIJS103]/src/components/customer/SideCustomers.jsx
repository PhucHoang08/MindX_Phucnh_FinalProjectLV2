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
    useEffect(() => {
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

            <div className="text-center mt-[100px] flex flex-col items-center justify-center">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <p className="mt-2 text-gray-600">LOADING...</p>
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
                    <h1 className="font-futura text-red-500 text-3xl">USERS: {filteredCustomers.length}</h1>
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

                        <>
                            {/* Phần thân bảng */}
                            <div ref={cardRef} className="overflow-x-auto">
                                <table className="min-w-full bg-white shadow">

                                    <div className="border-2 border-black w-full flex flex-row items-center justify-between">
                                        <div className="w-1/7 p-3 text-left text-lg font-futura text-black">
                                            USER
                                        </div>
                                        <div className="w-1/3 p-3 text-left text-lg font-futura text-black flex items-center justify-center">
                                            FULL NAME
                                        </div>
                                        <div className="w-1/3 p-3 text-left text-lg font-futura text-black flex items-center justify-center">
                                            EMAIL
                                        </div>
                                        <div className="w-1/3 p-3 text-left text-lg font-futura text-black flex items-center justify-center">
                                            PHONE
                                        </div>
                                        <div className="w-1/7 py-3 px-4 text-left text-lg font-futura text-black flex items-center justify-center">
                                            ROLE
                                        </div>

                                    </div>

                                    <div className="w-full py-4">
                                        {displayedCustomers.filter(c => c.role === 'user').map((item) => (
                                            <DisplayedCustomer
                                                key={item.email}
                                                item={item}
                                                isLoading={isLoading}
                                            />
                                        ))}
                                    </div>
                                </table>
                            </div>
                        </>
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
