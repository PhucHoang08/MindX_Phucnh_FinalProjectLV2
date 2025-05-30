
import { useEffect, useState } from "react"; // Import hook useEffect và useState từ React để quản lý trạng thái và side-effect
import { useNavigate } from "react-router-dom"; // Import hook useNavigate từ react-router-dom để điều hướng trang
import  fetchUsers  from "../../API/userAPI"; // Import hàm fetchProducts từ productAPI để lấy danh sách sản phẩm từ server


import HeaderAdmin from '../admin/HeaderAdmin'
import Footer from '../Footer'
import SideBar from '../admin/SideBar'
import AddModal from './AddModal';
import EditModal from '../admin/EditModal';
import SideCustomers from "./SideCustomers";

function AdminCustomer() {
  const navigate = useNavigate(); // Khởi tạo hook useNavigate để điều hướng trang
  const [showAddModal, setShowAddModal] = useState(false); // Trạng thái showAddModal: Kiểm soát hiển thị modal thêm sản phẩm mới
  const [showEditModal, setShowEditModal] = useState(false); // Trạng thái showEditModal: Kiểm soát hiển thị modal chỉnh sửa sản phẩm
  const [customers, setCustomers] = useState([]); // Trạng thái customers: Lưu toàn bộ danh sách sản phẩm gốc từ server
  const [editingProduct, setEditingProduct] = useState(null); // Trạng thái editingProduct: Lưu thông tin sản phẩm đang được chỉnh sửa
  const [isLoading, setIsLoading] = useState(false); // Trạng thái isLoading: Kiểm soát trạng thái loading khi thực hiện các thao tác 
  const [filteredCustomers, setFilteredCustomers] = useState([]); // Trạng thái filteredCustomers: Lưu danh sách sản phẩm sau khi search/filter/sort
  const [searchTerm, setSearchTerm] = useState(""); // Trạng thái searchTerm: Lưu từ khóa tìm kiếm theo tên sản phẩm
  const [statusFilter, setStatusFilter] = useState("all"); // Trạng thái statusFilter: Lưu trạng thái lọc (all, available, unavailable)
  const [displayedCustomers, setDisplayedCustomers] = useState([]); // Trạng thái displayedProducts: Lưu danh sách sản phẩm hiển thị trên trang hiện tại (sau phân trang)
  const [itemsPerPage, setItemsPerPage] = useState(6); // Trạng thái itemsPerPage: Số sản phẩm hiển thị trên mỗi trang, mặc định là 6
  const [currentPage, setCurrentPage] = useState(1); // Trạng thái currentPage: Trang hiện tại, mặc định là 1




  // Hàm loadProducts: Lấy danh sách sản phẩm từ server và cập nhật trạng thái
  const loadProducts = async () => {
    try {
      setIsLoading(true);
  
      const result = await fetchUsers();
      console.log("Raw result from API:", JSON.stringify(result, null, 2));
  
      if (!Array.isArray(result)) {
        console.error("Dữ liệu trả về không phải mảng.");
        setCustomers([]);
        setFilteredCustomers([]);
        setDisplayedCustomers([]);
        return;
      }
  
      const validCustomers = result.filter(
        (customer) =>
          customer &&
          typeof customer === "object" &&
          customer.fullName &&
          customer.email
      );
  
      const uniqueCustomers = Array.from(
        new Map(validCustomers.map((item) => [item.email, item])).values()
      );
  
      console.log("Số lượng người dùng tải được:", uniqueCustomers.length);
      setCustomers(uniqueCustomers);
      setFilteredCustomers(uniqueCustomers);
      setDisplayedCustomers(uniqueCustomers);
    } catch (error) {
      console.error("Không thể tải danh sách người dùng:", error);
      alert(`Không thể tải danh sách người dùng: ${error.message}`);
      setCustomers([]);
      setFilteredCustomers([]);
      setDisplayedCustomers([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEditProduct = (customer) => {
    if (customer.status === "unavailable") {
      // Kiểm tra nếu sản phẩm không khả dụng
      alert("Không thể chỉnh sửa sản phẩm có trạng thái 'unavailable'.");
      return;
    }
    setEditingProduct(customer); // Lưu thông tin sản phẩm cần chỉnh sửa
    setImagePreviews( customer.images); // Hiển thị preview ảnh của sản phẩm
    setShowEditModal(true); // Mở modal chỉnh sửa
  };


  // useEffect: Xử lý search, filter, sort
  useEffect(() => {
    let updatedCustomers = [...customers];
  
    // ✅ Lọc người dùng có role === 'user' trước
    updatedCustomers = updatedCustomers.filter(customer => customer.role === 'user');
  
    // 🔍 Search theo tên
    if (searchTerm) {
      updatedCustomers = updatedCustomers.filter(customer =>
        customer.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    // 📛 Filter theo role (chỉ khi bạn muốn thêm nhiều role hơn, nhưng hiện tại có vẻ bạn luôn muốn chỉ hiển thị 'user')
    if (statusFilter !== "all") {
      updatedCustomers = updatedCustomers.filter(customer => customer.role === statusFilter);
    }
  
    setFilteredCustomers(updatedCustomers);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, customers]);
  


  // useEffect: Xử lý pagination
  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage; // Tính chỉ số sản phẩm cuối cùng trên trang
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Tính chỉ số sản phẩm đầu tiên trên trang
    const currentItems = filteredCustomers.slice(
      indexOfFirstItem,
      indexOfLastItem
    ); // Cắt danh sách sản phẩm theo trang
    setDisplayedCustomers(currentItems); // Cập nhật danh sách hiển thị
  }, [filteredCustomers, currentPage, itemsPerPage]); // Chạy lại khi filteredProducts, currentPage, hoặc itemsPerPage thay đổi



    // useEffect: Kiểm tra đăng nhập và tải customers
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
    loadProducts()
  }, [navigate])

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage); // Tính số trang dựa trên filteredCustomers và itemsPerPage


  // Hàm paginate: Chuyển đến trang cụ thể
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  // Hàm nextPage: Chuyển đến trang tiếp theo
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));


  // Hàm prevPage: Quay lại trang trước
  const prevPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="h-svh flex flex-col justify-between ">
      <HeaderAdmin />
      <div >
        <SideBar />
        <SideCustomers
          isLoading={isLoading}

          setShowAddModal={setShowAddModal}
          customers={customers}
          filteredCustomers={filteredCustomers}
          displayedCustomers={displayedCustomers}
          nextPage={nextPage}
          prevPage={prevPage}
          paginate={paginate}
          currentPage={currentPage}
          totalPages={totalPages}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <Footer />



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
            setIsLoading={setIsLoading}
            setEditingProduct={setEditingProduct}
            setShowEditModal={setShowEditModal}
          />
        )}
    </div>
  )
}

export default AdminCustomer
