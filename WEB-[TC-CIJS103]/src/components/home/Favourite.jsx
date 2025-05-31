import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';
import { DeleteIcon } from "../icon/DeleteIcon";
import Footer from "../Footer";

function Favourite() {
  // Định nghĩa component favourite
  const navigate = useNavigate(); // Khởi tạo hook useNavigate
  const [favItems, setFavItems] = useState([]); // Trạng thái lưu danh sách sản phẩm trong favourites
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  // Hàm tải favourites từ localStorage
  useEffect(() => {
    const savedFav = localStorage.getItem("favourites"); // Lấy favourites từ localStorage
    if (savedFav) {
      setFavItems(JSON.parse(savedFav)); // Parse và cập nhật trạng thái nếu có
    }
  }, []); // Chạy một lần khi component mount



  // Hàm xóa sản phẩm khỏi Favourite
  const removeItem = (id) => {
    const updatedFav = favItems.filter((item) => !(item.id === id)); // Lọc ra sản phẩm không có ID cần xóa
    setFavItems(updatedFav);
    localStorage.setItem("favourites", JSON.stringify(updatedFav)); // Cập nhật localStorage
  };



  if (!favItems.length && !isLoading) {
    // Hiển thị thông báo nếu favourites trống
    return (
      <>
        <Header />
        <div className="min-h-screen  py-10 mt-[90px]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-futura text-black font-futura text-center mb-6">
              YOUR FAVOURITE PRODUCTS
            </h3>
            <p className="text-center text-red-500 font-futura ">FAVOURITES IS EMPTY</p>
            <button
              onClick={() => navigate("/")} // Chuyển hướng về trang Hello
              className="mt-4 bg-blue-500 font-futura text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 mx-auto block"
            >
              BACK TO SHOPPING
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="h-screen py-10 mt-[90px]" >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-futura text-black  text-center mb-6">
            MY FAVOURITE PRODUCTS
          </h3>
          {isLoading ? (
            <div className="text-center flex flex-col items-center justify-ceneter">
              <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <p className="mt-2 text-gray-600">LOADING...</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white  ">
                  <thead className="border-2 border-black">
                    <tr>
                      <th className="p-3 text-left text-lg font-futura text-black">
                        PRODUCT
                      </th>
                      <th className="p-3 text-left text-lg font-futura text-black">
                        SIZE
                      </th>
                      <th className="p-3 text-left text-lg font-futura text-black">
                        PRICE
                      </th>
                      <th className="p-3 text-left text-lg font-futura text-black">
                        ACTION
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" gap-4">
                    {favItems.map((item) => (
                      <tr key={`${item.id}-${item.size}`} className="hover:bg-gray-50 border-2 border-black">
                        <td className="p-3 flex items-center space-x-3">
                          <img
                            src={
                              item.images[0] ||
                              "https://placehold.co/50x50?text=Default+Image"
                            }
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                            onError={(e) =>
                            (e.target.src =
                              "https://placehold.co/50x50?text=Image+Not+Found")
                            }
                          />
                          <span className="font-futura text-lg">{item.name}</span>
                        </td>
                        <td className="p-3 text-lg text-black font-futura">
                          SIZE: {item.size}
                        </td>
                        <td className="p-3 text-lg text-black font-futura">
                          PRICE: $ {item.price} USD
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => removeItem(item.id)}

                            className="text-white bg-red-500 rounded-lg p-2 font-futura text-sm gap-1 hover:bg-red-800 flex flex-row items-center transititon-all duration-300"
                          >
                            <DeleteIcon />
                            DELETE
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Favourite
