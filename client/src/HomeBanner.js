import React from "react";

const HomeBanner = () => {

  
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
  
    <div className="relative w-full h-[350px] rounded-xl overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/path-to-image.jpg')" }}
      ></div>
      
      <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-white text-4xl font-light">
          Explore the Wonders of <span className="block font-bold">New Zealand</span>
        </h1>
        <p className="text-white text-sm mt-2 max-w-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras iaculis consectetur nisi. Aliquam sagittis lobortis auctor. Ut pulvinar.
        </p>
      </div>
      
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-3xl bg-white p-4 rounded-xl shadow-lg flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="bg-blue-100 p-2 rounded-lg">
            🏢
          </span>
          <div>
            <p className="text-gray-500 text-sm">City</p>
            <select className="text-black font-medium bg-transparent border-none focus:outline-none">
              <option>Auckland</option>
              <option>Wellington</option>
              <option>Christchurch</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="bg-blue-100 p-2 rounded-lg">
            🎩
          </span>
          <div>
            <p className="text-gray-500 text-sm">Type</p>
            <select className="text-black font-medium bg-transparent border-none focus:outline-none">
              <option>Restaurants</option>
              <option>Hotels</option>
              <option>Attractions</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="bg-blue-100 p-2 rounded-lg">
            💲
          </span>
          <div>
            <p className="text-gray-500 text-sm">Price range</p>
            <select className="text-black font-medium bg-transparent border-none focus:outline-none">
              <option>$$$</option>
              <option>$$</option>
              <option>$</option>
            </select>
          </div>
        </div>
        
        <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded">
          SEARCH
        </button>
      </div>
    </div>

   
    </div>
    
  );
};

export default HomeBanner;
