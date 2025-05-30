import React from 'react'
import { Autoplay } from "swiper/modules"; // Import module Autoplay từ Swiper để ảnh tự động chuyển
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper và SwiperSlide để tạo carousel ảnh sản phẩm
import { Pencil, Eye, Trash2 } from "lucide-react"; // Import các icon Pencil, Eye, Trash2 từ thư viện lucide-react để dùng trong giao diện
import { SquarePenIcon } from '../icon/SquarePenIcon';
import { DeleteIcon } from '../icon/DeleteIcon';
function DisplayedProduct({ item, handleEditProduct, handleSoftDeleteProduct, isLoading }) {
    return (
        <div className="w-1/4 p-2 flex flex-col justify-around items-center hover:bg-gray-50 text-center rounded cursor-pointer border-2 border-black shadow"
        >
            {/* Dòng sản phẩm, đổi màu khi hover */}


            <div className=" w-full h-9/10">
                {/* Cột tên và ảnh */}
                <div className="w-full flex flex-col justify-between items-center h-full">
                    <div className="w-5/6 h-full">
                        {/* Container ảnh */}
                        <Swiper
                            modules={[Autoplay]} // Sử dụng module Autoplay
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }} // Tự động chuyển ảnh sau 2 giây
                            loop={
                                Array.isArray(item.images) && item.images.length > 1 // Lặp lại nếu có nhiều hơn 1 ảnh
                            }
                            className="rounded-md overflow-hidden h-full"
                        >
                            {Array.isArray(item.images) &&
                                item.images.map((img, idx) => (
                                    <SwiperSlide key={idx}>
                                        <img
                                            src={img}
                                            alt={item.name || "Product image"}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>
                    <span className=" text-lg font-futura">
                        {item.name || "N/A"} {/* Hiển thị tên sản phẩm */}
                    </span>
                </div>
            </div>

            <div className='w-full flex flex-row justify-center items-center gap-2'>
                
                <div className=" text-red-600 font-medium cursor-pointer font-futura">
                    {item.id || "N/A"} {/* Hiển thị ID sản phẩm */}
                </div>
            </div>

            <div className='flex flex-row justify-between items-center w-full h-1/5'>
                <div className='flex flex-col items-start justify-between'>


                    <div className=" text-lg text-gray-700 font-futura">
                        Date: {item.date || "N/A"} {/* Hiển thị ngày */}
                    </div>

                    <div className=" text-lg text-gray-900 font-futura">
                        Price: $
                        {typeof item.price === "number"
                            ? item.price.toLocaleString()
                            : "N/A"}{" "}
                        {/* Hiển thị giá, định dạng số */}
                        USD
                    </div>

                </div>

                <div className='flex flex-col items-center justify-between h-full'>

                    <div className=" h-1/2">
                        <span
                            className={`px-2 py-1 font-futura text-lg rounded ${item.status === "available"
                                ? "text-green-700 bg-green-100"
                                : "text-red-700 bg-red-100"
                                }`}
                        >
                            {/* Đổi màu trạng thái */}
                            {item.status === "available" ? "Available" : "Unavailable"}
                        </span>
                    </div>

                    <div className="w-full flex flex-row items-center justify-evenly ">
                        {/* Nhóm các nút hành động */}
                        <SquarePenIcon
                            className="text-blue-600"
                            onClick={() => handleEditProduct(item)} // Gọi hàm chỉnh sửa
                            style={{
                                cursor:
                                    item.status === "unavailable" ? "not-allowed" : "pointer",
                                opacity: item.status === "unavailable" ? 0.5 : 1,
                            }}
                        />
                        <DeleteIcon
                            className="text-red-600"
                            onClick={
                                item.status === "unavailable"
                                    ? undefined
                                    : () => handleSoftDeleteProduct(item.id) // Gọi hàm soft delete
                            }
                            style={{
                                cursor:
                                    isLoading || item.status === "unavailable"
                                        ? "not-allowed"
                                        : "pointer",
                                opacity:
                                    isLoading || item.status === "unavailable" ? 0.5 : 1,
                            }}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DisplayedProduct
