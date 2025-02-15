import { createContext, useState, useEffect } from "react";

// Create an authentication context to manage global auth state
const AuthContext = createContext();

// AuthProvider component to provide authentication state to the entire app
export const AuthProvider = ({ children }) => {
    // State to store the authentication token, initially from localStorage
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    // Effect to update localStorage whenever the token changes
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token); // Store token in localStorage
        } else {
            localStorage.removeItem("token"); // Remove token if user logs out
        }
    }, [token]);

    // Function to handle user login and set the token
    const login = (newToken) => {
        setToken(newToken); // Update token state
    };

    return (
        // Provide authentication state and functions to the app
        <AuthContext.Provider value={{ token, setToken, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
