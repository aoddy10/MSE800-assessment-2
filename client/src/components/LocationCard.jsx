import React from "react";

function LocationCard({ location, onClick }) {
    return (
        <div
            className="bg-white rounded-lg shadow-lg p-4 cursor-pointer flex flex-col gap-2"
            onClick={() => onClick(location)}
        >
            <img
                src={location.cover_image_url}
                alt={location.description}
                onClick={() => onClick(location)}
                className="w-full h-48 object-cover rounded-lg"
            />
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{location.title}</h3>
                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    <span className="font-semibold">{location.avg_rating}</span>
                    <span>⭐</span>
                </div>
            </div>
            <p className="text-gray-600 text-sm">{location.description}</p>
            <div>
                <div className=" font-extrabold text-lg">
                    $ {location.price_per_person}
                </div>
            </div>
        </div>
    );
}

export default LocationCard;
