import React, { useContext, useEffect } from "react";
import "../styles/NavigationWhite.css";
import logo from "../assets/logo-black.png";
import AuthContext from "../context/AuthContext";
import useLogout from "../hooks/useLogout";
import { getMe } from "../services/auth.service.s";
import { UserAvatar } from "./UserAvatar";

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

        if (token) {
            fetchUser();
        }
    }, [token, authUserInfo, setAuthUserInfo]);

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
                                    <UserAvatar
                                        profileImageUrl={
                                            authUserInfo.profile_image_url
                                        }
                                        firstName={authUserInfo.first_name}
                                        lastName={authUserInfo.last_name}
                                    />
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
