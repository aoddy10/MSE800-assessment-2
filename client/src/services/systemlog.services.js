import axiosInstance from "../api/axios";

// get system logs
export const getSystemLogs = async (token) => {
    try {
        const response = await axiosInstance.get("/system-logs/", {
            headers: { Authorization: `Token ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching logs:", error);
        throw error;
    }
};
