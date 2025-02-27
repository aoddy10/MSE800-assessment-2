import {
    createContext,
    useState,
    useEffect,
    useCallback,
    useContext,
} from "react";
import apiClient from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // State to store the authentication token
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [authUserInfo, setAuthUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Track loading state

    // Function to validate token with API (memoized using useCallback)
    const validateToken = useCallback(async () => {
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
    }, [token, setToken]);

    // Effect to validate token when app loads
    useEffect(() => {
        validateToken();
    }, [validateToken]);

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
        <AuthContext.Provider
            value={{
                token,
                setToken,
                authUserInfo,
                setAuthUserInfo,
                login,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
