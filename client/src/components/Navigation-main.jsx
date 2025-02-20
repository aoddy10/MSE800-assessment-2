import React from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo-black.png";

const NavigationMain = () => {
    return (
        <nav className=" text-text">
            <div className="flex justify-between items-center m-auto w-[70%] h-[50px]">
                <div className="w-[12vw]">
                    <a href="/" className="flex items-center">
                        <img src={logo} alt="Kiwi Explorer Logo" />
                    </a>
                </div>

                <div className="flex gap-5">
                    <a
                        href="/explore"
                        className=" text-text m-auto hover:text-primary transition-colors duration-300 ease-in-out"
                    >
                        EXPLORE
                    </a>
                    <a
                        href="/about"
                        className=" text-text m-auto hover:text-primary transition-colors duration-300 ease-in-out"
                    >
                        ABOUT
                    </a>
                    <a
                        href="/maori"
                        className=" text-text m-auto hover:text-primary transition-colors duration-300 ease-in-out"
                    >
                        MAORI INFO
                    </a>
                    <a
                        href="/contact"
                        className=" text-text m-auto hover:text-primary transition-colors duration-300 ease-in-out"
                    >
                        CONTACT
                    </a>
                </div>

                <div className="flex items-center">
                    <a
                        href="/register"
                        className=" text-text m-auto hover:text-primary transition-colors duration-300 ease-in-out"
                    >
                        REGISTER
                    </a>
                    <hr className="h-[15px] bg-secondary w-[2px] border-none mx-4" />
                    <a
                        href="/login"
                        className=" text-text m-auto hover:text-primary transition-colors duration-300 ease-in-out"
                    >
                        LOGIN
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default NavigationMain;
