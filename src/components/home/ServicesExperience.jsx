"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const icons = {
  uiux: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  ),
  dev: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="16,18 22,12 16,6" />
      <polyline points="8,6 2,12 8,18" />
      <line x1="12" y1="2" x2="12" y2="22" />
    </svg>
  ),
  branding: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  animation: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  ),
};

const services = [
  { id: "uiux",      label: "UI/UX",        icon: icons.uiux,      position: "top-left"     },
  { id: "dev",       label: "Development",  icon: icons.dev,       position: "top-right"    },
  { id: "branding",  label: "Branding",     icon: icons.branding,  position: "bottom-left"  },
  { id: "animation", label: "3D Animation", icon: icons.animation, position: "bottom-right" },
];


const posMap = {
  "top-left":     { p1: { x: "-20vw", y: "-13vh" }, p2: { x: "-42vw", y: "-36vh" } },
  "top-right":    { p1: { x: "14vw",  y: "-16vh" }, p2: { x: "36vw",  y: "-36vh" } },
  "bottom-left":  { p1: { x: "-18vw", y: "15vh"  }, p2: { x: "-42vw", y: "30vh"  } },
  "bottom-right": { p1: { x: "14vw",  y: "17vh"  }, p2: { x: "36vw",  y: "30vh"  } },
};

export default function ServicesExperience() {
  const sectionRef  = useRef(null);
  const topLeftRef  = useRef(null);
  const topRightRef = useRef(null);
  const centerRef   = useRef(null);
  const subtitleRef = useRef(null);
  const tagsRef     = useRef([]);

  useGSAP(() => {
    const section  = sectionRef.current;
    const topLeft  = topLeftRef.current;
    const topRight = topRightRef.current;
    const center   = centerRef.current;
    const subtitle = subtitleRef.current;
    const tags     = tagsRef.current;

    const floatTweens = [];

    const startFloat = () => {
      floatTweens.forEach(t => t.kill());
      floatTweens.length = 0;
      tags.forEach((tag, i) => {
        const floatY = 10 + (i % 2) * 8;
        const floatX = 6  + (i % 3) * 5;
        const t = gsap.to(tag, {
          y: `+=${floatY}`,
          x: `+=${floatX}`,
          duration: 2.0 + i * 0.35,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.28,
        });
        floatTweens.push(t);
      });
    };

    const stopFloat = () => {
      floatTweens.forEach(t => t.kill());
      floatTweens.length = 0;
    };

 
    gsap.set(center,   { opacity: 0, y: -100 });
    gsap.set(subtitle, { opacity: 0, y: -30  });

    tags.forEach((tag, i) => {
      const { p1 } = posMap[services[i].position];
      gsap.set(tag, {
        xPercent: -50,
        yPercent: -50,
        x: p1.x,
        y: p1.y,
        opacity: 1,
        scale: 1,
      });
    });

  
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=300%",
        scrub: 1.2,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onEnterBack: () => {
          stopFloat();
        },
      },
    });

    tl.to([topLeft, topRight], {
      y: -100,
      opacity: 0,
      duration: 0.15,
      ease: "power2.in",
    }, 0);

    tl.to(center, {
      opacity: 1,
      y: 0,
      duration: 0.27,
      ease: "power3.out",
    }, 0.08);

    tl.to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 0.22,
      ease: "power2.out",
    }, 0.18);

    tags.forEach((tag, i) => {
      const { p2 } = posMap[services[i].position];
      tl.to(tag, {
        x: p2.x,
        y: p2.y,
        duration: 0.4,
        ease: "power2.inOut",
        ...(i === tags.length - 1 ? {
          onComplete: startFloat,       
          onReverseComplete: stopFloat, 
        } : {}),
      }, 0.4 + i * 0.03);
    });


    return () => {
      stopFloat();
    };

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{ background: "#ffffff" }}
    >
      <div className="absolute inset-0" style={{ zIndex: 0, overflow: "hidden" }}>
        <iframe
          src="https://player.vimeo.com/video/1161504005?background=1&autoplay=1&loop=1&muted=1"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100vw",
            height: "56.25vw",    
            minHeight: "100vh",
            minWidth: "177.78vh", 
            transform: "translate(-50%, -50%)",
            border: "none",
            pointerEvents: "none",
          }}
          allow="autoplay; fullscreen"
          title="background video"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(255,255,255,0.38)" }}
        />
      </div>

      <div
        ref={topLeftRef}
        className="absolute"
        style={{ top: "8%", left: "4%", zIndex: 10, maxWidth: "340px" }}
      >
        <h2
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
            fontWeight: 400,
            lineHeight: 1.15,
            color: "#1a1208",
            letterSpacing: "-0.02em",
          }}
        >
          Made with Intention.<br />
          Meant to Be <strong style={{ fontWeight: 700 }}>Felt.</strong>
        </h2>
      </div>

      <div
        ref={topRightRef}
        className="absolute"
        style={{ top: "8%", right: "4%", zIndex: 10, maxWidth: "280px", textAlign: "right" }}
      >
        <p
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(0.8rem, 1.1vw, 1rem)",
            lineHeight: 1.65,
            color: "#8a7060",
          }}
        >
          From the way words breathe to how{" "}
          <span style={{ color: "#2a1e12", fontWeight: 600 }}>animations flow,</span>{" "}
          every part is made to resonate.
        </p>
      </div>

      <div
        ref={centerRef}
        className="absolute flex flex-col items-center text-center"
        style={{ zIndex: 10, pointerEvents: "none" }}
      >
        <h2
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(2rem, 5.5vw, 5rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            color: "#1a1208",
            letterSpacing: "-0.03em",
          }}
        >
          We Build <span style={{ fontWeight: 700 }}>Experiences</span>
          <br />That Breathe
        </h2>
        <p
          ref={subtitleRef}
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(0.75rem, 1vw, 0.95rem)",
            color: "#8a7060",
            marginTop: "1rem",
            lineHeight: 1.7,
            maxWidth: "380px",
          }}
        >
          Because lasting experiences aren&apos;t made by chance —{" "}
          <span style={{ color: "#5a4030" }}>they&apos;re shaped with purpose.</span>
        </p>
      </div>

     
      {services.map((svc, i) => (
        <div
          key={svc.id}
          ref={(el) => (tagsRef.current[i] = el)}
          className="absolute flex items-center gap-2 cursor-pointer select-none"
          style={{
            left: "50%",
            top: "50%",
            zIndex: 20,
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(200,160,120,0.25)",
            borderRadius: "999px",
            padding: "10px 18px",
            boxShadow: "0 4px 24px rgba(180,120,60,0.10)",
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(0.78rem, 1vw, 0.92rem)",
            color: "#2a1e12",
            letterSpacing: "0.01em",
            transition: "box-shadow 0.2s, background 0.2s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.95)";
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(180,120,60,0.20)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.72)";
            e.currentTarget.style.boxShadow = "0 4px 24px rgba(180,120,60,0.10)";
          }}
        >
          <span style={{ opacity: 0.65, display: "flex" }}>{svc.icon}</span>
          {svc.label}
        </div>
      ))}

    </section>
  );
}
