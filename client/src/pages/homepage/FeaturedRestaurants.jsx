import LocationCard from "../../components/LocationCard";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useScreenSize from "../../hooks/useScreenSize";
import Skeleton from "../../components/ui/Skeleton";

const FeaturedRestaurants = ({ restaurants }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const { isMobile } = useScreenSize();
    const itemsPerSlide = isMobile ? 1 : 3;
    const [loading, setLoading] = useState(true); // Added loading state

    const handleRestaurantClick = (restaurant) => {
        navigate(`/location/${restaurant.id}`);
    };

    const nextSlide = () => {
        if (restaurants && restaurants.length > 0 && !isAnimating) {
            setIsAnimating(true);
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;
                return nextIndex >
                    Math.floor((restaurants.length - 1) / itemsPerSlide)
                    ? 0
                    : nextIndex;
            });
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    const prevSlide = () => {
        if (restaurants && restaurants.length > 0 && !isAnimating) {
            setIsAnimating(true);
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex - 1;
                return nextIndex < 0
                    ? Math.floor((restaurants.length - 1) / itemsPerSlide)
                    : nextIndex;
            });
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    useEffect(() => {
        if (restaurants && restaurants.length > 0) {
            setLoading(false);
        }
    }, [restaurants]);

    return (
        <section id="FeaturedRestaurants" className="py-12 w-[100%] bg-[#fff]">
            <div className="w-[90%] md:w-[70%] m-auto">
                <div className="flex justify-between">
                    <span className="mb-6">
                        <h2 className="text-2xl font-bold">
                            {t("home.sectionName.restaurant.title")}
                        </h2>
                        <p className="text-md text-[#767676]">
                            {t("home.sectionName.restaurant.subtitle")}
                        </p>
                    </span>
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
                        {loading ? (
                            <Skeleton />
                        ) : (
                            <div
                                className="flex transition-transform duration-500 ease-out"
                                style={{
                                    transform: `translateX(-${
                                        currentIndex * 100
                                    }%)`,
                                }}
                            >
                                {restaurants && restaurants.length > 0
                                    ? Array(
                                          Math.ceil(
                                              restaurants.length / itemsPerSlide
                                          )
                                      )
                                          .fill()
                                          .map((_, slideIndex) => (
                                              <div
                                                  key={slideIndex}
                                                  className="flex w-full flex-shrink-0 gap-8"
                                              >
                                                  {restaurants
                                                      .slice(
                                                          slideIndex *
                                                              itemsPerSlide,
                                                          slideIndex *
                                                              itemsPerSlide +
                                                              itemsPerSlide
                                                      )
                                                      .map((restaurant) => (
                                                          <div
                                                              key={
                                                                  restaurant.id
                                                              }
                                                              className="w-full md:w-1/3"
                                                          >
                                                              <LocationCard
                                                                  location={
                                                                      restaurant
                                                                  }
                                                                  onClick={
                                                                      handleRestaurantClick
                                                                  }
                                                              />
                                                          </div>
                                                      ))}
                                              </div>
                                          ))
                                    : "No Data"}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedRestaurants;
