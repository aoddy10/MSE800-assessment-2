import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCityById } from "../services/city.services";
import { getLocationByCityId, getReviews } from "../services/location.services";
import LocationCard from "../components/LocationCard";
import ReviewSection from "../components/ReviewSection";

const CityPage = () => {
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
                //console.log(result);
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
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        };

        fetch_locationinfo();
        fetch_reviews();
    }, [id]);

    const fetch_locationinfoByID = async (param) => {
        try {
            console.log(id);
            const result = await getLocationByCityId(id);
            console.log(result);
            if (param === "All") {
                //console.log('All');
                setLocations(result);
            } else if (param === "restaurant" || param === "activity") {
                //console.log(param);
                const newLocations = result.filter((r) => r.type === param);
                setLocations(newLocations);
            }
        } catch (error) {
            console.log(error);
        }
    };

    
    const fetch_reviews = async () => {
        try {
            const result = await getReviews({city:id,limit:3})
           
            setReviews(result);
        } catch (error) {
            
        }
    }

    const handlebuttonClick = (param) => {
        fetch_locationinfoByID(param);
    };

    const handleLocationCardClick = (location) => {
        navigate(`/location/${location.id}`);
    };

    return (
        <>
            {/* <div className="bg-gray-100 min-h-screen p-6"> */}
            <div className="container mx-auto p-6">
                {/* Banner Image */}
                <div className="w-full h-80 rounded-xl overflow-hidden">
                    <img
                        src={city.image_url}
                        alt={city.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="bg-gray-100 p-6 flex flex-col lg:flex-row gap-3">
                    {/* Left Section */}

                    <div className="lg:w-2/3 bg-white p-6 rounded-xl shadow-lg">
                        <h1 className="text-2xl font-bold">{city.title}</h1>
                        <p className="text-gray-600 mt-2">{city.description}</p>
                    </div>

                    {/* Right Section - Reviews */}
                    <ReviewSection reviews={reviews}/>
                </div>

                <section className="my-12">
                    <h2 className="text-2xl font-bold mb-2">
                        Things to do in {city.title}
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Cras iaculis consectetur nisi sagittis.
                    </p>
                    <div>
                        <button
                            onClick={() => handlebuttonClick("All")}
                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            All Activities
                        </button>
                        <button
                            onClick={() => handlebuttonClick("restaurant")}
                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            Restaurants
                        </button>
                        <button
                            onClick={() => handlebuttonClick("activity")}
                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            Activities
                        </button>
                    </div>
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
        </>
    );
};

export default CityPage;
