import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { TextPlugin } from "gsap/TextPlugin"
import { useMediaQuery } from "react-responsive";

import PurpleButton from "./buttons/PurpleButton"
import WhiteButton from "./buttons/WhiteButton"

// Register the TextPlugin
gsap.registerPlugin(TextPlugin, useGSAP)

const Hero = () => {
    const h1Ref = useRef(null)
    const containerRef = useRef(null)
    const isMobile = useMediaQuery({ maxWidth: 767 })

    useGSAP(() => {
        // Select all text elements inside .content
        gsap.fromTo(
            containerRef.current.querySelectorAll(".content p, .content h1, .content a"),
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15, // delay between each element
                ease: "power2.out"
            }
        )

        // Your existing shine effect
        const h1Element = h1Ref.current
        if (h1Element) {
            gsap.set(h1Element, {
                backgroundPosition: "0% 0%",
                textShadow: "0 0 0 rgba(255,255,255,0)",
            })

            const tl = gsap.timeline({
                repeat: 0,
                repeatDelay: 0,
                onComplete: () => {
                    gsap.to(h1Element, {
                        duration: 0.2,
                        textShadow: "0 0 5px rgba(255,255,255,0.3)",
                        ease: "power2.out",
                    })
                },
            })

            tl.to(h1Element, {
                duration: 1,
                backgroundPosition: "200% 0%",
                textShadow:
                    "0 0 8px rgba(255,255,255,0.6), 0 0 15px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.4)",
                ease: "power2.inOut",
            })
                .to(h1Element, {
                    duration: 0.5,
                    textShadow:
                        "0 0 10px rgba(255,255,255,0.7), 0 0 15px rgba(255,255,255,0.6), 0 0 20px rgba(255,255,255,0.5)",
                    ease: "power2.inOut",
                })
                .to(h1Element, {
                    duration: 0.5,
                    backgroundPosition: "0% 0%",
                    textShadow: "0 0 5px rgba(255,255,255,0.3)",
                    ease: "power2.out",
                })

            h1Element.addEventListener("mouseenter", () => {
                gsap.to(h1Element, {
                    duration: 0.3,
                    textShadow:
                        "0 0 10px rgba(255,255,255,0.7), 0 0 15px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3)",
                    ease: "power2.out",
                })
            })

            h1Element.addEventListener("mouseleave", () => {
                gsap.to(h1Element, {
                    duration: 0.3,
                    textShadow: "0 0 5px rgba(255,255,255,0.3)",
                    ease: "power2.out",
                })
            })
        }
    }, { scope: containerRef })



    return (
        <>
            <section id="hero" className="stars" ref={containerRef}>
                <div className="content">
                    <p>
                        Welcome, I<span className="font-serif">'</span>m{" "}
                        <span className="text-violet-primary">Benhammadi Lokmane</span>
                    </p>
                    <h1 ref={h1Ref} className="shine-text">
                        UI UX {isMobile ? <br/> : ""} Designer
                    </h1>
                    <p>
                        <span className="text-violet-primary">Devoted</span> to turning ideas into reality through clean, intuitive
                        design.<br/>
                        Crafting seamless experiences that connect people with <br/> products in meaningful ways.
                    </p>
                    <div className="flex md:flex-row flex-col items-center gap-4 md:gap-12">
                        <a href="#projects">
                            <PurpleButton className="btn-purple rounded-lg text-sm px-12 py-2 md:text-[28px] md:rounded-2xl md:px-7 md:py-4">View My Work</PurpleButton>
                        </a>
                        <a href="#contact">
                            <WhiteButton className="w-fit px-[58px] py-2 md:px-7 md:py-4 text-sm md:text-[28px] font-fsp-stencil font-medium rounded-lg md:rounded-2xl border-[1.5px] md:border-[3px] cursor-pointer text-center transition-all duration-300 bg-transparent border-white text-white hover:border-white/90 hover:shadow-[0_0_10px_rgba(255,255,255,0.7),inset_0_0_10px_rgba(255,255,255,0.5)] hover:[text-shadow:0_0_10px_rgba(255,255,255,0.8),_0_0_20px_rgba(255,255,255,0.8),_0_0_30px_rgba(255,255,255,0.6)]">Get in Touch</WhiteButton>
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero