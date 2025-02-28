import React from 'react';
import '../styles/FooterWhite.css';
import logo from '../assets/logo-black.png';

const FooterWhite = () => {
    return (
        <div className="footer-white">
            <div className="main-footer-container">
                <div className="footer-container">
                    <div className="footer-links">
                        <div className="column-1">
                            <img className="footer-logo" src={logo} alt="Kiwi Explorer Logo" />

                            <p className="landing-footer-text">
                                Kiwi Explorer offers a range of tailored tours to suit your interests.
                                Browse our experiences, or contact us to create your personalized Kiwi adventure.
                            </p>

                            <div className="socmed-icons-container">
                                {/* Facebook */}
                                <svg className="footer-socmed-icons" viewBox="0 0 20 20">
                                    <path
                                        fill="#232323"
                                        d="M11.6,18.8v-7.9h2.4l.4-3.5h-2.8v-1.7c0-.9,
                                        0-1.8,1.3-1.8h1.3V1.4s-1.1-.1-2.2-.1c-2.3,0-3.8
                                        ,1.5-3.8,4.1v2h-2.6v3.5h2.6v7.9h3.4Z"
                                    />
                                </svg>

                                {/* Twitter */}
                                <svg className="footer-socmed-icons" viewBox="0 0 20 20">
                                    <path
                                        fill="#232323"
                                        d="M17.9,5.9c0,.2,0,.4,0,.5,0,5.4-4.1,11.7-11.7
                                        ,11.7S1.8,17.4,0,16.3c.3,0,.6,0,1,0,1.9,0,3.7-.7,
                                        5.1-1.8-1.8,0-3.3-1.2-3.8-2.8.3,0,.5,0,.8,0s.7,0,
                                        1.1-.1c-1.9-.4-3.3-2-3.3-4s0,0,0,0c.6.3,1.2.5,
                                        1.9.5-1.1-.7-1.8-2-1.8-3.4s.2-1.5.6-2.1c2,2.5,5,
                                        4.1,8.4,4.3,0-.3-.1-.6-.1-.9,0-2.3,1.8-4.1,
                                        4.1-4.1s2.2.5,3,1.3c.9-.2,1.8-.5,2.6-1-.3,1-1,
                                        1.8-1.8,2.3.8,0,1.6-.3,2.4-.6-.5.8-1.2,1.5-2,
                                        2.1Z"
                                    />
                                </svg>

                                {/* Instagram */}
                                <svg className="footer-socmed-icons" viewBox="0 0 20 20">
                                    <path
                                        fill="#232323"
                                        d="M15,1.7H5c-1.8,0-3.3,1.5-3.3,3.3v10c0,1.8,1.5,
                                        3.3,3.3,3.3h10c1.8,0,3.3-1.5,3.3-3.3V5c0-1.8-1.5-3.3-3.3-3.3ZM10,
                                        14.2c-2.3,0-4.2-1.9-4.2-4.2s1.9-4.2,4.2-4.2,4.2,
                                        1.9,4.2,4.2-1.9,4.2-4.2,4.2ZM14.6,
                                        6.3c-.5,0-.8-.4-.8-.8s.4-.8.8-.8.8.4.8.8-.4.8-.8.8Z"
                                    />
                                </svg>

                                {/* LinkedIn */}
                                <svg className="footer-socmed-icons" viewBox="0 0 20 20">
                                    <path
                                        fill="#232323"
                                        d="M4.9,7H1.4v11.3h3.5V7Z M3.1,1.7c-1.3,0-2.2.8-2.2,
                                        2s.8,2,2.1,2h0c1.3,0,2.2-.9,2.2-2,0-1.1-.8-2-2.1-2Z M14.6,
                                        6.9c-2,0-3.3,1.1-3.5,1.9v-1.8h-4c0,.9,0,11.3,0,
                                        11.3h4v-6.1c0-.3,0-.7,0-.9.3-.7.9-1.4,1.9-1.4s2,1,2,
                                        2.6v5.8h4v-6.3c0-3.5-2-5.1-4.5-5.1Z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="column">
                            <h5>EXPLORE</h5>
                            <a href="/explore#FeaturedCities">Cities</a>
                            <a href="/explore#FeaturedRestaurants">Restaurants</a>

                            <a href="/explore#FeaturedActivities">Activities</a>
                        </div>
                        <div className="column">
                            <h5>COMPANY</h5>
                            <a href="/about">About</a>
                            <a href="/contact">Contact</a>
                            <a href="/explore">Explore</a>

                        </div>

                        <div className="column">
                            <h5>ACCOUNT</h5>
                            <a href="/login">Login</a>
                            <a href="/register">Register</a>
                        </div>
                        <div className="column">
                            <h5>LEGAL</h5>
                            <a href="/privacy-policy">Privacy Policy</a>
                            <a href="/terms-and-conditions">Terms & Conditions</a>
                        </div>

                    </div>

                </div>
            </div>
            <div className="footer-white-credits">
                <div className="footer-credits">
                    <p>© All Rights Reserved 2025 Kiwi Explorer</p>
                    <p>Powered by Sparks</p>
                </div>
            </div>
        </div>

    );
};

export default FooterWhite;
