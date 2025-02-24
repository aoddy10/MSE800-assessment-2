import React from "react";

export const UserAvatar = ({ profileImageUrl, firstName, lastName }) => {
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
        <>
            {profileImageUrl ? (
                <img
                    src={profileImageUrl}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border"
                />
            ) : (
                <div
                    className={`w-10 h-10 flex items-center justify-center text-white text-lg font-bold rounded-full border ${getRandomColor()}`}
                >
                    {getInitials(firstName, lastName)}
                </div>
            )}
        </>
    );
};
