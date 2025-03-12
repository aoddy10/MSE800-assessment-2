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
                    <div className="hero-content-maori">
                        <div className="blur-container-maori">
                            <p>Experience the <span className="font-bold">Magic</span> of <span className="font-bold">New Zealand</span></p>
                        </div>

                        <div className="hero-text-maori">
                            <h1>Discover maori-culture <br />
                                in <span className="font-bold">New Zealand</span></h1>
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
                            <h1>Explore the <br/><span className='font-bold'>Māori culture</span></h1>
                            <p className='text-lg text-[#232323]'>Māori culture is the indigenous culture of <br/>New Zealand, with a rich history and tradition that continues to thrive today.</p>
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
                                <h1>Demigod Māui</h1>
                                <p className='text-md'>Māori legend says New Zealand was fished from the sea by the daring demigod Māui.</p>
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
                                <p className='text-md'>The Treaty of Waitangi was signed in 1840 and was an agreement between the British Crown and a large number of Māori chiefs.</p>
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
                                <p className='text-md'>The centuries old tradition of tāmoko (Māori tattoo) is an important custom that is still practised today. </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="maori-section3">
                <div className="maori-content2">
                    <div className="boxing">
                        <div
                            className="box1-maori"
                            style={{
                                backgroundImage: `url(${about3})`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover'
                            }}
                        ></div>
                        <div class="box2-maori">

                            <div className="maori">
                                <div className="maori-items">
                                    <h1 className="maori-title">01</h1>
                                    <h2 className="maori-txt-2"><b style={{color: '#232323'}}>The Heart of Māori New Zealand</b><br />Unlock the secrets of Aotearoa's indigenous heritage, from ancient roots to modern expressions.</h2>
                                </div>
                            </div>

                            <div className="maori">
                                <div className="maori-items">
                                    <h1 className="maori-title">02</h1>
                                    <h2 className="maori-txt-2"><b style={{color: '#232323'}}>Early settlement</b><br />The ancestors of Māori arrived on canoes from Pacific islands before 1300 CE. Settling first on the coast, they hunted seals and moas.</h2>
                                </div>
                            </div>
                            
                            <div className="maori">
                                <div className="maori-items">
                                    <h1 className="maori-title">03</h1>
                                    <h2 className="maori-txt-2"><b style={{color: '#232323'}}>Māori today</b><br />In 2019 there were nearly 800,000 Māori people, with most living in cities.</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="maori-section4">
                <div className="maori-content2">
                <div className="faq-container-maori">
                        <h2>Frequently Asked Questions</h2>
                        <div className="faq-list-maori">
                            {FAQData.map((faq, index) => (
                                <div className="faq-item-maori" key={index}>
                                    <button 
                                        className={`faq-question-maori ${openIndex === index ? 'active' : ''}`}
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    >
                                        {faq.question}
                                        <span className="faq-icon-maori">{openIndex === index ? '−' : '+'}</span>
                                    </button>
                                    <div className={`faq-answer-maori ${openIndex === index ? 'active' : ''}`}>
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