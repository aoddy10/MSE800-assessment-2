import axiosInstance from "../api/axios";

// get all users
export const getUsers = async (token) => {
    try {
        const response = await axiosInstance.get(`/users/`, {
            headers: { Authorization: `Token ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error getUsers:", error);
        throw error;
    }
};

// toggle user suspended
export const toggleUserSuspended = async (token, userId) => {
    console.log(token, userId);
    try {
        const response = await axiosInstance.patch(
            `/users/${userId}/toggle-suspended/`,
            {
                headers: { Authorization: `Token ${token}` },
            }
        );
        console.log("here");
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error toggleUserSuspended:", error);
        throw error;
    }
};
