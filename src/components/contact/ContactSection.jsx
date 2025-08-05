"use client"
import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"
import ContactInfo from "./ContactInfo.jsx"
import Social from "./Social.jsx"
import { MdOutlineEmail } from "react-icons/md"
import { FiPhone } from "react-icons/fi"
import { GrLocation } from "react-icons/gr"
import { FaLinkedinIn } from "react-icons/fa6"
import { FaBehance, FaDribbble } from "react-icons/fa"
import MessageBox from "./MessageBox.jsx"
import { useMediaQuery } from "react-responsive"

gsap.registerPlugin(ScrollTrigger, SplitText)

const ContactSection = () => {
    const sectionRef = useRef(null)
    const titleRef = useRef(null)
    const paragraphRef = useRef(null)
    const astronautRef = useRef(null)
    const contactInfoRefs = useRef([])
    const socialRef = useRef(null)

    const isMobile = useMediaQuery({maxWidth: 767}) // Tailwind's md breakpoint is 768px

    useGSAP(() => {
        const section = sectionRef.current
        const title = titleRef.current
        const paragraph = paragraphRef.current
        const astronaut = astronautRef.current
        // Split text animations
        const titleSplit = new SplitText(title, { type: "chars" })
        const paragraphSplit = new SplitText(paragraph, { type: "lines" })
        // Set initial states
        gsap.set(titleSplit.chars, { opacity: 0, y: 50 })
        gsap.set(paragraphSplit.lines, { opacity: 0, y: 30 })
        gsap.set(contactInfoRefs.current, { opacity: 0, y: 30 })
        gsap.set(socialRef.current, { opacity: 0, y: 30 })
        gsap.set(astronaut, { opacity: 0, scale: 0.8 })
        // Entrance animation timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
            },
        })
        // Title letters animation
        tl.to(titleSplit.chars, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: "back.out(1.7)",
        })
            // Paragraph lines animation
            .to(
                paragraphSplit.lines,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                },
                "-=0.4",
            )
            // Contact info animation
            .to(
                contactInfoRefs.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                },
                "-=0.3",
            )
            // Social icons animation
            .to(
                socialRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                },
                "-=0.2",
            )
            // Astronaut animation
            .to(
                astronaut,
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                },
                "-=0.4",
            )
        // Astronaut floating animation
        gsap.to(astronaut, {
            y: -20,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
        })
        return () => {
            titleSplit.revert()
            paragraphSplit.revert()
        }
    }, [])
    return (
        <section id="contact" className="stars p-4 md:p-0" ref={sectionRef}>
            <h2 ref={titleRef} className="section-title">
                Ready to build something great together?
            </h2>
            <div className="contact-container flex flex-col gap-12 items-center md:w-[1680px] mx-auto md:flex-row md:gap-[168.5px]">
                {/* Block 1: Get in touch div (Contact Info + Socials) */}
                {/* Mobile: order-3, Desktop: order-1 */}
                <div className="w-full h-auto p-0 order-3 md:order-1 md:w-[552px]">
                    <h3 className="font-fsp-stencil font-medium text-[12px] mb-[8px] text-white text-center md:text-xl md:mb-4 md:text-left">
                        Get in touch
                    </h3>
                    <p
                        ref={paragraphRef}
                        className="font-fsp-bold text-[8px] text-center mb-[20px] text-white md:text-sm md:text-left md:mb-8 md:w-full"
                    >
                        I m always interested in new opportunities and exciting projects. Whether you have a question or just want
                        to say hi, I ll try my best to get back to you
                    </p>
                    <div ref={(el) => (contactInfoRefs.current[0] = el)}>
                        <ContactInfo
                            infoIcon={<MdOutlineEmail className="size-6" />}
                            infoTitle="Email"
                            infoContent="l.benhammadi@esi-sba.dz"
                        />
                    </div>
                    <div ref={(el) => (contactInfoRefs.current[1] = el)}>
                        <ContactInfo infoIcon={<FiPhone className="size-6" />} infoTitle="Phone" infoContent="+213 559 654 944" />
                    </div>
                    <div ref={(el) => (contactInfoRefs.current[2] = el)} className="mb-[16px]">
                        <ContactInfo infoIcon={<GrLocation className="size-6" />} infoTitle="Location" infoContent="Algeria" />
                    </div>
                    <h3 className="font-fsp-stencil font-medium text-[12px] mb-[10px] text-white text-center md:text-lg md:mb-4 md:text-left">
                        Follow me
                    </h3>
                    <div ref={socialRef} className="flex justify-center md:justify-start">
                        <Social socialIcon={<FaLinkedinIn className="text-violet-primary size-5" />} />
                        <Social socialIcon={<FaBehance className="text-violet-primary size-5" />} />
                        <Social socialIcon={<FaDribbble className="text-violet-primary size-5" />} />
                    </div>
                </div>

                {/* Block 2: Image */}
                {/* Mobile: order-1, Desktop: order-2 */}
                <div className="w-[132px] h-[242px] order-1 md:order-2 md:w-[241px] md:h-auto md:mb-0">
                    <img
                        ref={astronautRef}
                        src="/images/contact/Astro_2.png"
                        alt="Astronaut 2"
                        className="w-full h-full object-contain md:object-cover"
                    />
                </div>

                {/* Block 3: Message Box */}
                {/* Mobile: order-2, Desktop: order-3 */}
                <div className="md:mb-0 order-2 md:order-3">
                    <MessageBox isMobile={isMobile}/>
                </div>
            </div>
        </section>
    )
}
export default ContactSection
