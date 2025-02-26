import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";

import ActivitySection from "../components/ActivitySection";
import StatisticSection from "../components/StatisticSection";
import { getMe } from "../services/auth.service.s";
import { UserAvatar } from "../components/UserAvatar";

// assets
import blackLogo from "../assets/logo-black.png";
import AdminSidebar from "../components/AdminSidebar";

const ProtectedLayout = () => {
    const { token, authUserInfo, setAuthUserInfo } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) navigate("/login");

        // Fetch user details
        const fetchUser = async () => {
            try {
                const response = await getMe(token);
                setAuthUserInfo(response);
            } catch (error) {
                console.error("Failed to fetch user");
            }
        };

        fetchUser();
    }, [token, navigate, setAuthUserInfo]);

    // Show loading state while checking token
    if (!authUserInfo) {
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    }

    // Redirect to login if no valid token
    if (!token) {
        return <Navigate to="/login" />;
    }

    const Navbar = () => {
        return (
            <nav className="p-6 flex justify-between items-center bg-white border-b border-gray-200">
                {/* Logo */}
                <img
                    src={blackLogo}
                    alt="Kiwi Explorer Logo"
                    onClick={() => navigate("/explore")}
                    style={{
                        cursor: "pointer",
                        width: "10vw",
                    }}
                />

                {/* User Info & Logout */}
                <div className="flex items-center gap-4">
                    {authUserInfo && (
                        <div className="flex items-center gap-2">
                            <UserAvatar
                                profileImageUrl={authUserInfo.profile_image_url}
                                firstName={authUserInfo.first_name}
                                lastName={authUserInfo.last_name}
                            />
                            <div>
                                <p className="text-sm font-bold">
                                    {authUserInfo.first_name}{" "}
                                    {authUserInfo.last_name}
                                </p>
                                <p className="text-xs opacity-80">
                                    {authUserInfo.email}
                                </p>
                            </div>
                        </div>
                    )}
                    {/* <button
                        className=" bg-accent px-3 py-1 rounded"
                        onClick={logout}
                    >
                        Logout
                    </button> */}
                </div>
            </nav>
        );
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Navbar */}
            <Navbar user={authUserInfo} />

            {/* Main Content Layout */}
            <div className="flex flex-grow">
                {/* Sidebar */}
                <AdminSidebar user={authUserInfo} />

                {/* Main Content Area */}
                <main className="flex-grow p-4 flex flex-col gap-4 bg-[#f9f9fb]">
                    {/* Statistic section */}
                    {["admin", "business"].includes(authUserInfo.role) && (
                        <StatisticSection />
                    )}

                    {/* Content area */}
                    <div className=" flex-grow bg-white shadow-md">
                        <Outlet />
                    </div>
                </main>

                {/* Activity Logs Section */}
                {["admin"].includes(authUserInfo.role) && (
                    <aside className="w-60 bg-white p-4 shadow-xl">
                        <ActivitySection />
                    </aside>
                )}
            </div>

            {/* Footer */}
            <footer className="bg-[#232323] text-white text-center text-sm p-4">
                © 2025 Kiwi Explorer.
            </footer>
        </div>
    );
};

export default ProtectedLayout;
