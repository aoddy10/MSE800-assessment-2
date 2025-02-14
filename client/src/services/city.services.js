import axiosInstance from "../hooks/axios";

// get all cities
export const getCities = async () => {
    try {
        const response = await axiosInstance.get("/cities/");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching cities:", error);
        throw error;
    }
};

// get city by id
export const getCityById = async (cityId) => {
    try {
        const response = await axiosInstance.get(`/cities/${cityId}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching city:", error);
        throw error;
    }
};
