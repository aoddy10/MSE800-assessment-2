import React from "react";
import "../../styles/HeroSection.css";
import activeUsers from "../../assets/activeUsers.png";
import { useNavigate } from "react-router-dom"

const HeroSection = () => {

     const navigate = useNavigate();

     const handleClick = () => {
        navigate(`/explore`);
    };

    return (
        <div className="hero-content1">
            <div className="boxing">
                <div className="landing-text-content">
                    <h2>Welcome to kiwi explorer</h2>
                 
                    <div className="landing-active-users-container">
                        <img src={activeUsers} alt="activeUsers" />
                        <p>Active users</p>
                    </div>
                    
                    <button   onClick={handleClick} className="landing-exploreBtn">Explore Now</button>
                </div>
                <div className="location-gallery"></div>
            </div>
        </div>
    );
};

export default HeroSection;
