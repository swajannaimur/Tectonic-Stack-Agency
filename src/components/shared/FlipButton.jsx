"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

export default function FlipButton({ text = "ABOUT US", className = "" }) {
  const buttonRef = useRef();
  const { contextSafe } = useGSAP({ scope: buttonRef });

  const onMouseEnter = contextSafe(() => {
    const tl = gsap.timeline();

    tl.to(".text-item", {
      y: "-100%",
      duration: 0.5,
      ease: "power3.inOut",
    });

    tl.to(
      ".icon-default",
      {
        x: 20,
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
      },
      0,
    );

    tl.fromTo(
      ".icon-hover",
      { x: -20, y: 20, opacity: 0 },
      { x: 0, y: 0, opacity: 1, duration: 0.5, ease: "power3.inOut" },
      0,
    );
  });

  const onMouseLeave = contextSafe(() => {
    const tl = gsap.timeline();

    tl.to(".text-item", {
      y: "0%",
      duration: 0.5,
      ease: "power3.inOut",
    });

    tl.to(
      ".icon-default",
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.inOut",
      },
      0,
    );

    tl.to(
      ".icon-hover",
      {
        x: -20,
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
      },
      0,
    );
  });

  return (
    <button
      ref={buttonRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative h-[60px] px-10 bg-[#0f172a] rounded-full overflow-hidden shadow-xl flex items-center gap-3 ${className}`}
    >
      <div className="relative h-[20px] overflow-hidden flex flex-col">
        <span className="text-item text-white text-sm font-light tracking-[0.2em] uppercase leading-[20px]">
          {text}
        </span>
        <span className="text-item text-white text-sm font-light tracking-[0.2em] uppercase leading-[20px]">
          {text}
        </span>
      </div>

      <div className="relative w-5 h-5 overflow-hidden">
        <ArrowUpRight className="icon-default absolute inset-0 text-orange-400 w-5 h-5" />

        <ArrowUpRight
          className="icon-hover absolute inset-0 text-orange-400 w-5 h-5"
          style={{ opacity: 0 }}
        />
      </div>
    </button>
  );
}