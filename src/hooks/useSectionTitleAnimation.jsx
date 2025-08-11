import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import {useMediaQuery} from "react-responsive";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const useSectionTitleAnimation = () => {
    const titleRef = useRef(null);
    const isMobile = useMediaQuery({ maxWidth: 767 });

    useGSAP(() => {
        if (!titleRef.current) return;

        const titleSplit = new SplitText(titleRef.current, {
            type: "chars",
            charsClass: "split-char",
            tag: "span",
        });

        gsap.set(titleSplit.chars, { opacity: 0, y: 50 });

        gsap.to(titleSplit.chars, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: titleRef.current,
                start: isMobile ? "top 50%" : "top 75%",
            },
        });

        return () => {
            titleSplit.revert();
        };
    }, []);

    return titleRef;
};