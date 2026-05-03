"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

export default function CategoryTabs({ categories = [], activeTab = "ALL", setActiveTab }) {
  const btnRefs = useRef([]);
  const bgRefs = useRef([]);
  const btn1LastLeavePoint = useRef({ x: null, y: null });
  const [hoverIndex, setHoverIndex] = useState(null);

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
    if (categories.length > 0) {
      animateBgShow(0, null, null);
    }
  }, [categories.length]);

  const handleMouseEnter = (e, i, cat) => {
    if (hoverIndex === i) return;
    
    setHoverIndex(i);

    const activeIdx = categories.indexOf(activeTab);
    if (activeIdx !== -1 && activeIdx !== i) {
      animateBgHide(activeIdx);
    }

    if (cat === activeTab) return;

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

    if (i === hoverIndex || (hoverIndex === null && categories[i] === activeTab)) {
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
    
    if (categories[i] !== activeTab) {
      animateBgHide(i);
    }
  };

  const handleMouseLeaveAll = () => {
    setHoverIndex(null);
    const activeIdx = categories.indexOf(activeTab);
    
    if (activeIdx !== -1) {
      const lp = activeIdx === 0 ? btn1LastLeavePoint.current : { x: null, y: null };
      
      const currentBg = bgRefs.current[activeIdx];
      if (currentBg && gsap.getProperty(currentBg, "scale") < 0.1) {
        animateBgShow(activeIdx, lp.x, lp.y);
      }
    }
  };

  return (
    <div
      className="flex flex-row items-center justify-start gap-4 flex-wrap relative z-20 pointer-events-auto"
      onMouseLeave={handleMouseLeaveAll}
    >
      {categories.map((cat, index) => (
        <button
          key={cat}
          ref={(el) => (btnRefs.current[index] = el)}
          onMouseEnter={(e) => handleMouseEnter(e, index, cat)}
          onMouseMove={(e) => handleMouseMove(e, index)}
          onMouseLeave={(e) => handleMouseLeaveBtn(e, index)}
          onClick={() => setActiveTab(cat)}
          className={`relative overflow-hidden px-8 py-3 border rounded-full bg-transparent outline-none cursor-pointer group transition-all duration-500 ${
            (hoverIndex === null && activeTab === cat) || hoverIndex === index 
            ? "border-[#FF8A00]" 
            : "border-gray-800"
          }`}
        >
          <span
            className={`relative z-10 transition-colors duration-300 pointer-events-none text-xs font-bold tracking-widest uppercase ${
              (hoverIndex === null && activeTab === cat) || hoverIndex === index 
              ? "text-white" 
              : "text-gray-500 group-hover:text-white"
            }`}
          >
            {cat}
          </span>

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
        </button>
      ))}
    </div>
  );
}