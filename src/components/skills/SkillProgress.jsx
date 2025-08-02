"use client"
import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(useGSAP)

const SkillProgress = ({ skillName, skillPercentage, index }) => {
    const containerRef = useRef(null)
    const percentageRef = useRef(null)
    const barRef = useRef(null)

    useGSAP(() => {
        const percentage = Number.parseFloat(skillPercentage)
        const count = { val: 0 }
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
            },
        })

        // Animate container (fade + slide)
        tl.fromTo(
            containerRef.current,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: index * 0.1,
                ease: "power2.out",
            },
        )

        // Calculate bar width responsively based on current window size
        const getBarWidth = () => {
            if (typeof window !== "undefined" && window.innerWidth < 768) {
                // Mobile width for the bar (max-w-[250px] from parent)
                return `${(250 * percentage) / 100}px`
            }
            // Desktop width for the bar (max-w-[384px] from parent)
            return `${(384 * percentage) / 100}px`
        }

        // Animate progress bar
        tl.fromTo(
            barRef.current,
            { width: "0px" },
            {
                width: getBarWidth(),
                duration: 1.5,
                ease: "power2.out",
            },
            "-=0.4",
        )

        // Animate percentage counter
        tl.to(
            count,
            {
                val: percentage,
                duration: 1.5,
                ease: "power1.out",
                onUpdate: () => {
                    percentageRef.current.textContent = `${Math.floor(count.val)} %`
                },
            },
            "-=1.2",
        )
    }, [skillPercentage, index]) // Re-run GSAP if skillPercentage or index changes

    return (
        <div
            ref={containerRef}
            className="
                w-full max-w-[300px] h-[87px] py-4 px-6 rounded-2xl bg-blue-night
                md:w-[480px] md:max-w-none md:h-[137px]
            "
        >
            <h2 className="font-fsp-stencil text-xs md:font-medium md:text-xl mb-3 md:mb-4">{skillName}</h2>
            <div>
        <span ref={percentageRef} className="block text-[9px] md:text-sm font-sans font-black">
          0 %
        </span>
                <div
                    className="
                    w-full max-w-[250px] h-3 md:h-[22px] bg-[#5F439D4D] rounded-sm md:rounded-lg mt-1 md:mt-[6px]
                    md:w-[384px] md:max-w-none
                "
                >
                    <div
                        ref={barRef}
                        className="h-full rounded-lg bg-[#5F439D] shadow-[0_1px_28px_rgba(129,91,216,0.2),_0_2px_28px_rgba(129,91,216,0.25)]"
                    />
                </div>
            </div>
        </div>
    )
}

export default SkillProgress
