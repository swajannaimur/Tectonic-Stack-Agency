"use client";

import { forwardRef } from "react";
import { TAGS, CATEGORIES } from "./hero.config";
import { Paragraph, SectionTitle } from "@/components/common/typography";
import FlipButton from "@/components/ui/FlipButton";
import CategoryTabs from "@/components/common/CategoryTabs";

export const HeroLoader = ({ progress, loaderRef }) => (
  <div ref={loaderRef} className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col justify-between">
    <div className="relative z-10 p-10 flex justify-between">
      <p className="text-white/40 text-[10px] uppercase tracking-[0.5em]">System.Initialising</p>
      <p className="text-white/40 text-[10px] uppercase tracking-[0.5em]">2026 / ASSETS</p>
    </div>

    <div className="relative z-10 w-full p-10 flex flex-col gap-6">
      <div className="flex justify-end overflow-hidden">
        <span className="text-white text-[15vw] font-black italic leading-none tracking-tighter">
          {progress}%
        </span>
      </div>
      <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-white transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  </div>
);

export const HeroContent = forwardRef(({ contentContainerRef, textLeftRef, textRightRef }, ref) => {
  return (
    <div
      ref={contentContainerRef}
      className="fixed inset-0 z-[99999] pointer-events-none"
      style={{ opacity: 0, transform: "translateY(30px)" }}
    >
      <div className="absolute inset-0 z-20 w-full h-full p-5 md:p-16 flex flex-col justify-end pointer-events-auto">
      <div className="flex items-end justify-between gap-12  w-full">

  {/* LEFT */}
  <div
    ref={textLeftRef}
    className="text-white space-y-6 w-full md:w-[40%] "
    style={{ opacity: 0, transform: "translateY(40px)" }}
  >
    <SectionTitle>
      <span className="font-medium">Design That Feels.</span>
      <br />
      Experiences That Resonate.
    </SectionTitle>

    <Paragraph>
      We blend creativity, emotion, and innovation to create digital worlds that your audience can connect with.
    </Paragraph>

    <div className="group">
      <FlipButton>Start Project</FlipButton>
    </div>
  </div>

  {/* RIGHT */}
  <div
    ref={textRightRef}
    className="hidden md:flex flex-col justify-end items-start space-y-12 w-[25%] "
    style={{ opacity: 0, transform: "translateY(40px)" }}
  >
    <Paragraph  >
      
      <span className=" text-black" >We craft high-end digital experiences that bridge the gap between </span>
      vision and reality.
    </Paragraph>

      <CategoryTabs
      categories={CATEGORIES}
      activeTab={null}
      isLinkMode={true}
      setActiveTab={(cat) =>
        console.log(`Navigate to /${cat.toLowerCase()}`)
      }
    />
  </div>

</div>
      </div>

      {/* <style jsx>{`
        .group:hover :global(.flip-button) {
          transform: translateY(-2px);
          transition: transform 0.3s ease;
        }
      `}</style> */}
    </div>
  );
});

HeroContent.displayName = "HeroContent";