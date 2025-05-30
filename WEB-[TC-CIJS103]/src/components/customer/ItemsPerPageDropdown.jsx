import React, { useState, useRef, useEffect } from "react";
import { ArrowDownIcon } from "../icon/ArrowDownIcon";

function ItemsPerPageDropdown({ itemsPerPage, setItemsPerPage, setCurrentPage }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    // Đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const options = [
        { value: 6, label: "6 ACCOUNTS" },
        { value: 9, label: "9 ACCOUNTS" },
        { value: 12, label: "12 ACCOUNTS" },
    ];

    const selectedLabel = options.find((o) => o.value === itemsPerPage)?.label || "6 PRODUCTS";

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            {/* Toggle button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-black bg-white shadow border-2 border-black hover:!border-red-500 hover:!text-red-500  font-futura rounded-lg text-sm px-4 py-2.5 inline-flex items-center transition-all duration-300"
            >
                {selectedLabel}
                <ArrowDownIcon className=" flex items-center" />
            </button>

            {/* Dropdown content */}
            {isOpen && (
                <div className="absolute z-10 mt-2 w-42 bg-white divide-y divide-gray-100 rounded-lg shadow ">
                    <ul className="py-2 text-sm text-gray-700 font-futura">
                        {options.map((option) => (
                            <li key={option.value}>
                                <button
                                    onClick={() => {
                                        setItemsPerPage(option.value);
                                        setCurrentPage(1); // Reset về trang 1
                                        setIsOpen(false);
                                    }}
                                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 "
                                >
                                    {option.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ItemsPerPageDropdown;
