import React from "react";

export const Input = ({
    name,
    label,
    value,
    onChange,
    type = "text",
    className = "",
}) => {
    return (
        <div className="mb-5">
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={`border rounded p-2 w-full focus:border-[#31aab7] focus:outline-none ${className}`}
            />
        </div>
    );
};
