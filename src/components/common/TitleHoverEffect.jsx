"use client";
import { useRef } from "react";
import { MoveUpRight } from "lucide-react";
import gsap from "gsap";

export default function TitleHoverEffect({ title = "Tower garage Doors" }) {
  const icon1Ref = useRef(null);
  const icon2Ref = useRef(null);
  const textRef = useRef(null);

  const handleMouseEnter = () => {
    const tl = gsap.timeline();

    gsap.to(textRef.current, {
      color: "#9ca3af", // text-gray-400
      duration: 0.3,
      ease: "power2.out",
    });

    tl.to(icon1Ref.current, {
      x: 25,
      y: -25,
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
    });

    tl.fromTo(icon2Ref.current, 
      { x: -25, y: 25, opacity: 0 },
      { x: 0, y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
      "-=0.25" 
    );
  };

  const handleMouseLeave = () => {
    gsap.to(textRef.current, {
      color: "#ffffff",
      duration: 0.3,
      ease: "power2.inOut",
    });

    const tl = gsap.timeline();
    tl.to(icon2Ref.current, {
      x: -25,
      y: 25,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });

    tl.to(icon1Ref.current, {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.2");
  };

  return (
    <div className="bg-black p-10 flex justify-start items-center">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group flex items-center cursor-pointer gap-4"
      >
        <h2 
          ref={textRef}
          className="text-white text-4xl md:text-5xl font-normal transition-none"
        >
          {title}
        </h2>

        <div className="relative overflow-hidden w-10 h-10 flex items-center justify-center">
          <div ref={icon1Ref} className="absolute">
            <MoveUpRight size={32} className="text-[#FF8A00] stroke-[2.5px]" />
          </div>

          <div ref={icon2Ref} className="absolute opacity-0">
            <MoveUpRight size={32} className="text-[#FF8A00] stroke-[2.5px]" />
          </div>
        </div>
      </div>
    </div>
  );
}