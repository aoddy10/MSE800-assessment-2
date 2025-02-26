import AuthContext from "../context/AuthContext";
import useLogout from "../hooks/useLogout";
import {
    ArrowLeftStartOnRectangleIcon,
    BuildingOffice2Icon,
    MapPinIcon,
    UserGroupIcon,
    UserIcon,
} from "@heroicons/react/24/solid";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

function AdminSidebar() {
    const { authUserInfo } = useContext(AuthContext);
    const navigate = useNavigate();
    const logout = useLogout();
    const [selectedMenu, setSelectedMenu] = useState(""); // Default menu

    useEffect(() => {
        // Set the default menu based on the user's role
        if (["admin", "business"].includes(authUserInfo.role)) {
            setSelectedMenu("locations");
            navigate("/admin/locations");
        } else {
            setSelectedMenu("profile");
            navigate("/admin/profile");
        }
    }, []);

    return (
        <aside className="w-60 h-full bg-white shadow-xl p-4">
            <h2 className="text-lg font-semibold mb-4">Menu</h2>
            <div className="space-y-2 w-full flex flex-col flex-grow">
                {menuItems.map(
                    (item) =>
                        item.roles.includes(authUserInfo.role) && (
                            <div className=" w-full" key={item.path}>
                                <button
                                    key={item.name}
                                    onClick={() => {
                                        setSelectedMenu(
                                            item.name.toLowerCase()
                                        );
                                        navigate(item.path); // Assuming navigate is properly defined
                                    }}
                                    className={` w-full text-left px-6 py-2 rounded flex gap-4 items-center ${
                                        selectedMenu === item.name.toLowerCase()
                                            ? "bg-[#232323] text-white" // Selected: Dark background, white text
                                            : "hover:bg-[#f9f9fb] hover:text-[#31AAB7]" // Default: Light hover background and text color change
                                    }`}
                                >
                                    {/* Icon */}
                                    <span
                                        className={`transition-all duration-200 ${
                                            selectedMenu ===
                                            item.name.toLowerCase()
                                                ? "text-white"
                                                : "text-[#767676]" // Make the icon smaller on hover and color change
                                        }`}
                                    >
                                        {item.icon}
                                    </span>

                                    {/* Item name */}
                                    <span
                                        className={` flex-grow ${
                                            selectedMenu ===
                                            item.name.toLowerCase()
                                                ? "text-white"
                                                : "text-[#767676]"
                                        }`}
                                    >
                                        {item.name}
                                    </span>
                                </button>
                            </div>
                        )
                )}

                <div className="py-4 border-b border-gray-300"></div>

                <div>
                    <button
                        className="w-full text-left px-6 py-2 rounded flex items-center text-red-500 hover:bg-[#f9f9fb]"
                        onClick={logout}
                    >
                        <ArrowLeftStartOnRectangleIcon className="mr-4 text-red-500 h-6 w-6" />
                        Logout
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default AdminSidebar;
