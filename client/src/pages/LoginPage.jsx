import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await apiClient.post("/login/", {
                username,
                password,
            });
            login(response.data.token); // Store token in context
            navigate("/dashboard");
        } catch (error) {
            setError(error.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="flex flex-col items-center p-10">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            {error && <p className="text-red-500">{error}</p>}
            <input
                type="text"
                className="p-2 border rounded w-64 mb-2"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                className="p-2 border rounded w-64 mb-2"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
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
