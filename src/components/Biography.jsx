"use client"
import { useRef, useState } from "react"
import { useMediaQuery } from "react-responsive"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import html2pdf from "html2pdf.js"
import PurpleButton from "./buttons/PurpleButton"
import astronautMobile from "/images/about/Astro_Mobile.png"
import astronautDesktop from "/images/about/Astro.webp"
import { useSectionTitleAnimation } from "../hooks/useSectionTitleAnimation.jsx"

// Register ScrollTrigger plugin once
gsap.registerPlugin(ScrollTrigger)

const Biography = () => {
    const astroRef = useRef(null)
    const titleRef = useSectionTitleAnimation()
    const sectionRef = useRef(null)
    const resumeRef = useRef(null)
    const purpleButtonRef = useRef(null) // Ref for the PurpleButton
    const [imageLoaded, setImageLoaded] = useState(false)
    const isMobile = useMediaQuery({ maxWidth: 767 })

    // Existing GSAP for astronaut floating animation
    useGSAP(
        () => {
            if (!astroRef.current || !sectionRef.current || !imageLoaded) return

            gsap.set(astroRef.current, {
                opacity: 1,
                willChange: "transform",
            })

            if (!isMobile) {
                const container = astroRef.current.parentElement
                const containerBounds = container.getBoundingClientRect()
                const imageBounds = astroRef.current.getBoundingClientRect()
                const maxX = containerBounds.width - imageBounds.width - 40
                const maxY = containerBounds.height - imageBounds.height - 40
                const initialX = Math.min(maxX * 0.7, maxX)
                const initialY = Math.max(20, maxY * 0.3)

                gsap.set(astroRef.current, {
                    x: initialX,
                    y: initialY,
                    rotation: 0,
                    transformOrigin: "center center",
                    force3D: true,
                })

                const floatAnimation = () => {
                    const currentX = gsap.getProperty(astroRef.current, "x")
                    const currentY = gsap.getProperty(astroRef.current, "y")
                    const safeMargin = 60
                    const minX = safeMargin
                    const maxSafeX = containerBounds.width - imageBounds.width - safeMargin
                    const minY = safeMargin
                    const maxSafeY = containerBounds.height - imageBounds.height - safeMargin

                    let moveX = (Math.random() - 0.5) * 50
                    let moveY = (Math.random() - 0.5) * 35

                    const newX = currentX + moveX
                    const newY = currentY + moveY

                    if (newX < minX || newX > maxSafeX) {
                        moveX = -moveX * 0.7
                    }
                    if (newY < minY || newY > maxSafeY) {
                        moveY = -moveY * 0.7
                    }

                    const rotationAmount = (Math.random() - 0.5) * 10
                    const duration = 4 + Math.random()

                    gsap.to(astroRef.current, {
                        x: `+=${moveX}`,
                        y: `+=${moveY}`,
                        rotation: `+=${rotationAmount}`,
                        duration: duration,
                        ease: "power2.inOut",
                        force3D: true,
                        onComplete: floatAnimation,
                    })
                }
                gsap.delayedCall(0.5, floatAnimation)
            }
        },
        { dependencies: [imageLoaded, isMobile], scope: sectionRef },
    )

    // New GSAP for Biography section entry animation and image scroll effect
    useGSAP(
        () => {
            if (!sectionRef.current || !resumeRef.current || !purpleButtonRef.current || !astroRef.current) return

            // Timeline for paragraph and button animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center", // When the top of the section hits the center of the viewport
                    once: true, // Play animation only once
                },
            })

            // Initial state for paragraph lines and button
            gsap.set(resumeRef.current.children, { opacity: 0, y: 20 })
            gsap.set(purpleButtonRef.current, { opacity: 0, y: 20 })

            // Animate paragraph lines (each span)
            tl.to(resumeRef.current.children, {
                opacity: 1,
                y: 0,
                stagger: 0.2, // Stagger the animation for each line
                duration: 0.8,
                ease: "power2.out",
            })

            // Animate purple button after paragraph lines
            tl.to(
                purpleButtonRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    delay: 0.3, // Small delay after lines finish
                },
                "<0.5",
            ) // Start 0.5 seconds before the end of the previous animation (staggered lines)

            // Astronaut image scroll effect
            gsap.to(astroRef.current, {
                scale: 0.7, // Image becomes smaller
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top", // When the top of the section hits the top of the viewport
                    end: "bottom center", // When the bottom of the section hits the center of the viewport
                    scrub: true, // Link animation to scroll position
                    // markers: true, // Uncomment for debugging ScrollTrigger
                },
            })
        },
        { scope: sectionRef, dependencies: [imageLoaded] },
    ) // Add imageLoaded as dependency for scroll effect

    const downloadResume = () => {
        if (!resumeRef.current) return

        const container = document.createElement("div")
        container.style.cssText = `
        padding: 40px;
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        background: white;
    `

        // Title
        const title = document.createElement("h1")
        title.textContent = "About Lokmane BENHAMMADI"
        title.style.cssText = `
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 10px;
        text-align: center;
        color: #633EB7;
        border-bottom: 3px solid #633EB7;
        padding-bottom: 15px;
        letter-spacing: 1px;
    `
        container.appendChild(title)

        // Subtitle
        const subtitle = document.createElement("h2")
        subtitle.textContent = "UI/UX Designer & Creative Professional"
        subtitle.style.cssText = `
        font-size: 18px;
        font-weight: normal;
        margin-bottom: 25px;
        text-align: center;
        color: #666;
        font-style: italic;
    `
        container.appendChild(subtitle)

        // Clone resume content
        const content = resumeRef.current.cloneNode(true)
        content.style.cssText = `
        font-size: 16px;
        line-height: 1.8;
        text-align: left;
        margin: 0 auto 20px;
        width: 100%;
        white-space: normal;
        word-break: break-word;
    `
        // Fix highlighted text
        content.querySelectorAll(".text-violet-primary").forEach(el => {
            el.style.cssText = `
            color: #633EB7;
            font-weight: bold;
            display: inline;
        `
        })
        container.appendChild(content)

        // Footer
        const footer = document.createElement("div")
        footer.style.cssText = `
        margin-top: 40px;
        padding-top: 20px;
        border-top: 1px solid #ddd;
        text-align: center;
        font-size: 12px;
        color: #888;
    `
        footer.innerHTML = `
        <p>Generated on ${new Date().toLocaleDateString()}</p>
        <p>Contact: Higher School of Computer Science, Sidi Bel Abbes</p>
    `
        container.appendChild(footer)

        // ✅ PDF options (removed unsupported hotfixes)
        const opt = {
            margin: 20,
            filename: "Lokmane_BENHAMMADI_Resume.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
            },
            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait",
            },
        }

        // ✅ Ensure async PDF generation works properly
        html2pdf()
            .set(opt)
            .from(container)
            .save()
            .then(() => {
                console.log("✅ PDF saved successfully")
            })
            .catch(err => {
                console.error("❌ PDF generation failed:", err)
            })
    }

    const handleImageLoad = () => {
        setImageLoaded(true)
    }

    return (
        <section id="about" className="stars" ref={sectionRef}>
            <div className="w-full flex justify-center -mb-16 md:-mb-80">
                <h2 ref={titleRef} className="section-title inline-block whitespace-normal overflow-visible">
                    Who<span className="font-serif">'</span>s behind the designs and prototypes?
                </h2>
            </div>
            <div className="flex items-center md:flex-row flex-col-reverse md:gap-[152px] gap-11">
                <div className="text-center md:text-left">
                    <p
                        ref={resumeRef}
                        className="w-[358px] md:w-[967px] font-fsp-bold text-[10px] md:text-2xl font-normal leading-[1.8] mb-4 md:mb-8"
                    >
            <span className="block">
              I<span className="font-serif">'</span>m a passionate UI UX designer with a sharp eye for detail and a love
              for intuitive, user centred design.
            </span>
                        <span className="block">
              Currently studying at the Higher School of Computer Science in Sidi Bel Abbes, I blend creativity with
              clear thinking to turn ideas into clean, functional products.
            </span>
                        <span className="block">
              I<span className="font-serif">'</span>ve worked on projects like{" "}
                            <span className="text-violet-primary">Dirasati</span> and{" "}
                            <span className="text-violet-primary">Dorouscom</span>, collaborating with developers and building a solid
              understanding of real world implementation. My work spans research, wireframing, prototyping, and visual
              design all focused on creating experiences that truly work for users.
            </span>
                    </p>
                    <PurpleButton
                        onClick={downloadResume}
                        className="btn-purple text-xs px-[10px] py-[6px] rounded-md md:text-xl md:py-4 md:px-7 md:rounded-2xl"
                        ref={purpleButtonRef} // Attach ref to the button
                    >
                        Download resume
                    </PurpleButton>
                </div>
                <div className="relative w-fit">
                    <img
                        ref={astroRef}
                        src={isMobile ? astronautMobile : astronautDesktop}
                        alt="Floating astronaut"
                        onLoad={handleImageLoad}
                        className="w-[168px] md:w-[660px] h-auto object-contain"
                        style={{ opacity: 0 }}
                    />
                </div>
            </div>
        </section>
    )
}

export default Biography
