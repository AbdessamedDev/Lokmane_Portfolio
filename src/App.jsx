import React from 'react';
import { ScrollTrigger, SplitText } from 'gsap/all';
import gsap from "gsap";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Animate from "./components/Animate.jsx";
import Biography from "./components/Biography.jsx";
import Projects from "./components/Projects/Projects.jsx";
import SkillsSection from "./components/skills/SkillsSection.jsx";

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
    </main>
  );
};

export default App;
