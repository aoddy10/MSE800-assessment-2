import React, { useState } from "react";
import { XMarkIcon, FunnelIcon } from "@heroicons/react/24/outline";
import useScreenSize from "../../hooks/useScreenSize";
import bgImage from "assets/0001.jpg";
import searchCityIcon from "assets/search-city.png";
import searchActivityIcon from "assets/search-activity.png";
import searchPriceIcon from "assets/search-price.png";
import { useTranslation } from "react-i18next";

const HomeBanner = ({ cities, onSearchClick }) => {
    const { t } = useTranslation();
    const [city, setCity] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    const HandleSearchClick = () => {
        onSearchClick(city, type, price);
        setShowFilters(false);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const { isMobile } = useScreenSize();

    return (
        <div
            className={`${isMobile ? "w-[90%]" : "w-[70%]"} mx-auto mt-[150px]`}
        >
            <div className="w-[100%]">
                {isMobile ? (
                    // Mobile Hero Banner
                    <div className="relative w-full min-h-max z-1">
                        <h1 className="text-[#232323] text-2xl font-bold w-[80%]">
                            {t("home.heroContent.title")}
                        </h1>
                        <p className="text-[#767676] text-md mt-2 max-w-lg font-normal">
                            {t("home.heroContent.subtitle")}
                        </p>
                    </div>
                ) : (
                    // Desktop Hero Banner
                    <div className="relative w-[100%] pt-[75px] min-h-[350px] rounded-3xl overflow-hidden z-1">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${bgImage})` }}
                        ></div>
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-center px-40">
                            <h1 className="text-white text-4xl font-thin">
                                {t("home.heroContent.title")}
                            </h1>
                            <p className="text-white text-sm mt-2 max-w-lg font-normal">
                                {t("home.heroContent.subtitle")}
                            </p>
                        </div>
                    </div>
                )}

                <div
                    className={`relative m-auto ${
                        isMobile ? "w-full mt-[20px]" : "w-max mt-[-45px]"
                    } bg-white px-5 py-5 rounded-xl shadow-md z-10`}
                >
                    <div
                        className={`grid ${
                            isMobile
                                ? "grid-cols-[1fr]"
                                : "grid-cols-[1fr_2fr_1fr]"
                        } gap-6`}
                    >
                        {/* City Select */}
                        <div className="flex items-center space-x-3">
                            <span className="bg-[#E0F2F4] p-2 rounded-lg">
                                <img
                                    src={searchCityIcon}
                                    alt="City"
                                    className="w-7 h-7"
                                />
                            </span>
                            <div className="w-full flex-1">
                                <p className="text-[#232323] text-sm font-bold">
                                    {t("home.heroContent.searchBox.city")}
                                </p>
                                <select
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="text-[#767676] font-normal bg-transparent border-none focus:outline-none cursor-pointer appearance-none w-full hover:text-[#31AAB7] transition-colors relative pl-0 pr-6"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23767676' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "right center",
                                        backgroundSize: "16px",
                                    }}
                                >
                                    <option value="">All</option>
                                    {cities && cities.length > 0 ? (
                                        cities.map((city) => (
                                            <option
                                                value={city.id}
                                                key={city.id}
                                            >
                                                {city.title}
                                            </option>
                                        ))
                                    ) : (
                                        <option>Auckland</option>
                                    )}
                                </select>
                            </div>
                        </div>

                        {!isMobile && (
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex items-center space-x-3">
                                    <span className="bg-[#E0F2F4] p-2 rounded-lg">
                                        <img
                                            src={searchActivityIcon}
                                            alt="Activity"
                                            className="w-7 h-7"
                                        />
                                    </span>
                                    <div className="w-full flex-1">
                                        <p className="text-[#232323] text-sm font-bold">
                                            {t(
                                                "home.heroContent.searchBox.type"
                                            )}
                                        </p>
                                        <select
                                            value={type}
                                            onChange={(e) =>
                                                setType(e.target.value)
                                            }
                                            className="text-[#767676] font-normal bg-transparent border-none focus:outline-none cursor-pointer appearance-none w-full hover:text-[#31AAB7] transition-colors relative pl-0 pr-6"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23767676' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition:
                                                    "right center",
                                                backgroundSize: "16px",
                                            }}
                                        >
                                            <option value="">All</option>
                                            <option value="restaurant">
                                                Restaurants
                                            </option>
                                            <option value="activity">
                                                Attractions
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <span className="bg-[#E0F2F4] p-2 rounded-lg">
                                        <img
                                            src={searchPriceIcon}
                                            alt="Price"
                                            className="w-7 h-7"
                                        />
                                    </span>
                                    <div className="w-full flex-1">
                                        <p className="text-[#232323] text-sm font-bold">
                                            {t(
                                                "home.heroContent.searchBox.priceRange"
                                            )}
                                        </p>
                                        <select
                                            value={price}
                                            onChange={(e) =>
                                                setPrice(e.target.value)
                                            }
                                            className="text-[#767676] font-normal bg-transparent border-none focus:outline-none cursor-pointer appearance-none w-full hover:text-[#31AAB7] transition-colors relative pl-0 pr-6"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23767676' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition:
                                                    "right center",
                                                backgroundSize: "16px",
                                            }}
                                        >
                                            <option value="">All</option>
                                            <option value="high">$$$</option>
                                            <option value="medium">$$</option>
                                            <option value="low">$</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!isMobile && (
                            <button
                                onClick={HandleSearchClick}
                                className="w-full bg-[#31AAB7] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#2b97a3] transition-colors"
                            >
                                {t("home.heroContent.searchBox.button")}
                            </button>
                        )}

                        <div
                            className={`${
                                !isMobile
                                    ? "hidden"
                                    : "flex flex-col gap-4 w-full"
                            }`}
                        >
                            <button
                                onClick={toggleFilters}
                                className="w-full bg-none border border-1 border-[#31AAB7] text-[#31AAB7] py-3 px-6 rounded-lg font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                            >
                                <FunnelIcon className="w-5 h-5" />
                                {t("home.heroContent.searchBox.filterButton")}
                            </button>
                            <button
                                onClick={HandleSearchClick}
                                className="w-full bg-[#31AAB7] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#2b97a3] transition-colors"
                            >
                                {t("home.heroContent.searchBox.button")}
                            </button>
                        </div>
                    </div>

                    {showFilters && isMobile && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-[1000]">
                            <div className="absolute bottom-0 left-0 right-0 bg-white p-6 rounded-t-3xl max-h-[80vh] overflow-y-auto z-[1001]">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold">
                                        Filters
                                    </h3>
                                    <button
                                        onClick={toggleFilters}
                                        className="p-2 rounded-full hover:bg-gray-100"
                                    >
                                        <XMarkIcon className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="flex flex-col space-y-6">
                                    <div className="flex items-center space-x-3">
                                        <span className="bg-[#E0F2F4] p-2 rounded-lg">
                                            <img
                                                src={searchCityIcon}
                                                alt="City"
                                                className="w-7 h-7"
                                            />
                                        </span>
                                        <div className="w-full flex-1">
                                            <p className="text-[#232323] text-sm font-bold">
                                                {t(
                                                    "home.heroContent.searchBox.city"
                                                )}
                                            </p>
                                            <select
                                                value={city}
                                                onChange={(e) =>
                                                    setCity(e.target.value)
                                                }
                                                className="text-[#767676] font-normal bg-transparent border-none focus:outline-none cursor-pointer appearance-none w-full hover:text-[#31AAB7] transition-colors relative pl-0 pr-6"
                                                style={{
                                                    width: "100%",
                                                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23767676' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                                    backgroundRepeat:
                                                        "no-repeat",
                                                    backgroundPosition:
                                                        "right center",
                                                    backgroundSize: "16px",
                                                }}
                                            >
                                                <option value="">All</option>
                                                {cities && cities.length > 0 ? (
                                                    cities.map((city, idx) => (
                                                        <option
                                                            value={city.id}
                                                            key={city.id}
                                                        >
                                                            {city.title}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option>Auckland</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <span className="bg-[#E0F2F4] p-2 rounded-lg">
                                            <img
                                                src={searchActivityIcon}
                                                alt="Activity"
                                                className="w-7 h-7"
                                            />
                                        </span>
                                        <div className="w-full flex-1">
                                            <p className="text-[#232323] text-sm font-bold">
                                                {t(
                                                    "home.heroContent.searchBox.type"
                                                )}
                                            </p>
                                            <select
                                                value={type}
                                                onChange={(e) =>
                                                    setType(e.target.value)
                                                }
                                                className="text-[#767676] font-normal bg-transparent border-none focus:outline-none cursor-pointer appearance-none w-full hover:text-[#31AAB7] transition-colors relative pl-0 pr-6"
                                                style={{
                                                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23767676' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                                    backgroundRepeat:
                                                        "no-repeat",
                                                    backgroundPosition:
                                                        "right center",
                                                    backgroundSize: "16px",
                                                }}
                                            >
                                                <option value="">All</option>
                                                <option value="restaurant">
                                                    Restaurants
                                                </option>
                                                <option value="activity">
                                                    Attractions
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <span className="bg-[#E0F2F4] p-2 rounded-lg">
                                            <img
                                                src={searchPriceIcon}
                                                alt="Price"
                                                className="w-7 h-7"
                                            />
                                        </span>
                                        <div className="w-full flex-1">
                                            <p className="text-[#232323] text-sm font-bold">
                                                {t(
                                                    "home.heroContent.searchBox.priceRange"
                                                )}
                                            </p>
                                            <select
                                                value={price}
                                                onChange={(e) =>
                                                    setPrice(e.target.value)
                                                }
                                                className="text-[#767676] font-normal bg-transparent border-none focus:outline-none cursor-pointer appearance-none w-full hover:text-[#31AAB7] transition-colors relative pl-0 pr-6"
                                                style={{
                                                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23767676' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                                    backgroundRepeat:
                                                        "no-repeat",
                                                    backgroundPosition:
                                                        "right center",
                                                    backgroundSize: "16px",
                                                }}
                                            >
                                                <option value="">All</option>
                                                <option value="high">
                                                    $$$
                                                </option>
                                                <option value="medium">
                                                    $$
                                                </option>
                                                <option value="low">$</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={HandleSearchClick}
                                    className="w-full bg-[#31AAB7] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#2b97a3] transition-colors mt-6"
                                >
                                    {t("home.heroContent.searchBox.button")}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;
