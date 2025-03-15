import React from "react";
import "../../styles/FooterLandingpage.css";

import logo from "../../assets/logo-white.png";
import facebook from "../../assets/socmed/facebook.svg";
import twitter from "../../assets/socmed/twitter.svg";
import instagram from "../../assets/socmed/instagram.svg";
import linkedin from "../../assets/socmed/linkedin.svg";
import { useTranslation } from "react-i18next";

const FooterLandingpage = () => {
    const { t } = useTranslation();

    return (
        <div className="landing-main-footer-container">
            <div className="landing-footer-container">
                <div className="landing-footer-links">
                    <div className="landing-column-1">
                        <img
                            className="landing-footer-logo"
                            src={logo}
                            alt="Kiwi Explorer Logo"
                        />
                        <p className="landing-footer-text">
                            Kiwi Explorer offers a range of tailored tours to
                            suit your interests. Browse our experiences, or
                            contact us to create your personalized Kiwi
                            adventure.
                        </p>

                        <div className="landing-socmed-icons-container">
                            <img
                                className="landing-footer-socmed-icons"
                                src={facebook}
                                alt="facebook"
                            />
                            <img
                                className="landing-footer-socmed-icons"
                                src={twitter}
                                alt="twitter"
                            />
                            <img
                                className="landing-footer-socmed-icons"
                                src={instagram}
                                alt="instagram"
                            />
                            <img
                                className="landing-footer-socmed-icons"
                                src={linkedin}
                                alt="linkedin"
                            />
                        </div>
                    </div>

                    <div className="landing-column">
                        <h5>{t("footer.column1.title")}</h5>
                        <a href="/explore#FeaturedCities">
                            {t("footer.column1.menu1")}
                        </a>
                        <a href="/explore#FeaturedRestaurants">
                            {t("footer.column1.menu2")}
                        </a>

                        <a href="/explore#FeaturedActivities">
                            {t("footer.column1.menu3")}
                        </a>
                    </div>
                    <div className="landing-column">
                        <h5>{t("footer.column2.title")}</h5>
                        <a href="/about">{t("footer.column2.menu1")}</a>
                        <a href="/contact">{t("footer.column2.menu2")}</a>
                        <a href="/explore">{t("footer.column2.menu3")}</a>
                    </div>

                    <div className="landing-column">
                        <h5>{t("footer.column3.title")}</h5>
                        <a href="/login">{t("footer.column3.menu1")}</a>
                        <a href="/register">{t("footer.column3.menu2")}</a>
                    </div>
                    <div className="landing-column">
                        <h5>{t("footer.column4.title")}</h5>
                        <a href="/privacy-policy">
                            {t("footer.column4.menu1")}
                        </a>
                        <a href="/terms-and-conditions">
                            {t("footer.column4.menu2")}
                        </a>
                    </div>
                </div>
                <div className="landing-footer-credits">
                    <p>© All Rights Reserved 2025 Kiwi Explorer</p>
                    <p>Powered by Sparks</p>
                </div>
            </div>
        </div>
    );
};

export default FooterLandingpage;
