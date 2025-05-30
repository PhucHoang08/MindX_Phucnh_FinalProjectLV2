import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CartIconCard } from "../icon/CartIconCard";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

function ProductCard({ product }) {
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
      boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.15)",
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
      className="w-1/5 h-fit p-2 rounded-lg border-2 border-black bg-white"
    >
      <div className="w-full h-1/5">
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

        <div className="w-full h-1/2">
          <div className="w-full h-1/4">
            <a
              href={`/product/${product.id}`}
              className="text-4xl font-pramukhrounded text-black hover:!text-red-500 transition-all duration-300"
            >
              {product.name}
            </a>
          </div>

          <div className="flex flex-row items-center justify-between gap-2">
            <p className="text-2xl font-futura leading-tight text-gray-900">
            $ {product.price} USD
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

export default ProductCard;
