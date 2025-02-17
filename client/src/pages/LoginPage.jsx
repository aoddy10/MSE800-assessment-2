import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios";
import AuthContext from "../context/AuthContext";

// LoginPage component handles user authentication
const LoginPage = () => {
    // Access the login function from AuthContext
    const { login } = useContext(AuthContext);

    // State variables to store user input and error messages
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    // useNavigate hook for redirection after login
    const navigate = useNavigate();

    // Function to handle login when the user clicks the login button
    const handleLogin = async () => {
        try {
            // Send login request to API with username and password
            const response = await apiClient.post("/login/", {
                username,
                password,
            });

            // Store the authentication token in context
            login(response.data.token);

            // Redirect user to the dashboard after successful login
            navigate("/dashboard");
        } catch (error) {
            // Set an error message if login fails
            setError(error.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="flex flex-col items-center p-10">
            {/* Page title */}
            <h1 className="text-2xl font-bold mb-4">Login</h1>

            {/* Display error message if login fails */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Username input field */}
            <input
                type="text"
                className="p-2 border rounded w-64 mb-2"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            {/* Password input field */}
            <input
                type="password"
                className="p-2 border rounded w-64 mb-2"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {/* Login button */}
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleLogin}
            >
                Login
            </button>
        </div>
    );
};

export default LoginPage;
