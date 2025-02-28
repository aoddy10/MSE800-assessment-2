import React, { useContext, useState, useRef, useEffect } from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo-white.png";
import AuthContext from "../context/AuthContext";
import useLogout from "../hooks/useLogout";
import { getMe } from "../services/auth.service.s";
import { UserAvatar } from "./UserAvatar";

const Navbar = () => {
    const { token, authUserInfo, setAuthUserInfo } = useContext(AuthContext);
    const logout = useLogout();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        // Fetch user details
        const fetchUser = async () => {
            try {
                const response = await getMe(token);
                setAuthUserInfo(response);
            } catch (error) {
                console.error("Failed to fetch user");
            }
        };

        if (token) {
            fetchUser();
        }
    }, [token, authUserInfo, setAuthUserInfo]);

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

                {token ? (
                    <div>
                        {/* User Info & Dropdown */}
                        <div className="relative min-w-max" ref={dropdownRef}>
                            {authUserInfo && (
                                <div 
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    <UserAvatar
                                        profileImageUrl={
                                            authUserInfo.profile_image_url
                                        }
                                        firstName={authUserInfo.first_name}
                                        lastName={authUserInfo.last_name}
                                    />
                                    <div>
                                        <p className="text-sm text-white">
                                            {authUserInfo.first_name}{" "}
                                            {authUserInfo.last_name}
                                        </p>
                                        <p className="text-xs text-white opacity-80">
                                            {authUserInfo.email}
                                        </p>
                                    </div>
                                </div>
                            )}
                            
                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 min-w-[75px] bg-gray-200/50 backdrop-blur-[1px] rounded-md shadow-lg py-2 px-2 z-50">
                                    <a
                                        href={authUserInfo && ["admin", "business"].includes(authUserInfo.role) 
                                            ? "/admin/locations" 
                                            : "/admin/profile"}
                                        className="block px-2 py-2 text-sm text-white hover:bg-[#f9f9fb] hover:text-[#232323] rounded-md"
                                    >
                                        {authUserInfo && ["admin", "business"].includes(authUserInfo.role) 
                                            ? "Dashboard" 
                                            : "Profile"}
                                    </a>
                                    <button
                                        onClick={logout}
                                        className="block w-full text-left px-2 py-2 text-sm text-white hover:bg-[#f9f9fb] hover:text-[#232323] rounded-md"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="navbar-auth flex">
                        <a href="/register" className="navbar-link">
                            REGISTER
                        </a>
                        <hr className="auth-divider" />
                        <a href="/login" className="navbar-link">
                            LOGIN
                        </a>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
