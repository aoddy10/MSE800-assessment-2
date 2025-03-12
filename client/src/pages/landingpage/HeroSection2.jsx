import React from 'react';
import "../../styles/HeroSection.css";
import heroPic2 from "../../assets/about1.jpg"

const HeroSection2 = () => {
    return (
        <div className="hero-content1">
            <div className="boxing">
                <div class="box1">
                    <img src={heroPic2} alt="NZ" className="w-full h-full object-cover rounded-md"/>
                </div>
                <div class="box2">
                    <div className="accordion">
                        <div className="accordion-items">
                            <h1 className="accordion-title">01</h1>
                            <h2 className="accordion-txt"><span className='font-bold mb-3'>Embark on an Unforgettable Adventure with Kiwi Explorer.</span><br/><br/>
                                Tired of the same old tourist traps?  Kiwi Explorer offers unique, small-group tours
                                that delve deep into the heart of New Zealand.</h2>
                        </div>
                    </div>
                    <div className="accordion">
                        <div className="accordion-items">
                            <h1 className="accordion-title">02</h1>
                            <h2 className="accordion-txt"><span className='font-bold mb-3'>Embark on an Unforgettable Adventure with Kiwi Explorer.</span><br/><br/>
                                Tired of the same old tourist traps?  Kiwi Explorer offers unique, small-group tours
                                that delve deep into the heart of New Zealand.</h2>
                        </div>
                    </div>
                    <div className="accordion">
                        <div className="accordion-items">
                            <h1 className="accordion-title">03</h1>
                            <h2 className="accordion-txt"><span className='font-bold mb-3'>Embark on an Unforgettable Adventure with Kiwi Explorer.</span><br/><br/>
                                Tired of the same old tourist traps?  Kiwi Explorer offers unique, small-group tours
                                that delve deep into the heart of New Zealand.</h2>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default HeroSection2;