import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCityById } from "../services/city.services";
import { getLocationByCityId } from "../services/location.services";


const CityPage = () => {
    const { id } = useParams(); // Get city ID from URL
    const [city, setCity] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetch_cityinfo = async () => {
            try {
                const result = await getCityById(id);
                setCity(result);
                //console.log(result);
            } catch (error) {
                console.log(error);
            }
        };

        fetch_cityinfo();
    }, [id]);

    useEffect(() => {
        const fetch_locationinfo = async () => {
            try {
                const result =await getLocationByCityId(id);
                setLocations(result);
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        };

        fetch_locationinfo();
    }, [id]);

    const fetch_locationinfoByID = async (param) => {
      try {
          console.log(id);
          const result =await getLocationByCityId(id);
          console.log(result);
          if(param==='All')
          {
            //console.log('All');
            setLocations(result);
          }
          else if(param==='restaurant' || param==='activity')
          {
             
              //console.log(param);
              const rresult= result.filter(r=> r.type==param);
              setLocations(rresult);
          }
          
          
      } catch (error) {
          console.log(error);
      }

      }
    
    const handlebuttonClick = (param) => {
        fetch_locationinfoByID(param);
    };

    return (
        <>
            {/* <div className="bg-gray-100 min-h-screen p-6"> */}
            <div className="container mx-auto p-6">
                {/* Banner Image */}
                <div className="w-full h-80 rounded-xl overflow-hidden">
                    <img
                        src={city.image_url}
                        alt={city.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="bg-gray-100 p-6 flex flex-col lg:flex-row gap-3">
                    {/* Left Section */}

                    <div className="lg:w-2/3 bg-white p-6 rounded-xl shadow-lg">
                        <h1 className="text-2xl font-bold">{city.title}</h1>
                        <p className="text-gray-600 mt-2">{city.description}</p>
                    </div>

                    {/* Right Section - Reviews */}
                    <div className="lg:w-1/3 bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-xl font-semibold">Reviews</h2>
                        <div className="mt-4 space-y-4">
                            {/* Review 1 */}
                            <div className="p-4 bg-gray-50 rounded-lg shadow">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src="/user1.jpg"
                                        alt="James Smith"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <h3 className="font-medium">
                                            James Smith
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Tourist
                                        </p>
                                    </div>
                                    <span className="ml-auto text-yellow-500 font-bold">
                                        4.9 ⭐
                                    </span>
                                </div>
                                <p className="text-gray-600 mt-2 text-sm">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Duis sed erat nisl.
                                </p>
                            </div>
                            {/* Review 2 */}
                            <div className="p-4 bg-gray-50 rounded-lg shadow">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src="/user2.jpg"
                                        alt="John Doe"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <h3 className="font-medium">
                                            John Doe
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Traveler
                                        </p>
                                    </div>
                                    <span className="ml-auto text-yellow-500 font-bold">
                                        4.9 ⭐
                                    </span>
                                </div>
                                <p className="text-gray-600 mt-2 text-sm">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Duis sed erat nisl.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="my-12">
                    <h2 className="text-2xl font-bold mb-2">
                        Things to do in {city.title}
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Cras iaculis consectetur nisi sagittis.
                    </p>
                    <div>
                        <button
                            onClick={() => handlebuttonClick("All")}
                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            All Activities
                        </button>
                        <button
                            onClick={() => handlebuttonClick("restaurant")}
                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            Restaurants
                        </button>
                        <button
                            onClick={() => handlebuttonClick("activity")}
                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            Activities
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {locations && locations.length > 0
                            ? locations.map((location, index) => (
                                  <div
                                      key={`location-${location.id}`}
                                      className="bg-white rounded-lg shadow-lg p-4"
                                  >
                                      <img
                                          src={location.cover_image_url}
                                          alt={location.description}
                                          className="w-full h-48 object-cover rounded-lg"
                                      />
                                      <div className="flex justify-between items-center mt-3">
                                          <h3 className="text-lg font-semibold">
                                              {location.title}
                                          </h3>
                                          <div className="flex items-center gap-1 text-yellow-500 text-sm">
                                              <span className="font-semibold">
                                                  {location.avg_rating}
                                              </span>
                                              <span>⭐</span>
                                          </div>
                                      </div>
                                      <p className="text-gray-600 text-sm mt-2">
                                          {location.description}
                                      </p>
                                  </div>
                              ))
                            : "No Data"}
                    </div>
                </section>
            </div>
        </>
    );
};

export default CityPage;
