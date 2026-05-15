"use client";
import { useEffect, useRef, useState } from "react";
import { FbIcon, LiIcon, SendIcon, TkIcon, XIcon, YtIcon } from "../icons";
import { SectionTitle } from "../common/typography";

const LETTERS = [
  {
    id: "M",
    viewBox: "0 0 338 293",
    path: "M0 293V62.7857C0 20.9286 31.05 0 84.5 0C137.95 0 169 31.3929 169 73.25V146.5H253.5V73.25C253.5 31.3929 284.55 0 338 0V293H253.5V115.107H169V293H84.5V115.107H0V293H0Z",
  },
  {
    id: "D",
    viewBox: "0 0 372 293",
    path: "M0 62.7857V0H248C330.667 0 372 34.881 372 104.643V209.286C372 265.095 330.667 293 248 293H0V125.571H82.6667V230.214H248C275.556 230.214 289.333 216.262 289.333 188.357V104.643C289.333 76.7381 275.556 62.7857 248 62.7857H0Z",
  },
  {
    id: "X",
    viewBox: "0 0 358 293",
    path: "M76.5 0L179 146.5L281.5 0H358L217.5 198.5L358 293H281.5L179 223.5L76.5 293H0L140.5 198.5L0 0H76.5Z",
  },
];

const SOCIALS = [<FbIcon />, <YtIcon />, <LiIcon />, <XIcon />, <TkIcon />];

export default function Footer() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      const start = vh;
      const end = vh * 0.1;

      let p = 1 - Math.min(1, Math.max(0, (rect.top - end) / (start - end)));
      setProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    if (window.lenis) window.lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#0a0a0a] text-white overflow-hidden">
      <div className="px-14 pt-16">
        <h2 className="text-[clamp(30px, 4.5vw, 64px)] font-bold leading-[1.12] tracking-[-0.025em] max-w-[620px] mb-12">
          Is there a fascinating<br />
          <span className="text-white font-bold">project </span>
          <span className="text-[#555] font-normal">brewing in your</span><br />
          <span className="text-[#555] font-normal">mind?</span>
        </h2>
        <SectionTitle>zillur</SectionTitle>

        <div className="flex items-center justify-between pb-9 border-b border-white/10">
          <a href="mailto:hello@mdx.so" className="flex items-center gap-3 text-white no-underline group">
            <span className="w-8 h-8 rounded-full bg-white text-[#0a0a0a] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
              <SendIcon />
            </span>
            <span className="text-[17px] font-medium tracking-[-0.01em] opacity-90 group-hover:opacity-60 transition-opacity duration-200">
              hello@mdx.so
            </span>
          </a>

          <nav>
            <ul className="flex gap-10 list-none m-0 p-0">
              {["About Us", "Services", "Contact Us", "Blog post"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/80 text-[15px] font-normal no-underline hover:text-white transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div 
        ref={containerRef} 
        className="flex justify-center items-center w-full overflow-hidden min-h-[40vh]"
      >
        <div className="flex justify-center gap-4 md:gap-10 w-full max-w-[1600px] px-14 py-10">
         {LETTERS.map((item) => {
  const eased = 1 - Math.pow(1 - progress, 3);
  const tx = (1 - eased) * -100;

  return (
    <div key={item.id} className="overflow-hidden flex-1">
      <div
        style={{
          display: "block",
          transform: `translateX(${tx}%)`,
          opacity: progress,
          willChange: "transform, opacity",
        }}
      >
        <svg
          viewBox={`-20 0 ${parseInt(item.viewBox.split(' ')[2]) + 20} ${item.viewBox.split(' ')[3]}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          style={{ maxHeight: "350px", overflow: "visible" }}
        >
          <path d={item.path} fill="#FCFCFD" />
        </svg>
      </div>
    </div>
  );
})}
        </div>
      </div>

      <div className="flex items-center justify-between px-14 py-8 flex-wrap gap-4 border-t border-white/5">
        <div className="flex items-center gap-5">
          {SOCIALS.map((icon, i) => (
            <button key={i} className="bg-transparent border-none text-white/50 hover:text-white transition-colors duration-200 cursor-pointer p-0 flex items-center">
              {icon}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-8 flex-wrap">
          <span className="text-[11px] text-white/40 tracking-wide uppercase">©2026 MDX. All rights reserved</span>
          <a href="#" className="text-[11px] text-white/40 hover:text-white/75 no-underline transition-colors duration-200 tracking-wide uppercase">Privacy Policy</a>
          <a href="#" className="text-[11px] text-white/40 hover:text-white/75 no-underline transition-colors duration-200 tracking-wide uppercase">Terms &amp; Conditions</a>
        </div>

        <button onClick={scrollTop} className="flex items-center gap-2 bg-transparent border-none text-white cursor-pointer hover:opacity-60 transition-opacity duration-200 group p-0">
          <span className="text-[11px] font-semibold tracking-[0.12em] uppercase">Scroll Top</span>
          <span className="w-6 h-6 rounded-full border border-white/50 flex items-center justify-center group-hover:border-white transition-colors duration-200">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </span>
        </button>
      </div>
    </footer>
  );
}