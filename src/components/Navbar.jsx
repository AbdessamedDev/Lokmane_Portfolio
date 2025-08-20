import React, { useState, useEffect, useRef } from 'react'
import { navLinks } from '../assets/constants/index.js'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(TextPlugin)

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('');
  const linksRef = useRef([]);
  const logoRef = useRef(null);

  // Watch scroll position with IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]"); // Make sure each section has an id

    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveLink(entry.target.id);
              window.history.replaceState(null, "", `#${entry.target.id}`); // Updates hash in URL
            }
          });
        },
        { threshold: 0.5 } // 50% of the section must be visible
    );

    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  // Effect to animate active link
  useEffect(() => {
    if (activeLink) {
      const activeLinkIndex = navLinks.findIndex(link => link.id === activeLink);

      linksRef.current.forEach((link, index) => {
        if (link) {
          gsap.killTweensOf(link);
          gsap.to(link, {
            duration: 0.3,
            color: 'white',
            textShadow: 'none',
            ease: 'power2.out'
          });
        }
      });

      if (activeLinkIndex !== -1 && linksRef.current[activeLinkIndex]) {
        const activeEl = linksRef.current[activeLinkIndex];
        gsap.to(activeEl, {
          duration: 0.5,
          color: '#fff',
          textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6), 0 0 30px rgba(255,255,255,0.4)',
          ease: 'power2.out'
        });

        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to(activeEl, {
          duration: 1.5,
          textShadow: '0 0 15px rgba(255,255,255,0.9), 0 0 25px rgba(255,255,255,0.7), 0 0 35px rgba(255,255,255,0.5)',
          ease: 'power2.inOut'
        });
      }
    }
  }, [activeLink]);

  // Logo animation
  useEffect(() => {
    if (logoRef.current) {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(logoRef.current, {
        duration: 2,
        rotation: 5,
        y: -5,
        ease: "sine.inOut"
      })
          .to(logoRef.current, {
            duration: 2,
            rotation: -5,
            y: 5,
            ease: "sine.inOut"
          });
    }
  }, []);

  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        start: "bottom top"
      }
    })
    navTween.fromTo("nav", { background: "transparent" }, {
      background: "#00000050",
      backdropFilter: "blur(10px)",
      duration: 1,
      ease: "power1.inOut"
    })
  }, [])

  return (
      <nav>
        <div>
          <a href="#hero" className="flex items-center gap-2 w-5 h-9 md:w-8 md:h-14">
            <img ref={logoRef} src="/images/global/Logo.svg" alt="logo" loading='lazy' />
          </a>

          <ul>
            {navLinks.map((link, index) => (
                <li key={link.id}>
                  <a
                      ref={el => linksRef.current[index] = el}
                      href={`#${link.id}`}
                      className={`nav-link ${activeLink === link.id ? 'active' : ''}`}
                  >
                    {link.title}
                  </a>
                </li>
            ))}
          </ul>
        </div>
      </nav>
  )
}

export default Navbar
