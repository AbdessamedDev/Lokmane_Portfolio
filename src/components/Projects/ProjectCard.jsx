import dirasatiCard from "/images/projects/dirasati.png"
import PurpleButton from "../buttons/PurpleButton"

const ProjectCard = ({
                         projectImg = dirasatiCard,
                         projectTitle = "Dirasati: School Platform",
                         projectDescription = "Dirasati is a school management web app with dashboards for teachers and parents.",
                         tags = ["Figma", "UI Design", "UX Design"],
                         link = "google.com",
                         index = 0,
                     }) => {
    return (
        <div className="project-card-image">
            <div className="project-mockup-section">
                <img src={projectImg || "/placeholder.svg?height=400&width=350"} alt="Project card" />
            </div>
            <div className="project-content-section">
                <div className="project-tags-section">
                    {tags.map((tag, index) => (
                        <span key={index} className="project-tag-pill">
              {tag}
            </span>
                    ))}
                </div>
                <h3 className="project-card-title">{projectTitle}</h3>
                <p className="project-card-desc">{projectDescription}</p>
                <a
                    href={link}
                    target="_blank"
                    aria-label={`Learn more about ${projectTitle}`}
                >
                    <PurpleButton className="rounded-sm py-1 px-2 text-[8px] md:rounded-lg md:py-2 md:px-4 md:text-sm">
                        Learn More <span className="sr-only">about: {projectTitle}</span>
                    </PurpleButton>
                </a>

            </div>
        </div>
    )
}
export default ProjectCard
