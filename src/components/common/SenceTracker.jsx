"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AboutUs from "../home/AboutUs";
import IdeasToImpact from "../home/IdeasToImpact";
import WatchShowReel from "../home/WatchShowReel";
import ServicesExperience from "../home/ServicesExperience";

gsap.registerPlugin(ScrollTrigger);

export default function SceneTracker() {
  const container = useRef();
  const trackerRef = useRef();

  useGSAP(
    () => {
 
      ScrollTrigger.sort();
      ScrollTrigger.refresh();

      const scenes = gsap.utils.toArray(".scene-trigger");

      gsap.fromTo(
        trackerRef.current,
        { opacity: 0, visibility: "hidden" },
        {
          opacity: 1,
          visibility: "visible",
          scrollTrigger: {
            trigger: container.current,
            start: "top top", 
            end: "bottom center",
            toggleActions: "play reverse play reverse",
            refreshPriority: -1, 
          },
        }
      );

      scenes.forEach((scene, index) => {
        const line = container.current.querySelector(`.line-${index}`);
        if (line) {
          gsap.timeline({
            scrollTrigger: {
              trigger: scene,
              start: "top center",
              end: "bottom center",
              scrub: 1.5,
            },
          })
          .to(line, { y: -25, opacity: 1 })
          .to(line, { y: 25, opacity: 0.3 });
        }
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="relative w-full">

      <section className="scene-trigger min-h-screen w-full relative ">
        <AboutUs />
      </section>
  
      <section className="scene-trigger min-h-screen w-full relative ">
        <IdeasToImpact />
      </section>

      <section className="scene-trigger min-h-screen w-full relative ">
         <WatchShowReel />
      </section>
      <section className="scene-trigger min-h-screen w-full relative ">
         {/* <ServicesExperience /> */}
         <ServicesExperience />
      </section>

      

      {/* {[  3,4].map((num) => (
        <section key={num} className="scene-trigger h-screen flex items-center justify-center bg-white border-b">
          <h2 className="text-9xl font-black text-gray-100">{String(num).padStart(2, '0')}</h2>
        </section>
      ))} */}

      <div ref={trackerRef} className="fixed bottom-16 left-1/2 -translate-x-1/2 flex gap-12 z-50 pointer-events-none">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="relative w-[1.5px] h-16 overflow-hidden">
            <div className={`line-${i} absolute inset-0 w-full bg-black translate-y-[25px] opacity-20`} />
          </div>
        ))}
      </div>
    </div>
  );
}