import React, { useState, useEffect } from "react";
import FeaturedCities from "./FeaturedCities";
import FeaturedRestaurants from "./featuredRestaurants";
import Banner from "./HomeBanner";
import { getCities } from "../../services/city.services";
import { getLocations, getRestaurants } from "../../services/location.services";
import { getActivity } from "../../services/location.services";
import FeaturedActivities from "./FeaturedActivities";

const HomePage = () => {
    const [cities, setCities] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [activities, setActivities] = useState([]);

    const [selectedCity, setSelectedCity] = useState("");
    const [selectedType, setSelectedType] = useState("");

    useEffect(() => {
        const fetch_city = async () => {
            try {
                const result = await getCities();
                setCities(result);
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

    const fetch_location_bycity = async (cityid, price) => {
        //const result =await getLocationByCityId(cityid);
        const restaurant = await getLocations(cityid, "restaurant", price);
        const activity = await getLocations(cityid, "activity", price);

        setRestaurants(restaurant);
        setActivities(activity);
        //console.log(type);

        // if (type==="restaurant")
        // {

        //    const  fresult=result.filter(f=> f.type==type);
        //    setRestaurants(fresult);
        // }
        // else if (type==="activity")
        // {

        //   const fresult=result.filter(f=> f.type==type);
        //   setActivities(fresult);

        // }
        // else
        // {
        //   //City only search option
        //   let query_pricevalue='';
        //   if(price)
        //     {
        //       query_pricevalue= "&&price_range=" & price;
        //     }

        //   const  rresult=result.filter(f=> f.type=="restaurant" + query_pricevalue);
        //   setRestaurants(rresult);
        //   const aresult=result.filter(f=> f.type=="activity" + query_pricevalue);
        //   setActivities(aresult);

        // }
    };

    const searchButtonClick = (city, type, price) => {
        setSelectedCity(city);
        setSelectedType(type);

        //if (city) {
        fetch_location_bycity(city, type, price);
        //}
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
