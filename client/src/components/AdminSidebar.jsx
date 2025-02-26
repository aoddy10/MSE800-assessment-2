import AuthContext from "../context/AuthContext";
import useLogout from "../hooks/useLogout";
import {
    ArrowLeftStartOnRectangleIcon,
    BuildingOffice2Icon,
    MapPinIcon,
    UserGroupIcon,
    UserIcon,
} from "@heroicons/react/24/solid";
import React, { useContext, useState } from "react";
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
    const [selectedMenu, setSelectedMenu] = useState("locations"); // Default menu

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
                                        setSelectedMenu(
                                            item.name.toLowerCase()
                                        );
                                        navigate(item.path); // Assuming navigate is properly defined
                                    }}
                                    className={`w-full text-left px-6 py-2 rounded flex items-center ${
                                        selectedMenu === item.name.toLowerCase()
                                            ? "bg-[#232323] text-white" // Selected: Dark background, white text
                                            : "hover:bg-[#f9f9fb] hover:text-[#31AAB7]" // Default: Light hover background and text color change
                                    }`}
                                >
                                    {/* Icon */}
                                    <span
                                        className={`mr-4 transition-all duration-200 ${
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
                                        className={`${
                                            selectedMenu ===
                                            item.name.toLowerCase()
                                                ? "text-white"
                                                : "text-[#767676]"
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
}

export default AdminSidebar;
