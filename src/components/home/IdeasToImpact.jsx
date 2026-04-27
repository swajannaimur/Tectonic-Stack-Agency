"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Paragraph, SectionTitle } from "../common/typography";
import FlipButton from "../shared/FlipButton";

gsap.registerPlugin(ScrollTrigger);

export default function IdeasToImpact() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const innerBgRef = useRef(null); // 🔥 moving bg
  const contentRef = useRef(null); // 🔥 text

  useGSAP(() => {
    // 🔹 initial state
    gsap.set(bgRef.current, { opacity: 0, scale: 0.9 });
    gsap.set(innerBgRef.current, { y: 100, opacity: 0 });
    gsap.set(contentRef.current, { y: 120, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    // 🔹 main bg
    tl.to(bgRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    })

      // 🔹 small bg up
      .to(innerBgRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      })

      // 🔹 content follow (drag feel)
      .to(
        contentRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5" 
      );

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 50%",

      onEnter: () => {
        const section = sectionRef.current;
        const rect = section.getBoundingClientRect();
        const scrollTop = window.lenis?.scroll ?? window.pageYOffset;

        const targetScroll =
          scrollTop +
          rect.top +
          rect.height / 2 -
          window.innerHeight / 2;

        if (window.lenis) {
          window.lenis.scrollTo(targetScroll, {
            duration: 1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            onComplete: () => tl.restart(),
          });
        } else {
          window.scrollTo({ top: targetScroll, behavior: "smooth" });
          tl.restart();
        }
      },

      onLeaveBack: () => {
        tl.pause(0);
        gsap.to([bgRef.current, innerBgRef.current, contentRef.current], {
          opacity: 0,
          y: 100,
          duration: 0.5,
          ease: "power2.inOut",
        });
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative h-[1500px] w-full overflow-hidden flex items-center justify-center"
    >
      {/* 🔹 full bg */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/ideas-blur-2.webp')",
        }}
      />

      {/* 🔹 moving small bg */}
      <div
        ref={innerBgRef}
        className="absolute z-10"
        style={{
          width: "400px",
          height: "400px",
          backgroundImage: "url('/ideas-blur-3.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* 🔹 content */}
      <div
        ref={contentRef}
        className="relative z-20 w-[70%] flex flex-col items-center text-center gap-8 "
      >
        <SectionTitle className="text-black">
          Every <span className="font-bold">Experience</span> Begins With a Feeling
        </SectionTitle>

        <Paragraph className="text-black">
          We blend creativity, emotion, and innovation to craft digital
          worlds that invite exploration and inspire connection.
        </Paragraph>

        <FlipButton
          text="ABOUT US"
          className="text-black hover:bg-gray-200 border border-black"
        />
      </div>
    </section>
  );
}