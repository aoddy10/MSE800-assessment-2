import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationCard from "../../components/LocationCard";
import { useTranslation } from "react-i18next";

const FeaturedActivities = ({ activities }) => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const itemsPerSlide = 3;

    const handleActivityClick = (activity) => {
        navigate(`/location/${activity.id}`);
    };

    const nextSlide = () => {
        if (activities && activities.length > 0 && !isAnimating) {
            setIsAnimating(true);
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;
                return nextIndex >
                    Math.floor((activities.length - 1) / itemsPerSlide)
                    ? 0
                    : nextIndex;
            });
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    const prevSlide = () => {
        if (activities && activities.length > 0 && !isAnimating) {
            setIsAnimating(true);
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex - 1;
                return nextIndex < 0
                    ? Math.floor((activities.length - 1) / itemsPerSlide)
                    : nextIndex;
            });
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    return (
        <section
            id="FeaturedActivities"
            className="py-12 w-[100%] bg-[#f9f9fb]"
        >
            <div className="w-[70%] m-auto">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold mb-6">
                        {t("home.sectionName.activity")}
                    </h2>

                    <div className="flex gap-2">
                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            disabled={isAnimating}
                            className="bg-none p-0 z-10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Previous slide"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-700"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>

                        <button
                            onClick={nextSlide}
                            disabled={isAnimating}
                            className="bg-none p-0 z-10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Next slide"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-700"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="relative">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{
                                transform: `translateX(-${
                                    currentIndex * 100
                                }%)`,
                            }}
                        >
                            {activities && activities.length > 0
                                ? Array(
                                      Math.ceil(
                                          activities.length / itemsPerSlide
                                      )
                                  )
                                      .fill()
                                      .map((_, slideIndex) => (
                                          <div
                                              key={slideIndex}
                                              className="flex w-full flex-shrink-0 gap-8"
                                          >
                                              {activities
                                                  .slice(
                                                      slideIndex *
                                                          itemsPerSlide,
                                                      slideIndex *
                                                          itemsPerSlide +
                                                          itemsPerSlide
                                                  )
                                                  .map((activity) => (
                                                      <div
                                                          key={activity.id}
                                                          className="w-1/3"
                                                      >
                                                          <LocationCard
                                                              location={
                                                                  activity
                                                              }
                                                              onClick={
                                                                  handleActivityClick
                                                              }
                                                          />
                                                      </div>
                                                  ))}
                                          </div>
                                      ))
                                : "No Data"}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedActivities;
