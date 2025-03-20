import React, { useState } from "react";
import useScreenSize from "../hooks/useScreenSize";

import "../styles/ContactPage.css";
import aod from "../assets/teams/aod01.jpg";
import terence from "../assets/teams/terence.jpeg";
import wan from "../assets/teams/wan.jpeg";
import {
    FaLinkedin,
    FaEnvelope,
    FaPhone,
    FaFacebook,
    FaInstagram,
    FaTwitter,
} from "react-icons/fa";
import { submitContact } from "../services/contact.services";
import { isValidEmail } from "../utils/libs";

const team = [
    {
        name: "Anirut Puangkingkaew",
        role: "Project Leader/Full stack Developer",
        image: aod,
        linkedin: "#",
        email: "270566348@yoobeestudent.ac.nz",
        phone: "#",
    },
    {
        name: "Terence Lyle Borromeo",
        role: "UI/UX Designer/Front end Developer",
        image: terence,
        linkedin: "#",
        email: "270601416@yoobeestudent.ac.nz",
        phone: "#",
    },
    {
        name: "Phyo Maung Maung Wan",
        role: "Front end Developer",
        image: wan,
        linkedin: "#",
        email: "270530732@yoobeestudent.ac.nz",
        phone: "#",
    },
];

const ContactPage = () => {
    const [error, setError] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        organization_name: "",
        subject: "",
        message: "",
    });

    // Validate form
    const validateForm = () => {
        let errors = {};
        if (!formData.name.trim()) errors.name = "Name is required";
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!isValidEmail(formData.email)) {
            errors.email = "Invalid email format";
        }
        if (!formData.organization_name.trim())
            errors.organization_name = "Organization name is required";
        if (!formData.subject.trim()) errors.subject = "Subject is required";
        if (!formData.message.trim()) errors.message = "Message is required";

        setError(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        if (!validateForm()) return;

        setLoading(true);
        try {
            await submitContact(formData);
            setSuccessMessage("Your message has been sent successfully!");
            setFormData({
                name: "",
                email: "",
                organization_name: "",
                subject: "",
                message: "",
            });
            setError({});
        } catch (error) {
            setError({ form: error.error || "Failed to send message" });
        } finally {
            setLoading(false);
        }
    };

    const { isMobile } = useScreenSize();

    return (
        <div className="contact-page">
            <div className="contact-content">
                <div className="contact-txt">
                    <div className="contact-text">
                        {/* <h1 className="!text-3xl">Let’s Connect!</h1> */}
                        <h2 className="bold-text !text-4xl">
                            Have Questions or Suggestions? <br /> We’d Love to
                            Hear from You!
                        </h2>
                        <p className="!pt-4">
                            Whether you have travel inquiries, partnership
                            opportunities, or feedback about Kiwi Explorer,
                            we’re here to help! Get in touch with us through the
                            form below or reach out via email and social media.
                        </p>
                    </div>
                </div>
                <div className="contact-form-details-box">
                    <div className="contact-box p-4">
                        <div className="contact-box-form">
                            <h1>01</h1>
                            <div className="contact-form">
                                <label htmlFor="name">What’s your name?</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="James Smith"
                                    onChange={handleChange}
                                    value={formData.name}
                                />
                                {error.name && (
                                    <p className="text-red-500 text-sm text-left">
                                        {error.name}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="contact-box-form">
                            <h1>02</h1>
                            <div className="contact-form">
                                <label htmlFor="email">
                                    What's your email?
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="james@smith.com"
                                    onChange={handleChange}
                                    value={formData.email}
                                />
                                {error.email && (
                                    <p className="text-red-500 text-sm text-left">
                                        {error.email}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="contact-box-form">
                            <h1>03</h1>
                            <div className="contact-form">
                                <label htmlFor="organization_name">
                                    What's the name of your organization?
                                </label>
                                <input
                                    type="text"
                                    id="organization_name"
                                    name="organization_name"
                                    placeholder="James & Smith Ltd"
                                    onChange={handleChange}
                                    value={formData.organization_name}
                                />
                                {error.organization_name && (
                                    <p className="text-red-500 text-sm text-left">
                                        {error.organization_name}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="contact-box-form">
                            <h1>04</h1>
                            <div className="contact-form">
                                <label htmlFor="subject">
                                    What’s the subject of your inquiry?
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    placeholder="Customer Service, Feedbacks..."
                                    onChange={handleChange}
                                    value={formData.subject}
                                />
                                {error.subject && (
                                    <p className="text-red-500 text-sm text-left">
                                        {error.subject}
                                    </p>
                                )}
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
                                    onChange={handleChange}
                                    value={formData.message}
                                />
                                {error.message && (
                                    <p className="text-red-500 text-sm text-left">
                                        {error.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        {successMessage && (
                            <p className="text-green-500 text-sm text-left">
                                {successMessage}
                            </p>
                        )}
                        {error.form && (
                            <p className="text-red-500 text-sm text-left">
                                {error.form}
                            </p>
                        )}

                        <button
                            type="submit"
                            className={`bg-accent hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded ${
                                loading
                                    ? "opacity-50 cursor-not-allowed bg-gray-200"
                                    : ""
                            }`}
                            disabled={loading}
                            onClick={handleSubmit}
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </div>

                    <div className="details-box">
                        <div className="details">
                            <h1>Contact Details</h1>
                            <p>
                                If you have any query, you can email to
                                info@kiwiexplorer.com <br />
                                or give us a call on +64 20 123 4567
                            </p>
                        </div>
                        <div className="details">
                            <h1>Project Details</h1>
                            <p>
                                MSE800 - Assessment 2 <br />
                                Auckland, New Zealand
                            </p>
                        </div>
                        <div className="details">
                            <h1>Socials</h1>
                            <div className="icons-container">
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FaFacebook size={24} />
                                </a>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FaInstagram size={24} />
                                </a>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FaTwitter size={24} />
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FaLinkedin size={24} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="w-full p-0">
                    <div className="w-full mt-[100px] mx-auto text-center flex flex-col items-center">
                        <h2 className="text-4xl font-bold text-gray-800">
                            Our Team
                        </h2>
                        <p className="text-base text-[#767676] mt-2  ">
                            “Our team is a passionate group of professionals
                            dedicated to innovation, collaboration, and
                            delivering exceptional results.”
                        </p>

                        <div
                            className={`flex ${
                                isMobile
                                    ? "flex-col space-y-8"
                                    : "justify-between"
                            } mt-8`}
                        >
                            {team.map((member, index) => (
                                <React.Fragment key={index}>
                                    <div className="bg-none rounded-xl p-6 border-1 border-black/10">
                                        <img
                                            src={member.image}
                                            alt=""
                                            className={`rounded-md m-auto ${
                                                isMobile
                                                    ? "w-64 h-64"
                                                    : "w-[350px] h-[350px]"
                                            }`}
                                            style={{ objectFit: "cover" }}
                                        />

                                        <h3
                                            className={`mt-4 ${
                                                isMobile ? "text-xl" : "text-lg"
                                            } font-semibold text-gray-800`}
                                        >
                                            {member.name}
                                        </h3>
                                        <p
                                            className={`text-gray-500 ${
                                                isMobile
                                                    ? "text-base"
                                                    : "text-sm"
                                            }`}
                                        >
                                            {member.role}
                                        </p>

                                        <div className="m-auto w-max flex gap-3 mt-4">
                                            <a
                                                href={member.linkedin}
                                                className="text-black hover:text-[#31AAB7]"
                                            >
                                                <FaLinkedin size={16} />
                                            </a>
                                            <a
                                                href={`mailto:${member.email}`}
                                                className="text-black hover:text-[#31AAB7]"
                                            >
                                                <FaEnvelope size={16} />
                                            </a>
                                            <a
                                                href={`tel:${member.phone}`}
                                                className="text-black hover:text-[#31AAB7]"
                                            >
                                                <FaPhone size={16} />
                                            </a>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ContactPage;
