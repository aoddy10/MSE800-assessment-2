import React, { useContext, useState, useRef, useEffect } from "react";
import logo from "../assets/logo-white.png";
import AuthContext from "../context/AuthContext";
import useLogout from "../hooks/useLogout";
import { getMe } from "../services/auth.service.s";
import { UserAvatar } from "./UserAvatar";
import { GlobeAltIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from "react-i18next";
import i18n from "../utils/i18n";

const Navbar = () => {
    const { t } = useTranslation();
    const { token, authUserInfo, setAuthUserInfo } = useContext(AuthContext);
    const logout = useLogout();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const langDropdownRef = useRef(null);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
            if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
                setIsLangDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getMe(token);
                setAuthUserInfo(response);
            } catch (error) {
                console.error("Failed to fetch user");
            }
        };

        if (token) {
            fetchUser();
        }
    }, [token, authUserInfo, setAuthUserInfo]);

    const NavLinks = () => (
        <>
            <a href="/explore" className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg uppercase">
                {t("nav.navLink.explore")}
            </a>
            <a href="/about" className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg uppercase">
                {t("nav.navLink.about")}
            </a>
            <a href="/maori" className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg uppercase">
                {t("nav.navLink.maori")}
            </a>
            <a href="/contact" className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg uppercase">
                {t("nav.navLink.contact")}
            </a>
        </>
    );

    return (
        <nav className="fixed w-full top-0 z-50 py-7">
            <div className="mx-auto lg:max-w-[70%] 430px:max-w-[90%]">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="/" className="flex items-center">
                            <img src={logo} alt="Kiwi Explorer Logo" className="h-8 w-auto" />
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-4">
                        <NavLinks />
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        {/* Language Switcher */}
                        <div className="relative" ref={langDropdownRef}>
                            <button
                                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <GlobeAltIcon className="h-6 w-6 text-white" />
                            </button>

                            {isLangDropdownOpen && (
                                <div className="absolute right-0 mt-3 w-36 bg-white/20 backdrop-blur-sm rounded-lg shadow-lg p-2 z-50">
                                    <button
                                        onClick={() => {
                                            changeLanguage("en");
                                            setIsLangDropdownOpen(false);
                                        }}
                                        className="w-full px-4 py-2 text-sm text-left text-white hover:bg-white/10 flex items-center gap-2 rounded-md"
                                    >
                                        <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                                            <img
                                                src="https://flagcdn.com/h40/gb.png"
                                                alt="UK flag"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        English
                                    </button>
                                    <button
                                        onClick={() => {
                                            changeLanguage("mi");
                                            setIsLangDropdownOpen(false);
                                        }}
                                        className="w-full px-4 py-2 text-sm text-left text-white hover:bg-white/10 flex items-center gap-2 rounded-md"
                                    >
                                        <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                                            <img
                                                src="https://flagcdn.com/h40/nz.png"
                                                alt="New Zealand flag"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        Māori
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Auth Section */}
                        {token ? (
                            <div className="relative" ref={dropdownRef}>
                                {authUserInfo && (
                                    <div
                                        className="flex items-center gap-2 cursor-pointer"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        <UserAvatar
                                            profileImageUrl={authUserInfo.profile_image_url}
                                            firstName={authUserInfo.first_name}
                                            lastName={authUserInfo.last_name}
                                        />
                                        <div className="hidden md:block">
                                            <p className="text-sm text-white">
                                                {authUserInfo.first_name} {authUserInfo.last_name}
                                            </p>
                                            <p className="text-xs text-white/80">
                                                {authUserInfo.email}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-[150px] bg-black/50 backdrop-blur-sm rounded-lg shadow-lg py-2 px-2 z-50">
                                        <a
                                            href={authUserInfo && ["admin", "business"].includes(authUserInfo.role)
                                                ? "/admin/locations"
                                                : "/admin/profile"}
                                            className="block px-4 py-2 text-sm text-white hover:bg-white/10 rounded-md"
                                        >
                                            {authUserInfo && ["admin", "business"].includes(authUserInfo.role)
                                                ? "Dashboard"
                                                : "Profile"}
                                        </a>
                                        <button
                                            onClick={logout}
                                            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 rounded-md"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="hidden md:flex md:items-center md:space-x-4">
                                <a href="/register" className="text-white hover:bg-white/10 px-4 py-2 rounded-lg uppercase">
                                    {t("nav.navLink.register")}
                                </a>
                                <a href="/login" className="text-white hover:bg-white/10 px-4 py-2 rounded-lg uppercase">
                                    {t("nav.navLink.login")}
                                </a>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10"
                        >
                            {isMobileMenuOpen ? (
                                <XMarkIcon className="block h-6 w-6" />
                            ) : (
                                <Bars3Icon className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white/20 backdrop-blur-md rounded-lg mt-3 p-2 w-[90%] m-auto">
                    <div className="space-y-1">
                        <NavLinks />
                    </div>
                    {!token && (
                        <div className="pt-4 border-t border-white/10 mt-4 space-y-1">
                            <a href="/register" className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg uppercase">
                                {t("nav.navLink.register")}
                            </a>
                            <a href="/login" className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg uppercase">
                                {t("nav.navLink.login")}
                            </a>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
