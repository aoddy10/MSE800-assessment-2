import React, { useState } from 'react';
import '../styles/MaoriPage.css';

import bgImage from '../assets/0001.jpg';
import scrollIcon from '../assets/scroll-down-v2.gif';
import maoriImage1 from '../assets/maori1.jpg';
import maoriImage2 from '../assets/maori2.jpg';
import maoriImage3 from '../assets/maori3.jpg';
import about3 from '../assets/about3.jpg';

const FAQData = [
    {
        question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
        answer: "Curabitur sed finibus purus. Donec ut nulla eu lectus vehicula consectetur. Maecenas sit amet libero hendrerit elit convallis euismod. Donec auctor cursus suscipit. Etiam sed elementum nunc. Curabitur sed finibus purus. Donec ut nulla eu lectus vehicula consectetur. Maecenas sit amet libero hendrerit elit convallis euismod. Donec auctor cursus suscipit. Etiam sed elementum nunc."
    },
    {
        question: "In suscipit rhoncus enim ac sodales?",
        answer: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam malesuada turpis nec dapibus dignissim."
    },
    {
        question: "Vivamus erat nibh?",
        answer: "In sit amet turpis eget ligula tincidunt tristique et quis arcu. Nam ultrices elit in magna cursus, nec hendrerit mauris suscipit."
    },
    {
        question: "Maecenas varius tincidunt arcu eget aliquet?",
        answer: "urabitur sed finibus purus. Donec ut nulla eu lectus vehicula consectetur. Maecenas sit amet libero hendrerit elit convallis euismod. Donec auctor cursus suscipit. Etiam sed elementum nunc."
    },
    {
        question: "Curabitur ut finibus massa?",
        answer: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam malesuada turpis nec dapibus dignissim."
    }
];

const MaoriPage = () => {
    const [openIndex, setOpenIndex] = useState(0);
    return ( 
        <div className="maori-page">
            <div className="maori-section1">

                <div
                    className="maori-content"
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}>
                    <div className="hero-content">
                        <div className="blur-container">
                            <p>Experience the <span className="bold-text">Magic</span> of <span className="bold-text">New Zealand</span></p>
                        </div>

                        <div className="hero-text">
                            <h1>Unforgettable Moments <br />
                                in <span className="bold-text">New Zealand</span></h1>
                        </div>

                        <div className="scroll-container">
                            <img className="scroll-icon" src={scrollIcon} alt="scroll icon" />
                            <p className="scroll-txt">Scroll Down</p>
                        </div>
                    </div>

                </div>

            </div>

            <div className="maori-section2">
                <div className="maori-content2">
                    <div className="maori-txt">
                        <div className="maori-text">
                            <h1>Lorem Ipsum<br /><b>Dolor Sit Amet Cons</b></h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In laoreet elit posuere odio rutrum, eu vulputate magna fringilla. Curabitur ornare consequat ex, et interdum nibh aliquet vitae.</p>
                        </div>
                    </div>

                    <div className="maori-container">
                        <div className="maori-column">
                            <div
                                className="maori-card"
                                style={{
                                    backgroundImage: `url(${maoriImage1})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            ></div>
                            <div className="maori-card-txt">
                                <h1>Lorem Ipsum Dolor</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed erat nisi. Nunc tellus sapien, suscipit.</p>
                            </div>
                        </div>

                        <div className="maori-column2">
                            <div
                                className="maori-card"
                                style={{
                                    backgroundImage: `url(${maoriImage2})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            ></div>
                            <div className="maori-card-txt">
                                <h1>Lorem Ipsum Dolor</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed erat nisi. Nunc tellus sapien, suscipit.</p>
                            </div>
                        </div>

                        <div className="maori-column">
                            <div
                                className="maori-card"
                                style={{
                                    backgroundImage: `url(${maoriImage3})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            ></div>
                            <div className="maori-card-txt">
                                <h1>Lorem Ipsum Dolor</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed erat nisi. Nunc tellus sapien, suscipit.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="maori-section3">
                <div className="maori-content2">
                    <div className="boxing">
                        <div
                            className="box1"
                            style={{
                                backgroundImage: `url(${about3})`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover'
                            }}
                        ></div>
                        <div class="box2">
                            <div className="maori">
                                <div className="maori-items">
                                    <h1 className="maori-title">01</h1>
                                    <h2 className="maori-txt-2"><b style={{color: '#232323'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b><br />Mauris
                                        condimentum nibh ac luctus posuere. Mauris non tristique urna. Cras consectetur laoreet quam,
                                        vel dignissim leo sodales vitae.</h2>
                                </div>
                            </div>
                            <div className="maori">
                                <div className="maori-items">
                                    <h1 className="maori-title">02</h1>
                                    <h2 className="maori-txt-2"><b style={{color: '#232323'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b><br />Mauris
                                        condimentum nibh ac luctus posuere. Mauris non tristique urna. Cras consectetur laoreet quam,
                                        vel dignissim leo sodales vitae.</h2>
                                </div>
                            </div>
                            <div className="maori">
                                <div className="maori-items">
                                    <h1 className="maori-title">03</h1>
                                    <h2 className="maori-txt-2"><b style={{color: '#232323'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b><br />Mauris
                                        condimentum nibh ac luctus posuere. Mauris non tristique urna. Cras consectetur laoreet quam,
                                        vel dignissim leo sodales vitae.</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="maori-section4">
                <div className="maori-content2">
                <div className="faq-container">
                        <h2>Frequently Asked Questions</h2>
                        <div className="faq-list">
                            {FAQData.map((faq, index) => (
                                <div className="faq-item" key={index}>
                                    <button 
                                        className={`faq-question ${openIndex === index ? 'active' : ''}`}
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    >
                                        {faq.question}
                                        <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
                                    </button>
                                    <div className={`faq-answer ${openIndex === index ? 'active' : ''}`}>
                                        {faq.answer}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaoriPage;