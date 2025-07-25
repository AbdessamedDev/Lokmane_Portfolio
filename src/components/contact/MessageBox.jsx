"use client"

import { useState, useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import Toast from "./Toast.jsx"

const MessageBox = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })
    const [result, setResult] = useState("")
    const [toast, setToast] = useState({ show: false, type: "", message: "" })

    const formRef = useRef(null)
    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const messageRef = useRef(null)

    useGSAP(() => {
        // Form entrance animation
        gsap.fromTo(
            formRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: formRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            },
        )
    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleFocus = (inputRef) => {
        // Enhanced focus effect with purple glow and scale
        gsap.to(inputRef.current, {
            duration: 0.3,
            boxShadow: "0 0 20px rgba(139, 92, 246, 0.4), 0 0 40px rgba(139, 92, 246, 0.2)",
            borderColor: "rgba(139, 92, 246, 0.8)",
            scale: 1.02,
            ease: "power2.out",
            onComplete: () => {
                inputRef.current.style.setProperty("--placeholder-opacity", "0")
            },
        })
    }

    const handleBlur = (inputRef, value) => {
        // Reset focus effects
        gsap.to(inputRef.current, {
            duration: 0.3,
            boxShadow: "none",
            borderColor: "rgb(156, 163, 175)", // gray-input-border
            scale: 1,
            ease: "power2.out",
            onComplete: () => {
                if (!value) {
                    inputRef.current.style.setProperty("--placeholder-opacity", "1")
                }
            },
        })
    }

    const showToast = (type, message) => {
        setToast({ show: true, type, message })
        setTimeout(() => {
            setToast({ show: false, type: "", message: "" })
        }, 4000)
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        setResult("Sending...")

        const formDataToSend = new FormData()
        formDataToSend.append("access_key", "YOUR_WEB3FORMS_ACCESS_KEY") // Replace with your actual key
        formDataToSend.append("name", formData.name)
        formDataToSend.append("email", formData.email)
        formDataToSend.append("message", formData.message)

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formDataToSend,
            })

            const data = await response.json()

            if (data.success) {
                setResult("Send Message")
                setFormData({ name: "", email: "", message: "" })
                showToast("success", "Message sent successfully! I'll get back to you soon.")
            } else {
                console.log("Error", data)
                setResult("Send Message")
                showToast("error", "Failed to send message. Please try again.")
            }
        } catch (error) {
            console.log("Error", error)
            setResult("Send Message")
            showToast("error", "Network error. Please check your connection and try again.")
        }
    }

    return (
        <>
            <div ref={formRef} className="md:w-[550px] md:rounded-2xl md:p-8 bg-blue-night message-box-hover">
                <h3 className="font-fsp-stencil text-white md:text-xl md:mb-8">Send me a message</h3>
                <form onSubmit={onSubmit}>
                    <input
                        ref={nameRef}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus(nameRef)}
                        onBlur={() => handleBlur(nameRef, formData.name)}
                        className="focus-input custom-input block outline-none w-full md:h-[48px] font-fsp-bold font-normal md:text-xs bg-gray-input border-[1.25px] border-gray-input-border md:p-[10px] md:rounded-lg md:mb-6"
                        placeholder="Your Name"
                        required
                    />
                    <input
                        ref={emailRef}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus(emailRef)}
                        onBlur={() => handleBlur(emailRef, formData.email)}
                        className="focus-input custom-input block outline-none w-full md:h-[48px] font-fsp-bold font-normal md:text-xs bg-gray-input border-[1.25px] border-gray-input-border md:p-[10px] md:rounded-lg md:mb-6"
                        placeholder="Your Email"
                        required
                    />
                    <textarea
                        ref={messageRef}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => handleFocus(messageRef)}
                        onBlur={() => handleBlur(messageRef, formData.message)}
                        className="focus-input custom-input block outline-none w-full md:h-[140px] font-fsp-bold font-normal md:text-xs resize-none bg-gray-input border-[1.25px] border-gray-input-border md:p-[10px] md:rounded-lg md:mb-8"
                        placeholder="Your Message"
                        required
                    />
                    <button
                        type="submit"
                        disabled={result === "Sending..."}
                        className="send-button w-full flex-center bg-violet-primary font-fsp-stencil font-medium md:text-base md:px-7 md:py-4 md:rounded-2xl transition-all duration-300 hover:bg-violet-600 hover:shadow-lg hover:shadow-violet-primary/30 disabled:opacity-70"
                    >
                        {result || "Send Message"}
                    </button>
                </form>
            </div>
            <Toast
                show={toast.show}
                type={toast.type}
                message={toast.message}
                onClose={() => setToast({ show: false, type: "", message: "" })}
            />
        </>
    )
}

export default MessageBox
