"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { experienceServices } from "./ServicesExperienceData";
import ServicesExperienceCard from "./ServicesExperienceCard";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesExperience() {
  const sectionRef = useRef(null);
  const topLeftRef = useRef(null);
  const topRightRef = useRef(null);
  const centerRef = useRef(null);
  const subtitleRef = useRef(null);
  const tagsRef = useRef([]);
  const popupRefs = useRef(experienceServices.map(() => ({ wrapper: null, bar: null, tagline: null, pts: [] })));

  const posMap = {
    "top-left": { p1: { x: "-18vw", y: "-18vh" }, p2: { x: "-36vw", y: "-36vh" } },
    "top-right": { p1: { x: "18vw", y: "-18vh" }, p2: { x: "36vw", y: "-36vh" } },
    "bottom-left": { p1: { x: "-18vw", y: "18vh" }, p2: { x: "-36vw", y: "36vh" } },
    "bottom-right": { p1: { x: "18vw", y: "18vh" }, p2: { x: "36vw", y: "36vh" } },
  };

  useGSAP(() => {
    const tags = tagsRef.current;
    const popups = popupRefs.current;

    gsap.set(centerRef.current, { opacity: 0, y: -100 });
    gsap.set(subtitleRef.current, { opacity: 0, y: -30 });
    
    tags.forEach((tag, i) => {
      const { p1 } = posMap[experienceServices[i].position];
      gsap.set(tag, { xPercent: -50, yPercent: -50, x: p1.x, y: p1.y });
    });

    popups.forEach((p) => {
      if (!p.wrapper) return;
      gsap.set(p.wrapper, { opacity: 0, scaleY: 0.55, pointerEvents: "none" });
      gsap.set(p.bar, { scaleX: 0 });
      gsap.set(p.tagline, { opacity: 0, y: 8 });
      p.pts.forEach((pt) => pt && gsap.set(pt, { opacity: 0, x: -10 }));
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%",
        scrub: 1.2,
        pin: true,
      }
    });

    tl.to([topLeftRef.current, topRightRef.current], { y: -100, opacity: 0, duration: 0.15 }, 0);
    tl.to(centerRef.current, { opacity: 1, y: 0, duration: 0.27 }, 0.08);
    tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.22 }, 0.18);

    tags.forEach((tag, i) => {
      const { p2 } = posMap[experienceServices[i].position];
      tl.to(tag, { x: p2.x, y: p2.y, duration: 0.4 }, 0.4 + i * 0.03);
    });

    popups.forEach((p, i) => {
      const base = 0.72 + i * 0.13;
      tl.to(p.wrapper, { opacity: 1, scaleY: 1, duration: 0.1, onStart: () => p.wrapper.style.pointerEvents = "auto" }, base);
      tl.to(p.bar, { scaleX: 1, duration: 0.07 }, base + 0.05);
      tl.to(p.tagline, { opacity: 1, y: 0, duration: 0.07 }, base + 0.07);
      p.pts.forEach((pt, j) => {
        tl.to(pt, { opacity: 1, x: 0, duration: 0.06 }, base + 0.09 + j * 0.035);
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-white">
      <div className="absolute inset-0 z-0">
        <iframe 
          src="https://player.vimeo.com/video/1161504005?background=1&autoplay=1&loop=1&muted=1" 
          className="w-full h-full object-cover pointer-events-none opacity-40" 
          title="Background Video"
        />
      </div>

      <div ref={topLeftRef} className="absolute top-[8%] left-[4%] z-10 max-w-[340px]">
        <h2 className="text-4xl leading-tight text-[#1a1208]" style={{ fontFamily: "serif" }}>
          Made with Intention. <br/>Meant to Be <strong>Felt.</strong>
        </h2>
      </div>

      <div ref={topRightRef} className="absolute top-[8%] right-[4%] z-10 max-w-[280px] text-right">
        <p className="text-sm leading-relaxed text-[#8a7060]" style={{ fontFamily: "serif" }}>
          From the way words breathe to how{" "}
          <span className="text-[#2a1e12] font-semibold">animations flow,</span>{" "}
          every part is made to resonate.
        </p>
      </div>

      <div ref={centerRef} className="absolute flex flex-col items-center text-center z-10 pointer-events-none">
        <h2 className="text-5xl md:text-7xl leading-none text-[#1a1208]" style={{ fontFamily: "serif" }}>
          We Build <strong>Experiences</strong><br />That Breathe
        </h2>
        <p ref={subtitleRef} className="text-sm text-[#8a7060] mt-6 max-w-[380px]">
          Because lasting experiences aren&apos;t made by chance — they&apos;re shaped with purpose.
        </p>
      </div>

      {experienceServices.map((svc, i) => (
        <ServicesExperienceCard 
          key={svc.id} 
          svc={svc} 
          index={i} 
          ref={(el) => (tagsRef.current[i] = el)} 
          popupRefs={popupRefs} 
        />
      ))}
    </section>
  );
}