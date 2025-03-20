import React from "react";

function LocationCard({ location, onClick }) {
    return (
        <div
            className="group bg-none cursor-pointer flex flex-col gap-4 justify-between min-h-[375px]"
            onClick={() => onClick(location)}
        >
            <div className="flex flex-col gap-2">
                <div className="overflow-hidden rounded-xl shadow-md">
                    <img
                        src={location.cover_image_url}
                        alt={location.description}
                        onClick={() => onClick(location)}
                        className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                </div>

                <div className="flex flex-col mt-3">
                    <div className="flex justify-between">
                        <h3 className="text-lg font-semibold leading-normal">
                            {location.title}
                        </h3>
                        <div className="flex items-center gap-1 text-yellow-500 text-sm">
                            <span>⭐</span>
                            <span className="font-semibold">
                                {location.avg_rating.toFixed(1)}
                            </span>
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-normal">
                        {location.description}
                    </p>
                </div>
            </div>

            <div className="flex justify-between">
                <div className=" font-extrabold text-lg">
                    $ {location.price_per_person}
                </div>
                <button className="bg-[#31AAB7] hover:bg-[#2AA8B6] text-white text-sm py-2 px-2 rounded">
                    View Details
                </button>
            </div>
        </div>
    );
}

export default LocationCard;
