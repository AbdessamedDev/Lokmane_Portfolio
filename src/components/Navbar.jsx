import React, { useState, useEffect, useRef } from 'react'
import { navLinks } from '../assets/constants/index.js'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

// Register the TextPlugin
gsap.registerPlugin(TextPlugin)

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('');
  const linksRef = useRef([]);
  const logoRef = useRef(null);

  // Handle hash changes on initial load and from browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1); // Remove the #
      if (hash && navLinks.some(link => link.id === hash)) {
        setActiveLink(hash);
      }
    };

    // Check initial hash
    handleHashChange();

    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Effect to animate active link and reset non-active links
  useEffect(() => {
    if (activeLink) {
      // Find the active link
      const activeLinkIndex = navLinks.findIndex(link => link.id === activeLink);

      // Reset all links first to remove any animations
      linksRef.current.forEach((link, index) => {
        if (link) {
          // Reset all links to normal state
          gsap.killTweensOf(link); // Kill any ongoing animations
          gsap.to(link, {
            duration: 0.3,
            color: 'white',
            textShadow: 'none',
            ease: 'power2.out'
          });
        }
      });

      // Apply styles only to the active link
      if (activeLinkIndex !== -1 && linksRef.current[activeLinkIndex]) {
        const activeLink = linksRef.current[activeLinkIndex];

        // Create a shine effect on the active link
        gsap.to(activeLink, {
          duration: 0.5,
          color: '#fff',
          textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6), 0 0 30px rgba(255,255,255,0.4)',
          ease: 'power2.out'
        });

        // Create a pulsating animation
        const tl = gsap.timeline({
          repeat: -1,
          yoyo: true
        });

        tl.to(activeLink, {
          duration: 1.5,
          textShadow: '0 0 15px rgba(255,255,255,0.9), 0 0 25px rgba(255,255,255,0.7), 0 0 35px rgba(255,255,255,0.5)',
          ease: 'power2.inOut'
        });
      }
    }
  }, [activeLink]);

  // Add animation for the logo
  useEffect(() => {
    if (logoRef.current) {
      // Create a smooth animation for the logo
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

    navTween.fromTo("nav", {background: "transparent"}, {
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
                      onClick={(e) => {
                        setActiveLink(link.id); // Set this link as active
                        // Allow default behavior to handle the hash navigation
                      }}
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