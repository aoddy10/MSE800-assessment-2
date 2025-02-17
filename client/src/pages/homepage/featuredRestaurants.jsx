import React, { useState,useEffect } from "react";





const FeaturedRestaurants= ({restaurants}) => {

  
  
  return (
    <section className="my-12">
   
      <h2 className="text-2xl font-bold mb-2">This is a placeholder text for the featured restaurants</h2>
      <p className="text-gray-600 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras iaculis consectetur nisi sagittis.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {restaurants && restaurants.length > 0 ? restaurants.map((restaurant, index) => (
          <div key={`restaurant-${restaurant.id}`} className="bg-white rounded-lg shadow-lg p-4">
            <img src={restaurant.cover_image_url} alt={restaurant.description} className="w-full h-48 object-cover rounded-lg" />
            <div className="flex justify-between items-center mt-3">
              <h3 className="text-lg font-semibold">{restaurant.title}</h3>
              <div className="flex items-center gap-1 text-yellow-500 text-sm">
                <span className="font-semibold">{restaurant.avg_rating}</span> 
                <span>⭐</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mt-2">{restaurant.description}</p>
            
          </div>
        )): "No Data"}
      </div>
    
    </section>
  );
};

export default FeaturedRestaurants;
