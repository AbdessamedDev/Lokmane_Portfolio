"use client"

import { useEffect, useRef, useState } from "react"

// NOTE: we do NOT import gsap/TextPlugin at top — we'll dynamic import later
// import { gsap } from "gsap"
// import { TextPlugin } from "gsap/TextPlugin"

import PurpleButton from "./buttons/PurpleButton"
import WhiteButton from "./buttons/WhiteButton"

// Utility: requestIdleCallback fallback
const rIC = typeof window !== "undefined" && window.requestIdleCallback ? window.requestIdleCallback : (cb) => setTimeout(cb, 200)

export default function Hero() {
    const containerRef = useRef(null)
    const uiuxRef = useRef(null) // holder for initial simple text
    const designerRef = useRef(null)
    const lettersRefs = useRef({ uiux: [], designer: [] })
    const [upgraded, setUpgraded] = useState(false) // when true, render per-letter spans

    // Render plain text first — this is the LCP paint friendly state
    // After paint + idle we'll upgrade to per-letter DOM and lazy-load GSAP
    useEffect(() => {
        // Ensure browser has had a frame to paint SSR/initial HTML
        requestAnimationFrame(() => {
            // Defer heavy work until idle (or small timeout)
            rIC(async () => {
                // Upgrade DOM to per-letter mode (causes a re-render)
                setUpgraded(true)

                // Wait a tick so DOM updates and we can safely query elements
                await new Promise((res) => setTimeout(res, 0))

                // Dynamically import gsap only when needed
                const [{ gsap }, { TextPlugin }] = await Promise.all([
                    import(/* webpackChunkName: "gsap-core" */ "gsap"),
                    import(/* webpackChunkName: "gsap-text" */ "gsap/TextPlugin").catch(() => ({ TextPlugin: undefined })),
                ])

                // Register plugin if available
                if (TextPlugin) {
                    gsap.registerPlugin(TextPlugin)
                }

                // Run the exact same animation sequence you had (but after first paint)
                const firstRowAndButtons = containerRef.current.querySelectorAll(
                    ".content p:first-child, .content .button-container"
                )

                gsap.fromTo(
                    firstRowAndButtons,
                    { y: 20 },
                    { y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
                )

                const lastParagraph = containerRef.current.querySelector(".content p:last-of-type")
                if (lastParagraph) {
                    gsap.fromTo(lastParagraph, { y: 20 }, { y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" })
                }

                const allLetters = [
                    ...lettersRefs.current.uiux.filter(Boolean),
                    ...lettersRefs.current.designer.filter(Boolean),
                ]

                // ensure visible from first frame
                gsap.set(allLetters, { opacity: 1 })

                // small entrance glow — same visual as before
                allLetters.forEach((el) => (el.style.willChange = "text-shadow"))
                gsap.fromTo(
                    allLetters,
                    { y: 0, textShadow: "0 0 8px rgba(255,255,255,0.3)" },
                    {
                        y: 0,
                        textShadow: "0 0 12px rgba(255,255,255,0.6), 0 0 20px rgba(255,255,255,0.4)",
                        duration: 0.3,
                        stagger: 0.05,
                        delay: 0.4,
                        ease: "power2.out",
                        onComplete: () => {
                            gsap.to(allLetters, {
                                textShadow: "0 0 8px rgba(255,255,255,0.3)",
                                duration: 0.4,
                                delay: 0.2,
                                ease: "power2.out",
                                onComplete: () => allLetters.forEach((el) => (el.style.willChange = "auto")),
                            })
                        },
                    }
                )

                // attach simple hover listeners (no heavy reflow)
                function handleHoverIn(e) {
                    const el = e.currentTarget
                    el.style.willChange = "text-shadow, transform"
                    gsap.to(el, {
                        textShadow: "0 0 15px rgba(255,255,255,0.7), 0 0 25px rgba(255,255,255,0.5)",
                        duration: 0.15,
                        ease: "power2.out",
                        onComplete: () => (el.style.willChange = "auto"),
                    })
                }
                function handleHoverOut(e) {
                    const el = e.currentTarget
                    el.style.willChange = "text-shadow, transform"
                    gsap.to(el, {
                        textShadow: "0 0 8px rgba(255,255,255,0.3)",
                        duration: 0.15,
                        ease: "power2.out",
                        onComplete: () => (el.style.willChange = "auto"),
                    })
                }
                // add hover handlers
                allLetters.forEach((el) => {
                    el.addEventListener("mouseenter", handleHoverIn)
                    el.addEventListener("mouseleave", handleHoverOut)
                    // cleanup not strictly necessary here, component will unmount rarely
                })
            })
        })
    }, [])

    // Helper to render letters into refs after upgrade
    const renderLetters = (text, key) => {
        return text.split("").map((char, i) => (
            <span
                key={i}
                ref={(el) => (lettersRefs.current[key][i] = el)}
                className="letter-span inline-block transition-[text-shadow,transform] duration-200 ease-out"
                style={{ textShadow: "0 0 8px rgba(255,255,255,0.3)" }}
            >
        {char === " " ? "\u00A0" : char}
      </span>
        ))
    }

    // init arrays to avoid undefined when writing refs
    if (!lettersRefs.current.uiux) lettersRefs.current.uiux = []
    if (!lettersRefs.current.designer) lettersRefs.current.designer = []

    return (
        <section id="hero" className="stars" ref={containerRef}>
            <div className="content">
                <p>
                    Welcome, I<span className="font-serif">'</span>m{" "}
                    <span className="text-violet-primary">Benhammadi Lokmane</span>
                </p>

                <h1 className="shine-text" ref={uiuxRef}>
                    {/* If not upgraded yet, render plain text nodes (fast). */}
                    {!upgraded ? (
                        <>
                            UI UX<span className="hidden md:inline"> </span>
                            <br className="md:hidden" />
                            Designer
                        </>
                    ) : (
                        // After upgrade, render per-letter spans (same appearance) and populate refs
                        <>
                            {renderLetters("UI UX", "uiux")}
                            <span className="hidden md:inline"> </span>
                            <br className="md:hidden" />
                            {renderLetters("Designer", "designer")}
                        </>
                    )}
                </h1>

                <p>
                    <span className="text-violet-primary">Devoted</span> to turning ideas into reality through clean, intuitive
                    design.
                    <br />
                    Crafting seamless experiences that connect people with <br /> products in meaningful ways.
                </p>

                <div className="button-container flex md:flex-row flex-col items-center gap-4 md:gap-12">
                    <a href="#projects">
                        <PurpleButton className="btn-purple rounded-lg text-sm px-12 py-2 md:text-[28px] md:rounded-2xl md:px-7 md:py-4">
                            View My Work
                        </PurpleButton>
                    </a>
                    <a href="#contact">
                        <WhiteButton className="w-fit px-[58px] py-2 md:px-7 md:py-4 text-sm md:text-[28px] font-fsp-stencil font-medium rounded-lg md:rounded-2xl border-[1.5px] md:border-[3px] cursor-pointer text-center transition-all duration-300 bg-transparent border-white text-white hover:border-white/90 hover:shadow-[0_0_10px_rgba(255,255,255,0.5),inset_0_0_10px_rgba(255,255,255,0.3)] hover:[text-shadow:0_0_8px_rgba(255,255,255,0.6),_0_0_15px_rgba(255,255,255,0.4)]">
                            Get in Touch
                        </WhiteButton>
                    </a>
                </div>
            </div>
        </section>
    )
}
