"use client"
import { useRef, useEffect, useState } from "react"
import { useMediaQuery } from "react-responsive"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import TestimonialCard from "./testimonialCard.jsx"
import { testimonials } from "../../assets/constants/index.js"
import "./testimonials.css"

gsap.registerPlugin(ScrollTrigger)

const TestimonialsSection = () => {
    const sectionRef = useRef(null)
    const sliderRef = useRef(null)
    const [currentDot, setCurrentDot] = useState(0)
    const [isScrolling, setIsScrolling] = useState(false)

    const isMobile = useMediaQuery({ maxWidth: 767 }) // Corresponds to Tailwind's 'md' breakpoint

    useGSAP(() => {
        // Entrance animation
        gsap.fromTo(
            sectionRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                },
            },
        )
    }, [])

    const updateOpacity = () => {
        if (!sliderRef.current) return
        const slider = sliderRef.current
        const cards = slider.children
        const viewportWidth = window.innerWidth

        Array.from(cards).forEach((card) => {
            const cardRect = card.getBoundingClientRect()
            const cardCenter = cardRect.left + cardRect.width / 2
            const viewportCenter = viewportWidth / 2
            // Calculate distance from viewport center
            const distance = Math.abs(cardCenter - viewportCenter)
            const maxDistance = viewportWidth / 2 + cardRect.width / 2
            // Calculate opacity (1 at center, 0 at edges)
            let opacity = 1 - distance / maxDistance
            opacity = Math.max(0, Math.min(1, opacity))
            // Apply smooth opacity transition
            card.style.opacity = opacity
            card.style.transform = `scale(${0.8 + opacity * 0.2})`
        })

        // Update current dot based on scroll position - adjusted for padding
        const cardBaseWidth = isMobile ? 358 : 579
        const cardGap = 32 // gap-8 is 32px
        const cardWidthWithGap = cardBaseWidth + cardGap

        const adjustedScrollLeft = slider.scrollLeft
        const currentIndex = Math.round(adjustedScrollLeft / cardWidthWithGap)
        setCurrentDot(Math.max(0, Math.min(4, currentIndex)))
    }

    const scrollToSection = (index) => {
        if (!sliderRef.current || isScrolling) return
        setIsScrolling(true)
        const slider = sliderRef.current

        const cardBaseWidth = isMobile ? 358 : 579
        const cardGap = 32 // gap-8 is 32px
        const cardWidthWithGap = cardBaseWidth + cardGap
        const halfCardWidth = cardBaseWidth / 2

        const paddingLeft = window.innerWidth / 2 - halfCardWidth

        slider.scrollTo({
            left: index * cardWidthWithGap,
            behavior: "smooth",
        })
        setTimeout(() => setIsScrolling(false), 500)
    }

    useEffect(() => {
        const slider = sliderRef.current
        if (!slider) return
        const handleScroll = () => {
            requestAnimationFrame(updateOpacity)
        }
        const handleResize = () => {
            requestAnimationFrame(updateOpacity)
        }
        slider.addEventListener("scroll", handleScroll, { passive: true })
        window.addEventListener("resize", handleResize, { passive: true })
        // Initial opacity update
        updateOpacity()
        return () => {
            slider.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", handleResize)
        }
    }, [isMobile]) // Re-run effect when isMobile changes to update calculations

    const halfCardWidthForPadding = isMobile ? 358 / 2 : 289.5 // 289.5 is 579 / 2

    return (
        <section ref={sectionRef} id="testimonials" className="stars py-20 overflow-hidden">
            <h2 className="section-title">
                What<span className="font-serif">'</span>s it like to work with me?
            </h2>
            <div
                ref={sliderRef}
                className="flex gap-8 overflow-x-auto scrollbar-hide"
                style={{
                    scrollSnapType: "x mandatory",
                    WebkitOverflowScrolling: "touch",
                    paddingLeft: `calc(50vw - ${halfCardWidthForPadding}px)`,
                    paddingRight: `calc(50vw - ${halfCardWidthForPadding}px)`,
                }}
            >
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="flex-shrink-0" style={{ scrollSnapAlign: "center" }}>
                        <TestimonialCard {...testimonial} />
                    </div>
                ))}
            </div>
            {/* Dots Navigation */}
            <div className="flex justify-center items-center gap-3 mt-12 md:mt-32">
                {[...Array(5)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollToSection(index)}
                        className={`
                            ${isMobile ? "w-4 h-4" : "w-6 h-6"}
                            rounded-full transition-all duration-300 ${
                            currentDot === index ? "bg-violet-500 scale-125" : "bg-white hover:bg-white/70"
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    )
}
export default TestimonialsSection
