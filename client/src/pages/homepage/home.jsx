import React, {useState,useEffect} from "react";
import FeaturedCities from "./FeaturedCities";
import FeaturedRestaurants from "./featuredRestaurants";
import Banner from "./HomeBanner";
import { getCities } from "../../services/city.services";
import { getRestaurants } from "../../services/location.services";
import { getActivity } from "../../services/location.services";
import FeaturedActivities from "./FeaturedActivities";


const HomePage = () => {

  const [cities, setCities] = useState([]);
  const [restaurants,setRestaurants] = useState([]);
  const [activities,setActivities] = useState([]);

 
  useEffect(() => {
    const fetch_city = async () => {
      try {
        const result = await getCities();
        setCities(result);
        //console.log(result);
  
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
        //console.log(result)
        setRestaurants(result);
  
     
    }
  
    fetch_restauarnts();
  },[]);
  

  useEffect(() => {
    const fetch_activities = async () => {
      
        const result = await getActivity();
        //console.log(result)
        setActivities(result);
  
     
    }
  
    fetch_activities();
  },[]);
  
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
  
      <Banner cities={cities}/>

      <FeaturedCities  cities={cities} />
      <FeaturedRestaurants restaurants={restaurants}/>
      <FeaturedActivities activities={activities}/>
    </div>
    
  );
};

export default HomePage;
