import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import Unauthorized from "./components/admin/Unauthorized";
import Home from './pages/Home'


import Page404 from "./pages/Page404"
import ProtectedRoute from "./components/admin/ProtectedRoute"
import AboutUs from "./components/about/AboutUs";
import Profile from "./components/profile/Profile";
import ProductDetail from "./components/home/ProductDetail";
import Cart from "./components/cart/Cart"
import Favourite from "./components/home/Favourite"
import Checkout from "./components/cart/Checkout"
import AdminProduct from "./components/admin/AdminProduct";
import AdminCustomer from "./components/customer/AdminCustomer";

function App() {


  return (
    // Bọc toàn bộ app trong Router để kích hoạt hệ thống định tuyến
    <Router>
      <Routes>
        {/* 🌐 Các route công khai (không yêu cầu đăng nhập) */}


        {/* Trang chủ mặc định là Home */}

        <Route path="/login" element={<LogIn />} /> {/* Trang đăng nhập */}

        <Route path="/signup" element={<SignUp />} /> {/* Trang đăng ký */}

        <Route path="/unauthorized" element={<Unauthorized />} />{" "}
        {/* Trang báo lỗi không đủ quyền */}

        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='*' element={<Page404 />} />

        {/* 🔐 Các route chỉ dành cho user đã đăng nhập */}

        <Route element={<ProtectedRoute requiredRole="user"/>}>
          <Route path="/" element={<Home />} />{" "}
          {/* Trang user sau khi đăng nhập */}

          <Route path="/cart" element={<Cart />} /> 
          {/*Trang giỏ hàng*/}

          <Route path="/favourite" element={<Favourite />} /> 
          {/*Trang yeu thich*/}

          <Route path="/product/:id" element={<ProductDetail />} />{" "}
          {/* Trang chi tiết sản phẩm với ID động */}

          <Route path="/checkout" element={<Checkout />} />{" "}
          {/* Trang thanh toán */}
        </Route>



        {/* 🔐 Các route chỉ dành cho admin */}

        <Route element={<ProtectedRoute requiredRole="admin" />}>
          {/* Khi truy cập /admin → điều hướng tới /admin/products */}
          <Route path="/admin" element={<Navigate to="/admin/products" replace />}
          />
          {/* Trang quản lý sản phẩm dành riêng cho admin */}
          <Route path="/admin/products" element={<AdminProduct />} />
          <Route path="/admin/customers" element={<AdminCustomer />} />
        </Route>

      </Routes>

    </Router>
  )
}

export default App
