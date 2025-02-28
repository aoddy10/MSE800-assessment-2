import React from "react";
import "../../styles/HeroContent.css";
import scrollIcon from "../../assets/scroll-down-v2.gif";

const HeroContent = () => {
    return (
        <div className="hero-content">
            <div className="blur-container">
                <p>
                    Experience the <span className="font-bold">Magic</span> of{" "}
                    <span className="font-bold">New Zealand</span>
                </p>
            </div>

            <div className="hero-text">
                <h1>
                    <span className="font-thin">Unforgettable Moments <br />
                    in </span><span className="font-bold">New Zealand</span>
                </h1>
            </div>

            <div className="scroll-container">
                <img
                    className="scroll-icon"
                    src={scrollIcon}
                    alt="scroll icon"
                />
                <p className="scroll-txt">Scroll Down</p>
            </div>
        </div>
    );
};

export default HeroContent;
