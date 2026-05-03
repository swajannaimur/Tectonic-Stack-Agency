"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const textLeftRef = useRef(null);
  const textRightRef = useRef(null);
  const loaderRef = useRef(null);
  const heroSectionRef = useRef(null);

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const sequence = useRef({ frame: 0 });

  const totalFrames = 360;
  const getImageUrl = (i) => `/Tectonic/sec-${i}.avif`;
  const bgImageUrl = "/hero-layer.webp";

  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = getImageUrl(i);
      img.onload = () => {
        loadedCount++;
        loadedImages[i] = img;
        
        const currentProgress = Math.round((loadedCount / totalFrames) * 100);
        setProgress(currentProgress);

        if (loadedCount === totalFrames) {
          setImages(loadedImages);
          
          setTimeout(() => {
            gsap.to(loaderRef.current, {
              opacity: 0,
              duration: 1,
              ease: "power2.inOut",
              onComplete: () => {
                setIsLoading(false);
                // পুরো hero section দেখানো শুরু
                gsap.fromTo(heroSectionRef.current,
                  { opacity: 0 },
                  { opacity: 1, duration: 0.5, ease: "power2.out" }
                );
                ScrollTrigger.refresh();
              }
            });
          }, 500); 
        }
      };
    }
  }, []);

  useGSAP(() => {
    if (isLoading || images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { alpha: true });

    const drawImage = () => {
      const img = images[sequence.current.frame];
      if (img) {
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawImage();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        // end: "+=4000", 
        end: "+=8000",
        scrub: 1.2,
        pin: true,
        pinSpacing: true, 
        onUpdate: () => requestAnimationFrame(drawImage),
      },
    });

    tl.to(sequence.current, {
      frame: totalFrames - 1,
      snap: "frame",
      ease: "none",
    });

    gsap.from([textLeftRef.current, textRightRef.current], {
      y: 60,
      opacity: 0,
      duration: 1.5,
      stagger: 0.3,
      ease: "power4.out",
      delay: 0.6
    });

    return () => window.removeEventListener("resize", handleResize);
  }, { dependencies: [isLoading, images] });

  return (
    <>
      {/* Loader */}
      <div 
        ref={loaderRef}
        className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col justify-between"
      >
        
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img src="/mdx-placeholder.png" className="w-full h-full object-cover" alt="Loading" />
        </div>

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

      {/* Hero Section - initially hidden */}
      <div ref={heroSectionRef} className="opacity-0">
        <section 
          ref={containerRef} 
          className="relative w-full h-screen overflow-hidden"
          style={{
            backgroundImage: `url(${bgImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* bgImageUrl2 - সরাসরি এখানে */}
          <div 
            className="absolute inset-0 z-0 " 
            style={{ 
              backgroundImage: `url("/ideas-blur-2.webp")`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              
              // opacity: 0.5
              opacity: 1
            }}
          />
          
          <canvas 
            ref={canvasRef} 
            className="relative z-10 block w-full h-full mix-blend-screen opacity-90" 
          />
          
          {/* কন্টেন্ট */}
          <div className="absolute inset-0 z-20 w-full h-full p-8 md:p-16 flex flex-col justify-end pointer-events-none">
            <div className="grid md:grid-cols-[2fr,1fr] gap-12 items-end">
              <div ref={textLeftRef} className="text-white space-y-6 pointer-events-auto">
                <h1 className="text-4xl md:text-8xl font-black leading-[0.8] tracking-tighter uppercase">
                  Design That<br />Feels.
                </h1>
                <p className="md:w-[60%] lg:w-[40%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus fuga laboriosam voluptatem veritatis vitae neque cumque, 
                  hic reiciendis ea in blanditiis obcaecati excepturi et saepe recusandae illo architecto praesentium sapiente!</p>
                <button className="bg-white text-black px-12 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-all">
                  Let's Talk ↗
                </button>
              </div>
              
              <div ref={textRightRef} className="text-white space-y-12 flex flex-col items-end pointer-events-auto">
                <p className="text-white/60 text-right max-w-xs text-sm font-light leading-relaxed">
                  We craft high-end digital experiences that bridge the gap between <span className="text-white">vision and reality.</span>
                </p>
                <div className="flex flex-wrap gap-2 justify-end">
                  {['UI/UX', '3D VISUALS', 'NEXT.JS'].map(tag => (
                    <span key={tag} className="border border-white/10 px-5 py-2.5 rounded-full text-[10px] tracking-widest uppercase bg-white/5 backdrop-blur-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}