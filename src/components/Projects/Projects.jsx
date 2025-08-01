"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { gsap } from "gsap"
import ProjectCard from "./ProjectCard"
import WhiteButton from "../buttons/WhiteButton"
import { projectsData } from "../../assets/constants/index.js"

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselInnerRef = useRef(null) // This will be the flex container that moves

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

  // Initial animation for cards on mount
  useEffect(() => {
    if (carouselInnerRef.current) {
      gsap.set(carouselInnerRef.current, { x: 0 }) // Ensure initial position is 0
      const cards = Array.from(carouselInnerRef.current.children)
      gsap.fromTo(
          cards,
          { opacity: 0, y: 50 }, // Initial state: hidden and slightly below
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1, // Stagger the animation for each card
            ease: "power3.out",
            delay: 0.4,
          },
      )
    }
  }, []) // Empty dependency array means it runs once on mount

  return (
      <section id="projects" className="stars">
        <h2 className="section-title">What ideas have I brought to life?</h2>
        <div className="projects-wrapper">
          <div
              className="projects-carousel-container" // This acts as the viewport, hiding overflow
          >
            <div
                className="projects-flex-row" // This is the horizontally scrolling container
                ref={carouselInnerRef}
                style={{Height: "514px" }} // Maintain minHeight for consistent layout
            >
              {projectsData.map(({ id, projectImg, projectTitle, projectDescription, tags }) => (
                  <ProjectCard
                      key={id}
                      projectImg={projectImg}
                      projectTitle={projectTitle}
                      projectDescription={projectDescription}
                      tags={tags}
                  />
              ))}
            </div>
          </div>
          {shouldShowButton && (
              <div className="see-more-wrapper mt-8 md:mt-20">
                <WhiteButton onClick={handleSeeMore} disabled={isAnimating} className="btn-white border-[2px] text-[10px] py-2 px-4 md:border-[3px] md:py-3 md:px-6 md:text-2xl rounded-lg">
                  {currentPage === totalPages - 1 ? "Return to First Projects" : "See More"}
                </WhiteButton>
              </div>
          )}
        </div>
      </section>
  )
}

export default Projects
