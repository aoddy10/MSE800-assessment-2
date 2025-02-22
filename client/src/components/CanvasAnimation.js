import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import "../styles/CanvasAnimation.css";

import HeroContent from "../pages/landingpage/HeroContent";
import HeroSection from "../pages/landingpage/HeroSection";
import FooterLandingpage from "../pages/landingpage/FooterLandingpage";

gsap.registerPlugin(ScrollTrigger);

const CanvasAnimation = () => {
    const mainRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        // Initialize Locomotive Scroll
        const locoScroll = new LocomotiveScroll({
            el: mainRef.current,
            smooth: true,
        });

        // Update ScrollTrigger when locomotive scroll updates
        locoScroll.on("scroll", ScrollTrigger.update);

        // Tell ScrollTrigger to use these proxy methods for the mainRef element
        ScrollTrigger.scrollerProxy(mainRef.current, {
            scrollTop(value) {
                return arguments.length
                    ? locoScroll.scrollTo(value, 0, 0)
                    : locoScroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            pinType: mainRef.current.style.transform ? "transform" : "fixed",
        });

        // Canvas setup
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Handle window resize
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render();
        };
        window.addEventListener("resize", handleResize);

        // Load and manage images
        const frameCount = 300;
        const images = [];
        const imageSeq = {
            frame: 1,
        };

        // Preload images
        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            const paddedIndex = String(i + 1).padStart(4, "0");
            img.src = `/assets/${paddedIndex}.jpg`;
            images.push(img);
        }

        // Initial render when first image loads
        images[1].onload = render;

        function render() {
            if (!images[imageSeq.frame]?.complete) return;

            const img = images[imageSeq.frame];
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);
            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(
                img,
                0,
                0,
                img.width,
                img.height,
                centerShift_x,
                centerShift_y,
                img.width * ratio,
                img.height * ratio
            );
        }

        // Canvas animation with ScrollTrigger
        gsap.to(imageSeq, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                scrub: 0.15,
                trigger: "#page canvas",
                start: "top top",
                end: "600% top",
                scroller: "#main",
            },
            onUpdate: render,
        });

        // Pin canvas
        ScrollTrigger.create({
            trigger: "#page canvas",
            pin: true,
            scroller: "#main",
            start: "top top",
            end: "600% top",
        });

        // Pin other sections
        ["#page1", "#page2", "#page3"].forEach((section) => {
            gsap.to(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom top",
                    pin: true,
                    scroller: "#main",
                },
            });
        });

        // Refresh ScrollTrigger and update LocomotiveScroll
        ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
        ScrollTrigger.refresh();

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
            locoScroll.destroy();
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <>
            <div id="main" ref={mainRef}>
                <div id="page">
                    <HeroContent />
                    <canvas ref={canvasRef} />
                </div>

                <div id="page1">
                    <HeroSection />
                </div>

                <div id="page2">
                    <div id="text1">
                        <h3>Lorem Ipsum Dolor Sit Amet</h3>
                        <h1>
                            Consectetur
                            <br />
                            Dolor Sit
                            <br />
                            Lorem Ipsum Dolor
                        </h1>
                    </div>
                    <div id="text2">
                        <h3>Lorem Ipsum Dolor Sit Amet</h3>
                        <h1>
                            Consectetur
                            <br />
                            Dolor Sit
                            <br />
                            Lorem Ipsum Dolor
                        </h1>
                    </div>
                </div>

                <div id="page3">
                    <FooterLandingpage />
                </div>
            </div>
        </>
    );
};

export default CanvasAnimation;
