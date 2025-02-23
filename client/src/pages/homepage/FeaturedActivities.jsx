import React from "react";
import { useNavigate } from "react-router-dom";
import LocationCard from "../../components/LocationCard";

const FeaturedActivities = ({ activities }) => {
    const navigate = useNavigate();

    const handleActivityClick = (activity) => {
        navigate(`/location/${activity.id}`);
    };

    return (
        <section className="my-12">
            <h2 className="text-2xl font-bold mb-2">
                This is a placeholder text for the featured Activities
            </h2>
            <p className="text-gray-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                iaculis consectetur nisi sagittis.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {activities && activities.length > 0
                    ? activities.map((activity) => {
                          return (
                              <LocationCard
                                  key={`activity-${activity.id}`}
                                  location={activity}
                                  onClick={handleActivityClick}
                              />
                          );
                      })
                    : "No Data"}
            </div>
        </section>
    );
};

export default FeaturedActivities;
