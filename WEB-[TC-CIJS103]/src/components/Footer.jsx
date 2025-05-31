import React from "react";
import { Link } from 'react-router-dom';
import { FacebookIcon } from "./icon/FacebookIcon";
import { InstagramIcon } from "./icon/InstagramIcon";
import { TwitterIcon } from "./icon/TwitterIcon";
import { DiscordIcon } from "./icon/DiscordIcon";

function Footer() {
    return (
        <div className='w-screen h-80 bg-black flex flex-row justify-center items-center mt-8'>
            <div className="w-5/6 h-full flex flex-row justify-between items-center ">

                <div className="w-1/2 h-full flex flex-col justify-center">
                    {/* Logo */}
                    <Link to="/" className="w-full flex ">
                        <span className="text-5xl text-red-500 font-maxtield whitespace-nowrap">Street-Commerce</span>
                    </Link>
                    <h1 className="w-full text-white text-2xl font-futura">
                        LIFE ISN'T PERFECT
                        <br />
                        BUT YOUR OUTFIT CAN BE
                    </h1>
                    <div className="w-full h-fit flex flex-row gap-2 items-center mt-[20px]">
                        <FacebookIcon className="cursor-pointer" />
                        <InstagramIcon className="cursor-pointer" />
                        <TwitterIcon className="cursor-pointer" />
                        <DiscordIcon className="cursor-pointer" />
                    </div>
                </div>
                <div className="w-1/2 h-full flex flex-col items-start justify-center text-white font-futura text-2xl">
                    <h1>
                        Email: streetcommerce@gmail.com
                    </h1>
                    <h1>
                        Phone: 0906785477
                    </h1>
                </div>
                <div className="w-1/2 h-1/4 font-futura text-2xl flex flex-col justify-between items-end ">
                    <Link to="/" className=" no-underline text-white hover:!text-red-500  transition-all duration-300">HOME</Link>
                    <Link to="/about-us" className="no-underline text-white hover:!text-red-500 transition-all duration-300">ABOUT</Link>
                </div>

            </div>
        </div>
    )
}

export default Footer
