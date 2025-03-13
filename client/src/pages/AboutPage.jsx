import React, { useState } from "react";
import "../styles/AboutPage.css";

import about1 from "../assets/about1.jpg";
import about2 from "../assets/about2.jpg";
import about3 from "../assets/about3.jpg";

import CompanyStats1 from "../assets/company-stats-user.png";
import CompanyStats2 from "../assets/company-stats-bldg.png";
import { isValidEmail } from "../utils/libs";
import { subscribeNewsletter } from "../services/subscribe.services";

const FAQData = [
    {
        question:
            "Does Kiwi Explorer offer booking services for accommodations or activities?",
        answer: "No, Kiwi Explorer is an informative website designed to provide comprehensive travel information for New Zealand. We focus on offering detailed guides, tips, and resources to help you plan your trip. We do not facilitate direct bookings.",
    },
    {
        question: "How often is the information on Kiwi Explorer updated?",
        answer: "We strive to keep our information as current as possible. Our team regularly reviews and updates content related to attractions, activities, travel advisories, and practical tips. However, for the most up to date information regarding opening hours, or pricing, please contact the specific attraction or business.",
    },
    {
        question: "Can Kiwi Explorer help me plan my road trip itinerary?",
        answer: "Yes! Kiwi Explorer provides detailed information on popular road trip routes, including suggested itineraries, points of interest, driving tips, and safety guidelines. You can use our resources to plan your ideal New Zealand road adventure.",
    },
    {
        question:
            "Does Kiwi Explorer provide information on New Zealand's cultural and environmental guidelines?",
        answer: "Absolutely. We believe in responsible tourism. Kiwi Explorer offers comprehensive information on New Zealand's cultural protocols, including respecting Māori customs, as well as environmental guidelines like the 'Leave No Trace' principles.",
    },
    {
        question:
            "Can I download information from Kiwi Explorer for offline use?",
        answer: "As Kiwi Explorer is a website, you will need an internet connection to access our content. However, you can save specific pages or information as PDFs or bookmarks for offline viewing.",
    },
];

const AboutPage = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubscribeButtonClick = async () => {
        if (!isValidEmail(email)) {
            setMessage("Please enter a valid email address.");
            return;
        }

        setIsLoading(true);

        try {
            await subscribeNewsletter(email);
            setMessage(
                "Thank you for subscribing! The confirmation email has been sent to your inbox."
            );
            setEmail("");
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="about-page">
            <div className="about-section1">
                <div className="about-content">
                    <div className="about-txt">
                        <div className="about-text">
                            <h1 className="font-thin">
                                Your Trusted
                                <br />
                                <span className="font-bold">
                                    Travel Partner in New Zealand
                                </span>
                            </h1>
                            <p>
                                Your comprehensive guide to planning the perfect
                                New Zealand adventure. Simplifying your New
                                Zealand trip with expert advice and curated
                                information and your go-to resource for accurate
                                New Zealand travel information.
                            </p>
                        </div>
                    </div>
                    <div className="about-hero">
                        <div className="about-column-1">
                            <div className="about-row-1">
                                <img
                                    src={CompanyStats1}
                                    alt="Company Stats"
                                    className="w-12 h-12"
                                />
                                <h3 className="text-lg font-semibold text-gray-800 leading-normal">
                                    +2,000 Total number of users
                                </h3>
                                <p className="text-gray-600 ">
                                    Over 2,000 travelers have explored New
                                    Zealand with Kiwi Explorer.
                                </p>
                            </div>
                            <div
                                className="about-row-2"
                                style={{
                                    backgroundImage: `url(${about1})`,
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                }}
                            ></div>
                        </div>
                        <div
                            className="about-column-2"
                            style={{
                                backgroundImage: `url(${about2})`,
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                            }}
                        ></div>
                        <div className="about-column-3">
                            <div
                                className="about-row-3"
                                style={{
                                    backgroundImage: `url(${about3})`,
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                }}
                            ></div>
                            <div className="about-row-4">
                                <img
                                    src={CompanyStats2}
                                    alt="Company Stats"
                                    className="w-10 h-10"
                                />
                                <h3 className="text-lg font-semibold text-gray-800 leading-normal">
                                    +500 Listed Attractions
                                </h3>
                                <p className="text-gray-600 ">
                                    Discover over 500 must-see attractions
                                    across New Zealand with our curated list.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about-section2">
                <div className="about-content">
                    <div className="faq-container">
                        <h2 className="font-bold">
                            Frequently Asked Questions
                        </h2>
                        <div className="faq-list">
                            {FAQData.map((faq, index) => (
                                <div className="faq-item" key={index}>
                                    <button
                                        className={`faq-question ${
                                            openIndex === index ? "active" : ""
                                        }`}
                                        onClick={() =>
                                            setOpenIndex(
                                                openIndex === index
                                                    ? null
                                                    : index
                                            )
                                        }
                                    >
                                        {faq.question}
                                        <span className="faq-icon">
                                            {openIndex === index ? "−" : "+"}
                                        </span>
                                    </button>
                                    <div
                                        className={`faq-answer ${
                                            openIndex === index ? "active" : ""
                                        }`}
                                    >
                                        {faq.answer}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="about-section3">
                <div className="about-content">
                    <div className="subscription-container">
                        <h2>Start Your</h2>
                        <h2 className="font-bold">
                            Adventure <span>With Us</span>
                        </h2>
                        <p>
                            From iconic landmarks to off-the-beaten-path
                            destinations, find 500+ attractions to explore. Let
                            Kiwi Explorer be your guide to New Zealand.
                        </p>
                        <div className="subscription-form">
                            <input
                                type="email"
                                placeholder="Enter your email address..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button
                                className={`subscribe-btn ${
                                    isLoading ? "!bg-gray-200" : ""
                                }`}
                                onClick={handleSubscribeButtonClick}
                                disabled={isLoading}
                            >
                                {isLoading ? "Subscribing..." : "SUBSCRIBE"}
                            </button>
                        </div>
                        {message && <p>{message}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
