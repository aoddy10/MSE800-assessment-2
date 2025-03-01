import axiosInstance from "../api/axios";

// subscribe to newsletter
export const subscribeNewsletter = async (email) => {
    try {
        const response = await axiosInstance.post(`/newsletter/subscribe/`, {
            email,
        });
        return response.data;
    } catch (error) {
        console.error("Error subscribeNewsletter:", error);
        throw error;
    }
};
