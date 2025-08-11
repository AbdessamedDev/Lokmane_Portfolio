"use client"
import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

const ContactInfo = ({ infoIcon, infoTitle, infoContent }) => {
    const containerRef = useRef(null)
    useGSAP(() => {
        const container = containerRef.current
        const handleMouseEnter = () => {
            gsap.to(container, {
                duration: 0.3,
                boxShadow: "0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.1)",
                borderColor: "rgba(139, 92, 246, 0.8)",
                scale: 1.02,
                ease: "power2.out",
            })
        }
        const handleMouseLeave = () => {
            gsap.to(container, {
                duration: 0.3,
                boxShadow: "none",
                borderColor: "rgb(139, 92, 246)",
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
            // Added gap-[12px] for icon and text div
            className="w-full h-auto p-[10px] rounded-[5px] mb-[16px] flex items-center justify-start gap-[12px] md:w-[552px] md:h-[78px] bg-blue-night md:rounded-lg border-[1.5px] border-violet-secondary md:px-4 md:py-[15.5px] md:gap-3 md:mb-6 cursor-pointer transition-all duration-300"
        >
            <div className="text-violet-primary size-4 md:size-6 contact-icon mr-3">{infoIcon}</div>
            <div>
                <h3 className="font-fsp-bold font-normal text-[#464B60] text-[8px] md:text-xs md:mb-2">{infoTitle}</h3>
                <span className="block text-[10px] md:text-sm text-white font-poppins-medium font-normal">{infoContent}</span>
            </div>
        </div>
    )
}
export default ContactInfo
