import React from 'react';
import useScreenSize from '../hooks/useScreenSize';

import '../styles/ContactPage.css';
import aod from "../assets/aod01.jpg";
import terence from "../assets/terence.jpeg";
import wan from "../assets/about1.jpg";
import { FaLinkedin, FaEnvelope, FaPhone, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const ContactPage = () => {
  const team = [
    {
      name: "Anirut Puangkingkaew",
      role: "Project Leader/Full stack Developer",
      image: aod,
      linkedin: "#",
      email: "#",
      phone: "#"
    },
    {
      name: "Terence Lyle Borromeo",
      role: "UI/UX Designer/Front end Developer",
      image: terence,
      linkedin: "#",
      email: "#",
      phone: "#"
    },
    {
      name: "Phyo Maung Maung Wan",
      role: "Front end Developer",
      image: wan,
      linkedin: "#",
      email: "#",
      phone: "#"
    }
  ];

  const { isMobile } = useScreenSize();

  return (
    <div className="contact-page">

      <div className="contact-content">
        <div className="contact-txt">
          <div className="contact-text">
            <h1>Lorem Ipsum<br /><span className="bold-text">Dolor Sit Amet Cons</span></h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In laoreet elit posuere odio rutrum, eu vulputate magna fringilla. Curabitur ornare consequat ex, and interdum nibh aliquet vitae.</p>
          </div>
        </div>
        <div className="contact-form-details-box">
          <div className="contact-box">
            <div className="contact-box-form">
              <h1>01</h1>
              <div className="contact-form">
                <label htmlFor="fname">What's your name?</label>
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
                <label htmlFor="subject">What's the subject of your inquiry?</label>
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
              <p>If you have any query, you can email to info@kiwiexplorer.com <br />or give us a call on +64 20 123 4567</p>
            </div>
            <div className="details">
              <h1>Project Details</h1>
              <p>MSE800 - Assessment 2 <br />Auckland, New Zealand</p>
            </div>
            <div className="details">
              <h1>Socials</h1>
              <div className="icons-container">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
                  <FaFacebook size={24} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
                  <FaInstagram size={24} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
                  <FaTwitter size={24} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <section className="w-full p-0">
          <div className="w-full mt-[100px] mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800">Our Team</h2>
            <p className="text-base text-[#767676] mt-2">Lorem Ipsum Dolor Sit Amet Consectetur</p>

            <div className={`flex ${isMobile ? 'flex-col space-y-8' : 'justify-between'} mt-8`}>
              {team.map((member, index) => (
                <React.Fragment key={index}>

                  <div className="bg-none rounded-xl p-6 border-1 border-black/10">
                    <img
                      src={member.image}
                      alt=""
                      className={`rounded-md m-auto ${isMobile ? 'w-64 h-64' : 'w-[350px] h-[350px]'}`}
                      style={{ objectFit: 'cover' }}
                    />

                    <h3 className={`mt-4 ${isMobile ? 'text-xl' : 'text-lg'} font-semibold text-gray-800`}>{member.name}</h3>
                    <p className={`text-gray-500 ${isMobile ? 'text-base' : 'text-sm'}`}>{member.role}</p>

                    <div className="m-auto w-max flex gap-3 mt-4">
                      <a href={member.linkedin} className="text-black hover:text-[#31AAB7]">
                        <FaLinkedin size={16} />
                      </a>
                      <a href={`mailto:${member.email}`} className="text-black hover:text-[#31AAB7]">
                        <FaEnvelope size={16} />
                      </a>
                      <a href={`tel:${member.phone}`} className="text-black hover:text-[#31AAB7]">
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