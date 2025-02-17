import React, {useState,useEffect} from "react";
import FeaturedCities from "./FeaturedCities";
import FeaturedRestaurants from "./featuredRestaurants";
import Banner from "./HomeBanner";
import { getCities } from "../../services/city.services";
import { getRestaurants } from "../../services/location.services";

const HomePage = () => {

  const [cities, setCities] = useState([]);
  const [restaurants,setRestaurants] = useState([]);

 
  useEffect(() => {
    const fetch_city = async () => {
      try {
        const result = await getCities();
        setCities(result);
        console.log(result);
  
      } catch (error) {
        //setError(error);
      } finally {
        //setLoading(false);
      }
    }
  
    fetch_city();
  },[]);


  useEffect(() => {
    const fetch_restauarnts = async () => {
      
        const result = await getRestaurants();
        console.log(result)
        setRestaurants(result);
  
     
    }
  
    fetch_restauarnts();
  },[]);
  
  
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
  
      <Banner cities={cities}/>

      <FeaturedCities  cities={cities} />
      <FeaturedRestaurants restaurants={restaurants}/>
    
    </div>
    
  );
};

export default HomePage;
