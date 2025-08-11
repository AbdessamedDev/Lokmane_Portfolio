"use client"
import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

const Social = ({ socialIcon }) => {
  const containerRef = useRef(null)
  const iconRef = useRef(null)

  useGSAP(() => {
    const container = containerRef.current
    const icon = iconRef.current
    // Continuous subtle glow animation
    gsap.to(container, {
      boxShadow: "0 0 15px rgba(139, 92, 246, 0.2)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    })

    const handleMouseEnter = () => {
      gsap.to(container, {
        duration: 0.3,
        boxShadow: "0 0 25px rgba(139, 92, 246, 0.5), 0 0 50px rgba(139, 92, 246, 0.2)",
        borderColor: "rgba(139, 92, 246, 0.8)",
        scale: 1.1,
        ease: "back.out(1.7)",
      })
      gsap.to(icon, {
        duration: 0.3,
        rotation: 360,
        scale: 1.2,
        ease: "back.out(1.7)",
      })
    }
    const handleMouseLeave = () => {
      gsap.to(container, {
        duration: 0.3,
        boxShadow: "0 0 15px rgba(139, 92, 246, 0.2)",
        borderColor: "rgb(139, 92, 246)",
        scale: 1,
        ease: "power2.out",
      })
      gsap.to(icon, {
        duration: 0.3,
        rotation: 0,
        scale: 1,
        ease: "power2.out",
      })
    }
    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)
    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])
  return (
      <div
          ref={containerRef}
          className="size-8 mr-5 rounded-full bg-blue-night border border-violet-secondary flex items-center justify-center cursor-pointer transition-all duration-300 md:w-12 md:h-12 md:mr-4"
      >
        <div ref={iconRef} className="flex items-center justify-center size-3 md:size-5">
          {socialIcon}
        </div>
      </div>
  )
}
export default Social