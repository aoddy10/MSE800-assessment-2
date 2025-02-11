import React from "react";
import FeaturedCities from "./FeaturedCities";
import Banner from "./HomeBanner";
const HomePage = () => {

  
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
  
    <Banner/>

    <FeaturedCities/>
    
    
    </div>
    
  );
};

export default HomePage;
