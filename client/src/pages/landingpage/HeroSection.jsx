import React from "react";
import "../../styles/HeroSection.css";
import activeUsers from "../../assets/activeUsers.png";
import heroPic1 from "../../assets/about3.jpg"
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
                    <h2 className="animate-fade-in-up">Welcome to kiwi explorer</h2>
                    <p className="animate-fade-in-up">Your Gateway to Authentic New Zealand. We <br/>
                        specialize in crafting immersive journeys that go beyond <br/>
                        the tourist trail. Discover the breathtaking beauty <br/>
                        of Aotearoa, from rugged coastlines to lush rainforests, <br/>
                        with our expert local guides.</p>
                 
                    <div className="landing-active-users-container animate-fade-in-up">
                        <img src={activeUsers} alt="activeUsers" />
                        <p className="animate-fade-in-up">Active users</p>
                    </div>
                    
                    <button   onClick={handleClick} className="landing-exploreBtn">Explore Now</button>
                </div>
                <div className="location-gallery animate-fade-in-up">
                    <img src={heroPic1} alt="NZ" className="w-full h-full object-cover rounded-md"/>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
