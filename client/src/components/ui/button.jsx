import React from "react";

export const Button = ({
    children,
    onClick,
    variant = "primary",
    className = "",
}) => {
    const baseStyles = "px-4 py-2 rounded text-white font-semibold transition";
    const variants = {
        primary: "bg-blue-500 hover:bg-blue-600",
        destructive: "bg-red-500 hover:bg-red-600",
        secondary: "bg-gray-500 hover:bg-gray-600",
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
};
