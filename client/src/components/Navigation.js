import React from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo-white.png";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <a href="/" className="flex items-center">
                        <img src={logo} alt="Kiwi Explorer Logo" />
                    </a>
                </div>

                <div className="navbar-links">
                    <a href="/explore" className="navbar-link">
                        EXPLORE
                    </a>
                    <a href="/about" className="navbar-link">
                        ABOUT
                    </a>
                    <a href="/maori" className="navbar-link">
                        MAORI
                    </a>
                    <a href="/contact" className="navbar-link">
                        CONTACT
                    </a>
                </div>

                <div className="navbar-auth flex">
                    <a href="/register" className="navbar-link">
                        REGISTER
                    </a>
                    <hr className="auth-divider" />
                    <a href="/login" className="navbar-link">
                        LOGIN
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
