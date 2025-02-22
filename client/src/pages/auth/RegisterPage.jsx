import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axios";
import AuthContext from "../../context/AuthContext";
// import { Input } from "../../components/ui/input";
// import { Button } from "../../components/ui/button";

import "../../styles/LoginPage.css";

import blackLogo from "../../assets/logo-black.png";
import cornerImage from "../../assets/corner-png.png";
import cornerImage2 from "../../assets/corner-png2.png";
import activeUsers from "../../assets/activeUsers.png";
import arrowleft from "../../assets/arrow-left.svg";

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

        <div className="login-container">

            {/* Back button */}
            <div className="back-btn">
                <a href="/" className="back-link">
                    <img className="arrow-left" src={arrowleft} alt="arrow" />Back
                </a>
            </div>

            {/* register form */}

            <div className="left-container">
                {error && <p className="text-red-500">{error}</p>}

                <div className="form-container">
                    <img src={blackLogo} className="blackLogo" alt="corner" draggable="false" />
                    <h2>Start exploring New Zealand</h2>

                    <div className="input-group">
                        <label htmlFor="Username">Full name</label>
                        <input type="text" id="fname" name="username" placeholder="Enter your full name" value={formData.username} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="Email">Email</label>
                        <input type="text" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="Password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Create your password" value={formData.password} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="Confirm Password">Confirm Password</label>
                        <input type="password" id="password" name="confirmPassword" placeholder="Confirm your password" />
                    </div>

                    <button type="submit" className="sign-in-button" onClick={handleRegister}>Register</button>

                    <div className="divider">
                        <hr />
                    </div>

                    <p className="registerHere">
                        Already have an account?&nbsp;
                        <a href="/login" className="registerLink">Login here</a>
                    </p>
                </div>
            </div>

            {/* Register page banner */}

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

        // <Input
        //     name="username"
        //     label="Username"
        //     value={formData.username}
        //     onChange={handleChange}
        // />
        // <Input
        //     name="email"
        //     label="Email"
        //     type="email"
        //     value={formData.email}
        //     onChange={handleChange}
        // />
        // <Input
        //     name="password"
        //     label="Password"
        //     type="password"
        //     value={formData.password}
        //     onChange={handleChange}
        // />
        // <Input
        //     name="confirmPassword"
        //     label="Confirm Password"
        //     type="password"
        //     value={formData.confirmPassword}
        //     onChange={handleChange}
        // />

        // <Button
        //     onClick={handleRegister}
        //     className="mt-4"
        //     disabled={loading}
        // >
        //     {loading ? "Registering..." : "Register"}
        // </Button>

        // <p className="mt-2 text-sm">
        //     Already have an account?{" "}
        //     <a href="/login" className="text-blue-500">
        //         Login
        //     </a>
        // </p>
    );
};

export default RegisterPage;
