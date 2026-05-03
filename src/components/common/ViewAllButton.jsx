"use client";
import { useRef } from "react";
import { MoveUpRight } from "lucide-react";
import gsap from "gsap";

export default function ViewAllButton({ 
  projectCount, 
  onClick, 
  btnText = "View All Projects",
  iconClass = "text-black", 
  textClass = "text-gray-400 text-sm font-bold tracking-[0.2em] uppercase group-hover:text-white" 
}) {
  const leftIconRef = useRef(null);
  const rightIconRef = useRef(null);
  const textContainerRef = useRef(null);

  if (projectCount <= 4) return null;

  const handleMouseEnter = () => {
    gsap.to(rightIconRef.current, {
      scale: 0,
      width: 0,
      opacity: 0,
      marginLeft: 0,
      duration: 0.4,
      ease: "power2.inOut"
    });

    gsap.to(leftIconRef.current, {
      scale: 1,
      width: 48,
      opacity: 1,
      marginRight: 0, 
      duration: 0.4,
      ease: "power2.inOut"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(leftIconRef.current, {
      scale: 0,
      width: 0,
      opacity: 0,
      marginRight: 0,
      duration: 0.4,
      ease: "power2.inOut"
    });

    gsap.to(rightIconRef.current, {
      scale: 1,
      opacity: 1,
      width: 48,
      marginLeft: 0,
      duration: 0.4,
      ease: "power2.inOut"
    });
  };

  return (
    <div className="w-full flex justify-center mt-16">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className="flex items-center cursor-pointer group transition-all duration-500"
      >
        <div 
          ref={leftIconRef}
          className="h-12 bg-white rounded-full flex items-center justify-center opacity-0 scale-0 overflow-hidden"
          style={{ width: 0 }}
        >
          <MoveUpRight className={`min-w-[20px] ${iconClass}`} size={20} />
        </div>

        <div 
          ref={textContainerRef}
          className={`px-10 py-4 border border-gray-700 rounded-full group-hover:border-white transition-all duration-500 flex items-center justify-center bg-transparent whitespace-nowrap ${textClass}`}
        >
          {btnText}
        </div>

        <div 
          ref={rightIconRef}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center ml-0"
        >
          <MoveUpRight className={`min-w-[20px] ${iconClass}`} size={20} />
        </div>
      </div>
    </div>
  );
}