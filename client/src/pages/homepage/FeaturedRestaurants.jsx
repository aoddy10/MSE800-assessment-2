import LocationCard from "../../components/LocationCard";
import React from "react";
import { useNavigate } from "react-router-dom";

const FeaturedRestaurants = ({ restaurants }) => {
    const navigate = useNavigate();

    const handleRestaurantClick = (restaurant) => {
        navigate(`/location/${restaurant.id}`);
    };

    return (
        <section className="my-12">
            <h2 className="text-2xl font-bold mb-2">
                Featured restaurants
            </h2>
            

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {restaurants && restaurants.length > 0
                    ? restaurants.map((restaurant) => (
                          <LocationCard
                              key={`restaurant-${restaurant.id}`}
                           
                              location={restaurant}
                              onClick={handleRestaurantClick}
                          />
                      ))
                    : "No Data"}
            </div>
        </section>
    );
};

export default FeaturedRestaurants;
