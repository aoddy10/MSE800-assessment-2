import axiosInstance from "../api/axios";

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
export const getActivity= async () => {
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