import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import ProjectCard from "./ProjectCard";
import WhiteButton from "../buttons/WhiteButton";
import { projectsData } from "../../assets/constants/index.js";

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const gridRef = useRef(null);
  const containerRef = useRef(null);

  const projectsPerPage = 3;
  const totalPages = Math.ceil(projectsData.length / projectsPerPage);
  const shouldShowButton = projectsData.length > projectsPerPage;

  const getCurrentProjects = () => {
    const startIndex = currentPage * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    return projectsData.slice(startIndex, endIndex);
  };

  const handleSeeMore = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const cards = Array.from(gridRef.current.children);
    const container = containerRef.current;

    // Set up 3D perspective
    gsap.set(container, { perspective: 1200 });

    // Create master timeline
    const masterTL = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    // Animation for current cards (outgoing)
    masterTL.to(cards, {
      duration: 0.6,
      x: -300,
      opacity: 0,
      rotationY: 20,
      scale: 0.9,
      stagger: 0.1,
      ease: "power3.in",
      onComplete: () => {
        requestAnimationFrame(() => {
          setCurrentPage(prev => (prev + 1) % totalPages);
        });
      }
    });

    // Animation for new cards (incoming)
    masterTL.add(() => {
      const newCards = Array.from(gridRef.current.children);
      if (newCards.length === 0) return;

      // Set initial state for new cards
      gsap.set(newCards, {
        x: 400,
        y: 40,
        opacity: 0,
        rotationY: -15,
        scale: 0.92,
        z: 100
      });

      // Animate in new cards
      gsap.to(newCards, {
        duration: 0.9,
        x: 0,
        y: 0,
        z: 0,
        opacity: 1,
        rotationY: 0,
        scale: 1,
        stagger: {
          each: 0.15,
          from: "center"
        },
        ease: "expo.out",
        clearProps: "all" // Clean up after animation
      });
    });
  };

  // Initial animation on mount
  useEffect(() => {
    if (gridRef.current) {
      const cards = Array.from(gridRef.current.children);
      const container = containerRef.current;

      gsap.set(container, { perspective: 1200 });
      gsap.set(cards, {
        x: 200,
        y: 30,
        opacity: 0,
        rotationY: -10,
        scale: 0.95
      });

      gsap.to(cards, {
        duration: 1,
        x: 0,
        y: 0,
        opacity: 1,
        rotationY: 0,
        scale: 1,
        stagger: {
          each: 0.15,
          from: "center"
        },
        ease: "expo.out",
        delay: 0.4
      });
    }
  }, []);

  return (
      <section id="projects" className="stars" ref={containerRef}>
        <h2 className="section-title">What ideas have I brought to life?</h2>

        <div className="projects-wrapper">
          <div
              className="projects-three-columns borderr w-[1680px] relative"
              ref={gridRef}
              style={{
                minHeight: "600px",
                transformStyle: "preserve-3d"
              }}
          >
            {getCurrentProjects().map(({id, projectImg, projectTitle, projectDescription, tags}) => (
                <ProjectCard
                    key={id}
                    projectImg={projectImg}
                    projectTitle={projectTitle}
                    projectDescription={projectDescription}
                    tags={tags}
                    style={{ transformStyle: "preserve-3d" }}
                />
            ))}
          </div>

          {shouldShowButton && (
              <div className="see-more-wrapper mt-12">
                <WhiteButton
                    onClick={handleSeeMore}
                    disabled={isAnimating}
                    className="btn-white"
                >
                  {currentPage === totalPages - 1 ? "Return to First Projects" : "See More"}
                </WhiteButton>
              </div>
          )}
        </div>
      </section>
  );
};

export default Projects;