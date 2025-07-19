"use client"

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

const SkillProgress = ({ skillName, skillPercentage, index }) => {
    const containerRef = useRef(null);
    const percentageRef = useRef(null);
    const barRef = useRef(null);

    useGSAP(() => {
        const percentage = parseFloat(skillPercentage);
        const count = { val: 0 };

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
            },
        });

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
            }
        );

        // Animate progress bar
        tl.fromTo(
            barRef.current,
            { width: "0px" },
            {
                width: `${(384 * percentage) / 100}px`,
                duration: 1.5,
                ease: "power2.out",
            },
            "-=0.4"
        );

        // Animate percentage counter
        tl.to(
            count,
            {
                val: percentage,
                duration: 1.5,
                ease: "power1.out",
                onUpdate: () => {
                    percentageRef.current.textContent = `${Math.floor(count.val)} %`;
                },
            },
            "-=1.2"
        );
    }, [skillPercentage, index]);

    return (
        <div
            ref={containerRef}
            className="w-[480px] h-[137px] md:py-4 md:px-6 rounded-2xl bg-blue-night"
        >
            <h2 className="font-fsp-stencil md:font-medium md:text-xl md:mb-4">
                {skillName}
            </h2>
            <div>
        <span
            ref={percentageRef}
            className="block md:text-sm font-sans font-black"
        >
          0 %
        </span>
                <div className="w-[384px] h-[22px] bg-[#5F439D4D] rounded-lg mt-[6px]">
                    <div
                        ref={barRef}
                        className="h-[22px] rounded-lg bg-[#5F439D] shadow-[0_1px_28px_rgba(129,91,216,0.2),_0_2px_28px_rgba(129,91,216,0.25)]"
                    />
                </div>
            </div>
        </div>
    );
};

export default SkillProgress;
