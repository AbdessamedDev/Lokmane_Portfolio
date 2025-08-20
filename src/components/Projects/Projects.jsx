"use client"
import { useState, useRef, useEffect, useCallback } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger" // Import ScrollTrigger
import ProjectCard from "./ProjectCard"
import WhiteButton from "../buttons/WhiteButton"
import { projectsData } from "../../assets/constants/index.js"
import { useSectionTitleAnimation } from "../../hooks/useSectionTitleAnimation.jsx"
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger plugin once
gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const titleRef = useSectionTitleAnimation()
  const [currentPage, setCurrentPage] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselInnerRef = useRef(null) // This will be the flex container that moves
  const projectsSectionRef = useRef(null) // Ref for the entire Projects section
  const whiteButtonRef = useRef(null) // Ref for the WhiteButton
  const [projectsPerPage, setProjectsPerPage] = useState(3)
  const [itemWidthWithGap, setItemWidthWithGap] = useState(0) // Combined width of one card + its right gap
  const totalProjects = projectsData.length
  const totalPages = Math.ceil(totalProjects / projectsPerPage)
  const shouldShowButton = totalProjects > projectsPerPage

  const calculateLayoutMetrics = useCallback(() => {
    const currentWidth = window.innerWidth
    let newProjectsPerPage
    let newItemWidthWithGap
    if (currentWidth <= 640) {
      // Mobile breakpoint
      newProjectsPerPage = 1
      newItemWidthWithGap = 250 + 24 // Card width 250px + gap 24px (from CSS margin-right)
    } else if (currentWidth <= 1024) {
      // Tablet breakpoint
      newProjectsPerPage = 2
      newItemWidthWithGap = 480 + 24 // Card width 480px + gap 24px
    } else {
      // Desktop breakpoint
      newProjectsPerPage = 3
      newItemWidthWithGap = 480 + 120 // Card width 480px + gap 120px
    }
    setProjectsPerPage(newProjectsPerPage)
    setItemWidthWithGap(newItemWidthWithGap)
    // Adjust current page if it exceeds new total pages
    const newTotalPages = Math.ceil(totalProjects / newProjectsPerPage)
    if (currentPage >= newTotalPages) {
      setCurrentPage(0) // Reset to first page if current page is out of bounds
      gsap.set(carouselInnerRef.current, { x: 0 }) // Reset position
    } else {
      // Re-apply current page's translation based on new metrics
      const targetX = -currentPage * newItemWidthWithGap * newProjectsPerPage
      gsap.set(carouselInnerRef.current, { x: targetX })
    }
  }, [currentPage, totalProjects])

  useEffect(() => {
    calculateLayoutMetrics() // Initial calculation on mount
    window.addEventListener("resize", calculateLayoutMetrics)
    return () => window.removeEventListener("resize", calculateLayoutMetrics)
  }, [calculateLayoutMetrics])

  const handleSeeMore = () => {
    if (isAnimating || itemWidthWithGap === 0) return
    setIsAnimating(true)
    let nextPageIndex = currentPage + 1
    let targetX
    if (nextPageIndex >= totalPages) {
      nextPageIndex = 0 // Loop back to the first page
      targetX = 0
    } else {
      targetX = -nextPageIndex * itemWidthWithGap * projectsPerPage
    }
    gsap.to(carouselInnerRef.current, {
      x: targetX,
      duration: 0.8, // Smooth animation duration
      ease: "power3.inOut", // Smooth easing function
      onComplete: () => {
        setCurrentPage(nextPageIndex)
        setIsAnimating(false)
      },
    })
  }

  // New GSAP for Projects section entry animation
  useGSAP(
      () => {
        if (!projectsSectionRef.current || !carouselInnerRef.current || !whiteButtonRef.current) return

        const projectsContainer = projectsSectionRef.current.querySelector(".projects-carousel-container")

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: projectsSectionRef.current,
            start: "top center", // When the top of the section hits the center of the viewport
            once: true, // Play animation only once
            // markers: true, // Uncomment for debugging ScrollTrigger
          },
        })

        // Initial state for projects container and button
        gsap.set(projectsContainer, { x: "-100vw", opacity: 0 }) // Start from off-screen right
        gsap.set(whiteButtonRef.current, { opacity: 0, y: 20 }) // Start button slightly below and hidden

        // Animate projects container
        tl.to(projectsContainer, {
          x: 0, // Move to original position
          opacity: 1,
          duration: 1.2, // Slightly increased duration
          ease: "power3.out", // Smooth entry ease
        })

        // Animate white button after container
        tl.to(
            whiteButtonRef.current,
            {
              opacity: 1,
              y: 0, // Move to original y position
              duration: 0.8,
              ease: "back.out(1.7)", // Creative ease for a subtle bounce
            },
            "<0.3", // Start 0.3 seconds before the end of the previous animation
        )
      },
      { scope: projectsSectionRef },
  ) // Scope to the projects section

  return (
      <section id="projects" className="stars" ref={projectsSectionRef}>
        {" "}
        {/* Attach ref to the section */}
        <h2 className="section-title" ref={titleRef}>
          What ideas have I brought to life?
        </h2>
        <div className="projects-wrapper">
          <div
              className="projects-carousel-container" // This acts as the viewport, hiding overflow
          >
            <div
                className="projects-flex-row" // This is the horizontally scrolling container
                ref={carouselInnerRef}
                style={{ height: "514px" }} // Corrected 'Height' to 'height'
            >
              {projectsData.map(({ id, projectImg, projectTitle, projectDescription, tags, link }, index) => (
                  <ProjectCard
                      key={id}
                      projectImg={projectImg}
                      projectTitle={projectTitle}
                      projectDescription={projectDescription}
                      tags={tags}
                      link={link}
                      index={index}
                  />
              ))}
            </div>
          </div>
          {shouldShowButton && (
              <div className="see-more-wrapper -mt-50 md:mt-20">
                <WhiteButton
                    onClick={handleSeeMore}
                    disabled={isAnimating}
                    className="btn-white border-[2px] text-[10px] py-2 px-4 md:border-[3px] md:py-3 md:px-6 md:text-2xl rounded-lg"
                    ref={whiteButtonRef} // Attach ref to the button
                >
                  {currentPage === totalPages - 1 ? "Return to First Projects" : "See More"}
                </WhiteButton>
              </div>
          )}
        </div>
      </section>
  )
}

export default Projects
