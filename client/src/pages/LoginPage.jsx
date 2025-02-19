import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import apiClient from "../api/axios";
import AuthContext from "../context/AuthContext";
import "../styles/LoginPage.css";

import blackLogo from "../assets/logo-black.png";
import cornerImage from '../assets/corner-png.png';
import cornerImage2 from '../assets/corner-png2.png';
import activeUsers from '../assets/activeUsers.png';
import arrowleft from '../assets/arrow-left.svg';

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
            setError(error.response?.data?.error || "Incorrect email or password. Please try again.");
        }
    };

    return (


            <div className="login-container">

                <div className="back-btn">
                    <a href="/" className="back-link">
                        <img className="arrow-left" src={arrowleft} alt="arrow" />Back
                    </a>
                </div>

                <div className="left-container">
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
                            <label htmlFor="email">Login</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
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

                        <button type="submit" className="sign-in-button" onClick={handleLogin}>
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
                <div className="right-container">
                    <img src={cornerImage} alt='corner' />
                    <img src={cornerImage2} alt='corner2' className="corner2" />
                    <div className="text-content">
                        <h2>Lorem Ipsum Dolor Sit Amet</h2>
                        <h2>Dolor Tetus Consectetur</h2>
                        <div className="active-users-container">
                            <img src={activeUsers} alt='activeUsers' />
                            <p>Active users</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur <br />
                            adipiscing elit. Cras iaculis consectetur nisi.<br />
                            Aliquam sagittis lobortis auctor. Ut pulvinar</p>
                        <button className="exploreBtn">Explore Now</button>
                    </div>
                </div>
            </div>
    );
};

export default LoginPage;
