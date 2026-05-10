"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Paragraph, SectionTitle } from "../common/typography";
import FlipButton from "../ui/FlipButton";

export default function IdeasToImpact() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const innerBgRef = useRef(null);
  const contentRef = useRef(null);

  const hasAnimated = useRef(false);
  const animationDone = useRef(false);
  const isLocked = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const innerBg = innerBgRef.current;
    const content = contentRef.current;

    gsap.set(bg, { scale: 0.9, opacity: 0 });
    gsap.set(innerBg, { scale: 0.8, opacity: 0, y: 50 });
    gsap.set(content, { opacity: 0, y: 30 });

    const unlock = () => {
      isLocked.current = false;
      animationDone.current = true;
      if (window.lenis) window.lenis.start();
    };

    const startAnimation = () => {
      const tl = gsap.timeline({ onComplete: unlock });

      tl.fromTo(bg, 
        { y: 100, opacity: 0, scale: 1.1 }, 
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
      );

      tl.fromTo(innerBg, 
        { y: 150, opacity: 0, scale: 0.8 }, 
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      );

      tl.fromTo(content, 
        { y: 80, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
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
          duration: 1.5, 
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
          onStart: () => {
            isLocked.current = true;
            setTimeout(startAnimation, 600); 
          },
          onComplete: () => {
            if (window.lenis) window.lenis.stop();
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

      gsap.to([bg, innerBg, content], { 
        opacity: 0, 
        y: 30, 
        scale: 0.9, 
        duration: 0.6, 
        ease: "power2.in" 
      });
    };

    const blockInputs = (e) => {
      if (isLocked.current) {
        if (e.cancelable) e.preventDefault();
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
      style={{ minHeight: "100vh" }}
    >
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/projects/ideas-blur-2.webp')",
            willChange: "transform, opacity",
          }}
        />

        <div
          ref={innerBgRef}
          className="absolute z-10 "
          style={{
            width: "2000px",
            height: "800px",
            backgroundImage: "url('/images/projects/ideas-blur-3.webp')",
            backgroundSize: "contain",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
            willChange: "transform, opacity",
          }}
        />

        <div
          ref={contentRef}
          className="relative z-20 w-full max-w-2xl flex flex-col items-center text-center px-6 gap-8"
        >
          <SectionTitle className="text-black">
            From <span className="font-bold">Ideas</span> to Lasting Impact
          </SectionTitle>
          <Paragraph className="text-black">
            We turn bold visions into reality, combining strategic thinking with 
            flawless execution to move your brand forward.
          </Paragraph>
          <FlipButton
            text="OUR PROCESS"
            className="text-black hover:bg-gray-200 border border-black"
          />
        </div>
      </div>
    </section>
  );
}