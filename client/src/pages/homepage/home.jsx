import React, { useState, useEffect } from "react";
import FeaturedCities from "./FeaturedCities";
import FeaturedRestaurants from "./featuredRestaurants";
import Banner from "./HomeBanner";
import { getCities } from "../../services/city.services";
import { getRestaurants } from "../../services/location.services";
import { getActivity } from "../../services/location.services";
import FeaturedActivities from "./FeaturedActivities";
import { getLocationByCityId } from "../../services/location.services";

const HomePage = () => {
    const [cities, setCities] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [activities, setActivities] = useState([]);

    const [selectedCity, setSelectedCity] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");

    useEffect(() => {
        const fetch_city = async () => {
            try {
                const result = await getCities();
                setCities(result);
                //console.log(result);
            } catch (error) {
                //setError(error);
            } finally {
                //setLoading(false);
            }
        };

        fetch_city();
    }, []);

    useEffect(() => {
        const fetch_restauarnts = async () => {
            const result = await getRestaurants();
            //console.log(result)
            setRestaurants(result);
        };

        fetch_restauarnts();
    }, []);

    useEffect(() => {
        const fetch_activities = async () => {
            const result = await getActivity();
            //console.log(result)
            setActivities(result);
        };

        fetch_activities();
    }, []);

    const fetch_location_bycity = async (cityid, type) => {
        const result = await getLocationByCityId(cityid);
        console.log(type);
        if (type === "restaurant") {
            const fresult = result.filter((f) => f.type == type);
            setRestaurants(fresult);
        } else if (type === "activity") {
            const fresult = result.filter((f) => f.type == type);
            setActivities(fresult);
        } else {
            //City only search option
            console.log("city only select option");
            const rresult = result.filter((f) => f.type == "restaurant");
            setRestaurants(rresult);
            const aresult = result.filter((f) => f.type == "activity");
            setActivities(aresult);
        }
    };

    const searchButtonClick = (city, type, price) => {
        setSelectedCity(city);
        setSelectedPrice(price);
        setSelectedType(type);

        if (city) {
            fetch_location_bycity(city, type);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
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
