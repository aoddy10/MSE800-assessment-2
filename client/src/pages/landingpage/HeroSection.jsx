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
                    <p>Your Gateway to Authentic New Zealand. We <br/>
                        specialize in crafting immersive journeys that go beyond <br/>
                        the tourist trail. Discover the breathtaking beauty <br/>
                        of Aotearoa, from rugged coastlines to lush rainforests, <br/>
                        with our expert local guides.</p>
                 
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
