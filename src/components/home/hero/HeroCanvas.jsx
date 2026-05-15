"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TOTAL_FRAMES } from "./hero.config";

gsap.registerPlugin(ScrollTrigger);

export const HeroCanvas = ({ images, isLoading, containerRef }) => {
  const canvasRef = useRef(null);
  const sequence = useRef({ frame: 0 });

  useGSAP(
    () => {
      if (isLoading || images.length === 0 || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d", { alpha: true });

      const drawImage = () => {
        const img = images[sequence.current.frame];
        if (!img) return;

        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = canvas.width / 2 - (img.width / 2) * scale;
        const y = canvas.height / 2 - (img.height / 2) * scale;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, x, y, img.width * scale, img.height * scale);
      };

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawImage();
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=8000",
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
          onUpdate: () => requestAnimationFrame(drawImage),
        },
      });

      tl.to(sequence.current, {
        frame: TOTAL_FRAMES - 1,
        snap: "frame",
        ease: "none",
      });

      return () => {
        window.removeEventListener("resize", handleResize);
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === containerRef.current) trigger.kill();
        });
      };
    },
    { dependencies: [isLoading, images], scope: containerRef }
  );

  return (
    <canvas
      ref={canvasRef}
      className="relative z-10 block w-full h-full mix-blend-screen opacity-90 pointer-events-none"
    />
  );
};