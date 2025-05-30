import React, { useEffect, useState, useRef } from "react";
import { fetchProducts } from "../../API/productAPI";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import Skeleton from '@mui/material/Skeleton';
import gsap from "gsap";

function AllProducts() {
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
                                    product.name
                            ) || []
                    )
                    : [];

                const productMap = new Map();
                productsList.forEach((product) => {
                    const existingProduct = productMap.get(product.id);
                    if (!existingProduct) {
                        productMap.set(product.id, product);
                    } else {
                        const existingDate = new Date(
                            existingProduct.date.replace("thg", "tháng")
                        );
                        const newDate = new Date(product.date.replace("thg", "tháng"));
                        if (newDate > existingDate) {
                            productMap.set(product.id, product);
                        }
                    }
                });

                setProducts(Array.from(productMap.values()));
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
            <div className="w-full h-fit flex flex-col justify-center items-center ">

                <div className="w-full h-fit flex flex-col justify-between items-center">

                    <Skeleton variant="rounded" className="w-[320px] h-[150px] mb-[10px]" />

                    <div className="w-full h-fit flex flex-wrap  flex-row items-center px-16 gap-4 justify-center">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}

                    </div>
                </div>

            </div>


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
        <div  className="w-full h-fit flex flex-col justify-center items-center ">
            <div  ref={cardRef} className="w-full h-fit flex flex-col justify-between items-center">

                <h1  className="font-futura text-5xl text-black mb-[30px]">ALL PRODUCTS</h1>

                <div className="w-full h-fit flex flex-wrap  flex-row items-center px-6 gap-4 justify-center">

                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}

                </div>
            </div>
        </div>
    )
}

export default AllProducts
