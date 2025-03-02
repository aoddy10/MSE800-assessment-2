import React from "react";

const Skeleton = () => {
    return (
        <div className="flex w-full flex-shrink-0 gap-8">
            <div className="rounded w-1/3 min-h-[390px]">
                <div className="relative w-full h-[300px] bg-gray-200 animate-pulse mb-6 rounded-lg"></div>
                <div className="w-[85%] h-6 bg-gray-200 rounded-full mb-6 animate-pulse "></div>
                <div className="w-full h-3 bg-gray-200 rounded-full mb-3 animate-pulse "></div>
                <div className="w-[70%] h-3 bg-gray-200 rounded-full mb-3 animate-pulse "></div>
            </div>
            
            <div className="rounded w-1/3 min-h-[390px]">
                <div className="relative w-full h-[300px] bg-gray-200 animate-pulse mb-6 rounded-lg"></div>
                <div className="w-[85%] h-6 bg-gray-200 rounded-full mb-6 animate-pulse "></div>
                <div className="w-full h-3 bg-gray-200 rounded-full mb-3 animate-pulse "></div>
                <div className="w-[70%] h-3 bg-gray-200 rounded-full mb-3 animate-pulse "></div>
            </div>

            <div className="rounded w-1/3 min-h-[390px]">
                <div className="relative w-full h-[300px] bg-gray-200 animate-pulse mb-6 rounded-lg"></div>
                <div className="w-[85%] h-6 bg-gray-200 rounded-full mb-6 animate-pulse "></div>
                <div className="w-full h-3 bg-gray-200 rounded-full mb-3 animate-pulse "></div>
                <div className="w-[70%] h-3 bg-gray-200 rounded-full mb-3 animate-pulse "></div>
            </div>
        </div>

    );
};

export default Skeleton;