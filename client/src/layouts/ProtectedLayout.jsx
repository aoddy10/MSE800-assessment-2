import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import useLogout from "../hooks/useLogout";
import ActivitySection from "../components/ActivitySection";
import StatisticSection from "../components/StatisticSection";
import { getMe } from "../services/auth.service.s";

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
        },
        { name: "Cities", path: "/admin/cities", roles: ["admin"] },
        { name: "Users", path: "/admin/users", roles: ["admin"] },
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
            <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">
                {/* Logo */}
                <h1
                    className="text-xl font-bold bg-white/20 p-2 flex justify-center items-center"
                    onClick={() => navigate("/explore")}
                >
                    Kiwi explore
                </h1>

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
                        className="bg-red-500 px-3 py-1 rounded"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </nav>
        );
    };

    const Sidebar = () => {
        return (
            <aside className="w-60 bg-white shadow-md p-4">
                <h2 className="text-lg font-semibold mb-4">Menu</h2>
                <ul className="space-y-2">
                    {menuItems.map(
                        (item) =>
                            item.roles.includes(authUserInfo.role) && (
                                <li key={item.path}>
                                    <button
                                        onClick={() => {
                                            setSelectedMenu(
                                                item.name.toLowerCase()
                                            );
                                            navigate(item.path);
                                        }}
                                        className={`w-full text-left px-4 py-2 rounded ${
                                            selectedMenu ===
                                            item.name.toLowerCase()
                                                ? "bg-blue-500 text-white"
                                                : "hover:bg-gray-200"
                                        }`}
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            )
                    )}
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
                <main className="flex-grow p-4 flex flex-col gap-4 bg-white shadow-md bg-gray-50">
                    {/* Statistic section */}
                    <StatisticSection />

                    {/* Content area */}
                    <div className=" flex-grow bg-white shadow-md">
                        <Outlet />
                    </div>
                </main>

                {/* Activity Logs Section */}
                <aside className="w-60 bg-gray-200 p-4 shadow-md">
                    <ActivitySection />
                </aside>
            </div>

            {/* Footer */}
            <footer className="bg-blue-800 text-white text-center p-4">
                © 2024 MyApp. Dashboard.
            </footer>
        </div>
    );
};

export default ProtectedLayout;
