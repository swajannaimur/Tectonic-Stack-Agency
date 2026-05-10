"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServicesExperience from "./ServicesExperience";

gsap.registerPlugin(ScrollTrigger);

export default function WatchShowReel() {
  const sectionRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const contentRef = useRef(null);

  const hasExpanded = useRef(false);
  const isLocked = useRef(false);
  const animationDone = useRef(false);
  const scrollTriggerInstance = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const videoWrapper = videoWrapperRef.current;
    const content = contentRef.current;

    gsap.set(videoWrapper, {
      width: "20%",
      height: "80vh",
      borderRadius: "100px",
      opacity: 1, 
      transformOrigin: "top center", 
    });
    gsap.set(content, { opacity: 0, y: 30 });

    const initScrollCollapse = () => {
      if (scrollTriggerInstance.current) scrollTriggerInstance.current.kill();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top", 
          end: "bottom top", 
          scrub: 1,
        },
      });

      tl.to(videoWrapper, {
        height: "0vh",
        width: "70%",
        borderRadius: "40px",
        ease: "none",
      })
      .to(content, {
        opacity: 0,
        y: -40,
        ease: "none",
      }, 0);

      scrollTriggerInstance.current = tl.scrollTrigger;
    };

    const startAnimation = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          isLocked.current = false;
          animationDone.current = true;
          if (window.lenis) window.lenis.start();
          initScrollCollapse(); 
        },
      });

      tl.to(videoWrapper, {
        width: "100%",
        height: "80vh",
        borderRadius: "24px",
        duration: 1.5,
        ease: "expo.out",
      });

      tl.to(content, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.8");
    };

    const runEntrance = () => {
      if (hasExpanded.current) return;
      hasExpanded.current = true;
      isLocked.current = true;

      const rect = section.getBoundingClientRect();
      const scrollTop = window.lenis?.scroll ?? window.pageYOffset;
      const target = scrollTop + rect.top;

      if (window.lenis) {
        window.lenis.scrollTo(target, {
          duration: 1.2,
          onComplete: () => {
            window.lenis.stop();
            startAnimation();
          },
        });
      } else {
        window.scrollTo({ top: target, behavior: "smooth" });
        setTimeout(startAnimation, 800);
      }
    };

    const runReset = () => {
      if (!hasExpanded.current) return;
      hasExpanded.current = false;
      animationDone.current = false;
      isLocked.current = false;
      if (scrollTriggerInstance.current) scrollTriggerInstance.current.kill();

      gsap.to(videoWrapper, {
        width: "20%",
        height: "80vh",
        borderRadius: "100px",
        opacity: 1,
        duration: 0.8,
      });
      gsap.to(content, { opacity: 0, y: 30 });
    };

    const blockInputs = (e) => {
      if (isLocked.current) {
        if (e.cancelable) e.preventDefault();
        e.stopImmediatePropagation();
        return false;
      }
    };

    window.addEventListener("wheel", blockInputs, { passive: false, capture: true });
    window.addEventListener("touchmove", blockInputs, { passive: false, capture: true });

    let lastY = window.scrollY;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const scrollingDown = window.scrollY > lastY;
          if (entry.isIntersecting && scrollingDown) {
            runEntrance();
          } else if (!entry.isIntersecting && !scrollingDown) {
            runReset();
          }
          lastY = window.scrollY;
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      window.removeEventListener("wheel", blockInputs, { capture: true });
      window.removeEventListener("touchmove", blockInputs, { capture: true });
      if (scrollTriggerInstance.current) scrollTriggerInstance.current.kill();
      if (window.lenis) window.lenis.start();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white" 
      // style={{ height: "260vh" }} 
      style={{ height: "100" }} 
    >
 
      <div className="sticky top-10 mx-auto w-[94%] h-[calc(100vh-40px)]  flex items-start justify-center overflow-hidden ">
        <div
          ref={videoWrapperRef}
          className="relative overflow-hidden flex items-center justify-center shadow-2xl bg-black"
          style={{ willChange: "width, height, border-radius" }}
        >
              <iframe
              src="https://player.vimeo.com/video/1161504205?background=1&autoplay=1&loop=1&muted=1"
              style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "100%",
              height: "150%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              border: "none",
            }}
            allow="autoplay; fullscreen"
            title="showreel"

          />
          {/* <img
            src="/clear-globe.webp"
            alt="showreel"
            className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-60"
          /> */}

          <div
            ref={contentRef}
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          >
            <h2 className="text-white text-3xl md:text-5xl font-light tracking-widest uppercase select-none">
              Watch <span className="font-bold">Showreel</span>
            </h2>
          </div>
        </div>
      </div>
      {/* <div className="  h-screen relative z-20">
          <ServicesExperience />
      </div> */}
    </section>
  );
}