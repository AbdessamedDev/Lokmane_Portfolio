
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"
import PurpleButton from "./buttons/PurpleButton"
import WhiteButton from "./buttons/WhiteButton"

// Register the TextPlugin
gsap.registerPlugin(TextPlugin)

const Hero = () => {
    const h1Ref = useRef(null)

    useEffect(() => {
        // Create a shine effect on the h1 element that only runs once on page load
        const h1Element = h1Ref.current
        if (h1Element) {
            // Initial setup
            gsap.set(h1Element, {
                backgroundPosition: "0% 0%",
                textShadow: "0 0 0 rgba(255,255,255,0)",
            })

            // Create a timeline for the shine effect that only runs once on page load
            const tl = gsap.timeline({
                repeat: 0, // Run only once
                repeatDelay: 0,
                onComplete: () => {
                    // Reset to normal state after animation completes
                    gsap.to(h1Element, {
                        duration: 0.2,
                        textShadow: "0 0 5px rgba(255,255,255,0.3)",
                        ease: "power2.out",
                    })
                },
            })

            // Animate the text shadow to create a subtle shine effect
            tl.to(h1Element, {
                duration: 1,
                backgroundPosition: "200% 0%",
                textShadow: "0 0 8px rgba(255,255,255,0.6), 0 0 15px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.4)",
                ease: "power2.inOut",
            })
                .to(h1Element, {
                    duration: 0.5,
                    textShadow: "0 0 10px rgba(255,255,255,0.7), 0 0 15px rgba(255,255,255,0.6), 0 0 20px rgba(255,255,255,0.5)",
                    ease: "power2.inOut",
                })
                .to(h1Element, {
                    duration: 0.5,
                    backgroundPosition: "0% 0%",
                    textShadow: "0 0 5px rgba(255,255,255,0.3)",
                    ease: "power2.out",
                })

            // Add hover effect with subtle shine (without scale)
            h1Element.addEventListener("mouseenter", () => {
                gsap.to(h1Element, {
                    duration: 0.3,
                    textShadow: "0 0 10px rgba(255,255,255,0.7), 0 0 15px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3)",
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
    }, [])

    return (
        <>
            <section id="hero" className="stars">
                <div className="content">
                    <p>
                        Welcome, I<span className="font-serif">'</span>m{" "}
                        <span className="text-violet-primary">Benhammadi Lokmane</span>
                    </p>
                    <h1 ref={h1Ref} className="shine-text">
                        UI UX Designer
                    </h1>
                    <p className="borderr">
                        <span className="text-violet-primary">Devoted</span> to turning ideas into reality through clean, intuitive
                        design. <br />
                        Crafting seamless experiences that connect people with <br /> products in meaningful ways.
                    </p>
                    <div className="flex items-center gap-12">
                        <PurpleButton>View My Work</PurpleButton>
                        <WhiteButton>Get in Touch</WhiteButton>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero
