"use client"

import { useState, useEffect } from 'react';
import { skillsInfos, otherSkills } from "../../assets/constants/index.js"
import SkillPlanet from "./SkillPlanet.jsx"
import SkillProgress from "./SkillProgress.jsx";

const SkillsSection = () => {
    // Pagination state
    const [currentPage, setCurrentPage] = useState(0);
    const [buttonText, setButtonText] = useState("See more");
    const skillsPerPage = 6;
    const totalPages = Math.ceil(otherSkills.length / skillsPerPage);

    // Calculate current skills to display
    const startIdx = currentPage * skillsPerPage;
    const endIdx = startIdx + skillsPerPage;
    const currentSkills = otherSkills.slice(startIdx, endIdx);

    // Update button text based on pagination state
    useEffect(() => {
        if (currentPage === totalPages - 1) {
            setButtonText("Return");
        } else {
            setButtonText("See more");
        }
    }, [currentPage, totalPages]);

    // Handle pagination click
    const handlePaginationClick = () => {
        if (currentPage === totalPages - 1) {
            // Return to first page
            setCurrentPage(0);
        } else {
            // Go to next page
            setCurrentPage(prev => prev + 1);
        }
    };

    return (
        <section id="skills" className="stars">
            {/* Main Skills Planets Section */}
            <h1 className="section-title">What skills do I bring to the table?</h1>
            <div
                className="planets-container"
                style={{
                    width: "1680px",
                    height: "713px",
                    position: "relative",
                    margin: "0 auto",
                    overflow: "visible",
                }}
            >
                {skillsInfos.map((skill, index) => (
                    <SkillPlanet
                        key={`skill-${index}`}
                        sizes={skill.sizes}
                        infos={skill.infos}
                        dimensions={skill.dimensions}
                        index={index}
                    />
                ))}
            </div>

            {/* Other Skills Section with Pagination */}
            <div
                className="other-skills-container borderr"
                style={{
                    minWidth: "1680px",
                }}
            >
                <h1 className="other-skills-title">Other Skills</h1>
                <div className="other-skills mx-auto">
                    {currentSkills.map((skill, index) => (
                        <SkillProgress
                            key={`otherSkill-${startIdx + index}`}
                            skillName={skill.skillName}
                            skillPercentage={skill.skillPercentage}
                            index={startIdx + index}
                        />
                    ))}
                    {
                        [...Array(6 - currentSkills.length)].map((key, index) => <div className="w-[480px] h-[137px]"/>)
                    }
                </div>

                {/* See More/Return Button */}
                <div className="w-full flex-center mt-20">
                    <button
                        onClick={handlePaginationClick}
                        className="btn-white transition-all duration-300 hover:scale-105"
                    >
                        {buttonText}
                    </button>
                </div>
            </div>

            {/* Global floating animations */}
            <style jsx global>{`
                ${[...Array(otherSkills.length)].map((_, index) => {
                const animationDuration = 3 + (index % 3);
                const floatDistance = 15 + (index % 2) * 10;
                return `
                        @keyframes float-${index} {
                            0%, 100% {
                                transform: translateY(0px);
                            }
                            50% {
                                transform: translateY(-${floatDistance}px);
                            }
                        }
                    `;
            }).join("")}
            `}</style>
        </section>
    );
};

export default SkillsSection;