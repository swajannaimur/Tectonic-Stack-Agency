"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CategoryTabs({ 
  categories = [], 
  activeTab = null,        // null মানে কোনো ট্যাব ডিফল্ট active নেই
  setActiveTab,
  links = [],
  mode = "default",        // "default" or "navigation"
  onNavigate 
}) {
  const btnRefs = useRef([]);
  const bgRefs = useRef([]);
  const btn1LastLeavePoint = useRef({ x: null, y: null });
  const [hoverIndex, setHoverIndex] = useState(null);
  const [internalActiveTab, setInternalActiveTab] = useState(activeTab);
  const router = useRouter();
  
  // Use external or internal state
  const currentActiveTab = setActiveTab ? activeTab : internalActiveTab;
  const updateActiveTab = setActiveTab || setInternalActiveTab;

  const getRadius = (btn, x, y) => {
    const rect = btn.getBoundingClientRect();
    const dx = Math.max(x, rect.width - x);
    const dy = Math.max(y, rect.height - y);
    return Math.sqrt(dx * dx + dy * dy);
  };

  const animateBgShow = (index, x, y, onDone = null) => {
    const bg = bgRefs.current[index];
    const btn = btnRefs.current[index];
    if (!bg || !btn) return;

    const rect = btn.getBoundingClientRect();
    const px = x !== null ? x : rect.width / 2;
    const py = y !== null ? y : rect.height / 2;
    const radius = getRadius(btn, px, py);

    gsap.set(bg, {
      left: px,
      top: py,
      xPercent: -50,
      yPercent: -50,
      width: radius * 2,
      height: radius * 2,
      scale: 0,
    });

    gsap.to(bg, {
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
      overwrite: true,
      onComplete: onDone,
    });
  };

  const animateBgHide = (index, onDone = null) => {
    const bg = bgRefs.current[index];
    if (!bg) return;

    gsap.to(bg, {
      scale: 0,
      duration: 0.4,
      ease: "power3.in",
      overwrite: true,
      onComplete: onDone,
    });
  };

  useEffect(() => {
    // For navigation mode or when no default active tab
    if (mode === "navigation" || !currentActiveTab) {
      // No default active animation
      return;
    }
    
    // For default mode with active tab
    if (categories.length > 0 && currentActiveTab) {
      const activeIndex = categories.indexOf(currentActiveTab);
      if (activeIndex !== -1) {
        animateBgShow(activeIndex, null, null);
      }
    }
  }, [categories.length, currentActiveTab, mode]);

  const handleMouseEnter = (e, i, cat) => {
    if (hoverIndex === i) return;
    
    setHoverIndex(i);

    // Hide current active background if exists
    if (currentActiveTab) {
      const activeIdx = categories.indexOf(currentActiveTab);
      if (activeIdx !== -1 && activeIdx !== i) {
        animateBgHide(activeIdx);
      }
    }

    const rect = btnRefs.current[i].getBoundingClientRect();
    const ex = e.clientX - rect.left;
    const ey = e.clientY - rect.top;
    animateBgShow(i, ex, ey);
  };

  const handleMouseMove = (e, i) => {
    const rect = btnRefs.current[i].getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (i === 0) {
      btn1LastLeavePoint.current = { x, y };
    }

    if (i === hoverIndex || (currentActiveTab && categories[i] === currentActiveTab && hoverIndex === null)) {
      gsap.set(bgRefs.current[i], { left: x, top: y });
    }
  };

  const handleMouseLeaveBtn = (e, i) => {
    if (i === 0) {
      const rect = btnRefs.current[0].getBoundingClientRect();
      btn1LastLeavePoint.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
    
    // Only hide if not the active tab
    if (currentActiveTab && categories[i] !== currentActiveTab) {
      animateBgHide(i);
    } else if (!currentActiveTab) {
      // In navigation mode, hide all backgrounds on leave
      animateBgHide(i);
    }
  };

  const handleMouseLeaveAll = () => {
    setHoverIndex(null);
    
    // Restore active tab background if exists
    if (currentActiveTab) {
      const activeIdx = categories.indexOf(currentActiveTab);
      if (activeIdx !== -1) {
        const lp = activeIdx === 0 ? btn1LastLeavePoint.current : { x: null, y: null };
        const currentBg = bgRefs.current[activeIdx];
        if (currentBg && parseFloat(gsap.getProperty(currentBg, "scale")) < 0.1) {
          animateBgShow(activeIdx, lp.x, lp.y);
        }
      }
    }
  };

  const handleClick = (cat, index) => {
    // Navigation mode: langsung navigate to link
    if (mode === "navigation") {
      if (links && links[index]) {
        if (onNavigate) {
          onNavigate(links[index]);
        } else {
          router.push(links[index]);
        }
      }
      return;
    }
    
    // Default mode: update active tab
    if (updateActiveTab) {
      updateActiveTab(cat);
    }
    
    // Optional: also navigate if link provided
    if (links && links[index] && mode === "default") {
      if (onNavigate) {
        onNavigate(links[index]);
      } else {
        router.push(links[index]);
      }
    }
  };

  const isActive = (cat, index) => {
    if (mode === "navigation") {
      return hoverIndex === index;
    }
    return (hoverIndex === null && currentActiveTab === cat) || hoverIndex === index;
  };

  return (
    <div
      className="flex flex-row items-center justify-start gap-4 flex-wrap relative z-20 pointer-events-auto"
      onMouseLeave={handleMouseLeaveAll}
    >
      {categories.map((cat, index) => {
        const hasLink = links && links[index];
        const active = isActive(cat, index);
        
        const ButtonContent = (
          <>
            <span
              className={`relative z-10 transition-colors duration-300 pointer-events-none text-xs font-bold tracking-widest uppercase ${
                active ? "text-white" : "text-gray-500 group-hover:text-white"
              }`}
            >
              {cat}
            </span>

            {/* Tooltip for link on hover */}
            {hasLink && hoverIndex === index && mode === "navigation" && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none whitespace-nowrap">
                <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg">
                  {links[index]}
                </div>
                <div className="w-2 h-2 bg-gray-900 rotate-45 absolute -bottom-1 left-1/2 transform -translate-x-1/2"></div>
              </div>
            )}

            <div
              ref={(el) => (bgRefs.current[index] = el)}
              className="absolute bg-[#FF8A00] rounded-full pointer-events-none"
              style={{
                width: 0,
                height: 0,
                transform: "scale(0)",
                zIndex: 1,
                transformOrigin: "center center",
              }}
            />
          </>
        );

        // For navigation mode: always render as Link if has link
        if (mode === "navigation" && hasLink) {
          return (
            <Link
              key={cat}
              href={links[index]}
              ref={(el) => (btnRefs.current[index] = el)}
              onMouseEnter={(e) => handleMouseEnter(e, index, cat)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={(e) => handleMouseLeaveBtn(e, index)}
              className={`relative overflow-hidden px-8 py-3 border rounded-full bg-transparent outline-none cursor-pointer group transition-all duration-500 inline-block ${
                active ? "border-[#FF8A00]" : "border-gray-800"
              }`}
            >
              {ButtonContent}
            </Link>
          );
        }

        // Default mode or without link
        return (
          <button
            key={cat}
            ref={(el) => (btnRefs.current[index] = el)}
            onMouseEnter={(e) => handleMouseEnter(e, index, cat)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={(e) => handleMouseLeaveBtn(e, index)}
            onClick={() => handleClick(cat, index)}
            className={`relative overflow-hidden px-8 py-3 border rounded-full bg-transparent outline-none cursor-pointer group transition-all duration-500 ${
              active ? "border-[#FF8A00]" : "border-gray-800"
            }`}
          >
            {ButtonContent}
          </button>
        );
      })}
    </div>
  );
}