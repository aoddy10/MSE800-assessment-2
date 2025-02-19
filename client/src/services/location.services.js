import axiosInstance from "../api/axios";

// get locations
export const getLocations = async () => {
    try {
        const response = await axiosInstance.get("/locations/");
        //console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching locations:", error);
        throw error;
    }
};

// get restaurant
export const getRestaurants = async () => {
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
export const getActivity = async () => {
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
export const getLocationByCityId = async (cityId) => {
    try {
        const response = await axiosInstance.get(`/locations/?city=${cityId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching location by city id:", error);
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
