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
    try {
        const response = await axiosInstance.patch(
            `/users/${userId}/toggle-suspended/`,
            {}, // Axios requires a payload (even empty) for PATCH
            {
                headers: { Authorization: `Token ${token}` },
            }
        );
        return response.data;
    } catch (error) {
        console.error(
            "Error toggleUserSuspended:",
            error.response?.data || error
        );
        throw error;
    }
};

// update user
export const updateUser = async (token, userId, userData) => {
    try {
        const response = await axiosInstance.put(
            `/users/${userId}/update/`,
            userData,
            {
                headers: { Authorization: `Token ${token}` },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error updateUser:", error.response?.data || error);
        throw error;
    }
};

// get active user
export const gethActiveUsers = async () => {
    try {
        const response = await axiosInstance.get(`/users/active/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching active users:", error);
        throw error;
    }
};
