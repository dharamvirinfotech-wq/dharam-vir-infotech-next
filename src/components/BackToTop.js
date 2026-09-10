"use client";

import {useEffect, useState} from "react";

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button id="back-top" className={`back-to-top ${isVisible ? "show" : ""}`}
                onClick={scrollToTop}
        >
            <i className="fa-regular fa-arrow-up"></i>
        </button>
    )
}