import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { CartIconCard } from "../icon/CartIconCard";

function NewProduct({ product }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    const el = cardRef.current;

    gsap.fromTo(
      el,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse", // hoặc "restart none none none" nếu bạn muốn chạy mỗi lần xuất hiện
        },
      }
    );
  }, []);


  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      boxShadow: "none",
      duration: 0.3,
      ease: "power3.out",
    });
  };


  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className=" h-fit p-2 rounded-lg border-2 border-black bg-white"
    >
      <div className="h-1/5 w-full">
        <a href={`/product/${product.id}`}>
          <img
            loading="lazy"
            className="w-full h-2/3 rounded-lg"
            src={
              product.images?.[0] ||
              "https://via.placeholder.com/300x200?text=No+Image+Available"
            }
            alt={product.name}
            onError={(e) =>
            (e.target.src =
              "https://via.placeholder.com/300x200?text=Image+Not+Found")
            }
          />
        </a>

        {/* Các nút action và tooltip có thể tách tiếp hoặc giữ nguyên */}
        <div className="w-full h-1/2">

          <div className="w-full h-1/4">
            <a
              href={`/product/${product.id}`}
              className="text-3xl font-pramukhrounded text-gray-900 hover:!text-red-500 transition-all duration-300"
            >
              {product.name}
            </a>
          </div>

          <div className=" flex flex-row items-center justify-between gap-2">
            <p className="text-2xl font-futura leading-tight text-gray-900">
              $ {product.price.toLocaleString()} USD
            </p>
            <button
              onClick={() => navigate(`/product/${product.id}`)}
              className="inline-flex items-center rounded-lg font-medium text-black hover:!text-red-500 transition-all duration-300"
            >
              <CartIconCard />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default NewProduct;
