import axios from "axios";

// setup axios instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor for Token
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("token"); // get Token from localStorage
//         if (token) {
//             config.headers.Authorization = `Token ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

export default axiosInstance;
