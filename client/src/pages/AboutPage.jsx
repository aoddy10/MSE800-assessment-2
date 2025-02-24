import React, { useState } from 'react';
import '../styles/AboutPage.css';

import about1 from '../assets/about1.jpg';
import about2 from '../assets/about2.jpg';
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

const AboutPage = () => {
    const [openIndex, setOpenIndex] = useState(0);
    return (  
        <div className="about-page">
            <div className="about-section1">
                <div className="about-content">
                    <div className="about-txt">
                        <div className="about-text">
                            <h2>This website is created by Yoobee students, Anirut Puangkingkaew, Terence Lyle Borromeo and Phyo Wan</h2>
                       
                        </div>
                    </div>
                    <div className="about-hero">
                        <div className="about-column-1">
                            <div className="about-row-1"></div>
                            <div
                                className="about-row-2"
                                style={{
                                    backgroundImage: `url(${about1})`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover'
                                }}
                            ></div>
                        </div>
                        <div
                            className="about-column-2"
                            style={{
                                backgroundImage: `url(${about2})`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover'
                            }}
                        ></div>
                        <div className="about-column-3">
                            <div
                                className="about-row-3"
                                style={{
                                    backgroundImage: `url(${about3})`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover'
                                }}
                            ></div>
                            <div className="about-row-4"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="about-section2">
                <div className="about-content">
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
            </div> */}

            <div className="about-section3">
                <div className="about-content">
                    <div className="subscription-container">
                        <h2>Start Your</h2>
                        <h2 className="adventure-text"><b>Adventure</b> with Us</h2>
                        
                        <div className="subscription-form">
                            <input type="email" placeholder="Enter your email address..." />
                            <button className="subscribe-btn">SUBSCRIBE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
};

export default AboutPage;