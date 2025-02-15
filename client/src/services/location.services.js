import axiosInstance from "../api/axios";

// get restaurant
export const getRestaurants= async () => {
    try {
        

        const response = await axiosInstance.get("/locations/?type=restaurant");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching cities:", error);
        throw error;
    }
};


