"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Paragraph, SectionTitle } from "../common/typography";
import FlipButton from "../shared/FlipButton";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useGSAP(() => {
    gsap.set(bgRef.current, { opacity: 0, scale: 0.9 });

    const tl = gsap.timeline({ paused: true });
    tl.to(bgRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 50%",

      onEnter: () => {
        const section = sectionRef.current;
        const rect = section.getBoundingClientRect();
        const scrollTop = window.lenis?.scroll ?? window.pageYOffset;

        const targetScroll =
          scrollTop + rect.top + rect.height / 2 - window.innerHeight / 2;

        if (window.lenis) {
          window.lenis.scrollTo(targetScroll, {
            duration: 1.2,
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
        gsap.to(bgRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          ease: "power2.inOut",
        });
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative h-[1500px] w-full overflow-hidden flex flex-col items-center justify-center"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/clear-globe.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
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
            className="text-black hover:bg-gray-200 border border-black"
          />
        </div>
      </div>
    </section>
  );
}