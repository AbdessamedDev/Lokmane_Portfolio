import dirasatiCard from "/images/projects/dirasati.png"
import PurpleButton from "../buttons/PurpleButton"

const ProjectCard = ({
                         projectImg = dirasatiCard,
                         projectTitle = "Dirasati: School Platform",
                         projectDescription = "Dirasati is a school management web app with dashboards for teachers and parents.",
                         tags = ["Figma", "UI Design", "UX Design"],
                     }) => {

    return (
        <div className="project-card-image borderr">
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

                <PurpleButton className="learn-more-button">Learn More</PurpleButton>
            </div>
        </div>
    )
}

export default ProjectCard
