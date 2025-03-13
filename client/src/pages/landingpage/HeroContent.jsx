import React from "react";
import "../../styles/HeroContent.css";
import scrollIcon from "../../assets/scroll-down-v2.gif";
import { useTranslation } from "react-i18next";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

const HeroContent = () => {
    const { t } = useTranslation();
    const [contentRef, isVisible] = useIntersectionObserver({
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    return (
        <div className="hero-content" ref={contentRef}>
            <div className={`blur-container ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                <p dangerouslySetInnerHTML={{ 
                    __html: t("landingPage.heroContent.button") 
                }} />
            </div>

            <div className="hero-text">
                <h1 
                    className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
                    dangerouslySetInnerHTML={{ 
                        __html: t("landingPage.heroContent.title") 
                    }}
                />
            </div>

            <div className={`scroll-container ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
                <img
                    className="scroll-icon"
                    src={scrollIcon}
                    alt="scroll icon"
                />
                <p className="scroll-txt font-thin">
                    {t("landingPage.heroContent.scrollButton")}
                </p>
            </div>
        </div>
    );
};

export default HeroContent;
