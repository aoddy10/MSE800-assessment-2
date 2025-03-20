import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Skeleton from "../../components/ui/Skeleton";
import useScreenSize from "../../hooks/useScreenSize";

const FeaturedCities = ({ cities }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const { isMobile } = useScreenSize();
    const itemsPerSlide = isMobile ? 1 : 3;
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        if (cities && cities.length > 0) {
            setLoading(false);
        }
    }, [cities]);

    const handleImageClick = ({ city }) => {
        const paramValue = city.id;
        navigate(`/city/${paramValue}`);
    };

    const nextSlide = () => {
        if (cities && cities.length > 0 && !isAnimating) {
            setIsAnimating(true);
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;
                return nextIndex >
                    Math.floor((cities.length - 1) / itemsPerSlide)
                    ? 0
                    : nextIndex;
            });
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    const prevSlide = () => {
        if (cities && cities.length > 0 && !isAnimating) {
            setIsAnimating(true);
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex - 1;
                return nextIndex < 0
                    ? Math.floor((cities.length - 1) / itemsPerSlide)
                    : nextIndex;
            });
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    return (
        <section
            id="FeaturedCities"
            className="py-12 w-[100%] bg-[#f9f9fb] relative"
        >
            <div className="w-[90%] md:w-[70%] m-auto relative">
                <div className="flex justify-between">
                    <span className="mb-6">
                        <h2 className="text-2xl font-bold">
                            {t("home.sectionName.city.title")}
                        </h2>
                        <p className="text-md text-[#767676]">
                            {t("home.sectionName.city.subtitle")}
                        </p>
                    </span>

                    <div className="flex gap-2">
                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            disabled={isAnimating}
                            className="bg-none p-0 z-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Previous slide"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-[#232323] hover:text-gray-500"
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
                            className="bg-none p-0 z-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Next slide"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-[#232323] hover:text-gray-500"
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
                                {cities && cities.length > 0
                                    ? Array(
                                          Math.ceil(
                                              cities.length / itemsPerSlide
                                          )
                                      )
                                          .fill()
                                          .map((_, slideIndex) => (
                                              <div
                                                  key={slideIndex}
                                                  className="flex w-full flex-shrink-0 gap-8"
                                              >
                                                  {cities
                                                      .slice(
                                                          slideIndex *
                                                              itemsPerSlide,
                                                          slideIndex *
                                                              itemsPerSlide +
                                                              itemsPerSlide
                                                      )
                                                      .map((city) => (
                                                          <div
                                                              key={city.id}
                                                              className="w-full md:w-1/3"
                                                          >
                                                              <div
                                                                  className="group cursor-pointer flex flex-col gap-3 justify-start"
                                                                  onClick={() =>
                                                                      handleImageClick(
                                                                          {
                                                                              city,
                                                                          }
                                                                      )
                                                                  }
                                                              >
                                                                  <div className="overflow-hidden rounded-xl shadow-md">
                                                                      <img
                                                                          src={
                                                                              city.image_url
                                                                          }
                                                                          alt={
                                                                              city.name
                                                                          }
                                                                          className="w-full h-[200px] md:h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
                                                                      />
                                                                  </div>

                                                                  <div className="flex justify-between items-center mt-3">
                                                                      <h3 className="text-lg font-semibold text-gray-800 leading-normal">
                                                                          {
                                                                              city.title
                                                                          }
                                                                      </h3>
                                                                      <div className="flex items-center gap-1 text-yellow-500">
                                                                          <span>
                                                                              ⭐
                                                                          </span>
                                                                          <span className="font-semibold">
                                                                              {city.rating.toFixed(
                                                                                  1
                                                                              )}
                                                                          </span>
                                                                      </div>
                                                                  </div>
                                                                  <p className="text-gray-600 text-sm leading-normal">
                                                                      {
                                                                          city.description
                                                                      }
                                                                  </p>
                                                              </div>
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

export default FeaturedCities;
