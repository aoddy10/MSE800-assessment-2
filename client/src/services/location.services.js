import axiosInstance from "../api/axios";

// get restaurant
export const getRestaurants= async () => {
    try {
        

        const response = await axiosInstance.get("/locations/?type=restaurant");
        //console.log(response.data);
        //console.log("restaurant")
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
        //console.log(response.data);
        //console.log("restaurant")
        return response.data;
    } catch (error) {
        console.error("Error fetching activity:", error);
        throw error;
    }
};

// get location by city id
export const getLocatoinByCityId = async (cityId) => {
    try {
        const response = await axiosInstance.get(`/locations/?city=${cityId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching location by city id:", error);
        throw error;
    }
};
