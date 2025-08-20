"use client"
import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { CheckCircle, XCircle, X } from "lucide-react"

const Toast = ({ show, type, message, onClose }) => {
    const toastRef = useRef(null)
    const progressRef = useRef(null)

    useGSAP(() => {
        const toast = toastRef.current
        const progress = progressRef.current
        if (show) {
            // Entrance animation
            gsap.fromTo(
                toast,
                {
                    opacity: 0,
                    y: -100,
                    scale: 0.8,
                    rotationX: -90,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotationX: 0,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                },
            )
            // Progress bar animation
            gsap.fromTo(
                progress,
                { width: "100%" },
                {
                    width: "0%",
                    duration: 4,
                    ease: "none",
                },
            )
            // Auto close animation
            gsap.to(toast, {
                opacity: 0,
                y: -50,
                scale: 0.9,
                duration: 0.4,
                ease: "power2.in",
                delay: 3.6,
            })
        }
    }, [show])

    const handleClose = () => {
        const toast = toastRef.current
        gsap.to(toast, {
            opacity: 0,
            y: -50,
            scale: 0.9,
            duration: 0.3,
            ease: "power2.in",
            onComplete: onClose,
        })
    }

    if (!show) return null

    const isSuccess = type === "success"
    const bgColor = isSuccess ? "bg-green-900/90" : "bg-red-900/90"
    const borderColor = isSuccess ? "border-green-500" : "border-red-500"
    const iconColor = isSuccess ? "text-green-400" : "text-red-400"
    const progressColor = isSuccess ? "bg-green-500" : "bg-red-500"

    return (
        <div className="fixed top-1/5 md:top-1/12 right-2 z-[999]">
            <div
                ref={toastRef}
                className={`${bgColor} ${borderColor} border backdrop-blur-sm rounded-lg p-4 w-[360px] md:w-[500px] shadow-2xl`}
                style={{
                    boxShadow: `0 0 30px ${isSuccess ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
                }}
            >
                <div className="flex items-start gap-3">
                    <div className={`${iconColor} mt-0.5`}>{isSuccess ? <CheckCircle size={20} /> : <XCircle size={20} />}</div>
                    <div className="flex-1">
                        <p className="text-white font-serif text-xs md:text-xl leading-relaxed">{message}</p>
                    </div>
                    <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors duration-200 ml-2">
                        <X size={16} />
                    </button>
                </div>
                <div className="mt-3 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div ref={progressRef} className={`h-full ${progressColor} rounded-full transition-all duration-100`} />
                </div>
            </div>
        </div>
    )
}
export default Toast
