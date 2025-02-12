import axios from "axios";

// ตั้งค่า axios instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api", // ตั้งค่า base URL
    timeout: 5000, // ตั้งค่า timeout 5 วินาที
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor สำหรับแนบ Token (ถ้ามี)
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("token"); // ดึง Token จาก localStorage
//         if (token) {
//             config.headers.Authorization = `Token ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

export default axiosInstance;
