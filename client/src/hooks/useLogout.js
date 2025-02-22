import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios";
import AuthContext from "../context/AuthContext";

// Custom hook for handling user logout
const useLogout = () => {
    // Access authentication state from AuthContext
    const { setToken } = useContext(AuthContext);

    // Hook for navigation after logout
    const navigate = useNavigate();

    // Function to handle logout process
    const logout = async () => {
        try {
            // Send a request to the API to logout the user
            await apiClient.post(
                "/logout/",
                {}, // No request body needed
                {
                    headers: {
                        Authorization: `Token ${localStorage.getItem("token")}`, // Send the stored auth token
                    },
                }
            );

            // delete the token from local storage
            localStorage.removeItem("token");
        } catch (error) {
            console.error("Logout failed", error); // Log an error if API request fails
        }

        // Clear authentication token from state
        setToken(null);

        // Redirect user to the login page after logout
        navigate("/explore");
    };

    return logout; // Return the logout function for use in components
};

export default useLogout;
