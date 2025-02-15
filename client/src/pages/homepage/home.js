import React from "react";
import FeaturedCities from "./FeaturedCities";
import FeaturedRestaurants from "./featuredRestaurants";
import Banner from "./HomeBanner";
const HomePage = () => {

  
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
  
      <Banner/>

    <FeaturedCities/>
    <FeaturedRestaurants/>
    
    </div>
    
  );
};

export default HomePage;
