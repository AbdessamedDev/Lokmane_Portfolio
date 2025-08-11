"use client"
import MagnetEffect from "../ui/MagneEffect.jsx"
import "./skill_planet.css"

const SkillPlanet = ({ sizes, infos, dimensions, index, isParentMobile }) => {
    const isBigMobile = index % 4 === 0 || index % 4 === 3
    const mobileImageClasses = isBigMobile ? "w-[141px] h-[141px]" : "w-[95px] h-[95px]"
    const mobileTextClasses = isBigMobile ? "text-sm mt-3" : "text-[9px] mt-[6px]"

    const containerClasses = `
    planet-container planet-${index} float-${index} flex flex-col items-center justify-center
    ${isParentMobile ? mobileImageClasses : ""}
    transition-all duration-500 ease-out
  `.trim()

    const containerStyle = isParentMobile
        ? {
            position: "relative",
        }
        : {
            position: "absolute",
            left: dimensions.left,
            top: dimensions.top,
            width: sizes.bgSize,
            height: sizes.bgSize,
            zIndex: 1,
            cursor: "pointer",
        }

    return (
        <MagnetEffect className={containerClasses} style={containerStyle}>
            {/* Inner element with floating animation */}
            <div className={`floating-wrapper planet-${index}`}>
                <div className="w-full h-full flex flex-col items-center justify-center pointer-events-none">
                    <img
                        src={infos.bg || "/placeholder.svg"}
                        alt={`${infos.text} planet`}
                        className={`object-contain pointer-events-none ${isParentMobile ? mobileImageClasses : "w-full h-full"}`}
                    />
                    <span
                        className={`planet-text whitespace-nowrap font-fsp-stencil pointer-events-none ${
                            isParentMobile ? mobileTextClasses : ""
                        }`}
                        style={{
                            fontSize: isParentMobile ? undefined : sizes.fontSize,
                            marginTop: isParentMobile
                                ? "auto"
                                : sizes.fontSize === "21px"
                                    ? "14px"
                                    : "22px",
                        }}
                    >
                {infos.text}
            </span>
                </div>
            </div>
        </MagnetEffect>

    )
}

export default SkillPlanet
