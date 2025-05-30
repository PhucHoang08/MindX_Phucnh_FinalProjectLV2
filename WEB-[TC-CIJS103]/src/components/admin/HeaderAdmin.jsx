import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon } from "../icon/UserIcon";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
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

        {/* Logo */}
        <Link to="/" className="w-[560px] flex justify-center items-center">
          <span className="text-[40px] text-red-500 font-maxtield whitespace-nowrap">Street-Commerce</span>
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
              <UserIcon/>            
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
                    Dashboard
                  </Link>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Settings
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Earnings
                  </a>
                </li>
              </ul>
              <div className="py-2">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Đăng xuất
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
