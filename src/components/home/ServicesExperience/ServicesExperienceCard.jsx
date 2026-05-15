"use client";
import React, { forwardRef } from "react";
import { experienceDetails } from "./ServicesExperienceData";
import { Layout, Code2, Layers, Box } from "lucide-react";

const iconMap = { Layout, Code2, Layers, Box };

const ServicesExperienceCard = forwardRef(({ svc, index, popupRefs }, ref) => {
  const detail = experienceDetails[svc.id];
  const Icon = iconMap[svc.icon];
  
  const isTop = svc.position.includes("top");
  const dir = isTop ? "below" : "above";

  return (
    <div ref={ref} className="absolute select-none" style={{ left: "50%", top: "50%", zIndex: 20 }}>
      <div className="flex items-center gap-3 cursor-pointer" style={{
        background: "rgba(255,255,255,0.75)", backdropFilter: "blur(12px)",
        border: "1px solid rgba(200,160,120,0.2)", borderRadius: "999px",
        padding: "12px 20px", boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
        fontFamily: "serif", fontSize: "14px", color: "#1a1a1a"
      }}>
        {Icon && <Icon size={16} strokeWidth={1.5} className="text-gray-500" />}
        {svc.label}
      </div>

      <div 
        ref={(el) => (popupRefs.current[index].wrapper = el)} 
        style={{
          position: "absolute", left: "50%", transform: "translateX(-50%)",
          ...(dir === "below" ? { top: "calc(100% + 12px)" } : { bottom: "calc(100% + 12px)" }),
          zIndex: 30, width: "230px", background: "white",
          border: `1px solid ${detail.accent}22`, borderRadius: "20px",
          padding: "20px", boxShadow: `0 20px 40px rgba(0,0,0,0.08)`,
          pointerEvents: "none", transformOrigin: isTop ? "top center" : "bottom center"
        }}
      >
        <div ref={(el) => (popupRefs.current[index].bar = el)} style={{ width: "30px", height: "2px", background: detail.accent, marginBottom: "12px", transformOrigin: "left center" }} />
        <p style={{ fontSize: "11px", color: detail.accent, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" }}>{detail.headline}</p>
        <p ref={(el) => (popupRefs.current[index].tagline = el)} style={{ fontSize: "14px", color: "#444", fontStyle: "italic", margin: "8px 0 16px", fontFamily: "serif" }}>{detail.tagline}</p>
        <ul className="flex flex-col gap-2">
          {detail.points.map((pt, j) => (
            <li key={j} ref={(el) => (popupRefs.current[index].pts[j] = el)} className="flex items-center gap-2 text-[12px] text-gray-600">
              <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: detail.accent }} />
              {pt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

ServicesExperienceCard.displayName = "ServicesExperienceCard";
export default ServicesExperienceCard;