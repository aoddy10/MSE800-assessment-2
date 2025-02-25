import { useState } from "react";
import "../../styles/LoginPage.css";

import blackLogo from "../../assets/logo-black.png";
import cornerImage from "../../assets/corner-png.png";
import cornerImage2 from "../../assets/corner-png2.png";
import activeUsers from "../../assets/activeUsers.png";
import arrowleft from "../../assets/arrow-left.svg";
import { isValidEmail } from "../../utils/libs";
import { forgotPassword } from "../../services/auth.service.s";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
    });
    const [error, setError] = useState(null); // State to handle error messages
    const [loading, setLoading] = useState(false); // State to manage loading state during registration

    // Function to validate required fields and check password match
    const validateForm = () => {
        if (!formData.email) {
            setError("Email is required.");
            return false;
        }

        // Validate email format
        if (!isValidEmail(formData.email)) {
            setError("Invalid email format.");
            return false;
        }

        return true;
    };

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to handle user registration
    const handleSendRequestClick = async () => {
        if (!validateForm()) return; // Stop execution if form validation fails

        setLoading(true);
        setError(null);

        try {
            // Sending reset password request data to API
            const response = await forgotPassword(formData.email);

            navigate("/explore"); // Redirect to home page after successful request reset password
        } catch (error) {
            setError(error.response?.data?.error || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="back-btn">
                <a href="/" className="back-link">
                    <img className="arrow-left" src={arrowleft} alt="arrow" />
                    Back
                </a>
            </div>

            <div className="left-container">
                <div className="form-container">
                    <img
                        src={blackLogo}
                        className="blackLogo"
                        alt="corner"
                        draggable="false"
                    />
                    <h2>Easily Recover Your Account</h2>
                    <p className="forgot-p-txt">
                        Forgot your account password? Don’t worry! Enter your
                        email to receive instructions for resetting your
                        password.
                    </p>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </div>

                    <button
                        className={`sign-in-button ${
                            loading && "!bg-gray-400"
                        }`}
                        onClick={handleSendRequestClick}
                        disabled={loading}
                    >
                        {loading ? "Requesting..." : "Send Reset Code"}
                    </button>

                    {/* Error message display */}
                    {error && (
                        <p className="text-red-500 w-full mt-2">{error}</p>
                    )}

                    <div className="divider">
                        <hr />
                    </div>

                    <p className="registerHere">
                        Don't have an account?&nbsp;
                        <a href="/register" className="registerLink">
                            Register here
                        </a>
                    </p>
                </div>
            </div>

            {/* --------------------------------------------------- */}
            <div className="right-container">
                <img src={cornerImage} alt="corner" />
                <img src={cornerImage2} alt="corner2" className="corner2" />
                <div className="text-content">
                    <h2>Lorem Ipsum Dolor Sit Amet</h2>
                    <h2>Dolor Tetus Consectetur</h2>
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
                    <button className="exploreBtn">Explore Now</button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
