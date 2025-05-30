import { useEffect, useState } from "react"; // Import hook useEffect và useState từ React để quản lý trạng thái và side-effect
import { useNavigate } from "react-router-dom"; // Import hook useNavigate từ react-router-dom để điều hướng trang

import "swiper/css"; // Import CSS của Swiper để hiển thị carousel ảnh
import "swiper/css/navigation"; // Import CSS navigation của Swiper (nếu có dùng navigation)

import { fetchProducts } from "../../API/productAPI"; // Import hàm fetchProducts từ productAPI để lấy danh sách sản phẩm từ server
import SideBar from "./SideBar";
import SideProducts from "./SideProducts";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import HeaderAdmin from "./HeaderAdmin"
import Footer from "../Footer";


const AdminProduct = () => {
  // Định nghĩa component AdminProduct
  const navigate = useNavigate(); // Khởi tạo hook useNavigate để điều hướng trang
  const [products, setProducts] = useState([]); // Trạng thái products: Lưu toàn bộ danh sách sản phẩm gốc từ server
  const [filteredProducts, setFilteredProducts] = useState([]); // Trạng thái filteredProducts: Lưu danh sách sản phẩm sau khi search/filter/sort
  const [displayedProducts, setDisplayedProducts] = useState([]); // Trạng thái displayedProducts: Lưu danh sách sản phẩm hiển thị trên trang hiện tại (sau phân trang)
  const [showAddModal, setShowAddModal] = useState(false); // Trạng thái showAddModal: Kiểm soát hiển thị modal thêm sản phẩm mới
  const [showEditModal, setShowEditModal] = useState(false); // Trạng thái showEditModal: Kiểm soát hiển thị modal chỉnh sửa sản phẩm
  const [imagePreviews, setImagePreviews] = useState([]); // Trạng thái imagePreviews: Lưu danh sách URL ảnh để hiển thị preview trong modal
  const [isLoading, setIsLoading] = useState(false); // Trạng thái isLoading: Kiểm soát trạng thái loading khi thực hiện các thao tác (thêm, sửa, xóa)
  const [editingProduct, setEditingProduct] = useState(null); // Trạng thái editingProduct: Lưu thông tin sản phẩm đang được chỉnh sửa
  const [searchTerm, setSearchTerm] = useState(""); // Trạng thái searchTerm: Lưu từ khóa tìm kiếm theo tên sản phẩm
  const [statusFilter, setStatusFilter] = useState("all"); // Trạng thái statusFilter: Lưu trạng thái lọc (all, available, unavailable)
  const [sortOption, setSortOption] = useState(""); // Trạng thái sortOption: Lưu tùy chọn sắp xếp (giá, ngày, tăng/giảm)
  const [itemsPerPage, setItemsPerPage] = useState(3); // Trạng thái itemsPerPage: Số sản phẩm hiển thị trên mỗi trang, mặc định là 5
  const [currentPage, setCurrentPage] = useState(1); // Trạng thái currentPage: Trang hiện tại, mặc định là 1


  // Hàm parseCustomDate: Chuyển đổi định dạng ngày tháng dạng "15, thg 10, 2024" thành Date object để sắp xếp
  const parseCustomDate = (dateStr) => {
    if (!dateStr || typeof dateStr !== "string") return new Date(0);

    const [month, day, year] = dateStr.split("/").map(Number);
    if (
      !month || !day || !year ||
      month < 1 || month > 12 ||
      day < 1 || day > 31
    ) {
      return new Date(0); // Ngày không hợp lệ
    }

    return new Date(year, month - 1, day);
  };



  // Hàm loadProducts: Lấy danh sách sản phẩm từ server và cập nhật trạng thái
  const loadProducts = async () => {
    try {
      setIsLoading(true); // Bật trạng thái loading
      const result = await fetchProducts(); // Gọi API để lấy danh sách sản phẩm
      console.log("Raw result from API:", result); // Log dữ liệu thô từ API để debug
      let productsList = []; // Khởi tạo mảng để lưu danh sách sản phẩm
      if (Array.isArray(result)) {
        // Kiểm tra nếu kết quả trả về là mảng
        result.forEach((item, index) => {
          // Duyệt qua từng phần tử trong kết quả
          if (item && item.data && Array.isArray(item.data)) {
            // Kiểm tra nếu phần tử có thuộc tính data và data là mảng
            const validProducts = item.data.filter(
              // Lọc các sản phẩm hợp lệ
              (product) =>
                product &&
                typeof product === "object" &&
                product.id &&
                product.name // Sản phẩm phải là object, có id và name
            );
            console.log(`Products from result[${index}].data:`, validProducts); // Log danh sách sản phẩm hợp lệ để debug
            productsList = [...productsList, ...validProducts]; // Thêm các sản phẩm hợp lệ vào productsList
          }
        });
      }
      const uniqueProducts = Array.from(
        // Loại bỏ sản phẩm trùng lặp dựa trên id
        new Map(productsList.map((item) => [item.id, item])).values()
      );
      console.log("Parsed product list:", uniqueProducts); // Log danh sách sản phẩm sau khi loại bỏ trùng lặp
      if (!Array.isArray(uniqueProducts)) {
        // Kiểm tra nếu danh sách không phải mảng
        console.error(
          "Dữ liệu không đúng định dạng, trả về mảng rỗng:",
          uniqueProducts
        ); // Log lỗi
        setProducts([]); // Reset products về mảng rỗng
        setFilteredProducts([]); // Reset filteredProducts về mảng rỗng
        setDisplayedProducts([]); // Reset displayedProducts về mảng rỗng
      } else {
        console.log("Số lượng sản phẩm tải được:", uniqueProducts.length); // Log số lượng sản phẩm tải được
        setProducts(uniqueProducts); // Cập nhật trạng thái products
        setFilteredProducts(uniqueProducts); // Cập nhật trạng thái filteredProducts
      }


      const unavailableProducts = uniqueProducts // Lấy danh sách ID của các sản phẩm có trạng thái "unavailable"
        .filter((product) => product.status === "unavailable")
        .map((product) => product.id);
      localStorage.setItem(
        // Lưu danh sách ID vào localStorage
        "unavailableProducts",
        JSON.stringify(unavailableProducts)
      );
      console.log(
        "Unavailable product IDs saved to localStorage:",
        unavailableProducts
      ); // Log danh sách ID đã lưu


      const storedUnavailableProducts = JSON.parse(
        // Đọc lại danh sách ID từ localStorage để xác nhận
        localStorage.getItem("unavailableProducts") || "[]"
      );
      console.log(
        "Confirmed unavailable product IDs in localStorage:",
        storedUnavailableProducts
      ); // Log để xác nhận
    } catch (error) {
      console.error("Không thể tải danh sách sản phẩm:", error); // Log lỗi nếu không tải được sản phẩm
      alert(
        `Không thể tải danh sách sản phẩm: ${error.message}. Vui lòng thử lại sau.`
      ); // Hiển thị thông báo lỗi cho người dùng
      setProducts([]); // Reset products về mảng rỗng
      setFilteredProducts([]); // Reset filteredProducts về mảng rỗng
      setDisplayedProducts([]); // Reset displayedProducts về mảng rỗng
    } finally {
      setIsLoading(false); // Tắt trạng thái loading
    }
  };


  // useEffect: Xử lý search, filter, sort
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


    // Filter: Lọc theo trạng thái
    if (statusFilter !== "all") {
      // Kiểm tra nếu trạng thái lọc không phải "all"
      updatedProducts = updatedProducts.filter(
        // Lọc sản phẩm theo trạng thái
        (product) => product.status === statusFilter
      );
    }


    // Sort: Sắp xếp theo giá hoặc ngày
    if (sortOption) {
      // Kiểm tra nếu có tùy chọn sắp xếp
      updatedProducts.sort((a, b) => {
        // Sắp xếp danh sách sản phẩm
        if (sortOption === "price-asc")
          return a.price - b.price; // Sắp xếp giá tăng dần
        else if (sortOption === "price-desc")
          return b.price - a.price; // Sắp xếp giá giảm dần
        else if (sortOption === "date-asc")
          return (
            parseCustomDate(a.date) - parseCustomDate(b.date)
          ); // Sắp xếp ngày cũ nhất
        else if (sortOption === "date-desc")
          return parseCustomDate(b.date) - parseCustomDate(a.date); // Sắp xếp ngày mới nhất
        return 0; // Không thay đổi nếu không khớp
      });
    }


    setFilteredProducts(updatedProducts); // Cập nhật danh sách filteredProducts
    setCurrentPage(1); // Reset về trang 1 khi search/filter/sort thay đổi
  }, [searchTerm, statusFilter, sortOption, products]); // Chạy lại khi các trạng thái này thay đổi


  // useEffect: Xử lý pagination
  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage; // Tính chỉ số sản phẩm cuối cùng trên trang
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Tính chỉ số sản phẩm đầu tiên trên trang
    const currentItems = filteredProducts.slice(
      indexOfFirstItem,
      indexOfLastItem
    ); // Cắt danh sách sản phẩm theo trang
    setDisplayedProducts(currentItems); // Cập nhật danh sách hiển thị
  }, [filteredProducts, currentPage, itemsPerPage]); // Chạy lại khi filteredProducts, currentPage, hoặc itemsPerPage thay đổi


  // useEffect: Kiểm tra đăng nhập và tải sản phẩm
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn"); // Lấy trạng thái đăng nhập từ localStorage
    const userData = localStorage.getItem("user"); // Lấy thông tin người dùng từ localStorage


    if (isLoggedIn !== "true" || !userData) {
      // Kiểm tra nếu chưa đăng nhập
      navigate("/login"); // Điều hướng đến trang đăng nhập
      return;
    }


    const parsedUser = JSON.parse(userData); // Parse thông tin người dùng từ JSON
    if (parsedUser.role !== "admin") {
      // Kiểm tra nếu người dùng không phải admin
      navigate("/"); // Điều hướng đến trang hello
      return;
    }


    const storedUnavailableProducts = JSON.parse(
      // Đọc danh sách sản phẩm unavailable từ localStorage
      localStorage.getItem("unavailableProducts") || "[]"
    );
    console.log(
      "Initial unavailable product IDs in localStorage:",
      storedUnavailableProducts
    ); // Log để debug


    loadProducts(); // Gọi hàm loadProducts để tải danh sách sản phẩm
  }, [navigate]); // Chạy lại khi navigate thay đổi


  // Hàm handleSoftDeleteProduct: Soft delete một sản phẩm (chuyển trạng thái thành unavailable)
  const handleSoftDeleteProduct = async (id) => {
    if (
      !window.confirm(
        "DELETE PRODUCT"
      )
    ) {
      // Hiển thị xác nhận trước khi xóa
      return;
    }


    setIsLoading(true); // Bật trạng thái loading


    const updatedProducts = products.map(
      (
        item // Cập nhật trạng thái sản phẩm
      ) => (item.id === id ? { ...item, status: "unavailable" } : item)
    );
    setProducts(updatedProducts); // Cập nhật danh sách sản phẩm


    try {
      const response = await fetch(
        // Gửi yêu cầu cập nhật lên server
        "https://mindx-mockup-server.vercel.app/api/resources/dataProducts?apiKey=67fe688cc590d6933cc1248f",
        {
          method: "POST", // Phương thức POST
          headers: {
            "Content-Type": "application/json", // Định dạng dữ liệu gửi đi
          },
          body: JSON.stringify({ data: updatedProducts }), // Dữ liệu gửi đi
        }
      );


      if (!response.ok) {
        // Kiểm tra nếu yêu cầu thất bại
        const errorText = await response.text(); // Lấy thông tin lỗi
        console.error("Server response status:", response.status); // Log mã lỗi
        console.error("Server response text:", errorText); // Log chi tiết lỗi
        throw new Error(
          "Lỗi từ server: " + response.statusText + " - " + errorText
        ); // Ném lỗi
      }


      const result = await response.json(); // Lấy kết quả từ server
      console.log("Server response after soft delete:", result); // Log kết quả
      await loadProducts(); // Tải lại danh sách sản phẩm từ server


      const storedUnavailableProducts = JSON.parse(
        // Đọc lại danh sách unavailable từ localStorage
        localStorage.getItem("unavailableProducts") || "[]"
      );
      console.log(
        "After soft delete, unavailable product IDs in localStorage:",
        storedUnavailableProducts
      ); // Log để xác nhận
    } catch (error) {
      console.error("Lỗi khi thay đổi trạng thái sản phẩm:", error); // Log lỗi
      alert(`Thay đổi trạng thái thất bại: ${error.message}. Thử lại sau.`); // Thông báo lỗi
      setProducts(products); // Khôi phục danh sách sản phẩm nếu lỗi
    } finally {
      setIsLoading(false); // Tắt trạng thái loading
    }
  };


  // Hàm handleSoftDeleteAllProducts: Soft delete tất cả sản phẩm
  const handleSoftDeleteAllProducts = async () => {
    if (
      !window.confirm(
        "DELETE ALL PRODUCTS"
      )
    ) {
      // Hiển thị xác nhận
      return;
    }


    setIsLoading(true); // Bật trạng thái loading


    const updatedProducts = products.map((item) => ({
      // Cập nhật trạng thái tất cả sản phẩm thành unavailable
      ...item,
      status: "unavailable",
    }));
    setProducts(updatedProducts); // Cập nhật danh sách sản phẩm


    try {
      const response = await fetch(
        // Gửi yêu cầu cập nhật lên server
        "https://mindx-mockup-server.vercel.app/api/resources/dataProducts?apiKey=67fe688cc590d6933cc1248f",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: updatedProducts }),
        }
      );


      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response status:", response.status);
        console.error("Server response text:", errorText);
        throw new Error(
          "Lỗi từ server: " + response.statusText + " - " + errorText
        );
      }


      const result = await response.json();
      console.log("Server response after soft delete all:", result);
      await loadProducts();


      const storedUnavailableProducts = JSON.parse(
        localStorage.getItem("unavailableProducts") || "[]"
      );
      console.log(
        "After soft delete all, unavailable product IDs in localStorage:",
        storedUnavailableProducts
      );
    } catch (error) {
      console.error("Lỗi khi thay đổi trạng thái tất cả sản phẩm:", error);
      alert(
        `Thay đổi trạng thái tất cả thất bại: ${error.message}. Thử lại sau.`
      );
      setProducts(products);
    } finally {
      setIsLoading(false);
    }
  };




  // Hàm handleEditProduct: Mở modal chỉnh sửa sản phẩm
  const handleEditProduct = (product) => {
    if (product.status === "unavailable") {
      // Kiểm tra nếu sản phẩm không khả dụng
      alert("Không thể chỉnh sửa sản phẩm có trạng thái 'unavailable'.");
      return;
    }
    setEditingProduct(product); // Lưu thông tin sản phẩm cần chỉnh sửa
    setImagePreviews(product.images); // Hiển thị preview ảnh của sản phẩm
    setShowEditModal(true); // Mở modal chỉnh sửa
  };





  // Tính tổng số trang
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage); // Tính số trang dựa trên filteredProducts và itemsPerPage


  // Hàm paginate: Chuyển đến trang cụ thể
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  // Hàm nextPage: Chuyển đến trang tiếp theo
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));


  // Hàm prevPage: Quay lại trang trước
  const prevPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));


  return (
    <div>
      <HeaderAdmin />
      <div>
        <SideBar />
        <SideProducts
          isLoading={isLoading}
          handleEditProduct={handleEditProduct}
          handleSoftDeleteProduct={handleSoftDeleteProduct}
          handleSoftDeleteAllProducts={handleSoftDeleteAllProducts}
          setShowAddModal={setShowAddModal}
          filteredProducts={filteredProducts}
          displayedProducts={displayedProducts}
          nextPage={nextPage}
          prevPage={prevPage}
          paginate={paginate}
          currentPage={currentPage}
          totalPages={totalPages}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortOption={sortOption}
          setSortOption={setSortOption}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          setCurrentPage={setCurrentPage}
        />
        <Footer />
      </div>



      {showAddModal && ( // Hiển thị modal thêm sản phẩm
        <AddModal
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          loadProducts={loadProducts}
          setShowAddModal={setShowAddModal}
        />
      )}



      {showEditModal &&
        editingProduct && ( // Hiển thị modal chỉnh sửa
          <EditModal
            isLoading={isLoading}
            editingProduct={editingProduct}
            loadProducts={loadProducts}
            setIsLoading={setIsLoading}
            setEditingProduct={setEditingProduct}
            setShowEditModal={setShowEditModal}
          />
        )}
    </div>
  );
};


export default AdminProduct; // Xuất component AdminProduct để sử dụng