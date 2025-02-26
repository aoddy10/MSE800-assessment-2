import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import useLogout from "../hooks/useLogout";
import ActivitySection from "../components/ActivitySection";
import StatisticSection from "../components/StatisticSection";
import { getMe } from "../services/auth.service.s";
import { UserAvatar } from "../components/UserAvatar";
import { UserIcon, UserGroupIcon, BuildingOffice2Icon, MapPinIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";

// assets
import blackLogo from "../assets/logo-black.png";



const ProtectedLayout = () => {
    const { token, authUserInfo, setAuthUserInfo } = useContext(AuthContext);
    const [selectedMenu, setSelectedMenu] = useState("locations"); // Default menu  
    const logout = useLogout();
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
    }, [token, navigate]);

    // Access Control: Only `admin` can see all menus, `business` can see `Locations`
    const menuItems = [
        {
            name: "Locations",
            path: "/admin/locations",
            roles: ["admin", "business"],
            icon: <MapPinIcon className="h-6 w-6" />,
        },
        {
            name: "Cities",
            path: "/admin/cities",
            roles: ["admin"],
            icon: <BuildingOffice2Icon className="h-6 w-6" />,
        },
        {
            name: "Users",
            path: "/admin/users",
            roles: ["admin"],
            icon: <UserGroupIcon className="h-6 w-6" />,
        },
        {
            name: "Profile",
            path: "/admin/profile",
            roles: ["user", "admin", "business"],
            icon: <UserIcon className="h-6 w-6" />,
        },
    ];

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
                        cursor: 'pointer',
                        width: '10vw'
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

    const Sidebar = () => {
        return (
            <aside className="w-60 bg-white shadow-xl p-4">
                <h2 className="text-lg font-semibold mb-4">Menu</h2>
                <ul className="space-y-2">
                    {menuItems.map(
                        (item) =>
                            item.roles.includes(authUserInfo.role) && (
                                <li key={item.path}>
                                    <button
                                        key={item.name}
                                        onClick={() => {
                                            setSelectedMenu(item.name.toLowerCase());
                                            navigate(item.path); // Assuming navigate is properly defined
                                        }}
                                        className={`w-full text-left px-6 py-2 rounded flex items-center ${selectedMenu === item.name.toLowerCase()
                                            ? "bg-[#232323] text-white" // Selected: Dark background, white text
                                            : "hover:bg-[#f9f9fb] hover:text-[#31AAB7]" // Default: Light hover background and text color change
                                            }`}
                                    >
                                        {/* Icon */}
                                        <span
                                            className={`mr-4 transition-all duration-200 ${selectedMenu === item.name.toLowerCase()
                                                ? "text-white"
                                                : "text-[#767676]" // Make the icon smaller on hover and color change
                                                }`}
                                        >
                                            {item.icon}
                                        </span>

                                        {/* Item name */}
                                        <span
                                            className={`${selectedMenu === item.name.toLowerCase() ? "text-white" : "text-[#767676]"
                                                }`}
                                        >
                                            {item.name}
                                        </span>
                                    </button>




                                </li>
                            )
                    )}

                    <li className="py-4 border-b border-gray-300"></li>

                    <li>
                        <button
                            className="w-full text-left px-6 py-2 rounded flex items-center text-red-500 hover:bg-[#f9f9fb]"
                            onClick={logout}
                        >
                            <ArrowLeftStartOnRectangleIcon className="mr-4 text-red-500 h-6 w-6" />
                            Logout
                        </button>

                    </li>
                </ul>
            </aside>
        );
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Navbar */}
            <Navbar />

            {/* Main Content Layout */}
            <div className="flex flex-grow">
                {/* Sidebar */}
                <Sidebar />

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
