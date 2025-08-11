"use client"
import { useState, useEffect } from "react"
import { skillsInfos, otherSkills } from "../../assets/constants/index.js"
import SkillPlanet from "./SkillPlanet.jsx"
import SkillProgress from "./SkillProgress.jsx"
import {useSectionTitleAnimation} from "../../hooks/useSectionTitleAnimation.jsx";
import "./skill_planet.css"

const SkillsSection = () => {
    const titleRef = useSectionTitleAnimation()
    // Pagination state
    const [currentPage, setCurrentPage] = useState(0)
    const [buttonText, setButtonText] = useState("See more")
    const [responsiveSkillsPerPage, setResponsiveSkillsPerPage] = useState(6) // Default for desktop
    const [isMobile, setIsMobile] = useState(false) // State to track mobile view

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768
            setIsMobile(mobile)
            setResponsiveSkillsPerPage(mobile ? 2 : 6)
        }
        // Set initial value
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const totalPages = Math.ceil(otherSkills.length / responsiveSkillsPerPage)

    // Calculate current skills to display
    const startIdx = currentPage * responsiveSkillsPerPage
    const endIdx = startIdx + responsiveSkillsPerPage
    const currentSkills = otherSkills.slice(startIdx, endIdx)

    // Update button text based on pagination state
    useEffect(() => {
        if (currentPage === totalPages - 1) {
            setButtonText("Return")
        } else {
            setButtonText("See more")
        }
    }, [currentPage, totalPages])

    // Handle pagination click
    const handlePaginationClick = () => {
        if (currentPage === totalPages - 1) {
            // Return to first page
            setCurrentPage(0)
        } else {
            // Go to next page
            setCurrentPage((prev) => prev + 1)
        }
    }

    return (
        <section id="skills" className="stars">
            {/* Main Skills Planets Section */}
            <h1 className="section-title" ref={titleRef}>What skills do I bring to the table?</h1>
            <div
                className={`planets-container ${
                    isMobile ? "grid grid-cols-2 gap-x-4 gap-y-8 justify-items-center items-center" : ""
                }`}
                style={
                    isMobile
                        ? {}
                        : {
                            width: "1680px",
                            height: "713px",
                            position: "relative",
                            margin: "0 auto",
                            overflow: "visible",
                        }
                }
            >
                {skillsInfos.map((skill, index) => (
                    <SkillPlanet
                        key={`skill-${index}`}
                        sizes={skill.sizes}
                        infos={skill.infos}
                        dimensions={skill.dimensions}
                        index={index}
                        isParentMobile={isMobile}
                    />
                ))}
            </div>

            <div className="other-skills-container w-full max-w-full mx-auto mt-8 md:mt-[5vw] px-4 md:px-0">
                <h1 className="other-skills-title">Other Skills</h1>
                <div
                    className="other-skills mx-auto                                grid grid-cols-1 gap-y-4 w-full max-w-[300px]                                md:grid-cols-3 md:gap-[120px] md:w-[1680px] md:max-w-none"
                >
                    {currentSkills.map((skill, index) => (
                        <SkillProgress
                            key={`otherSkill-${startIdx + index}`}
                            skillName={skill.skillName}
                            skillPercentage={skill.skillPercentage}
                            index={startIdx + index}
                        />
                    ))}
                    {[...Array(responsiveSkillsPerPage - currentSkills.length)].map((_, index) => (
                        <div key={`placeholder-${index}`} className="w-full h-[100px] md:w-[480px] md:h-[137px]" />
                    ))}
                </div>
                {/* See More/Return Button */}
                <div className="w-full flex-center mt-8 md:mt-20">
                    <button onClick={handlePaginationClick} className="btn-white border-2 text-[10px] px-4 py-2 rounded-lg md:text-2xl md:px-6 md:py-4 md:border-3">
                        {buttonText}
                    </button>
                </div>
            </div>
            {/* Removed Global floating animations as they are now handled by BubbleEffect */}
        </section>
    )
}

export default SkillsSection
