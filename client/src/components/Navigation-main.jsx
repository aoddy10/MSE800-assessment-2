import React from "react";
import "../styles/NavigationWhite.css";
import logo from "../assets/logo-black.png";

const NavigationMain = () => {
    return (
        <nav className="navbar-white">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <a href="/" className="flex items-center">
                        <img src={logo} alt="Kiwi Explorer Logo" />
                    </a>

                </div>

                <div className="navbar-links">
                    <a href="/explore" className="navbar-link-white">EXPLORE</a>
                    <a href="/about" className="navbar-link-white">ABOUT</a>
                    <a href="/maori" className="navbar-link-white">MAORI</a>
                    <a href="/contact" className="navbar-link-white">CONTACT</a>

                </div>

                <div className="navbar-auth flex">
                    <a href="/register" className="navbar-link-white">REGISTER</a>
                    <hr className="auth-divider-white" />
                    <a href="/login" className="navbar-link-white">LOGIN</a>

                </div>
            </div>
        </nav>
    );
};

export default NavigationMain;
