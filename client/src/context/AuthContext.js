import { createContext, useState, useEffect } from "react";
import apiClient from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // State to store the authentication token
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [isLoading, setIsLoading] = useState(true); // Track loading state

    // Function to validate token with API
    const validateToken = async () => {
        if (!token) {
            setIsLoading(false);
            return;
        }

        try {
            await apiClient.get("/validate-token/", {
                headers: { Authorization: `Token ${token}` },
            });
        } catch (error) {
            console.error("Invalid token, logging out...", error);
            setToken(null);
        }

        setIsLoading(false);
    };

    // Effect to validate token when app loads
    useEffect(() => {
        validateToken();
    }, [token]);

    // Effect to sync token with localStorage
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    // Function to log user in
    const login = (newToken) => {
        setToken(newToken);
    };

    return (
        <AuthContext.Provider value={{ token, setToken, login, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
