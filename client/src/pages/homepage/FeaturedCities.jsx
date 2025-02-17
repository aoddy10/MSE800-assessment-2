import React, { useState,useEffect } from "react";
import { getCities } from "../../services/city.services";





// const cities = [
//   {
//     name: "Auckland CBD",
//     image: "/path-to-auckland-image.jpg",
//     rating: 4.9,
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras iaculis consectetur nisi sagittis.",
//     features: [
//       "Lorem ipsum dolor sit amet",
//       "Cras iaculis consectetur nisi sagittis.",
//       "Consectetur adipiscing amet elit."
//     ]
//   },
//   {
//     name: "Waiheke Island",
//     image: "/path-to-waiheke-image.jpg",
//     rating: 4.9,
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras iaculis consectetur nisi sagittis.",
//     features: [
//       "Lorem ipsum dolor sit amet",
//       "Cras iaculis consectetur nisi sagittis.",
//       "Consectetur adipiscing amet elit."
//     ]
//   },
//   {
//     name: "Christchurch",
//     image: "/path-to-christchurch-image.jpg",
//     rating: 4.9,
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras iaculis consectetur nisi sagittis.",
//     features: [
//       "Lorem ipsum dolor sit amet",
//       "Cras iaculis consectetur nisi sagittis.",
//       "Consectetur adipiscing amet elit."
//     ]
//   }
// ];

const FeaturedCities = ({cities}) =>{

  
  return (
    <section className="my-12">
   
      <h2 className="text-2xl font-bold mb-2">This is a placeholder text for the featured Cities</h2>
      <p className="text-gray-600 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras iaculis consectetur nisi sagittis.</p>
      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cities && cities.length > 0 ? cities.map((city, index) => (
          <div key={city.id} className="bg-white rounded-lg shadow-lg p-4">
            <img src={city.image_url} alt={city.name} className="w-full h-48 object-cover rounded-lg" />
            <div className="flex justify-between items-center mt-3">
              <h3 className="text-lg font-semibold">{city.name}</h3>
              <div className="flex items-center gap-1 text-yellow-500 text-sm">
                <span className="font-semibold">{city.rating}</span> 
                <span>⭐</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mt-2">{city.description}</p>
           
          </div>
        )) : "No Data"
      }
      </div>
    
    </section>
  );
};

export default FeaturedCities;
