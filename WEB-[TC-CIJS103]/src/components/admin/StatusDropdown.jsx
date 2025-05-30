import React, { useState, useRef, useEffect } from "react";
import { ArrowDownIcon } from "../icon/ArrowDownIcon";

function StatusDropdown({ statusFilter, setStatusFilter }) {
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
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (value) => {
        setStatusFilter(value);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            {/* Button toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-black bg-white shadow border-2 border-black hover:!border-red-500 hover:!text-red-500  font-futura rounded-lg text-sm px-4 py-2.5 inline-flex items-center transition-all duration-300"
            >
                {statusFilter === "all"
                    ? "ALL STATE"
                    : statusFilter === "available"
                        ? "AVAILABLE"
                        : "UNAVAILABLE"}
                <ArrowDownIcon className=" flex items-center" />
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute z-10 mt-2 w-34 bg-white divide-y divide-gray-100 rounded-lg shadow ">
                    <ul className="py-2 text-sm text-gray-700  font-futura">
                        <li>
                            <button
                                onClick={() => handleSelect("all")}
                                className="block w-full px-4 py-2 text-left hover:!text-red-500 transition-all duration-200"
                            >
                                ALL STATE
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleSelect("available")}
                                className="block w-full px-4 py-2 text-left hover:!text-red-500 transition-all duration-200"
                            >
                                AVAILABLE
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleSelect("unavailable")}
                                className="block w-full px-4 py-2 text-left hover:!text-red-500 transition-all duration-200"
                            >
                                UNAVAILABLE
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default StatusDropdown;
