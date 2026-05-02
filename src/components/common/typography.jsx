import React from "react";

export const SectionTitle = ({ children, className = "" }) => {
  return (
    <h2
      className={`text-4xl md:text-8xl font-medium tracking-tight leading-[1.1] ${className}`}
    >
      {children}
    </h2>
  );
};
export const Paragraph = ({ children, className = "" }) => {
  return (
    <h2 className={`text-2xl  tracking-tight leading-[1.1] ${className}`}>
      {children}
    </h2>
  );
};