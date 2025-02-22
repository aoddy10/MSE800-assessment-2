import axiosInstance from "../api/axios";

// get current login user detail
export const getMe = async (token) => {
    try {
        const response = await axiosInstance.get(`/me/`, {
            headers: { Authorization: `Token ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error getMe:", error);
        throw error;
    }
};
