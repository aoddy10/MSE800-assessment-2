import React from "react";
import "../../styles/FooterLandingpage.css";

import logo from "../../assets/logo-white.png";
import facebook from "../../assets/socmed/facebook.svg";
import twitter from "../../assets/socmed/twitter.svg";
import instagram from "../../assets/socmed/instagram.svg";
import linkedin from "../../assets/socmed/linkedin.svg";

const FooterLandingpage = () => {
    return (
        <div className="landing-main-footer-container">
            <div className="landing-footer-container">
                <div className="landing-footer-links">
                    <div className="landing-column-1">
                        <img
                            className="landing-footer-logo"
                            src={logo}
                            alt="Kiwi Explorer Logo"
                        />
                     
                        <div className="landing-socmed-icons-container">
                            <img
                                className="landing-footer-socmed-icons"
                                src={facebook}
                                alt="facebook"
                            />
                            <img
                                className="landing-footer-socmed-icons"
                                src={twitter}
                                alt="twitter"
                            />
                            <img
                                className="landing-footer-socmed-icons"
                                src={instagram}
                                alt="instagram"
                            />
                            <img
                                className="landing-footer-socmed-icons"
                                src={linkedin}
                                alt="linkedin"
                            />
                        </div>
                    </div>
                    <div className="landing-column">
                        <h5>EXPLORE</h5>
                        <a href="/explore#FeaturedCities">Cities</a>
                        <a href="/explore#FeaturedRestaurants">Restaurants</a>
                        
                        <a href="/explore#FeaturedActivities">Activities</a>
                    </div>
                    <div className="landing-column">
                        <h5>COMPANY</h5>
                        <a href="/about">About</a>
                        <a href="/contact">Contact</a>
                        <a href="/explore">Explore</a>
                        
                    </div>
                    <div className="landing-column">
                        <h5>LEGAL</h5>
                        <a href="/tnc">Terms & Conditions</a>
                        <a href="/privacy">Privacy Policy</a>
                    </div>
                </div>
                <div className="landing-footer-credits">
                    <p>© All Rights Reserved 2025 Kiwi Explorer</p>
                    <p>Powered by Sparks</p>
                </div>
            </div>
        </div>
    );
};

export default FooterLandingpage;
