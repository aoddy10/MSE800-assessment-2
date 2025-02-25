import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axios";
import AuthContext from "../../context/AuthContext";

import "../../styles/LoginPage.css";

import blackLogo from "../../assets/logo-black.png";
import cornerImage from "../../assets/corner-png.png";
import cornerImage2 from "../../assets/corner-png2.png";
import activeUsers from "../../assets/activeUsers.png";
import arrowleft from "../../assets/arrow-left.svg";
import { isValidEmail } from "../../utils/libs";

const RegisterPage = () => {
    const { login } = useContext(AuthContext); // Use auth context to store token after registration
    const navigate = useNavigate(); // Hook for navigation

    // State to store user input fields
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState(null); // State to handle error messages
    const [loading, setLoading] = useState(false); // State to manage loading state during registration

    // Function to handle input field changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to validate required fields and check password match
    const validateForm = () => {
        if (
            !formData.first_name ||
            !formData.last_name ||
            !formData.email ||
            !formData.username ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError("All fields are required.");
            return false;
        }

        // Validate email format
        if (!isValidEmail(formData.email)) {
            setError("Invalid email format.");
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return false;
        }

        return true;
    };

    // Function to handle user registration
    const handleRegister = async () => {
        if (!validateForm()) return; // Stop execution if form validation fails

        setLoading(true);
        setError(null);

        try {
            // Sending registration data to API
            const response = await apiClient.post("/register/", {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });

            login(response.data.token); // Store token in auth context
            navigate("/login"); // Redirect to login page after successful registration
        } catch (error) {
            setError(error.response?.data?.error || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            {/* Back button to navigate back to home */}
            <div className="back-btn">
                <a href="/" className="back-link">
                    <img className="arrow-left" src={arrowleft} alt="arrow" />
                    Back
                </a>
            </div>

            {/* Left section: Registration form */}
            <div className="left-container">
                <div className="form-container">
                    {/* Logo */}
                    <img
                        src={blackLogo}
                        className="blackLogo"
                        alt="corner"
                        draggable="false"
                    />
                    <h2>Start exploring New Zealand</h2>

                    {/* First Name & Last Name Fields */}
                    <div className="input-group flex gap-2">
                        <div className="flex-grow">
                            <label htmlFor="first_name">First name</label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                placeholder="Enter your first name"
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex-grow">
                            <label htmlFor="last_name">Last name</label>
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                placeholder="Enter your last name"
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Username Field */}
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Password Field */}
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Create your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div className="input-group">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Register Button */}
                    <button
                        className={`sign-in-button ${
                            loading && "!bg-gray-400"
                        }`}
                        onClick={handleRegister}
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                    {/* Error message display */}
                    {error && (
                        <p className="text-red-500 w-full mt-2">{error}</p>
                    )}

                    {/* Divider */}
                    <div className="divider">
                        <hr />
                    </div>

                    {/* Redirect to Login Page */}
                    <p className="registerHere">
                        Already have an account?&nbsp;
                        <a href="/login" className="registerLink">
                            Login here
                        </a>
                    </p>
                </div>
            </div>

            {/* Right section: Registration page banner */}
            <div className="right-container">
                <img src={cornerImage} alt="corner" />
                <img src={cornerImage2} alt="corner2" className="corner2" />

                <div className="text-content">
                    <h2>Lorem Ipsum Dolor Sit Amet</h2>
                    <h2>Dolor Tetus Consectetur</h2>

                    {/* Active Users Count */}
                    <div className="active-users-container">
                        <img src={activeUsers} alt="activeUsers" />
                        <p>Active users</p>
                    </div>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur <br />
                        adipiscing elit. Cras iaculis consectetur nisi.
                        <br />
                        Aliquam sagittis lobortis auctor. Ut pulvinar
                    </p>

                    {/* Explore Now Button */}
                    <button className="exploreBtn">Explore Now</button>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
