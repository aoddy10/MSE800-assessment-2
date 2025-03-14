import React from "react";
import "../../styles/HeroSection.css";
import heroPic2 from "../../assets/about1.jpg";
import { useTranslation } from "react-i18next";

const HeroSection2 = () => {
    const { t } = useTranslation();

    return (
        <div className="hero-content1">
            <div className="boxing">
                <div className="box1">
                    <img
                        src={heroPic2}
                        alt="NZ"
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
                <div className="box2">
                    <div className="accordion">
                        <div className="accordion-items">
                            <h1 className="accordion-title">01</h1>
                            <h2 className="accordion-txt">
                                <span className="font-bold mb-3">
                                    {t("landingPage.section3.topic1.title")}
                                </span>
                                <br />
                                <br />
                                {t("landingPage.section3.topic1.content")}
                            </h2>
                        </div>
                    </div>
                    <div className="accordion">
                        <div className="accordion-items">
                            <h1 className="accordion-title">02</h1>
                            <h2 className="accordion-txt">
                                <span className="font-bold mb-3">
                                    {t("landingPage.section3.topic2.title")}
                                </span>
                                <br />
                                <br />
                                {t("landingPage.section3.topic2.content")}
                            </h2>
                        </div>
                    </div>
                    <div className="accordion">
                        <div className="accordion-items">
                            <h1 className="accordion-title">03</h1>
                            <h2 className="accordion-txt">
                                <span className="font-bold mb-3">
                                    {t("landingPage.section3.topic3.title")}
                                </span>
                                <br />
                                <br />
                                {t("landingPage.section3.topic3.content")}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection2;
