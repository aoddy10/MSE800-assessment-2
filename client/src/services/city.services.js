import axiosInstance from "../api/axios";

// get all cities
export const getCities = async () => {
    try {
        const response = await axiosInstance.get("/city/");
        return response.data;
    } catch (error) {
        console.error("Error fetching cities:", error);
        throw error;
    }
};

// get city by id
export const getCityById = async (cityId) => {
    try {
        const response = await axiosInstance.get(`/city/${cityId}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching city:", error);
        throw error;
    }
};

// create city
export const createCity = async (cityData, token) => {
    try {
        const response = await axiosInstance.post("/city/create/", cityData, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating city:", error);
        throw error;
    }
};

// update city
export const updateCity = async (cityId, cityData, token) => {
    try {
        const response = await axiosInstance.put(
            `/city/${cityId}/update/`,
            cityData,
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating city:", error);
        throw error;
    }
};
