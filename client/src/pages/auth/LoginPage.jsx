import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useScreenSize from "../../hooks/useScreenSize";


import apiClient from "../../api/axios";
import AuthContext from "../../context/AuthContext";
import "../../styles/LoginPage.css";
import AuthRightSideSection from "../../components/AuthRightSideSection";

import blackLogo from "../../assets/logo-black.png";
import arrowleft from "../../assets/arrow-left.svg";
import { getMe, login } from "../../services/auth.service.s";

// LoginPage component handles user authentication
const LoginPage = () => {
    // Access the login function from AuthContext
    const { setToken } = useContext(AuthContext);

    // State variables to store user input and error messages
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    // useNavigate hook for redirection after login
    const navigate = useNavigate();
    const { isMobile } = useScreenSize();


    // Function to handle login when the user clicks the login button
    const handleLogin = async () => {
        try {
            // Send login request to API with username and password
            const response = await login(username, password);

            // Store the authentication token in context
            setToken(response.token);

            const authUser = await getMe(response.token);

            if (authUser && ["admin", "business"].includes(authUser.role)) {
                navigate("/admin/locations");
            } else {
                navigate("/explore");
            }
        } catch (error) {
            // Set an error message if login fails
            setError(
                error.response?.data?.error ||
                    "Incorrect username/email or password. Please try again."
            );
        }
    };

    return (
        <div className={`login-container ${isMobile ? 'mobile' : ''}`}>

            <div className="back-btn">
                <a href="/" className="back-link">
                    <img className="arrow-left" src={arrowleft} alt="arrow" />
                    Back
                </a>
            </div>

            <div className={`left-container ${isMobile ? 'w-full' : ''}`}>

                <div className="form-container">
                    <a href="/">
                        <img
                            src={blackLogo}
                            className="blackLogo"
                            alt="corner"
                            draggable="false"
                        />
                    </a>

                    <h2>Nice to see you again</h2>

                    <div className="input-group">
                        <label htmlFor="username">Username/Email</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username or email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="remember-forgot">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span className="custom-checkbox"></span>
                            Remember me
                        </label>
                        <a href="/forgot-password" className="forgot-password">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="sign-in-button"
                        onClick={handleLogin}
                    >
                        Login
                    </button>

                    {error && <p className="text-red-500">{error}</p>}

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
            {!isMobile && <AuthRightSideSection />}

        </div>
    );
};

export default LoginPage;
