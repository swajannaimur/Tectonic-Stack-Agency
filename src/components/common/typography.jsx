import React from "react";

export const SectionTitle = ({ children, className = "" }) => {
  return (
    <h2
      className={`font-heading text-black text-6xl  tracking-tight leading-[1.1] ${className}`}
    >
      {children}
    </h2>
  );
};
export const Paragraph = ({ children, className = "" }) => {
  return (
    <p className={` text-2xl text-[#8a8f8d]  tracking-tight leading-[1.1] ${className}`}>
      {children}
    </p>
  );
};