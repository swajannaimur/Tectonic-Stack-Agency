"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Paragraph, SectionTitle } from "../common/typography";
import FlipButton from "../ui/FlipButton";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  const hasAnimated = useRef(false);
  const animationDone = useRef(false);
  const isLocked = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;

    gsap.set(bg, { scale: 0.6, opacity: 0, transformOrigin: "center center" });
    gsap.set(content, { opacity: 0, y: 30 });

    const lock = () => {
      isLocked.current = true;
      if (window.lenis) window.lenis.stop();
    };

    const unlock = () => {
      isLocked.current = false;
      animationDone.current = true;
      if (window.lenis) window.lenis.start();
    };

const startAnimation = () => {
      const tl = gsap.timeline({ 
        onComplete: unlock 
      });

      tl.to(bg, { 
        scale: 1, 
        opacity: 1, 
        duration: 0.7, 
        ease: "power2.out" 
      });

      tl.fromTo(content, 
        { y: 120, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out" 
        },
        "-=0.7" 
      );
    };

    const runEntrance = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const rect = section.getBoundingClientRect();
      const scrollTop = window.lenis?.scroll ?? window.pageYOffset;
      const target = scrollTop + rect.top + rect.height / 2 - window.innerHeight / 2;

      if (window.lenis) {
        window.lenis.scrollTo(target, {
          // duration: 1.2,
          duration: 1,
          // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard smooth ease
          onStart: () => {
             isLocked.current = true; 
              // setTimeout(startAnimation, 800);
             
             
          },
          onComplete: () => {
            window.lenis.stop();
            startAnimation();
          },
        });
      } else {
        isLocked.current = true;
        window.scrollTo({ top: target, behavior: "smooth" });
        setTimeout(startAnimation, 800);
      }
    };

    const runExit = () => {
      if (!hasAnimated.current && !animationDone.current) return;
      hasAnimated.current = false;
      animationDone.current = false;
      isLocked.current = false;

      gsap.to(bg, { scale: 0.6, opacity: 0, duration: 0.7, ease: "power2.inOut" });
      gsap.to(content, { opacity: 0, y: 30, duration: 0.4, ease: "power2.in" });
    };

    const blockInputs = (e) => {
      if (isLocked.current) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
      }
    };

    const blockKeys = (e) => {
      if (isLocked.current) {
        const keys = ["ArrowDown", "ArrowUp", " ", "PageDown", "PageUp", "Home", "End"];
        if (keys.includes(e.key)) e.preventDefault();
      }
    };

    window.addEventListener("wheel", blockInputs, { passive: false, capture: true });
    window.addEventListener("touchmove", blockInputs, { passive: false, capture: true });
    window.addEventListener("keydown", blockKeys, { capture: true });

    let lastScrollY = window.scrollY;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isScrollingDown = window.scrollY > lastScrollY;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2 && isScrollingDown) {
            runEntrance();
          } else if (!entry.isIntersecting && !isScrollingDown) {
            runExit();
          }
          lastScrollY = window.scrollY;
        });
      },
      { threshold: [0, 0.2, 0.8] }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      window.removeEventListener("wheel", blockInputs, { capture: true });
      window.removeEventListener("touchmove", blockInputs, { capture: true });
      window.removeEventListener("keydown", blockKeys, { capture: true });
      if (window.lenis) window.lenis.start();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden flex flex-col items-center justify-center"
      // style={{ minHeight: "100vh" }}
      style={{ minHeight: "2000px" }}
    >
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/images/projects/clear-globe.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform, opacity",
        }}
      />
      <div className="absolute inset-0 bg-white/15 z-[1]" />
      <div ref={contentRef} className="relative z-[2] flex flex-col items-center text-center px-6">
        <div className="w-full max-w-2xl flex flex-col items-center gap-8">
          <SectionTitle className="text-black">
            Every <span className="font-bold">Experience</span> Begins With a Feeling
          </SectionTitle>
          <Paragraph className="text-black">
            We blend creativity, emotion, and innovation to craft digital
            worlds that invite exploration and inspire connection.
          </Paragraph>
          <FlipButton
            text="ABOUT US"
          />
        </div>
      </div>
    </section>
  );
}