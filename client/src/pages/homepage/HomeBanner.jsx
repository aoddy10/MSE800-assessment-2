import React, { useState } from "react";
import bgImage from "assets/0001.jpg"; //'../assets/0001.jpg';
import { useTranslation } from "react-i18next";

const HomeBanner = ({ cities, onSearchClick }) => {
    const { t } = useTranslation();

    const [city, setCity] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");

    const HandleSearchClick = () => {
        console.log(city);
        onSearchClick(city, type, price);
    };

    return (
        <div className="w-[70%] mx-auto mt-[100px]">
            <div className="relative w-full h-[425px] rounded-xl overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${bgImage})` }}
                ></div>

                <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-center px-40">
                    <h1 className="text-white text-4xl font-light">
                        {t("home.heroContent.title")}
                    </h1>
                    <p className="text-white text-sm mt-2 max-w-lg">
                        {t("home.heroContent.subtitle")}
                    </p>
                </div>

                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-3xl bg-white p-4 rounded-xl shadow-lg flex flex-wrap justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="bg-blue-100 p-2 rounded-lg">🏢</span>
                        <div>
                            <p className="text-gray-500 text-sm">
                                {t("home.heroContent.searchBox.city")}
                            </p>
                            <select
                                value={city}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setCity(e.target.value);
                                }}
                                className="text-black font-medium bg-transparent border-none focus:outline-none"
                            >
                                <option value="">-</option>
                                {cities && cities.length > 0 ? (
                                    cities.map((city, idx) => (
                                        <option value={city.id} key={city.id}>
                                            {city.title}
                                        </option>
                                    ))
                                ) : (
                                    <option>Auckland</option>
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="bg-blue-100 p-2 rounded-lg">🎩</span>
                        <div>
                            <p className="text-gray-500 text-sm">
                                {t("home.heroContent.searchBox.type")}
                            </p>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="text-black font-medium bg-transparent border-none focus:outline-none"
                            >
                                <option value="">-</option>
                                <option value="restaurant">Restaurants</option>
                                <option value="activity">Attractions</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="bg-blue-100 p-2 rounded-lg">💲</span>
                        <div>
                            <p className="text-gray-500 text-sm">
                                {t("home.heroContent.searchBox.priceRange")}
                            </p>
                            <select
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="text-black font-medium bg-transparent border-none focus:outline-none"
                            >
                                <option value="">-</option>
                                <option value="high">$$$</option>
                                <option value="medium">$$</option>
                                <option value="low">$</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={HandleSearchClick}
                        className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded uppercase"
                    >
                        {t("home.heroContent.searchBox.button")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;
