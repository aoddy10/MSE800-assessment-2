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
                Featured Activities
            </h2>
          

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
