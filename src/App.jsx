import React from 'react';
import { ScrollTrigger, SplitText } from 'gsap/all';
import gsap from "gsap";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Animate from "./components/ui/Animate.jsx";
import Biography from "./components/Biography.jsx";
import Projects from "./components/Projects/Projects.jsx";
import SkillsSection from "./components/skills/SkillsSection.jsx";
import TestimonialsSection from "./components/testimonials/TestimonialsSection.jsx";
import ContactSection from "./components/contact/ContactSection.jsx";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <main>
    <Navbar/>
        <Hero/>
        <Animate/>
        <Biography/>
        <Projects/>
        <SkillsSection/>
        <TestimonialsSection/>
        <ContactSection/>
    </main>
  );
};

export default App;
