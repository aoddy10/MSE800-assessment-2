import axiosInstance from "../api/axios";

// get locations
// export const getLocations = async () => {
//     try {
//         const response = await axiosInstance.get("/locations/");
//         //console.log(response.data);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching locations:", error);
//         throw error;
//     }
// };

// get restaurant
export const getRestaurants = async () => {
    try {
        const response = await axiosInstance.get("/locations/?type=restaurant");
       
        return response.data;
    } catch (error) {
        console.error("Error fetching cities:", error);
        throw error;
    }
};

// get Activity
export const getActivity = async () => {
    try {
        const response = await axiosInstance.get("/locations/?type=activity");
       
        return response.data;
    } catch (error) {
        console.error("Error fetching activity:", error);
        throw error;
    }
};

// get location by city id
export const getLocationByCityId = async (cityId) => {

    try {
        const response = await axiosInstance.get(`/locations/?city=${cityId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching location by city id:", error);
        throw error;
    }
};

// get location by Location id
export const getLocationByLocationId = async (locationId) => {
    try {
        const response = await axiosInstance.get(`/locations/${locationId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching location by locationId id:", error);
        throw error;
    }
};

//  get location by user id
export const getLocationByUserId = async (userId) => {
    try {
        const response = await axiosInstance.get(`/locations/?user=${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching location by user id:", error);
        throw error;
    }
};

// get location gallery
export const getLocationGallery = async (locationId) => {
    try {
        const response = await axiosInstance.get(
            `/locations/${locationId}/gallery/`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching location gallery:", error);
        throw error;
    }
};

// create location
export const createLocation = async (data, token) => {
    try {
        const response = await axiosInstance.post("/locations/create/", data, {
            headers: { Authorization: `Token ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating location:", error);
        throw error;
    }
};

// update location
export const updateLocation = async (locationId, data, token) => {
    try {
        const response = await axiosInstance.put(
            `/locations/${locationId}/update/`,
            data,
            {
                headers: { Authorization: `Token ${token}` },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating location:", error);
        throw error;
    }
};

// delete location
export const deleteLocation = async (id, token) => {
    try {
        const response = await axiosInstance.delete(
            `/locations/${id}/delete/`,
            {
                headers: { Authorization: `Token ${token}` },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error deleting location:", error);
        throw error;
    }
};

//
export const getLocations = async (cityid,type,pricerange) => {
    try {
        let searchquery ="";
        if (cityid) {
            searchquery =`city=${cityid}`;
        }
        if(type){
            if (searchquery){
              searchquery+="&";     
            }
            searchquery +=`type=${type}`;
        }
        if(pricerange){
            if (searchquery){
                searchquery+="&";     
              }
            searchquery +=`price_range=${pricerange}`;
        }
                

        const response=await axiosInstance.get(`/locations/?${searchquery}`);
        return response.data;

    } catch (error) {
        console.error("Error getLocations:", error);
        throw error;
    }
} 