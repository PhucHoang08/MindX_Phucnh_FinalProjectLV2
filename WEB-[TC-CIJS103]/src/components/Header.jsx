import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon } from "./icon/UserIcon";
import { UpvoteIcon } from "./icon/UpvoteIcon";
import { CartIcon } from "./icon/CartIcon";
import { fetchProducts } from "../API/productAPI"; // Import hàm fetchProducts từ productAPI để lấy danh sách sản phẩm từ server
function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]); // Trạng thái products: Lưu toàn bộ danh sách sản phẩm gốc từ server
  const [searchTerm, setSearchTerm] = useState(""); // Trạng thái searchTerm: Lưu từ khóa tìm kiếm theo tên sản phẩm
  const [filteredProducts, setFilteredProducts] = useState([]); // Trạng thái filteredProducts: Lưu danh sách sản phẩm sau khi search/filter/sort
  const [isLoading, setIsLoading] = useState(false); // Trạng thái isLoading: Kiểm soát trạng thái loading khi thực hiện các thao tác (thêm, sửa, xóa)

  // Hàm loadProducts: Lấy danh sách sản phẩm từ server và cập nhật trạng thái
  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const result = await fetchProducts({ cache: "no-store" });
      const rawProductList = result[result.length - 1].data;
      console.log("rawProductList", rawProductList)
      let productsList = [];

      if (Array.isArray(rawProductList)) {
          rawProductList.forEach((product) => {
              if (
                  product &&
                  typeof product === "object" &&
                  product.status === "available" &&
                  product.id &&
                  product.name
              ) {
                  productsList.push(product);
              }
          });
      }

      const productMap = new Map();

      productsList.forEach((product) => {
        if (product?.status?.toLowerCase() !== "available") return; // Bỏ sớm nếu không available
      
        const existingProduct = productMap.get(product.id);
        if (!existingProduct) {
          productMap.set(product.id, product);
        } else {
          const existingDate = new Date(existingProduct.date.replace("thg", "tháng"));
          const newDate = new Date(product.date.replace("thg", "tháng"));
          if (newDate > existingDate) {
            productMap.set(product.id, product);
          }
        }
      });

      const uniqueProducts = Array.from(productMap.values());
        
      setProducts(uniqueProducts);
    } catch (error) {
      console.error("Không thể tải danh sách sản phẩm:", error); // Log lỗi nếu không tải được sản phẩm
      alert(
        `Không thể tải danh sách sản phẩm: ${error.message}. Vui lòng thử lại sau.`
      ); // Hiển thị thông báo lỗi cho người dùng
      setProducts([]); // Reset products về mảng rỗng
      setFilteredProducts([]); // Reset filteredProducts về mảng rỗng
    } finally {
      setIsLoading(false); // Tắt trạng thái loading
    }
  };


  useEffect(() => {
    loadProducts(); // chỉ chạy 1 lần khi mount
  }, []);





  useEffect(() => {
    let updatedProducts = [...products]; // Tạo bản sao của danh sách sản phẩm gốc
    // Search: Tìm kiếm theo tên
    if (searchTerm) {
      // Kiểm tra nếu có từ khóa tìm kiếm
      updatedProducts = updatedProducts.filter(
        (
          product // Lọc sản phẩm có tên chứa từ khóa
        ) => product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    console.log("updatedProducts", updatedProducts)

    setFilteredProducts(updatedProducts); // Cập nhật danh sách filteredProducts
  }, [searchTerm, products]); // Chạy lại khi các trạng thái này thay đổi




  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    // Kiểm tra kỹ hơn để tránh lỗi
    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Lỗi parse user từ localStorage:", error);
        setUser(null);
      }
    }
  }, []);


  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="w-full h-[90px] fixed bg-white z-50 top-0 start-0 border-b-[3px] border-red-500">
      <div className="w-full h-full flex items-center justify-between px-8">

        {/* Menu Links */}
        <div className="w-[220px] font-futura text-2xl flex flex-row justify-between items-center">
          <Link to="/" className=" no-underline text-black hover:!text-red-500  transition-all duration-300">HOME</Link>
          <Link to="/about-us" className="no-underline text-black hover:!text-red-500 transition-all duration-300">ABOUT</Link>
        </div>

        {/* Logo */}
        <Link to="/" className="w-[560px] flex justify-center items-center">
          <span className="text-[40px] text-red-500 font-maxtield whitespace-nowrap">Street-Commerce</span>
        </Link>

        {/* Search Box */}
        <div className="relative " >
          <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1">
            <svg
              width="17"
              height="16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-labelledby="search"
              className="w-5 h-5 text-gray-700"
            >
              <path
                d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                stroke="currentColor"
                strokeWidth="1.333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <input
            className="input rounded-full px-8 py-3 border-2 border-black focus:outline-none focus:!border-red-500 placeholder-gray-400 transition-all duration-300 shadow-md"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            required
            type="text"
          />
          {searchTerm && (
            <div
              onClick={() => { setSearchTerm("") }}
              className="absolute top-[110%] left-0 w-full bg-white border border-gray-300 shadow-md rounded-md max-h-[300px] overflow-y-auto z-50">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="block px-4 py-2 hover:bg-gray-100 text-black no-underline "
                  >
                    {product.name}
                  </Link>

                ))
              ) : (
                <div className="px-4 py-2 text-gray-500 text-center">NOT FOUND PRODUCTS</div>
              )}
            </div>
          )}

        </div>


        {/* Favourite */}
        <Link to="/favourite" className="w-[40px] h-[40px] hover:!text-red-500 transition-all duration-300">
          <UpvoteIcon />
        </Link>


        {/* Cart */}
        <Link to="/cart" className="w-[40px] h-[40px] hover:!text-red-500 transition-all duration-300">
          <CartIcon />
        </Link>


        {/* User or Auth Buttons */}

        {user ? (
          <div className="relative">
            {/* Avatar button */}
            <button
              type="button"
              className="flex text-sm hover:!text-red-500 transition-all duration-300"
              id="user-menu-button"
              aria-expanded="false"
              onClick={() => {
                const dropdown = document.getElementById("user-dropdown");
                dropdown.classList.toggle("hidden");
              }}
            >
              <UserIcon />
            </button>


            {/* Dropdown menu */}
            <div
              id="user-dropdown"
              className="hidden absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow z-50"
            >
              <div className="px-4 py-3 text-sm text-gray-900">
                <div>{user.fullName}</div>
                <div className="font-medium truncate">{user.email}</div>
              </div>
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                    INFORMATION
                  </Link>
                </li>
              </ul>
              <div className="py-2">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  LOG OUT
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login" className="font-futura text-[30px] text-black hover:!text-red-500 transition-all duration-300">REGISTER</Link>
          </>
        )}

      </div>
    </nav>
  );
}

export default Header;
