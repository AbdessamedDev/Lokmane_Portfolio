"use client"

import { useState, useEffect, useRef } from "react"
import "./skill_planet.css"

const SkillPlanet = ({ sizes, infos, dimensions, index }) => {
    const [isHovering, setIsHovering] = useState(false)
    const [floatOffset, setFloatOffset] = useState(0)
    const animationRef = useRef(null)

    // Floating animation
    useEffect(() => {
        const amplitude = 5 + (index * 0.5) // Different float distance for each planet
        const speed = 0.005 + (index * 0.0005) // Different speed for each planet
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
            className={`planet-container planet-${index}`}
            style={{
                width: sizes.bgSize,
                position: "absolute",
                left: dimensions.left,
                top: `calc(${dimensions.top} + ${floatOffset}px)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "top 0.5s ease-out",
                zIndex: isHovering ? 10 : 1,
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <img
                className={`planet-image ${isHovering ? "planet-hover" : ""}`}
                style={{
                    width: sizes.bgSize,
                    height: sizes.bgSize,
                    objectFit: "contain",
                    cursor: "pointer",
                }}
                src={infos.bg || "/placeholder.svg"}
                alt={`${infos.text} planet`}
            />
            <span
                className={`planet-text ${isHovering ? "text-hover" : ""}`}
                style={{
                    fontSize: sizes.fontSize,
                    marginTop: sizes.fontSize === "21px" ? "14px" : "22px",
                    fontWeight: "bold",
                }}
            >
                {infos.text}
            </span>
        </div>
    )
}

export default SkillPlanet