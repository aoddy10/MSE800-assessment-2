import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useScreenSize from "../hooks/useScreenSize";

import {
    getLocationByCityId,
    getLocationByLocationId,
    getReviews,
} from "../services/location.services";
import LocationCard from "../components/LocationCard";
import ReviewSection from "../components/ReviewSection";
import { Modal } from "../components/ui/modal";
import ReviewForm from "../components/forms/ReviewForm";
import AuthContext from "../context/AuthContext";

const LocationPage = () => {
    const { authUserInfo } = useContext(AuthContext);
    const { id } = useParams(); // Get location ID from URL
    const [location, setLocation] = useState([]);
    const [locations, setLocations] = useState([]);
    const [type, setType] = useState("");
    const [reviews, setReviews] = useState([]);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [activeTab, setActiveTab] = useState("description"); // Add tab state with default value
    const navigate = useNavigate();
    const { isMobile } = useScreenSize();

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
        fetch_reviews();
    }, [id]);

    const fetchLocationInfoByCityIDAndType = async (cityid, param) => {
        try {
            const result = await getLocationByCityId(cityid);
            if (param === "restaurant" || param === "activity") {
                const newLocation = result.filter(
                    (r) => r.type === param && r.id !== id
                );

                setLocations(newLocation);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetch_reviews = async () => {
        try {
            const result = await getReviews({ locationId: id, limit: 3 });
            setReviews(result);
        } catch (error) {}
    };

    const handleClick = (location) => {
        navigate(`/location/${location.id}`);
    };

    const handleReviewClick = () => {
        setShowReviewForm(true);
    };

    const handleCityClick = ({ location }) => {
        const paramValue = location.city;
        navigate(`/city/${paramValue}`);
    };

    return (
        <div
            className={`${isMobile ? "w-[90%]" : "w-[70%]"} mx-auto mt-[150px]`}
        >
            <div
                className={`w-full ${
                    isMobile ? "h-[300px]" : "h-[500px]"
                } rounded-xl overflow-hidden`}
            >
                <img
                    src={location.cover_image_url}
                    alt={location.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="mt-[50px]">
                <h1 className="text-2xl font-bold mb-6">{location.title}</h1>

                <div className={`flex ${isMobile ? "flex-col" : "gap-6"}`}>
                    {/* Left side - Tabs Container (70%) */}
                    <div className={`${isMobile ? "w-full" : "w-[70%]"}`}>
                        {/* Tabs */}
                        <div>
                            <nav className="flex space-x-2" aria-label="Tabs">
                                <button
                                    onClick={() => setActiveTab("description")}
                                    className={`${
                                        activeTab === "description"
                                            ? "border-[1px] border-[#31AAB7] text-[#31AAB7] bg-[#31AAB7] bg-opacity-25 focus:ring-1 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                            : "border-[1px] border-[#767676] text-[#767676] bg-none hover:bg-[#31AAB7] hover:bg-opacity-25 focus:ring-1 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                    }`}
                                >
                                    Overview
                                </button>
                                <button
                                    onClick={() => setActiveTab("contact")}
                                    className={`${
                                        activeTab === "contact"
                                            ? "border-[1px] border-[#31AAB7] text-[#31AAB7] bg-[#31AAB7] bg-opacity-25 focus:ring-1 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                            : "border-[1px] border-[#767676] text-[#767676] bg-none hover:bg-[#31AAB7] hover:bg-opacity-25 focus:ring-1 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                    }`}
                                >
                                    Contact Information
                                </button>
                            </nav>
                        </div>

                        {/* Tab Panels */}
                        <div className="mt-3">
                            {activeTab === "description" && (
                                <div className="flex flex-col flex-grow bg-none">
                                    <p className="text-gray-600">
                                        {location.description}
                                    </p>
                                </div>
                            )}

                            {activeTab === "contact" && (
                                <div className="flex flex-col flex-grow">
                                    <div className="mt-4 space-y-4">
                                        <div className="flex flex-col bold">
                                            <b>Telephone</b>
                                            {location.contact_phone}
                                        </div>
                                        <div className="flex flex-col bold">
                                            <b>Email</b>
                                            {location.contact_email}
                                        </div>
                                        <div className="flex flex-col bold">
                                            <b>Opening Hours</b>
                                            {location.open_hour_detail}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right side - Reviews Container (30%) */}
                    <div className={`${isMobile ? "w-full mt-6" : "w-[30%]"}`}>
                        <ReviewSection reviews={reviews} user={location.user} />

                        {authUserInfo && authUserInfo.role === "user" && (
                            <button
                                className="text-white bg-[#31AAB7] focus:ring-1 font-medium rounded-lg text-sm px-5 py-2.5 w-full mt-4"
                                onClick={handleReviewClick}
                            >
                                Write Review
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <section className="my-12">
                <h2
                    className="text-2xl font-bold mb-2"
                    style={{ cursor: "pointer", margin: 10 }}
                    onClick={() => handleCityClick({ location })}
                >
                    Browse Other {type} in {location.city_name}{" "}
                </h2>

                <div
                    className={`grid ${
                        isMobile ? "grid-cols-1" : "grid-cols-3"
                    } gap-6`}
                >
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
            {showReviewForm && (
                <Modal
                    title="Review Form"
                    onClose={() => setShowReviewForm(false)}
                >
                    <ReviewForm
                        locationId={id}
                        onClose={() => setShowReviewForm(false)}
                        onRefresh={fetch_reviews}
                    />
                </Modal>
            )}
        </div>
    );
};

export default LocationPage;
