import React from 'react';
import ContactInfo from "./ContactInfo.jsx";
import Social from "./Social.jsx";

import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaBehance, FaDribbble } from "react-icons/fa";

import Astro_2 from "/images/contact/Astro_2.png";

const ContactSection = () => {
  return (
    <section id="contact" className="stars">
        <h2 className="section-title">Ready to build something great together?</h2>
        <div className="contact-container">
            <div className="md:w-[552px]">
                <h3 className="font-fsp-stencil font-medium md:text-xl text-white md:mb-4">Get in touch</h3>
                <p className="font-fsp-bold md:text-sm text-white md:mb-8 md:w-full">
                    I m always interested in new opportunities and exciting projects. Whether  you  have a question or just want
                    to say hi, I ll try my best to get back to you
                </p>
                <ContactInfo infoIcon={<MdOutlineEmail className="size-6"/>} infoTitle="Email" infoContent="l.benhammadi@esi-sba.dz"/>
                <ContactInfo infoIcon={<FiPhone className="size-6"/>} infoTitle="Phone" infoContent="+213 559 654 944"/>
                <ContactInfo infoIcon={<GrLocation className="size-6"/>} infoTitle="Location" infoContent="Algeria"/>
                <h3 className="font-fsp-stencil font-medium md:text-lg text-white md:mb-4">Follow me</h3>
                <div className="flex">
                    <Social socialIcon={<FaLinkedinIn className="text-violet-primary size-6"/>}/>
                    <Social socialIcon={<FaBehance className="text-violet-primary size-6"/>}/>
                    <Social socialIcon={<FaDribbble className="text-violet-primary size-6"/>}/>
                </div>
            </div>
            <div className="md:w-[241px] overflow-hidden">
                <img src={Astro_2} alt="Astronaut 2" className="w-full"/>
            </div>
            <div></div>
        </div>
    </section>
  );
};

export default ContactSection;
