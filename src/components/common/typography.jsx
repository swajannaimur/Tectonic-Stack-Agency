import React from "react";

export const SectionTitle = ({ children, className = "" }) => {
  return (
    <h2
      className={`font-heading text-7xl  tracking-tight leading-[1.1] ${className}`}
    >
      {children}
    </h2>
  );
};
export const Paragraph = ({ children, className = "" }) => {
  return (
    <p className={` text-2xl  tracking-tight leading-[1.1] ${className}`}>
      {children}
    </p>
  );
};