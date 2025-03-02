import React, { useState } from "react";
import bgImage from 'assets/0001.jpg';
import searchCityIcon from 'assets/search-city.png';
import searchActivityIcon from 'assets/search-activity.png';
import searchPriceIcon from 'assets/search-price.png';

const HomeBanner = ({ cities, onSearchClick }) => {
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

                <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-center px-6">
                    <h1 className="text-white text-4xl font-light">
                        Explore the Wonders of{" "}
                        <span className="block font-bold">New Zealand</span>
                    </h1>
                    <p className="text-white text-sm mt-2 max-w-lg">
                        Kiwi Explorer offers a range of tailored tours to suit your interests.  Browse our experiences, or contact us to create
                        your personalized Kiwi adventure. Let us guide you on a journey you'll never forget.
                    </p>
                </div>

                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-max bg-white px-5 py-5 rounded-xl shadow-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="flex items-center space-x-3">
                            <span className="bg-[#E0F2F4] p-2 rounded-lg">
                                <img src={searchCityIcon} alt="City" className="w-7 h-7" />
                            </span>
                            <div>
                                <p className="text-[#232323] text-sm font-bold">City</p>
                                <select
                                    value={city}
                                    onChange={(e) => {
                                        console.log(e.target.value);
                                        setCity(e.target.value);
                                    }}
                                    className="text-[#767676] font-medium bg-transparent border-none focus:outline-none"
                                >
                                    <option value="">All</option>
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

                        <div className="flex items-center space-x-3">
                            <span className="bg-[#E0F2F4] p-2 rounded-lg">
                                <img src={searchActivityIcon} alt="Activity" className="w-7 h-7" />
                            </span>
                            <div>
                                <p className="text-[#232323] text-sm font-bold">Type</p>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="text-[#767676] font-medium bg-transparent border-none focus:outline-none"
                                >
                                    <option value="">All</option>
                                    <option value="restaurant">Restaurants</option>
                                    <option value="activity">Attractions</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <span className="bg-[#E0F2F4] p-2 rounded-lg">
                                <img src={searchPriceIcon} alt="Price" className="w-7 h-7" />
                            </span>
                            <div>
                                <p className="text-[#232323] text-sm font-bold">Price range</p>
                                <select
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="text-[#767676] font-medium bg-transparent border-none focus:outline-none"
                                >
                                    <option value="">All</option>
                                    <option value="high">$$$</option>
                                    <option value="medium">$$</option>
                                    <option value="low">$</option>
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={HandleSearchClick}
                            className="w-full bg-[#31AAB7] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#2b97a3] transition-colors"
                        >
                            SEARCH
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;
