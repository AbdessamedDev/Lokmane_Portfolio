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
    const titleRef = useRef(null)
    const sliderRef = useRef(null)
    const [currentDot, setCurrentDot] = useState(0)
    const [isScrolling, setIsScrolling] = useState(false)

    const isMobile = useMediaQuery({ maxWidth: 767 })

    const createCircularTestimonials = () => {
        return [...testimonials, ...testimonials, ...testimonials]
    }

    const circularTestimonials = createCircularTestimonials()
    const originalLength = testimonials.length

    useGSAP(() => {
        // Entrance animation for section
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
                },
            },
        )

        // Title animation
        if (titleRef.current) {
            gsap.fromTo(
                titleRef.current,
                {
                    opacity: 0,
                    y: 30,
                    scale: 0.95,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none reverse",
                    },
                },
            )
        }
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
            const distance = Math.abs(cardCenter - viewportCenter)
            const maxDistance = viewportWidth / 2 + cardRect.width / 2
            let opacity = 1 - distance / maxDistance
            opacity = Math.max(0, Math.min(1, opacity))
            card.style.opacity = opacity
            card.style.transform = `scale(${0.8 + opacity * 0.2})`
        })

        const cardBaseWidth = isMobile ? 358 : 579
        const cardGap = 32
        const cardWidthWithGap = cardBaseWidth + cardGap

        const adjustedScrollLeft = slider.scrollLeft
        const currentIndex = Math.round(adjustedScrollLeft / cardWidthWithGap)

        let dotIndex = (currentIndex - originalLength) % originalLength
        if (dotIndex < 0) dotIndex += originalLength

        const testimonialsPerSection = originalLength / 5
        const currentSection = Math.floor(dotIndex / testimonialsPerSection)
        setCurrentDot(Math.min(4, currentSection)) // Ensure it doesn't exceed 4 (0-4 range)

        const totalCards = circularTestimonials.length
        const firstSectionEnd = originalLength * cardWidthWithGap
        const lastSectionStart = (totalCards - originalLength) * cardWidthWithGap

        // If we're too close to the beginning, jump to equivalent position in middle section
        if (adjustedScrollLeft < firstSectionEnd * 0.1) {
            const equivalentPosition = adjustedScrollLeft + originalLength * cardWidthWithGap
            slider.scrollLeft = equivalentPosition
        }
        // If we're too close to the end, jump to equivalent position in middle section
        else if (adjustedScrollLeft > lastSectionStart + originalLength * cardWidthWithGap * 0.9) {
            const equivalentPosition = adjustedScrollLeft - originalLength * cardWidthWithGap
            slider.scrollLeft = equivalentPosition
        }
    }

    const scrollToSection = (sectionIndex) => {
        if (!sliderRef.current || isScrolling) return
        setIsScrolling(true)
        const slider = sliderRef.current

        const cardBaseWidth = isMobile ? 358 : 579
        const cardGap = 32
        const cardWidthWithGap = cardBaseWidth + cardGap

        // Calculate which testimonial starts each section (20% chunks)
        const testimonialsPerSection = originalLength / 5
        const testimonialIndex = Math.floor(sectionIndex * testimonialsPerSection)
        const targetIndex = originalLength + testimonialIndex

        slider.scrollTo({
            left: targetIndex * cardWidthWithGap,
            behavior: "smooth",
        })
        setTimeout(() => setIsScrolling(false), 500)
    }

    useEffect(() => {
        const slider = sliderRef.current
        if (!slider) return

        const cardBaseWidth = isMobile ? 358 : 579
        const cardGap = 32
        const cardWidthWithGap = cardBaseWidth + cardGap

        slider.scrollLeft = originalLength * cardWidthWithGap

        const handleScroll = () => {
            requestAnimationFrame(updateOpacity)
        }
        const handleResize = () => {
            requestAnimationFrame(updateOpacity)
        }

        slider.addEventListener("scroll", handleScroll, { passive: true })
        window.addEventListener("resize", handleResize, { passive: true })

        // Initial opacity update after setting scroll position
        setTimeout(() => updateOpacity(), 100)

        return () => {
            slider.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", handleResize)
        }
    }, [isMobile])

    const halfCardWidthForPadding = isMobile ? 358 / 2 : 289.5

    return (
        <section ref={sectionRef} id="testimonials" className="stars py-20 overflow-hidden">
            <h2 className="section-title" ref={titleRef}>
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
                {circularTestimonials.map((testimonial, index) => (
                    <div key={`${index}-${testimonial.name}`} className="flex-shrink-0" style={{ scrollSnapAlign: "center" }}>
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
                        aria-label={`Go to section ${index + 1} of testimonials`}
                    />
                ))}
            </div>
        </section>
    )
}
export default TestimonialsSection
