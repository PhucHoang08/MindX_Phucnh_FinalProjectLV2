import React, { useState, useEffect, useRef } from 'react';
import { UsersIcon } from '../icon/UsersIcon';
import { CartIconCard } from '../icon/CartIconCard';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  // Ref tới từng nút icon
  const menuRef = useRef(null);
  const itemRefs = useRef([]);

  // Reset mảng ref trước mỗi render
  itemRefs.current = [];

  const addToRefs = (el) => {
    if (el && !itemRefs.current.includes(el)) {
      itemRefs.current.push(el);
    }
  };

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        itemRefs.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
    }
  }, [isOpen]);

  return (
    <div className="fixed mt-[90px] top-6 start-6 ">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center justify-center text-white bg-blue-600 rounded-full w-14 h-14 hover:bg-blue-800 transition-all duration-300"
      >
        <svg className="w-5 h-5 transition-transform group-hover:rotate-45" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
        </svg>
        <span className="sr-only">Open actions menu</span>
      </button>

      <div
        id="speed-dial-menu-top-left"
        ref={menuRef}
        className={`flex flex-col items-center mt-4 space-y-2 transition-all duration-300 ${
          isOpen ? '' : 'hidden'
        }`}
      >
        <div className="relative group transition-all duration-300" ref={addToRefs}>
          <Link to="/admin/customers" className="flex justify-center items-center w-[52px] h-[52px] text-black hover:!border-blue-500 hover:!text-blue-500 bg-white rounded-full border-2 border-black transititon-all duration-300">
            <UsersIcon />
            <span className="sr-only">CUSTOMERS</span>
          </Link>
        </div>

        <div className="relative group transition-all duration-300" ref={addToRefs}>
          <Link to="/admin/products" className="flex justify-center items-center w-[52px] h-[52px] text-black hover:!border-blue-500 hover:!text-blue-500 bg-white rounded-full border-2 border-black transititon-all duration-300">
            <CartIconCard/>
            <span className="sr-only">PRODUCTS</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideBar;