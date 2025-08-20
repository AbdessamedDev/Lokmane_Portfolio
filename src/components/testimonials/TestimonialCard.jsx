"use client"
import { useRef, useEffect, useState } from "react"
import { useMediaQuery } from "react-responsive"
import rating_star from "/images/testimonials/Rating_Star.png"
import { CiStar } from "react-icons/ci"

const TestimonialCard = ({ image, fullName, job, description, rating = 4 }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [showReadMore, setShowReadMore] = useState(false)
    const [paragraphOpacity, setParagraphOpacity] = useState(1)
    const paragraphRef = useRef(null)
    const headerRef = useRef(null)
    const containerRef = useRef(null)

    const isMobile = useMediaQuery({ maxWidth: 767 }) // Corresponds to Tailwind's 'md' breakpoint

    useEffect(() => {
        const checkOverflow = () => {
            if (!paragraphRef.current || !containerRef.current) return
            const paragraph = paragraphRef.current
            const container = containerRef.current

            // Reset to check natural height
            paragraph.style.maxHeight = "none"
            paragraph.style.overflow = "visible"

            const headerHeight = headerRef.current?.offsetHeight || 0
            const cardVerticalPadding = isMobile ? 14 * 2 : 24 * 2 // 14px * 2 for mobile, 24px * 2 for desktop
            const availableHeight = container.offsetHeight - headerHeight - cardVerticalPadding
            const paragraphHeight = paragraph.scrollHeight

            if (paragraphHeight > availableHeight) {
                setShowReadMore(true)
                paragraph.style.maxHeight = `${availableHeight}px`
                paragraph.style.overflow = "hidden"
            } else {
                setShowReadMore(false)
            }
        }
        checkOverflow()
        window.addEventListener("resize", checkOverflow)
        return () => window.removeEventListener("resize", checkOverflow)
    }, [description, isMobile])

    const handleReadMoreClick = () => {
        if (!paragraphRef.current || !headerRef.current) return
        setIsExpanded(true)
        const paragraph = paragraphRef.current
        const headerHeight = headerRef.current.offsetHeight
        const cardVerticalPadding = isMobile ? 14 * 2 : 24 * 2 // 14px * 2 for mobile, 24px * 2 for desktop
        const availableHeight = containerRef.current.offsetHeight - headerHeight - cardVerticalPadding
        paragraph.style.maxHeight = `${availableHeight}px`
        paragraph.style.overflow = "auto"
        paragraph.style.scrollBehavior = "smooth"
    }

    const handleParagraphScroll = (e) => {
        if (!headerRef.current || !isExpanded) return
        const scrollTop = e.target.scrollTop
        const cardTopPadding = isMobile ? 14 : 24 // 14px for mobile, 24px for desktop
        const headerBottom = headerRef.current.offsetHeight + cardTopPadding
        // Calculate opacity based on scroll position
        // When scrollTop reaches headerBottom, opacity should be 50%
        const maxScroll = headerBottom
        const opacityReduction = Math.min(scrollTop / maxScroll, 0.5)
        const newOpacity = 1 - opacityReduction
        setParagraphOpacity(Math.max(0.5, newOpacity))
    }

    return (
        <div
            ref={containerRef}
            className={`
                ${isMobile ? "w-[358px] h-[201px] p-[14px]" : "w-[579px] h-[339px] p-6"}
                bg-blue-night rounded-lg border border-violet-500/30 backdrop-blur-sm relative
            `}
        >
            <div ref={headerRef} className="w-full flex items-center justify-between mb-2 md:mb-4">
                <div className="flex items-center gap-5 md:gap-8">
                    <div className="w-12 h-12 md:w-20 md:h-20 rounded-full overflow-hidden">
                        <img
                            src={
                                image ||
                                `/placeholder.svg?height=${isMobile ? 48 : 80}&width=${isMobile ? 48 : 80}&query=profile%20picture`
                            }
                            className="w-full h-full object-cover"
                            alt="profile image"
                        />
                    </div>
                    <div>
                        <span className="block text-xs md:text-lg font-medium font-poppins-medium text-white">{fullName}</span>
                        <span className="text-[8px] md:text-sm font-thin font-poppins-medium text-gray-300">{job}</span>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2">
                    {[...Array(+rating)].map((_, index) => (
                        <img
                            key={index}
                            src={rating_star || "/placeholder.svg"}
                            className="w-[15px] h-[14px] md:w-6 md:h-6"
                            alt="rating star"
                        />
                    ))}
                    {[...Array(5 - rating)].map((_, index) => (
                        <div key={index} className="w-[15px] h-[14px] md:w-7 md:h-7 -mt-0.5 text-violet-primary">
                            <CiStar className="size-full" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative">
                <p
                    ref={paragraphRef}
                    className="w-full text-xs md:text-xl font-medium font-montserrat text-gray-100 leading-relaxed transition-opacity duration-300"
                    style={{
                        opacity: paragraphOpacity,
                        scrollbarWidth: "thin",
                        scrollbarColor: "#8b5cf6 transparent",
                    }}
                    onScroll={handleParagraphScroll}
                >
                    {description}
                </p>
                {showReadMore && !isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-blue-night to-transparent flex items-end justify-center">
                        <button
                            onClick={handleReadMoreClick}
                            className="text-violet-400 hover:text-violet-300 transition-colors duration-200 text-2xl font-bold cursor-pointer bg-blue-night px-2"
                            aria-label="Read more"
                        >
                            ...
                        </button>
                    </div>
                )}
            </div>
            <style>{`
                p::-webkit-scrollbar {
                    width: 4px;
                }
                p::-webkit-scrollbar-track {
                    background: transparent;
                }
                p::-webkit-scrollbar-thumb {
                    background: #8b5cf6;
                    border-radius: 2px;
                }
                p::-webkit-scrollbar-thumb:hover {
                    background: #7c3aed;
                }
            `}</style>
        </div>
    )
}
export default TestimonialCard
