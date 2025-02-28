import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCityById } from "../services/city.services";
import { getLocationByCityId, getReviews } from "../services/location.services";
import LocationCard from "../components/LocationCard";
import ReviewSection from "../components/ReviewSection";

const CityPage = () => {
    const [selectedFilter, setSelectedFilter] = useState("All"); // New state for selected filter
    const { id } = useParams(); // Get city ID from URL
    const [city, setCity] = useState([]);
    const [locations, setLocations] = useState([]);
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch_cityinfo = async () => {
            try {
                const result = await getCityById(id);
                setCity(result);
            } catch (error) {
                console.log(error);
            }
        };

        fetch_cityinfo();
    }, [id]);

    useEffect(() => {
        const fetch_locationinfo = async () => {
            try {
                const result = await getLocationByCityId(id);
                setLocations(result);
            } catch (error) {
                console.log(error);
            }
        };

        fetch_locationinfo();
        fetch_reviews();
    }, [id]);

    const fetch_locationinfoByID = async (param) => {
        try {
            const result = await getLocationByCityId(id);
            if (param === "All") {
                setLocations(result);
            } else if (param === "restaurant" || param === "activity") {
                const newLocations = result.filter((r) => r.type === param);
                setLocations(newLocations);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetch_reviews = async () => {
        try {
            const result = await getReviews({ city: id, limit: 3 });
            setReviews(result);
        } catch (error) {
            console.log(error);
        }
    };

    const handlebuttonClick = (param) => {
        fetch_locationinfoByID(param);
        setSelectedFilter(param); // Update the selected filter state
    };

    const getButtonClassName = (param) => {
        return selectedFilter === param
            ? "border-[1px] border-[#31AAB7] text-[#31AAB7] bg-[#31AAB7] bg-opacity-25 focus:ring-1 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            : "border-[1px] border-[#767676] text-[#767676] bg-none hover:bg-[#31AAB7] hover:bg-opacity-25 focus:ring-1 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2";
    };

    const handleLocationCardClick = (location) => {
        navigate(`/location/${location.id}`);
    };

    return (
        <div className="bg-none p-0 m-0">
            <div className="w-[70%] mx-auto p-0 mt-[150px]">
                <div className="w-full h-[500px] rounded-xl overflow-hidden">
                    <img
                        src={city.image_url}
                        alt={city.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-0 flex flex-col lg:flex-row gap-3 mt-[50px]">
                    <div className="lg:w-2/3">
                        <h1 className="text-2xl font-bold">{city.title}</h1>
                        <p className="text-gray-600 mt-2">{city.description}</p>
                    </div>

                    <div className="flex-grow">
                        <ReviewSection reviews={reviews} />
                    </div>
                </div>
            </div>

            <section className="w-[70%] mx-auto p-0 mt-[50px]">
                <h2 className="text-2xl font-bold mb-2">
                    Things to do in {city.title}
                </h2>

                <div>
                    <button
                        onClick={() => handlebuttonClick("All")}
                        className={getButtonClassName("All")}
                    >
                        All Activities
                    </button>
                    <button
                        onClick={() => handlebuttonClick("restaurant")}
                        className={getButtonClassName("restaurant")}
                    >
                        Restaurants
                    </button>
                    <button
                        onClick={() => handlebuttonClick("activity")}
                        className={getButtonClassName("activity")}
                    >
                        Activities
                    </button>
                </div>
            </section>

            <section className="w-[70%] mx-auto p-0 mt-[20px] mb-[50px] min-h-[400px]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {locations && locations.length > 0
                        ? locations.map((location) => (
                            <LocationCard
                                key={`location-${location.id}`}
                                location={location}
                                onClick={handleLocationCardClick}
                            />
                        ))
                        : "No Data"}
                </div>
            </section>
        </div>
    );
};

export default CityPage;
