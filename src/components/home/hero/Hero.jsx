"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroCanvas } from "./HeroCanvas";
import { HeroLoader, HeroContent } from "./HeroContent";
import { BG_IMAGE_URL, BLUR_IMAGE_URL, getImageUrl, TOTAL_FRAMES } from "./hero.config";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const loaderRef = useRef(null);
  const heroSectionRef = useRef(null);
  const contentContainerRef = useRef(null);
  const textLeftRef = useRef(null);
  const textRightRef = useRef(null);

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);


  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getImageUrl(i);
      
      img.onload = () => {
        loadedCount++;
        loadedImages[i] = img;
        setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        
        if (loadedCount === TOTAL_FRAMES) {
          setImages(loadedImages);
          setTimeout(() => {
            gsap.to(loaderRef.current, {
              opacity: 0,
              duration: 1,
              ease: "power2.inOut",
              onComplete: () => {
                setIsLoading(false);
                animateContentIn();
                gsap.fromTo(heroSectionRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 });
                ScrollTrigger.refresh();
              }
            });
          }, 500);
        }
      };
    }
  }, []);

  const animateContentIn = () => {
    if (!contentContainerRef.current) return;
    
    gsap.killTweensOf(contentContainerRef.current);
    gsap.killTweensOf([textLeftRef.current, textRightRef.current]);
    
    gsap.set(contentContainerRef.current, { opacity: 0, y: 30 });
    gsap.set([textLeftRef.current, textRightRef.current], { y: 40, opacity: 0 });
    gsap.to(contentContainerRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 });
    gsap.to([textLeftRef.current, textRightRef.current], { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.4 });
  };

  useEffect(() => {
    if (isLoading) return;
    
    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 10) {
        setHasScrolled(true);
        if (contentContainerRef.current && parseFloat(getComputedStyle(contentContainerRef.current).opacity) < 0.5) {
          animateContentIn();
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasScrolled]);

  useEffect(() => {
    if (!contentContainerRef.current || !containerRef.current || isLoading) return;
    
    const updateClipPath = () => {
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const top = Math.max(0, rect.top);
      const bottom = Math.min(vh, rect.bottom);
      
      if (bottom > top) {
        contentContainerRef.current.style.clipPath = `inset(${top}px 0 ${vh - bottom}px 0)`;
      }
    };
    
    updateClipPath();
    window.addEventListener("scroll", updateClipPath);
    window.addEventListener("resize", updateClipPath);
    
    return () => {
      window.removeEventListener("scroll", updateClipPath);
      window.removeEventListener("resize", updateClipPath);
    };
  }, [isLoading]);

  return (
    <>
      <HeroLoader progress={progress} loaderRef={loaderRef} />
      
      <div ref={heroSectionRef} className="relative opacity-0">
        <section
          ref={containerRef}
          className="relative w-full h-screen overflow-hidden"
          style={{
            backgroundImage: `url(${BG_IMAGE_URL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Blur Layer */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${BLUR_IMAGE_URL})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: 1,
            }}
          />
          
          <HeroCanvas images={images} isLoading={isLoading} containerRef={containerRef} />
        </section>
        
        <HeroContent
          ref={contentContainerRef}
          contentContainerRef={contentContainerRef}
          textLeftRef={textLeftRef}
          textRightRef={textRightRef}
        />
      </div>
    </>
  );
}