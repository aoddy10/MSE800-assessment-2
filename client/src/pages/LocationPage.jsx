import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    getLocationByCityId,
    getLocationByLocationId,
} from "../services/location.services";
import LocationCard from "../components/LocationCard";

const LocationPage = () => {
    const { id } = useParams(); // Get location ID from URL
    const [location, setLocation] = useState([]);
    const [locations, setLocations] = useState([]);
    const [type, setType] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLocationInfo = async () => {
            try {
                const result = await getLocationByLocationId(id);
                setLocation(result);

                if (result) {
                    setType(result.type);
                    fetchLocationInfoByCityIDAndType(result.city, result.type);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchLocationInfo();
    }, [id]);

    const fetchLocationInfoByCityIDAndType = async (cityid, param) => {
        try {
            const result = await getLocationByCityId(cityid);
            if (param === "restaurant" || param === "activity") {
                const rresult = result.filter(
                    (r) => r.type === param && r.id !== id
                );

                setLocations(rresult);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = ({ location }) => {
        const paramValue = location.id;

        navigate(`/location/${paramValue}`);
    };

    return (
        <>
            {/* <div className="bg-gray-100 min-h-screen p-6"> */}
            <div className="container mx-auto p-6">
                {/* Banner Image */}
                <div className="w-full h-80 rounded-xl overflow-hidden">
                    <img
                        src={location.cover_image_url}
                        alt={location.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="bg-gray-100 p-6 flex flex-col lg:flex-row gap-3">
                    {/* Left Section */}

                    <div className="lg:w-2/3 bg-white p-6 rounded-xl shadow-lg">
                        <h1 className="text-2xl font-bold">{location.title}</h1>
                        <p className="text-gray-600 mt-2">
                            {location.description}
                        </p>
                    </div>

                    <div className="lg:w-1/3 bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-xl font-semibold">
                            Contact Information
                        </h2>
                        <div className="mt-4 space-y-4">
                            <div className="flex flex-col bold">
                                <b>Telephone</b>
                            </div>
                            <div className="flex flex-col">
                                {location.contact_phone}
                            </div>
                            <div className="flex flex-col bold">
                                <b>Email</b>
                            </div>
                            <div className="flex flex-col">
                                {location.contact_email}
                            </div>

                            <div className="flex flex-col bold">
                                <b>Opening Hours</b>
                            </div>
                            <div className="flex flex-col">
                                {location.open_hour_detail}
                            </div>
                        </div>
                    </div>
                </div>

                <section className="my-12">
                    <h2 className="text-2xl font-bold mb-2">
                        Browse Other {type} in {location.city_name}{" "}
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Cras iaculis consectetur nisi sagittis.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {locations && locations.length > 0
                            ? locations.map((location, index) => (
                                  <LocationCard
                                      key={`location-${location.id}`}
                                      location={location}
                                      onClick={handleClick}
                                  />
                              ))
                            : "No Data"}
                    </div>
                </section>
            </div>
        </>
    );
};

export default LocationPage;
