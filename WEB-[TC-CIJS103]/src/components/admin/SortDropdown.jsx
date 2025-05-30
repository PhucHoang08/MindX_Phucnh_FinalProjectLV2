import React, { useState, useRef, useEffect } from "react";
import { ArrowDownIcon } from "../icon/ArrowDownIcon";

function SortDropdown({ sortOption, setSortOption }) {
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

  const options = [
    { value: "", label: "DEFAULT" },
    { value: "price-asc", label: "PRICE: INCREASE" },
    { value: "price-desc", label: "PRICE: DECREASE" },
    { value: "date-asc", label: "DATE: OLDEST" },
    { value: "date-desc", label: "DATE: LASTEST" },
  ];

  const selectedLabel = options.find((o) => o.value === sortOption)?.label || "DEFAULT";

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Button toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="text-black bg-white shadow border-2 border-black hover:!border-red-500 hover:!text-red-500  font-futura rounded-lg text-sm px-4 py-2.5 inline-flex items-center transition-all duration-300"
      >
        {selectedLabel}
        <ArrowDownIcon className=" flex items-center"/>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow ">
          <ul className="py-2 text-sm text-gray-700 font-futura">
            {options.map((option) => (
              <li key={option.value}
              className="font-futura">
                <button
                  onClick={() => {
                    setSortOption(option.value);
                    setIsOpen(false);
                  }}
                  className="font-futura block w-full px-4 py-2 text-left hover:!text-red-500 transition-all duration-200"
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

export default SortDropdown;
