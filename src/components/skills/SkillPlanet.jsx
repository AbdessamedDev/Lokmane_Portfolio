"use client"
import { useState, useEffect, useRef } from "react"
import "./skill_planet.css"

const SkillPlanet = ({ sizes, infos, dimensions, index, isParentMobile }) => {
    const [isHovering, setIsHovering] = useState(false)
    const [floatOffset, setFloatOffset] = useState(0)
    const animationRef = useRef(null)

    // Determine mobile size classes based on index for the big/small pattern
    // (index % 4 === 0 || index % 4 === 3) -> big
    // (index % 4 === 1 || index % 4 === 2) -> small
    const isBigMobile = index % 4 === 0 || index % 4 === 3
    const mobileImageClasses = isBigMobile ? "w-[141px] h-[141px]" : "w-[95px] h-[95px]"
    // These classes correctly apply text-sm (14px) and text-[9px]
    const mobileTextClasses = isBigMobile ? "text-sm mt-3" : "text-[9px] mt-[6px]"

    // Floating animation
    useEffect(() => {
        const amplitude = 5 + (index % 3) * 2 // Different float distance for each planet
        const speed = 0.005 + (index % 3) * 0.001 // Different speed for each planet
        let angle = 0
        const animate = () => {
            angle += speed
            const offset = Math.sin(angle) * amplitude
            setFloatOffset(offset)
            animationRef.current = requestAnimationFrame(animate)
        }
        animationRef.current = requestAnimationFrame(animate)
        return () => {
            cancelAnimationFrame(animationRef.current)
        }
    }, [index])

    return (
        <div
            className={`
                planet-container planet-${index} flex flex-col items-center
                ${isParentMobile ? mobileImageClasses : ""}
                transition-all duration-500 ease-out
                ${isParentMobile ? "relative" : "absolute"}
            `}
            style={{
                left: isParentMobile ? "auto" : dimensions.left,
                top: isParentMobile ? `calc(0px + ${floatOffset}px)` : `calc(${dimensions.top} + ${floatOffset}px)`,
                width: isParentMobile ? "auto" : sizes.bgSize,
                height: isParentMobile ? "auto" : sizes.bgSize,
                zIndex: isHovering ? 10 : 1,
                transform: `translateY(${floatOffset}px)`, // Apply float animation
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <img
                className={`
                    planet-image ${isHovering ? "planet-hover" : ""}
                    ${isParentMobile ? mobileImageClasses : ""}
                    object-contain cursor-pointer
                `}
                src={infos.bg || "/placeholder.svg"}
                alt={`${infos.text} planet`}
                style={
                    isParentMobile
                        ? {} // No inline width/height for mobile, let Tailwind classes handle it
                        : {
                            width: sizes.bgSize,
                            height: sizes.bgSize,
                        }
                }
            />
            <span
                className={`
                    planet-text ${isHovering ? "text-hover" : ""}
                    ${isParentMobile ? mobileTextClasses : ""} {/* mobileTextClasses handle font size on mobile */}
                    font-bold
                `}
                style={{
                    // Only apply sizes.fontSize when NOT on mobile.
                    // On mobile, mobileTextClasses (via className) will control the font size.
                    fontSize: isParentMobile ? undefined : sizes.fontSize,
                    marginTop: isParentMobile ? "auto" : sizes.fontSize === "21px" ? "14px" : "22px",
                }}
            >
        {infos.text}
      </span>
        </div>
    )
}
export default SkillPlanet
