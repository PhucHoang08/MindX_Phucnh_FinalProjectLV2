import React from 'react'
import StatusDropdown from './StatusDropdown';
import SortDropdown from './SortDropdown';
import ItemsPerPageDropdown from './ItemsPerPageDropdown';

function FilterBar({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortOption,
    setSortOption,
    itemsPerPage,
    setItemsPerPage,
    setCurrentPage
}) {
    return (
        <div className="flex flex-wrap gap-4">
            {" "}
            {/* Nhóm các bộ lọc và sắp xếp */}
            {/* Ô tìm kiếm */}
            <input
                className="input text-sm font-futura rounded-lg p-2 border-2 border-black focus:outline-none focus:!border-red-500 placeholder-gray-400 transition-all duration-300 shadow"
                placeholder="LOOKING FOR..."
                value={searchTerm} // Giá trị từ trạng thái
                onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật trạng thái khi nhập
                required
                type="text"
            />

            {/* Dropdown lọc trạng thái */}
            <StatusDropdown statusFilter={statusFilter} setStatusFilter={setStatusFilter} />



            {/* Dropdown sắp xếp */}
            <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />

            {/* Dropdown chọn số sản phẩm mỗi trang */}
            <ItemsPerPageDropdown itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} setItemsPerPage={setItemsPerPage} />
        </div>
    )
}

export default FilterBar
