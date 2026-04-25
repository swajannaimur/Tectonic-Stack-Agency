"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; 
import { useGSAP } from "@gsap/react";
import { Paragraph, SectionTitle } from "../common/typography";
import FlipButton from "../shared/FlipButton";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function AboutUs() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    gsap.set(bgRef.current, { opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.fromTo(
      bgRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "expo.out" }
    );

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%", 

      onEnter: () => {
        const section = sectionRef.current;
        const rect = section.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        const targetScroll = scrollTop + rect.top + (rect.height / 2) - (window.innerHeight / 2);

        gsap.to(window, {
          scrollTo: { y: targetScroll, autoKill: false },
          duration: 1,
          ease: "power3.inOut",
          onComplete: () => {
            tl.restart(); 
          }
        });
      },

      onLeaveBack: () => {
        tl.pause(0);
        gsap.set(bgRef.current, { opacity: 0 });
      }
    });

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative h-[2000px] w-full overflow-hidden flex flex-col items-center justify-center"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/clear-globe.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0, 
        }}
      />


      <div 
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        <div className="w-full max-w-2xl flex flex-col items-center gap-8">
          <SectionTitle className="text-black">
            Every <span className="font-bold">Experience</span> Begins With a Feeling
          </SectionTitle>

          <Paragraph className="text-black">
            We blend creativity, emotion, and innovation to craft digital
            worlds that invite exploration and inspire connection.
          </Paragraph>

          <FlipButton text="ABOUT US" className="text-black hover:bg-gray-200 border border-black" />
        </div>
      </div>
    </section>
  );
}