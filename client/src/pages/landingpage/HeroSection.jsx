import React from "react";
import "../../style/HeroSection.css";
import "../../App.css";
import activeUsers from "../../assets/activeUsers.png";

const HeroSection = () => {
    return (
        <div className="hero-content1">
            <div className="boxing">
                <div className="landing-text-content">
                    <h2>Lorem Ipsum Dolor Sit Amet</h2>
                    <h2>Dolor Tetus Consectetur</h2>
                    <div className="landing-active-users-container">
                        <img src={activeUsers} alt="activeUsers" />
                        <p>Active users</p>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur <br />
                        adipiscing elit. Cras iaculis consectetur nisi.
                        <br />
                        Aliquam sagittis lobortis auctor. Ut pulvinar
                    </p>
                    <button className="landing-exploreBtn">Explore Now</button>
                </div>
                <div className="location-gallery"></div>
            </div>
        </div>
    );
};

export default HeroSection;
