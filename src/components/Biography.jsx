
import { useRef, useState, useEffect } from "react"
import astroOne from "/images/about/Astro.png"
import gsap from "gsap"
import html2pdf from "html2pdf.js"
import PurpleButton from "./buttons/PurpleButton"

const Biography = () => {
    const astroRef = useRef(null)
    const sectionRef = useRef(null)
    const resumeRef = useRef(null)
    const [imageLoaded, setImageLoaded] = useState(false)

    useEffect(() => {
        if (!astroRef.current || !sectionRef.current || !imageLoaded) return

        // Set initial position
        const sectionBounds = sectionRef.current.getBoundingClientRect()
        const astroBounds = astroRef.current.getBoundingClientRect()
        const initialX = sectionBounds.width - astroBounds.width - 120
        const initialY = (sectionBounds.height - astroBounds.height) / 2

        gsap.set(astroRef.current, {
            x: initialX,
            y: initialY,
            rotation: 0,
            opacity: 1,
        })

        // Create a more organic floating animation
        const floatAnimation = () => {
            // Random movement parameters within reasonable bounds
            const moveX = (Math.random() - 0.5) * 80 // -40px to +40px
            const moveY = (Math.random() - 0.5) * 60 // -30px to +30px
            const rotation = Math.random() * 20 // -10° to +10°

            // Random duration between 8-12 seconds for slow, drifting movement
            const duration = 4 + Math.random() * 4

            gsap.to(astroRef.current, {
                x: `+=${moveX}`,
                y: `+=${moveY}`,
                rotation: `+=${rotation}`,
                duration: duration,
                ease: "sine.inOut",
                onComplete: floatAnimation, // Loop the animation
            })
        }

        // Start the animation
        floatAnimation()

        return () => {
            // Clean up all animations on unmount
            gsap.killTweensOf(astroRef.current)
        }
    }, [imageLoaded])

    const downloadResume = () => {
        if (!resumeRef.current) return

        const container = document.createElement("div")
        container.style.cssText = `
            padding: 40px;
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            background: white;
        `

        const title = document.createElement("h1")
        title.textContent = "About Lokmane BENHAMMADI"
        title.style.cssText = `
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 30px;
            text-align: center;
            color: #633EB7;
            border-bottom: 3px solid #633EB7;
            padding-bottom: 15px;
            letter-spacing: 1px;
        `
        container.appendChild(title)

        const subtitle = document.createElement("h2")
        subtitle.textContent = "UI/UX Designer & Creative Professional"
        subtitle.style.cssText = `
            font-size: 18px;
            font-weight: normal;
            margin-bottom: 25px;
            text-align: center;
            color: #666;
            font-style: italic;
        `
        container.appendChild(subtitle)

        const content = resumeRef.current.cloneNode(true)
        content.style.cssText = `
            font-size: 16px;
            line-height: 1.8;
            text-align: justify;
            margin-bottom: 20px;
        `

        const highlights = content.querySelectorAll(".text-violet-primary")
        highlights.forEach((highlight) => {
            highlight.style.cssText = `
                color: #633EB7;
                font-weight: bold;
            `
        })

        container.appendChild(content)

        const footer = document.createElement("div")
        footer.style.cssText = `
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            font-size: 12px;
            color: #888;
        `
        footer.innerHTML = `
            <p>Generated on ${new Date().toLocaleDateString()}</p>
            <p>Contact: Higher School of Computer Science, Sidi Bel Abbes</p>
        `
        container.appendChild(footer)

        const opt = {
            margin: [15, 15, 15, 15],
            filename: "Lokmane_BENHAMMADI_Resume.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                letterRendering: true,
                backgroundColor: "#ffffff",
            },
            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait",
            },
        }

        html2pdf()
            .from(container)
            .set(opt)
            .save()
            .catch((err) => {
                console.error("Error generating PDF:", err)
                alert("There was an error generating the PDF. Please try again.")
            })
    }

    const handleImageLoad = () => {
        setImageLoaded(true)
    }

    return (
        <section id="about" className="stars" ref={sectionRef}>
            <h2>
                Who<span className="font-serif">'</span>s behind the designs and prototypes?
            </h2>
            <div>
                <p ref={resumeRef}>
                    I<span className="font-serif">'</span>m a passionate UI UX designer with a sharp eye for detail and a love for
                    intuitive, user centred design.
                    <br />
                    Currently studying at the Higher School of Computer Science in Sidi Bel Abbes, I blend creativity with clear
                    thinking to turn ideas into clean, functional products.
                    <br />I<span className="font-serif">'</span>ve worked on projects like{" "}
                    <span className="text-violet-primary">Dirasati</span> and{" "}
                    <span className="text-violet-primary">Dorouscom</span>, collaborating with developers and building a solid
                    understanding of real world implementation. My work spans research, wireframing, prototyping, and visual
                    design all focused on creating experiences that truly work for users.
                </p>
                <PurpleButton onClick={downloadResume}>Download resume</PurpleButton>
            </div>
            <img
                ref={astroRef}
                src={astroOne || "/placeholder.svg"}
                alt="Floating astronaut"
                onLoad={handleImageLoad}
                style={{ opacity: 0 }}
            />
        </section>
    )
}

export default Biography
