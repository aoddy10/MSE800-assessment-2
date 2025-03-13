import React from "react";
import "../../styles/HeroContent.css";
import scrollIcon from "../../assets/scroll-down-v2.gif";
import { useTranslation } from "react-i18next";

const HeroContent = () => {
    const { t } = useTranslation();
    return (
        <div className="hero-content">
            <div className="blur-container">
                <p>{t("landingPage.heroContent.button")}</p>
            </div>

            <div className="hero-text">
                <h1>{t("landingPage.heroContent.title")}</h1>
            </div>

            <div className="scroll-container">
                <img
                    className="scroll-icon"
                    src={scrollIcon}
                    alt="scroll icon"
                />
                <p className="scroll-txt">
                    {t("landingPage.heroContent.scrollButton")}
                </p>
            </div>
        </div>
    );
};

export default HeroContent;
