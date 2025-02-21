import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axios";
import AuthContext from "../../context/AuthContext";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

const RegisterPage = () => {
    const { login } = useContext(AuthContext); // Use auth context to store token
    const navigate = useNavigate();

    // State for form data
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Validate required fields & password match
    const validateForm = () => {
        if (!formData.username || !formData.email || !formData.password) {
            setError("All fields are required.");
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return false;
        }
        return true;
    };

    // Handle Register
    const handleRegister = async () => {
        if (!validateForm()) return;

        setLoading(true);
        setError(null);

        try {
            const response = await apiClient.post("/register/", {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });

            login(response.data.token); // Store token in auth context
            navigate("/login"); // Redirect to dashboard after registration
        } catch (error) {
            setError(error.response?.data?.error || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-10">
            <h1 className="text-2xl font-bold mb-4">Register</h1>

            {error && <p className="text-red-500">{error}</p>}

            <Input
                name="username"
                label="Username"
                value={formData.username}
                onChange={handleChange}
            />
            <Input
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
            />
            <Input
                name="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
            />
            <Input
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
            />

            <Button
                onClick={handleRegister}
                className="mt-4"
                disabled={loading}
            >
                {loading ? "Registering..." : "Register"}
            </Button>

            <p className="mt-2 text-sm">
                Already have an account?{" "}
                <a href="/login" className="text-blue-500">
                    Login
                </a>
            </p>
        </div>
    );
};

export default RegisterPage;
