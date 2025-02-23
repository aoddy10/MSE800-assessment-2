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
                This is a placeholder text for the featured restaurants
            </h2>
            <p className="text-gray-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                iaculis consectetur nisi sagittis.
            </p>

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
