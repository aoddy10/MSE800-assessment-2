import React, { useContext, useEffect } from "react";
import "../styles/NavigationWhite.css";
import logo from "../assets/logo-black.png";
import AuthContext from "../context/AuthContext";
import useLogout from "../hooks/useLogout";
import { getMe } from "../services/auth.service.s";

const NavigationMain = () => {
    const { token, authUserInfo, setAuthUserInfo } = useContext(AuthContext);
    const logout = useLogout();

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

        console.log(token);

        if (token) {
            fetchUser();
        }
    }, [token]);

    // random color
    const getRandomColor = () => {
        const colors = [
            "bg-red-500",
            "bg-blue-500",
            "bg-green-500",
            "bg-yellow-500",
            "bg-purple-500",
            "bg-pink-500",
            "bg-indigo-500",
            "bg-teal-500",
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    // get initial from first name and last name
    const getInitials = (firstName, lastName) => {
        return `${firstName?.charAt(0) || ""}${
            lastName?.charAt(0) || ""
        }`.toUpperCase();
    };

    return (
        <nav className="navbar-white">
            <div className="navbar-container flex items-center">
                <div className="navbar-logo">
                    <a href="/" className="flex items-center">
                        <img src={logo} alt="Kiwi Explorer Logo" />
                    </a>
                </div>

                <div className="navbar-links">
                    <a href="/explore" className="navbar-link-white">
                        EXPLORE
                    </a>
                    <a href="/about" className="navbar-link-white">
                        ABOUT
                    </a>
                    <a href="/maori" className="navbar-link-white">
                        MAORI
                    </a>
                    <a href="/contact" className="navbar-link-white">
                        CONTACT
                    </a>
                    {token && (
                        <>
                            {authUserInfo &&
                            ["admin", "business"].includes(
                                authUserInfo.role
                            ) ? (
                                <a
                                    href="/admin/locations"
                                    className="navbar-link-white"
                                >
                                    DASHBOARD
                                </a>
                            ) : (
                                authUserInfo &&
                                ["user"].includes(authUserInfo.role) && (
                                    <a
                                        href="/admin/profile"
                                        className="navbar-link-white"
                                    >
                                        PROFILE
                                    </a>
                                )
                            )}
                        </>
                    )}
                </div>

                {token ? (
                    <div>
                        {/* User Info & Logout */}
                        <div className="flex items-center gap-4">
                            {authUserInfo && (
                                <div className="flex items-center gap-2">
                                    {authUserInfo.profile_image_url ? (
                                        <img
                                            src={authUserInfo.profile_image_url}
                                            alt="User Avatar"
                                            className="w-10 h-10 rounded-full border"
                                        />
                                    ) : (
                                        <div
                                            className={`w-10 h-10 flex items-center justify-center text-white text-lg font-bold rounded-full border ${getRandomColor()}`}
                                        >
                                            {getInitials(
                                                authUserInfo.first_name,
                                                authUserInfo.last_name
                                            )}
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-sm">
                                            {authUserInfo.first_name}{" "}
                                            {authUserInfo.last_name}
                                        </p>
                                        <p className="text-xs opacity-80">
                                            {authUserInfo.email}
                                        </p>
                                    </div>
                                </div>
                            )}
                            <button
                                className=" bg-accent px-3 py-1 rounded"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="navbar-auth flex">
                        <a href="/register" className="navbar-link-white">
                            REGISTER
                        </a>
                        <hr className="auth-divider-white" />
                        <a href="/login" className="navbar-link-white">
                            LOGIN
                        </a>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavigationMain;
