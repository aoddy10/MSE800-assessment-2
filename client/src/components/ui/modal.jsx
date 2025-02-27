import React from "react";

export const Modal = ({ title, children, onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-[90%] md:w-1/3 max-h-[90%] overflow-auto">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <div className="mb-3 overflow-auto">{children}</div>
                <div className="flex w-full gap-2">
                    <button
                        className="px-4 py-2 w-full text-red-500 rounded hover:bg-red-50"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    {onConfirm && (
                        <button
                            className="px-4 py-2 w-full bg-[#31AAB7] rounded text-white"
                            onClick={onConfirm}
                        >
                            Confirm
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
