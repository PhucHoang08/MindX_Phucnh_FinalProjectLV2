import React, { useEffect, useState, useRef } from "react";
import { fetchProducts } from "../../API/productAPI";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import gsap from "gsap";
import Skeleton from '@mui/material/Skeleton';
import NewProduct from "./NewProduct";
import SkeletonCard from "./SkeletonCard";

function ReadyToWear() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchProducts({ cache: "no-store" });
    
        const productsList = Array.isArray(result)
          ? result.flatMap(
              (item) =>
                item?.data?.filter(
                  (product) =>
                    product &&
                    typeof product === "object" &&
                    product.id &&
                    product.name &&
                    product.date // đảm bảo có ngày
                ) || []
            )
          : [];
    
        // Giảm trùng theo ID, ưu tiên sản phẩm có ngày mới hơn
        const productMap = new Map();
        productsList.forEach((product) => {
          const existing = productMap.get(product.id);
          if (!existing) {
            productMap.set(product.id, product);
          } else {
            const existingDate = new Date(existing.date);
            const currentDate = new Date(product.date);
            if (currentDate > existingDate) {
              productMap.set(product.id, product);
            }
          }
        });
    
        // Chuyển sang mảng, sort theo ngày mới nhất, lấy 5 cái đầu
        const latestProducts = Array.from(productMap.values())
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);
    
        setProducts(latestProducts);
      } catch (error) {
        console.error("Không thể tải sản phẩm:", error);
        alert("Không thể tải sản phẩm. Vui lòng thử lại sau.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (isLoading) {
    return (

      <section className=" antialiased mb-[20px] border-2 border-t-black border-b-black p-4">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <Skeleton variant="rounded" className="w-[320px] h-[100px] mb-[10px]" />
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={4}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 1 },
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <SwiperSlide key={index}>
                <SkeletonCard />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    );
  }


  if (!isLoading && products.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400">
        Không có sản phẩm nào để hiển thị.
      </div>
    );
  }

  return (
    <section  className=" antialiased mb-[20px] border-2 border-t-black border-b-black p-4">
      <div ref={cardRef} className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h1  className="font-futura text-5xl">READY-TO-WEAR</h1>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={4}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },

          }}
          className="w-auto h-fit py-4 px-2"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <NewProduct product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default ReadyToWear;

