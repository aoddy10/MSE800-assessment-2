import React from "react";
import "../../styles/HeroSection.css";
import heroPic2 from "../../assets/about1.jpg";

const HeroSection2 = () => {
    return (
        <div className="hero-content1">
            <div className="boxing">
                <div class="box1">
                    <img
                        src={heroPic2}
                        alt="NZ"
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
                <div class="box2">
                    <div className="accordion">
                        <div className="accordion-items">
                            <h1 className="accordion-title">01</h1>
                            <h2 className="accordion-txt">
                                <span className="font-bold mb-3">
                                    Discover New Zealand Like Never Before
                                </span>
                                <br />
                                <br />
                                Explore hidden gems, must-visit spots, and local
                                favorites across Aotearoa.
                            </h2>
                        </div>
                    </div>
                    <div className="accordion">
                        <div className="accordion-items">
                            <h1 className="accordion-title">02</h1>
                            <h2 className="accordion-txt">
                                <span className="font-bold mb-3">
                                    Your Ultimate Travel Guide to New Zealand
                                </span>
                                <br />
                                <br />
                                Find breathtaking destinations, travel tips, and
                                insider recommendations—all in one place!
                            </h2>
                        </div>
                    </div>
                    <div className="accordion">
                        <div className="accordion-items">
                            <h1 className="accordion-title">03</h1>
                            <h2 className="accordion-txt">
                                <span className="font-bold mb-3">
                                    Start Your Kiwi Adventure Today
                                </span>
                                <br />
                                <br />
                                Plan, explore, and experience the best of New
                                Zealand with Kiwi Explorer.
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection2;
