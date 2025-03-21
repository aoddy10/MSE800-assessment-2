import React, { useState, useEffect } from "react";
import FeaturedCities from "./FeaturedCities";
import FeaturedRestaurants from "./FeaturedRestaurants";

import Banner from "./HomeBanner";
import { getCities } from "../../services/city.services";
import { getLocations } from "../../services/location.services";
import FeaturedActivities from "./FeaturedActivities";

const HomePage = () => {
    const [cities, setCities] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [activities, setActivities] = useState([]);

    const [selectedCity, setSelectedCity] = useState("");
    const [selectedType, setSelectedType] = useState("");

    useEffect(() => {
        fetchCity();
        fetchLocations();
    }, []);

    const fetchCity = async () => {
        try {
            const result = await getCities();
            setCities(result);
        } catch (error) {
            //setError(error);
        } finally {
            //setLoading(false);
        }
    };

    const fetchLocations = async (cityId = null, price = null) => {
        // update restaurants
        const newRestaurants = await getLocations({
            cityId: cityId,
            type: "restaurant",
            priceRange: price,
        });
        setRestaurants(newRestaurants);
        // update activities
        const newActivities = await getLocations({
            cityId: cityId,
            type: "activity",
            priceRange: price,
        });
        setActivities(newActivities);
    };

    const searchButtonClick = (city, type, price) => {
        setSelectedCity(city);
        setSelectedType(type);

        fetchLocations(city, price);
    };

    return (
        <div className="px-0">
            <Banner cities={cities} onSearchClick={searchButtonClick} />
            {!selectedCity && <FeaturedCities cities={cities} />}

            {!selectedType ? (
                <>
                    <FeaturedRestaurants restaurants={restaurants} />{" "}
                    <FeaturedActivities activities={activities} />
                </>
            ) : selectedType === "restaurant" ? (
                <FeaturedRestaurants restaurants={restaurants} />
            ) : (
                <FeaturedActivities activities={activities} />
            )}
        </div>
    );
};

export default HomePage;
