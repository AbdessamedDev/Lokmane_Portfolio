"use client"
import { useEffect } from "react"
import gsap, { Power2, Elastic } from "gsap"

export default function MagnetEffect({ children, className, style }) {
    useEffect(() => {
        const elements = document.querySelectorAll(".planet-container")
        const maxDistance = 250 // 👈 Increase from 150 to 300 for larger magnet zone

        const handleMouseMove = (e) => {
            elements.forEach((el) => {
                const rect = el.getBoundingClientRect()
                const elX = rect.left + rect.width / 2
                const elY = rect.top + rect.height / 2

                const dx = e.clientX - elX
                const dy = e.clientY - elY
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < maxDistance) {
                    const strength = 1 - distance / maxDistance
                    gsap.to(el, {
                        x: dx * 0.7 * strength,
                        y: dy * 0.7 * strength,
                        rotation: dx * 0.03 * strength,
                        ease: Power2.easeOut,
                        duration: 0.3,
                    })
                } else {
                    gsap.to(el, {
                        x: 0,
                        y: 0,
                        rotation: 0,
                        ease: Elastic.easeOut.config(1.2, 0.4),
                        duration: 0.7,
                    })
                }
            })
        }

        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    return (
        <div
            className={`relative inline-block will-change-transform ${className || ""}`}
            style={{ ...style }}
        >
            {children}
        </div>
    )
}
