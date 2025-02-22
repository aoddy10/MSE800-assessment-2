import React from "react";
import { useNavigate } from "react-router-dom";

const FeaturedActivities = ({ activities }) => {
    const navigate = useNavigate();

    const handleActivitieClick = ({ activitie }) => {
        console.log(activitie);
        const paramValue = activitie.id;

        navigate(`/location/${paramValue}`);
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
                    ? activities.map((activitie, index) => (
                          <div
                              key={`Activitie-${activitie.id}`}
                              className="bg-white rounded-lg shadow-lg p-4"
                          >
                              <img
                                  src={activitie.cover_image_url}
                                  alt={activitie.description}
                                  style={{ cursor: "pointer", margin: 10 }}
                                  onClick={() =>
                                      handleActivitieClick({ activitie })
                                  }
                                  className="w-full h-48 object-cover rounded-lg"
                              />
                              <div className="flex justify-between items-center mt-3">
                                  <h3 className="text-lg font-semibold">
                                      {activitie.title}
                                  </h3>
                                  <div className="flex items-center gap-1 text-yellow-500 text-sm">
                                      <span className="font-semibold">
                                          {activitie.avg_rating}
                                      </span>
                                      <span>⭐</span>
                                  </div>
                              </div>
                              <p className="text-gray-600 text-sm mt-2">
                                  {activitie.description}
                              </p>
                          </div>
                      ))
                    : "No Data"}
            </div>
        </section>
    );
};

export default FeaturedActivities;
