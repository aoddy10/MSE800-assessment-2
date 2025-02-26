import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../services/auth.service.s";
import "../../styles/LoginPage.css";

import blackLogo from "../../assets/logo-black.png";
import cornerImage from "../../assets/corner-png.png";
import cornerImage2 from "../../assets/corner-png2.png";
import activeUsers from "../../assets/activeUsers.png";
import arrowleft from "../../assets/arrow-left.svg";
import AuthContext from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";

const CreateNewPassword = () => {
    const { token } = useContext(AuthContext);
    const logout = useLogout();
    const { resetToken } = useParams(); // Get reset token from URL
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Redirect if no reset token
    useEffect(() => {
        if (!resetToken) {
            navigate("/error"); // Redirect if no token is found
        }
    }, [resetToken, navigate]);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Validate passwords
    const validateForm = () => {
        if (!formData.newPassword || !formData.confirmPassword) {
            setError("Both password fields are required.");
            return false;
        }
        if (formData.newPassword.length < 8) {
            setError("Password must be at least 8 characters long.");
            return false;
        }
        if (formData.newPassword !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return false;
        }
        return true;
    };

    // Handle password reset
    const handlePasswordReset = async () => {
        if (!validateForm()) return;
        setLoading(true);
        setError(null);

        try {
            await resetPassword({
                resetToken: resetToken,
                newPassword: formData.newPassword,
            });

            if (token) {
                await logout(); // Logout if user is logged in
            }

            navigate("/login"); // Redirect to login page
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.error || "Password reset failed.");
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
                    <h2>Create a New Password</h2>
                    <p className="forgot-p-txt">
                        Enter a new password for your account.
                    </p>

                    {/* New Password */}
                    <div className="input-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            placeholder="Enter your new password"
                            value={formData.newPassword}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="input-group">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Re-enter your new password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        className={`sign-in-button ${
                            loading && "!bg-gray-400"
                        }`}
                        onClick={handlePasswordReset}
                        disabled={loading}
                    >
                        {loading ? "Resetting..." : "Change Password"}
                    </button>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-500 w-full mt-2">{error}</p>
                    )}

                    <div className="divider">
                        <hr />
                    </div>

                    <p className="registerHere">
                        Remembered your password?&nbsp;
                        <a href="/login" className="registerLink">
                            Login here
                        </a>
                    </p>
                </div>
            </div>

            {/* Right Side UI */}
            <div className="right-container">
                <img src={cornerImage} alt="corner" />
                <img src={cornerImage2} alt="corner2" className="corner2" />
                <div className="text-content">
                    <h2>Secure Your Account</h2>
                    <h2>Reset Your Password</h2>
                    <div className="active-users-container">
                        <img src={activeUsers} alt="activeUsers" />
                        <p>Trusted by users</p>
                    </div>
                    <p>
                        Ensure your account security by choosing a strong new
                        password.
                    </p>
                    <button className="exploreBtn">Explore Now</button>
                </div>
            </div>
        </div>
    );
};

export default CreateNewPassword;
