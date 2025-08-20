import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "../../assets/animations/animation.json"; // ✅ direct import
import { useMediaQuery } from "react-responsive";

export default function Animate() {
    const containerRef = useRef(null);
    const isMobile = useMediaQuery({maxWidth: 767});

    useEffect(() => {
        const instance = lottie.loadAnimation({
            container: containerRef.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData, // ✅ not using `path`
        });

        return () => instance.destroy();
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                width: isMobile? 450 : 1000,
                height: isMobile? 450 : 1000,
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1,
            }}
        />
    );
}
