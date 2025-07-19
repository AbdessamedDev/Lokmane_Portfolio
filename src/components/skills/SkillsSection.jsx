"use client"

import { skillsInfos, otherSkills } from "../../assets/constants/index.js"
import SkillPlanet from "./SkillPlanet.jsx"
import SkillProgress from "./SkillProgress.jsx";
import WhiteButton from "../buttons/WhiteButton.jsx";

const SkillsSection = () => {
    return (
        <section id="skills" className="stars">
            <h1 className="section-title">What skills do I bring to the table?</h1>
            <div
                className="planets-container"
                style={{
                    width: "1680px",
                    height: "713px",
                    position: "relative",
                    margin: "0 auto",
                    overflow: "visible", // Important for planet movement
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

            <div className="other-skills-container borderr"
                 style={{
                     minWidth: "1680px",
                 }}>
                <h1 className="other-skills-title">Other Skills</h1>
                <div className="other-skills mx-auto">
                    {
                        otherSkills.map((skill, index) => (
                            <SkillProgress
                                key={`otherSkill-${index}`}
                                skillName={skill.skillName}
                                skillPercentage={skill.skillPercentage}
                                index={index}
                            />
                        ))
                    }
                </div>
                <div className="w-full flex-center mt-20">
                    <WhiteButton>
                        See more
                    </WhiteButton>
                </div>
            </div>

            {/* Add global CSS for floating animations */}
            <style jsx global>{`
        ${skillsInfos
                .map((_, index) => {
                    const animationDuration = 3 + (index % 3)
                    const floatDistance = 15 + (index % 2) * 10
                    return `
            @keyframes float-${index} {
              0%, 100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-${floatDistance}px);
              }
            }
          `
                })
                .join("")}
      `}</style>
        </section>
    )
}

export default SkillsSection
