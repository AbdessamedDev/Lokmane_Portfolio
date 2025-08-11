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
import { useSectionTitleAnimation } from "../../hooks/useSectionTitleAnimation"
import { socialLinks } from "../../assets/constants"


gsap.registerPlugin(ScrollTrigger, SplitText)

const ContactSection = () => {
    const sectionRef = useRef(null)
    const titleRef = useSectionTitleAnimation()
    const paragraphRef = useRef(null)
    const astronautRef = useRef(null)
    const contactInfoRefs = useRef([])
    const socialRef = useRef(null)
    const messageBoxRef = useRef(null)
    const getInTouchTitleRef = useRef(null)
    const followMeTitleRef = useRef(null)
    const { linkedIn, dribbble, behance } = socialLinks


    const isMobile = useMediaQuery({maxWidth: 767})

    useGSAP(() => {
        const section = sectionRef.current
        const paragraph = paragraphRef.current
        const astronaut = astronautRef.current

        // Split text elements
        const paragraphSplit = new SplitText(paragraph, {
            type: "lines",
            linesClass: "line-child"
        })

        // Set initial states
        gsap.set([getInTouchTitleRef.current, followMeTitleRef.current], {
            opacity: 0,
            y: 20
        })
        gsap.set(paragraphSplit.lines, {
            opacity: 0,
            y: 20
        })
        gsap.set(contactInfoRefs.current, {
            opacity: 0,
            y: 20
        })
        gsap.set(socialRef.current, {
            opacity: 0,
            y: 20
        })
        gsap.set(messageBoxRef.current, {
            opacity: 0,
            y: 20
        })
        gsap.set(astronaut, {
            opacity: 0,
            scale: 0.8
        })

        // Create master timeline
        const masterTl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: isMobile ? "top 50%" : "top 75%",
                end: "bottom 70%",
            }
        });


        // 1. "Get in touch" title first
        masterTl.to(getInTouchTitleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.7)"
        })

        // 2. Paragraph appears line by line
        masterTl.to(paragraphSplit.lines, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out"
        }, "+=0.2")

        // 3. Message box AND contact info cards appear simultaneously
        masterTl.to([messageBoxRef.current, ...contactInfoRefs.current], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: {
                each: 0.1,
                from: "start"
            },
            ease: "power2.out"
        }, "+=0.1")

        // 4. "Follow me" title appears
        masterTl.to(followMeTitleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.7)"
        }, "+=0.2")

        // 5. Social icons appear
        masterTl.to(socialRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out"
        }, "+=0.1")

        // Astronaut animation (independent timing)
        masterTl.to(astronaut, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.5")

        // Continuous astronaut floating animation
        gsap.to(astronaut, {
            y: -20,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        })

        return () => {
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
                <div className="w-full h-auto p-0 order-3 md:order-1 md:w-[552px]">
                    <h3
                        ref={getInTouchTitleRef}
                        className="font-fsp-stencil font-medium text-[12px] mb-[8px] text-white text-center md:text-xl md:mb-4 md:text-left"
                    >
                        Get in touch
                    </h3>
                    <p
                        ref={paragraphRef}
                        className="font-fsp-bold text-[8px] text-center mb-[20px] text-white md:text-sm md:text-left md:mb-8 md:w-full"
                    >
                        I'm always interested in new opportunities and exciting projects. Whether you have a question or just want
                        to say hi, I'll try my best to get back to you
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
                    <h3
                        ref={followMeTitleRef}
                        className="font-fsp-stencil font-medium text-[12px] mb-[10px] text-white text-center md:text-lg md:mb-4 md:text-left"
                    >
                        Follow me
                    </h3>
                    <div ref={socialRef} className="flex justify-center md:justify-start">
                        <a href={linkedIn} target="_blank">
                            <Social socialIcon={<FaLinkedinIn className="text-violet-primary size-5" />}/>
                        </a>
                        <a href={behance} target="_blank">
                            <Social socialIcon={<FaBehance className="text-violet-primary size-5" />}/>
                        </a>
                        <a href={dribbble} target="_blank">
                            <Social socialIcon={<FaDribbble className="text-violet-primary size-5" />}/>
                        </a>
                    </div>
                </div>

                {/* Block 2: Image */}
                <div className="w-[132px] h-[242px] order-1 md:order-2 md:w-[241px] md:h-auto md:mb-0">
                    <img
                        ref={astronautRef}
                        src="/images/contact/Astro_2.png"
                        alt="Astronaut 2"
                        className="w-full h-full object-contain md:object-cover"
                    />
                </div>

                {/* Block 3: Message Box */}
                <div className="md:mb-0 order-2 md:order-3" ref={messageBoxRef}>
                    <MessageBox isMobile={isMobile}/>
                </div>
            </div>
        </section>
    )
}

export default ContactSection