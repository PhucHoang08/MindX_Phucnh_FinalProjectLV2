import React, { useEffect, useState } from "react"; // Import hook useEffect và useState
import { Link, useNavigate, useParams } from "react-router-dom"; // Import useParams để lấy ID từ URL
import Header from "../Header"; // Import component Header
import Footer from "../Footer"; // Import component Header
import { fetchProducts } from "../../API/productAPI"; // Import hàm fetchProducts
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper và SwiperSlide
import { Pagination, Autoplay } from "swiper/modules"; // Import các module của Swiper
import "swiper/css"; // Import CSS cơ bản của Swiper
import "swiper/css/pagination"; // Import CSS cho pagination
import { CartIconCard } from "../icon/CartIconCard";
import { PlusIcon } from "../icon/PlusIcon";
import { XIcon } from "../icon/XIcon";
import { UpvoteIconCard } from "../icon/UpvoteIconCard";


const ProductDetail = () => {
  const navigate = useNavigate(); // Khởi tạo hook useNavigate
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const [product, setProduct] = useState(null); // Trạng thái lưu thông tin sản phẩm
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  const [recentProducts, setRecentProducts] = useState([]); // Trạng thái sản phẩm gần đây
  const [reviews, setReviews] = useState([]); // Trạng thái đánh giá
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setQuantity(1)
  }, [id]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true); // Bật trạng thái loading


        // Gọi API để lấy danh sách sản phẩm từ server
        const result = await fetchProducts({ cache: "no-store" });
        console.log("API Result:", result); // Log dữ liệu thô từ API để debug


        let productsList = [];
        if (Array.isArray(result)) {
          result.forEach((item) => {
            if (item && item.data && Array.isArray(item.data)) {
              const validProducts = item.data.filter(
                (product) =>
                  product &&
                  typeof product === "object" &&
                  product.id &&
                  product.name
              );
              productsList = productsList.concat(validProducts);
            }
          });
        }
        console.log("Products List:", productsList); // Log danh sách sản phẩm đã lọc


        // Tạo Map để ưu tiên sản phẩm có date mới nhất
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


        const uniqueProducts = Array.from(productMap.values());
        console.log("Unique Products:", uniqueProducts); // Log danh sách sản phẩm duy nhất


        const foundProduct = uniqueProducts.find((p) => p.id === id);
        console.log("Found Product:", foundProduct); // Log sản phẩm tìm thấy
        setProduct(foundProduct);


        // Sản phẩm gần đây (sort theo date giảm dần, lấy 3 sản phẩm)
        const recent = [...uniqueProducts]
          .filter((p) => p.id !== id)
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3);

        console.log("Recent Products:", recent); // Log sản phẩm gần đây
        setRecentProducts(recent);


        // Giả lập dữ liệu đánh giá
        setReviews([
          {
            id: 1,
            user: "Nguyen Van A",
            comment: "I love the comfort and the style plays a close second. I can go to the gym or head offshore on my boat in my slides. I'm glad I was able to grab a pair before everybody realizes these slides are amazing. I think they are true to size but like all slides your feet tend to swell a little but still felt they were spot on.",
            rating: 4,
          },
          {
            id: 2,
            user: "Tran Thi B",
            comment: "The spectacular design adds new age to comfort. Futuristic technology elevates this modern day slide. Dressed up or down Jordan keeps his hand on the pulse of women’s wear.",
            rating: 5,
          },
        ]);
      } catch (error) {
        console.error("Không thể tải sản phẩm:", error);
        alert("Không thể tải sản phẩm. Vui lòng thử lại sau.");
      } finally {
        setIsLoading(false); // Tắt trạng thái loading
      }
    };
    loadProduct(); // Gọi hàm tải sản phẩm
  }, [id]); // Chạy lại khi ID thay đổi

  useEffect(() => {
    if (product && product.images?.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  const handleQuantityChange = (change) => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity + change));
  };
  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = () => {
    if (!product) return;
    if (!selectedSize) {
      alert("Please select size before adding to cart!");
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item) => item.id === product.id && item.size === selectedSize);
    if (existingItem) {
      existingItem.quantity += quantity; // Tăng số lượng nếu đã có
    } else {
      cart.push({ ...product, quantity: quantity, size: selectedSize }); // Thêm mới với số lượng 1
    }

    navigate("/cart")
    localStorage.setItem("cart", JSON.stringify(cart)); // Lưu vào localStorage
  };

  // Hàm thêm sản phẩm vào danh sách yêu thích
  const addToFav = () => {
    if (!product) return; // Nếu không có sản phẩm thì không làm gì cả
    if (!selectedSize) {
      alert("Please select size before adding to favourite!");
      return;
    }
    // Lấy danh sách yêu thích hiện tại từ localStorage, hoặc mảng rỗng nếu chưa có
    const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");

    // Kiểm tra xem sản phẩm đã tồn tại trong danh sách yêu thích chưa (dựa trên ID)
    const existingItem = favourites.find((item) => item.id === product.id && product.size === selectedSize);

    if (existingItem) {
      // Nếu đã tồn tại, thông báo cho người dùng
      alert(`${product.name} IS ALREADY IN YOUR FAVOURITES!`);
    } else {
      // Nếu chưa tồn tại, thêm sản phẩm vào danh sách
      // Chúng ta chỉ cần lưu thông tin cơ bản hoặc cả object sản phẩm
      // Ở đây ta lưu cả object, tương tự như giỏ hàng nhưng không có quantity và size
      favourites.push({ ...product, size: selectedSize });
      // Lưu lại danh sách yêu thích vào localStorage
      localStorage.setItem("favourites", JSON.stringify(favourites));
      // Thông báo thành công
      alert(`${product.name} IS IN YOUR FAVOURITES!`);
      // Bạn có thể tùy chọn chuyển hướng đến trang yêu thích nếu muốn
      // navigate("/favourites"); 
    }
  };


  if (isLoading) {
    return (
      <div className="text-center mt-10 flex flex-col items-center justify-center">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <p className="mt-2 text-gray-600">LOADING...</p>
      </div>
    );
  }


  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-100 py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-600">PRODUCT DOESN'T EXISITS</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 mx-auto block"
            >
              BACK
            </button>
          </div>
        </div>
      </>
    );
  }


  return (
    <>
      <Header />
      <section className="w-full h-fit py-8 mt-[90px] bg-white md:py-16  antialiased">
        {/* main container */}
        <div className="max-w-screen-xl h-full px-4 mx-auto 2xl:px-0">
          <Link className="font-futura text-gray-400 text-2xl hover:!text-red-500 cursor-pointer transititon-all duration-300" to="/">{'<'} BACK TO HOME</Link>
          <div className="w-full h-full flex items-center flex-row justify-between ">
            {/* image product */}
            <div className="w-full h-full flex flex-row items-center justify-between ">
              <div className="w-1/2 p-1 flex flex-wrap flex-col justify-between gap-2.5 ">
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    className="cursor-pointer hover:!shadow shadow "
                    onClick={() => setSelectedImage(img)}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className={`border-2 border-black`} />
                  </div>
                ))}
              </div>

              <div className="w-full h-full pl-1.5">
                {selectedImage && (
                  <div className="w-full h-full shadow border-2 border-black">
                    <img src={selectedImage} alt="" />
                  </div>
                )}
              </div>
            </div>

            {/* description product */}
            <div className=" w-full h-full px-2 flex flex-col justify-between items-start">
              <h1 className="text-5xl font-futura text-black ">
                {product.name}
              </h1>
              <div className="mt-2 sm:items-center sm:gap-4 sm:flex">
                <p className="text-2xl font-futura text-black ">
                  PRICE: $ {product.price.toLocaleString()} USD
                </p>


                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i <
                          reviews.reduce((sum, r) => sum + r.rating, 0) /
                          reviews.length
                          ? "text-yellow-300"
                          : "text-gray-300"
                          }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                    (
                    {reviews.length > 0
                      ? (
                        reviews.reduce((sum, r) => sum + r.rating, 0) /
                        reviews.length
                      ).toFixed(1)
                      : "0.0"}
                    )
                  </p>
                  <a
                    href="#reviews"
                    className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                  >
                    {reviews.length} Reviews
                  </a>
                </div>
              </div>

              {/* Radio size */}
              <div className="w-1/2 h-fit flex flex-col items-start justify-between">
                <h3 className="text-lg font-futura font-medium text-black mt-4">SIZE</h3>
                <ul className="w-full flex flex-row items-start justify-between">
                  {["S", "M", "L", "XL"].map((size) => (
                    <li key={size} className="flex items-center justify-center">
                      <input
                        type="radio"
                        id={`size-${size}`}
                        name="size"
                        value={size}
                        className="hidden peer"
                        onChange={(e) => setSelectedSize(e.target.value)}
                      />
                      <label
                        htmlFor={`size-${size}`}
                        className="w-full h-full py-2 px-4 flex items-center justify-center font-futura text-xl text-gray-500 border-2 border-gray-500 rounded-full cursor-pointer peer-checked:border-red-500 peer-checked:text-red-600 hover:text-red-500 hover:border-red-500 transition-all duration-300"
                      >
                        {size}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="font-futura text-lg text-black mt-4">DESCRIPTION: </p>
              <p className="mb-6 text-gray-600 font-futura text-xl">

                {product.description ||
                  "NO DESCRIPTION AVAILABLE"}
              </p>


              {/* quantity */}
              <div className="w-1/3 h-1/3 flex flex-row items-center justify-between">
                <button
                  onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}
                  className="w-fit h-full cursor-pointer rounded-full p-2 border-2 border-black hover:!text-red-500 hover:!border-red-500 transition-all duration-300 ">
                  <XIcon />
                </button>

                <label className="w-1/5 h-full text-2xl font-futura flex items-center justify-center">
                  {quantity}
                </label>

                <button
                  onClick={() => handleQuantityChange(+1)}
                  className="w-fit h-full cursor-pointer rounded-full p-2 border-2 border-black hover:!text-red-500 hover:!border-red-500 transition-all duration-300 ">
                  <PlusIcon />
                </button>
              </div>


              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <button
                  onClick={addToCart}
                  className="text-white cursor-pointer font-futura bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5  flex items-center transition-all duration-300"
                >
                  <CartIconCard />
                  ADD TO CART
                </button>
                <button
                  onClick={addToFav}
                  className="text-white cursor-pointer font-futura bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm px-4 py-2.5  flex items-center transition-all duration-300"
                >
                  <UpvoteIconCard />
                  ADD TO FAVOURITE
                </button>
              </div>
            </div>


          </div>
        </div>
      </section>


      {/* Sản phẩm gần đây với Swiper cho từng sản phẩm */}
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 mt-10">
        <h4 className="text-3xl font-futura  text-black mb-4">
          YOU MIGHT ALSO LIKE
        </h4>
        {recentProducts.length > 0 ? (
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {recentProducts.map((p) => (
              <SwiperSlide key={p.id}>
                <div className=" w-full h-full border-2 border-black rounded-lg shadow  transition-all duration-300">
                  {p.images && p.images.length > 0 ? (
                    <Swiper
                      modules={[Pagination, Autoplay]}
                      spaceBetween={5}
                      slidesPerView={1}
                      pagination={{ clickable: true }}
                      autoplay={{ delay: 3000, disableOnInteraction: false }}
                      style={{ height: "500px" }}
                    >
                      {p.images.map((image, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={
                              image ||
                              "https://via.placeholder.com/300x200?text=Image+Not+Found"
                            }
                            alt={`${p.name} - ${index + 1}`}
                            className="w-full h-full rounded-lg p-2 object-cover"
                            onError={(e) =>
                            (e.target.src =
                              "https://via.placeholder.com/300x200?text=Image+Not+Found")
                            }
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <img
                      src="https://via.placeholder.com/300x200?text=No+Image+Available"
                      alt="No Image"
                      className="w-full h-80 object-cover"
                    />
                  )}
                  <div className="p-4 text-center">
                    <h5 className="text-lg font-futura text-black ">
                      {p.name}
                    </h5>
                    <p className="text-gray-600 font-futura">
                      PRICE: $ {p.price} USD
                    </p>
                    <button
                      onClick={() => navigate(`/product/${p.id}`)}
                      className="mt-2 font-futura bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                      DETAILS
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-gray-600">NO RECENT PRODUCTS</p>
        )}
      </div>



      {/* Đánh giá/Feedback */}
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 mt-10" id="reviews">
        <h4 className="text-3xl font-futura text-black mb-4">
          FEEDBACK
        </h4>
        {reviews.length > 0 ? (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li key={review.id} className="bg-gray-50 p-4 rounded-lg shadow">
                <p className="font-semibold text-gray-800">{review.user}</p>
                <p className="text-gray-600">{review.comment}</p>
                <p className="text-yellow-500">
                  {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Chưa có đánh giá nào.</p>
        )}
      </div>

      <Footer />
    </>
  );
};


export default ProductDetail; // Xuất component ProductDetail
