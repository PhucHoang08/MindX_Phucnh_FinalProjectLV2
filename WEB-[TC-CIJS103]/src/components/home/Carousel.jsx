import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import Carousel1 from "../../image/Carousel5.jpg";
import Carousel2 from "../../image/Carousel6.jpg";
import Carousel3 from "../../image/Carousel33.jpg";
import Carousel4 from "../../image/Carousel44.jpg";
import { Link } from 'react-router-dom';

function CarouselSlide() {
    return (
        <div className="mb-[100px] h-[880px] flex flex-col justify-center relative">
            <Carousel data-bs-theme="light" className='w-full h-[880px]'>

                <Carousel.Item className='w-full h-[880px] relative'>
                    {/* Hai ảnh nằm hai bên */}
                    <img className='w-1/2 h-[880px] object-cover absolute left-0 top-0' src={Carousel1} alt="" />
                    <img className='w-1/2 h-[880px] object-cover absolute right-0 top-0' src={Carousel2} alt="" />
                    {/* Div chính giữa đè lên */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-fit h-full flex flex-col justify-center items-center z-10 text-center px-8">
                        <h1 className='font-futura text-[80px] text-white font-bold leading-tight'>
                            FOR EVERYONE<br />BUT NOT ANYONE
                        </h1>
                    </div>
                    {/* Caption nếu muốn dùng */}
                    <Carousel.Caption />
                </Carousel.Item>

                <Carousel.Item className='w-full h-[880px] relative'>
                    {/* Hai ảnh nằm hai bên */}
                    <img className='w-full h-[880px] object-cover absolute left-0 top-0' src={Carousel3} alt="" />

                    {/* Div chính giữa đè lên */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-fit h-full flex flex-col justify-center items-center z-10 text-center px-8">
                        <h1 className='font-futura text-[80px] text-white font-bold leading-tight'>
                            FOR EVERYONE<br />BUT NOT ANYONE
                        </h1>
                    </div>
                    {/* Caption nếu muốn dùng */}
                    <Carousel.Caption />
                </Carousel.Item>

                <Carousel.Item className='w-full h-[880px] relative'>
                    {/* Hai ảnh nằm hai bên */}
                    <img className='w-full h-[880px] object-cover absolute left-0 top-0' src={Carousel4} alt="" />
                    {/* Div chính giữa đè lên */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-fit h-full flex flex-col justify-center items-center z-10 text-center px-8">
                        <h1 className='font-futura text-[80px] text-white font-bold leading-tight'>
                            FOR EVERYONE<br />BUT NOT ANYONE
                        </h1>
                    </div>
                    {/* Caption nếu muốn dùng */}
                    <Carousel.Caption />
                </Carousel.Item>
                
            </Carousel>
        </div>
    );
}

export default CarouselSlide;
