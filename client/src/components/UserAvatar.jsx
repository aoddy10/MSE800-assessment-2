import React from "react";

export const UserAvatar = ({
    profileImageUrl,
    firstName,
    lastName,
    size = "md",
}) => {
    // Generate a deterministic color based on initials
    const getDeterministicColor = (name) => {
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
        const charCode = name
            ? name.charCodeAt(0) + (name.charCodeAt(1) || 0)
            : 0;
        return colors[charCode % colors.length];
    };

    // get initial from first name and last name
    const getInitials = (firstName, lastName) => {
        return `${firstName?.charAt(0) || ""}${
            lastName?.charAt(0) || ""
        }`.toUpperCase();
    };

    // Define size classes
    const sizeClasses = {
        sm: "w-6 h-6 text-sm",
        md: "w-10 h-10 text-base",
        lg: "w-14 h-14 text-lg",
        xl: "w-20 h-20 text-xl",
    };

    const initials = getInitials(firstName, lastName);
    const backgroundColor = getDeterministicColor(initials);

    return (
        <>
            {profileImageUrl ? (
                <img
                    src={profileImageUrl}
                    alt="User Avatar"
                    className={`${
                        sizeClasses[size] || sizeClasses.md
                    } rounded-full border`}
                />
            ) : (
                <div
                    className={`${
                        sizeClasses[size] || sizeClasses.md
                    } flex items-center justify-center text-white font-bold rounded-full border ${backgroundColor}`}
                >
                    {initials}
                </div>
            )}
        </>
    );
};
