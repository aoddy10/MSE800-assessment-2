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
        question: "Our values, attitudes and lifestyle",
        answer: "The New Zealand culture is open-minded and welcoming to people of all countries and cultures. As a country, we value kindness, tolerance and friendship. We’re open-minded and welcoming toward all religions and uphold the right to freedom of religion, worship and belief for all. Kiwis expect everyone to be treated fairly and they enjoy feeling safe in their homes and in public places"
    },
    {
        question: "Our languages and accent",
        answer: "New Zealand has three official languages: English, Te reo Māori (the Māori language) and New Zealand Sign Language."
    },
    {
        question: "Pōwhiri",
        answer: "A Pōwhiri is a welcome ceremony that normally takes place on a marae, or Māori meeting grounds but can happen anywhere that hosts (tangata whenua) wish to formally greet a group of visitors (manuhiri). The pōwhiri process is tapu (sacred)."
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
                            <h1>Discover maori-culture <br />
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
                            
                            <p>Māori culture is an integral part of life in Aotearoa, New Zealand</p>
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
                               
                                <p>Māori legend says New Zealand was fished from the sea by the daring demigod Māui.</p>
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
                                <h1>Treaty of Waitangi</h1>
                                <p>The Treaty of Waitangi was signed in 1840 and was an agreement between the British Crown and a large number of Māori chiefs.</p>
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
                                <h1>Tāmoko Māori tattoo</h1>
                                <p>The centuries old tradition of tāmoko (Māori tattoo) is an important custom that is still practised today. </p>
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
                                    <h2 className="maori-txt-2"><b style={{color: '#232323'}}>Early settlement</b><br />The ancestors of Māori arrived on canoes from Pacific islands before 1300 CE. Settling first on the coast, they hunted seals and moas. They also began to grow food, and some moved to the forests. They lived in small tribal groups, with a rich culture of spoken stories, and strong traditions of warfare. Their ancestors, and the gods of the natural world, were very important.</h2>
                                </div>
                            </div>
                            
                            <div className="maori">
                                <div className="maori-items">
                                    <h1 className="maori-title">02</h1>
                                    <h2 className="maori-txt-2"><b style={{color: '#232323'}}>Māori today</b><br />In 2019 there were nearly 800,000 Māori people, with most living in cities. There were kōhanga reo (preschool language nests) and schools using the Māori language, two Māori television channels and 21 radio stations, 29 members of Parliament who identified as Māori, and many creative projects in film, music and art.</h2>
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