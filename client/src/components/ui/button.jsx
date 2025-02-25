import React from "react";
import { TrashIcon, PencilSquareIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";

export const Button = ({
    children,
    onClick,
    variant = "primary",
    className = "",
    icon,
}) => {
    const baseStyles = "py-2 rounded transition focus:outline-none flex items-center";
    const variants = {
        primary: "bg-blue-500 hover:bg-blue-600 text-white",
        destructive: "text-red-500",
        secondary: "bg-gray-500 hover:bg-gray-600 text-white",
        outline: "border border-gray-300 hover:bg-gray-100 text-gray-700",
        edit: "text-[#31AAB7]",
        upload: "px-2 text-[#31AAB7] border border-[#31AAB7]",
    };

    const iconStyles = "mr-2 h-5 w-5";

    let content = children;
    let buttonClassName = `${baseStyles} ${variants[variant]} ${className}`;

    if (variant === "destructive") {
        content = (
            <>
                <TrashIcon className={`text-red-500 ${iconStyles}`} />
                <span>{children}</span>
            </>
        );
    } else if (variant === "edit") {
        content = (
            <>
                <PencilSquareIcon className={`text-[#31AAB7] ${iconStyles}`} />
                <span>{children}</span>
            </>
        );
    } else if (variant === "upload") {
        content = (
            <>
                <ArrowUpTrayIcon className={`text-[#31AAB7] ${iconStyles}`} />
                <span>{children}</span>
            </>
        );
    } else if (icon) {
        content = (
            <>
                {icon}
                <span>{children}</span>
            </>
        );
    }

    if (variant !== "destructive" && variant !== "edit" && variant !== "upload") {
        buttonClassName = `${baseStyles} px-4 ${variants[variant]} ${className}`;
    }

    return (
        <button onClick={onClick} className={buttonClassName}>
            {content}
        </button>
    );
};