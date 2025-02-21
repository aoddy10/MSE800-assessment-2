import React from 'react';
import '../styles/ContactPage.css';

const ContactPage = () => {
    return (
        <div className="contact-page">
            <div className="contact-content">
                <div className="contact-txt">
                    <div className="contact-text">
                        <h1>Lorem Ipsum<br /><b>Dolor Sit Amet Cons</b></h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In laoreet elit posuere odio rutrum, eu vulputate magna fringilla. Curabitur ornare consequat ex, et interdum nibh aliquet vitae.</p>
                    </div>
                </div>
                <div className="contact-form-details-box">
                    <div className="contact-box">
                        <div className="contact-box-form">
                            <h1>01</h1>
                            <div className="contact-form">
                                <label htmlFor="fname">What’s your name?</label>
                                <input
                                    type="text"
                                    id="fname"
                                    name="fname"
                                    placeholder="James Smith"
                                />
                            </div>
                        </div>
                        <div className="contact-box-form">
                            <h1>02</h1>
                            <div className="contact-form">
                                <label htmlFor="email">What's your email?</label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="james@smith.com"
                                />
                            </div>
                        </div>
                        <div className="contact-box-form">
                            <h1>03</h1>
                            <div className="contact-form">
                                <label htmlFor="orgName">What's the name of your organization?</label>
                                <input
                                    type="text"
                                    id="orgName"
                                    name="orgName"
                                    placeholder="James & Smith Ltd"
                                />
                            </div>
                        </div>
                        <div className="contact-box-form">
                            <h1>04</h1>
                            <div className="contact-form">
                                <label htmlFor="subject">What’s the subject of your inquiry?</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    placeholder="Customer Service, Feedbacks..."
                                />
                            </div>
                        </div>
                        <div className="contact-box-form">
                            <h1>05</h1>
                            <div className="contact-form">
                                <label htmlFor="message">Your message</label>
                                <input
                                    type="text"
                                    id="message"
                                    name="message"
                                    placeholder="Hi Kiwi Explorer! I would like to..."
                                />
                            </div>
                        </div>
                        
                    </div>
                    <div className="details-box">
                        <div className="details">
                            <h1>Contact Details</h1>
                            <p>info@kiwiexplorer.com <br/>+64 20 123 4567</p>
                        </div>
                        <div className="details">
                            <h1>Project Details</h1>
                            <p>MSE800 - Assessment 2 <br/>Auckland, New Zealand</p>
                        </div>
                        <div className="details">
                            <h1>Socials</h1>
                            <div className="icons-container">
                                {/* Facebook */}
                                <svg className="socmed-icons" viewBox="0 0 20 20">
                                    <path
                                        fill="#767676"
                                        d="M11.6,18.8v-7.9h2.4l.4-3.5h-2.8v-1.7c0-.9,
                                        0-1.8,1.3-1.8h1.3V1.4s-1.1-.1-2.2-.1c-2.3,0-3.8
                                        ,1.5-3.8,4.1v2h-2.6v3.5h2.6v7.9h3.4Z"
                                    />
                                </svg>

                                {/* Twitter */}
                                <svg className="socmed-icons" viewBox="0 0 20 20">
                                    <path
                                        fill="#767676"
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
                                <svg className="socmed-icons" viewBox="0 0 20 20">
                                    <path
                                        fill="#767676"
                                        d="M15,1.7H5c-1.8,0-3.3,1.5-3.3,3.3v10c0,1.8,1.5,
                                        3.3,3.3,3.3h10c1.8,0,3.3-1.5,3.3-3.3V5c0-1.8-1.5-3.3-3.3-3.3ZM10,
                                        14.2c-2.3,0-4.2-1.9-4.2-4.2s1.9-4.2,4.2-4.2,4.2,
                                        1.9,4.2,4.2-1.9,4.2-4.2,4.2ZM14.6,
                                        6.3c-.5,0-.8-.4-.8-.8s.4-.8.8-.8.8.4.8.8-.4.8-.8.8Z"
                                    />
                                </svg>

                                {/* LinkedIn */}
                                <svg className="socmed-icons" viewBox="0 0 20 20">
                                    <path
                                        fill="#767676"
                                        d="M4.9,7H1.4v11.3h3.5V7Z M3.1,1.7c-1.3,0-2.2.8-2.2,
                                        2s.8,2,2.1,2h0c1.3,0,2.2-.9,2.2-2,0-1.1-.8-2-2.1-2Z M14.6,
                                        6.9c-2,0-3.3,1.1-3.5,1.9v-1.8h-4c0,.9,0,11.3,0,
                                        11.3h4v-6.1c0-.3,0-.7,0-.9.3-.7.9-1.4,1.9-1.4s2,1,2,
                                        2.6v5.8h4v-6.3c0-3.5-2-5.1-4.5-5.1Z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
