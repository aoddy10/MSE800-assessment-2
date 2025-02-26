import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import AuthContext

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Wrap the request interceptor inside a function that React components can call
export const useAxiosInstance = () => {
    const { token } = useAuth(); // Get token from context

    axiosInstance.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers["Authorization"] = `Token ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    return axiosInstance;
};

export default axiosInstance;
