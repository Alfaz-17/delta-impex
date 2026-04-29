"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

interface ScrollytellingCanvasProps {
  totalFrames: number;
  framePrefix: string;
  frameSuffix: string;
  extension: string;
  className?: string;
}

export const ScrollytellingCanvas: React.FC<ScrollytellingCanvasProps> = ({
  totalFrames,
  framePrefix,
  frameSuffix,
  extension,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll interpolation
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const preloadImages = async () => {
      for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        // The files are ezgif-frame-001.jpg etc.
        const frameIndex = i.toString().padStart(3, "0");
        img.src = `${framePrefix}${frameIndex}${frameSuffix}.${extension}`;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalFrames) {
            setImages(loadedImages);
            setIsLoading(false);
          }
        };
        img.onerror = () => {
          console.error(`Failed to load frame: ${img.src}`);
          loadedCount++; // Still increment to avoid stuck loading
          if (loadedCount === totalFrames) {
            setImages(loadedImages);
            setIsLoading(false);
          }
        };
        loadedImages.push(img);
      }
    };

    preloadImages();
  }, [totalFrames, framePrefix, frameSuffix, extension]);

  // Render logic
  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");

      if (!canvas || !context || images.length === 0) return;

      // Get current frame index based on smooth scroll
      const currentScroll = smoothScroll.get();
      const frameIndex = Math.min(
        totalFrames - 1,
        Math.floor(currentScroll * totalFrames)
      );

      const img = images[frameIndex];
      if (!img || !img.complete) return;

      // Clear and draw
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Maintain aspect ratio (cover fit for dramatic effect)
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Subscribe to spring updates
    const unsubscribe = smoothScroll.on("change", (latest) => {
      setProgress(latest);
      render();
    });

    // Handle resize
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        render();
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [images, totalFrames, smoothScroll]);

  return (
    <div ref={containerRef} className={`relative h-[400vh] ${className}`}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#081020]">
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-6">
              <div className="relative h-20 w-20">
                <div className="absolute inset-0 animate-ping rounded-full border-2 border-accent-blue opacity-20"></div>
                <div className="h-full w-full animate-spin rounded-full border-4 border-accent-blue border-t-transparent shadow-[0_0_20px_rgba(30,95,166,0.3)]"></div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="font-tech text-[10px] uppercase tracking-[0.4em] text-accent-blue">Initializing</p>
                <p className="text-white/40 text-[9px] uppercase tracking-widest">High-End Sequence</p>
              </div>
            </div>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            className="h-full w-full"
          />
        )}
      </div>

      {/* Text Overlays */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {/* Section 1: Hero (0-20%) */}
        <ScrollSection progress={progress} start={0} end={0.2}>
          <div className="flex h-screen items-center justify-center text-center px-6">
            <div className="max-w-4xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 mb-8"
              >
                <span className="h-px w-12 bg-accent-blue" />
                <p className="label-tech !text-accent-blue tracking-[0.4em]">DELTA IMPEX</p>
              </motion.div>
              <h2 className="heading-display !text-white !leading-tight uppercase text-5xl md:text-8xl">
                Propelling <br />
                <span className="text-accent-blue italic">The Industry.</span>
              </h2>
              <p className="mt-8 text-lg md:text-xl text-white/60 font-light tracking-wide max-w-2xl mx-auto">
                Setting the standard in Marine Engineering & Global Technical Sourcing.
              </p>
            </div>
          </div>
        </ScrollSection>

        {/* Section 2: Product (25-50%) */}
        <ScrollSection progress={progress} start={0.25} end={0.5}>
          <div className="flex h-screen items-center justify-start px-12 md:px-32">
            <div className="max-w-xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[10px] font-tech text-accent-blue/80 border border-accent-blue/30 px-3 py-1 rounded uppercase tracking-widest bg-accent-blue/5">Module 01</span>
                <div className="h-px w-20 bg-accent-blue/20" />
              </div>
              <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 uppercase tracking-tight">
                Precision <br />
                <span className="text-accent-blue italic">Engineering.</span>
              </h2>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
                Every spare part is thoroughly checked to ensure peak performance before shipment. We provide the technical heartbeat of global shipping.
              </p>
            </div>
          </div>
        </ScrollSection>

        {/* Section 3: Logistics (55-80%) */}
        <ScrollSection progress={progress} start={0.55} end={0.8}>
          <div className="flex h-screen items-center justify-end px-12 md:px-32 text-right">
            <div className="max-w-xl flex flex-col items-end">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-20 bg-accent-blue/20" />
                <span className="text-[10px] font-tech text-accent-blue/80 border border-accent-blue/30 px-3 py-1 rounded uppercase tracking-widest bg-accent-blue/5">Module 02</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 uppercase tracking-tight">
                Global <br />
                <span className="text-accent-blue italic">Reach.</span>
              </h2>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
                From our strategic hub in Bhavnagar to the furthest ports on the map. Fast delivery ensures your vessel stays in motion.
              </p>
            </div>
          </div>
        </ScrollSection>

        {/* Section 4: CTA (85-100%) */}
        <ScrollSection progress={progress} start={0.85} end={1}>
          <div className="flex h-screen items-center justify-center text-center px-6">
            <div className="max-w-3xl glass-premium p-12 md:p-20 rounded-[3rem]">
              <h2 className="heading-display !text-white uppercase mb-10 text-4xl md:text-6xl">
                Ready for <br />
                <span className="text-accent-blue italic">The Next Wave?</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pointer-events-auto">
                <a href="/contact" className="group relative px-10 py-5 bg-accent-blue text-white font-tech text-[10px] uppercase tracking-[0.3em] rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(30,95,166,0.4)]">
                  <span className="relative z-10">Get a Quote</span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                  <span className="absolute inset-0 z-20 flex items-center justify-center text-accent-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500">Get a Quote</span>
                </a>
                <a href="/about" className="px-10 py-5 border border-white/20 text-white font-tech text-[10px] uppercase tracking-[0.3em] rounded-full hover:bg-white/10 transition-all duration-300">
                  Our Philosophy
                </a>
              </div>
            </div>
          </div>
        </ScrollSection>
      </div>
    </div>
  );
};

const ScrollSection: React.FC<{
  progress: number;
  start: number;
  end: number;
  children: React.ReactNode;
}> = ({ progress, start, end, children }) => {
  const isVisible = progress >= start && progress <= end;
  
  const opacity = useMemo(() => {
    if (progress < start || progress > end) return 0;
    const mid = (start + end) / 2;
    const fadeRange = (end - start) * 0.15; // 15% fade range
    
    if (progress < start + fadeRange) {
      return (progress - start) / fadeRange;
    } else if (progress > end - fadeRange) {
      return (end - progress) / fadeRange;
    }
    return 1;
  }, [progress, start, end]);

  const translateY = useMemo(() => {
    return (1 - opacity) * 30;
  }, [opacity]);

  return (
    <div
      style={{ 
        opacity, 
        transform: `translateY(${translateY}px)`,
        visibility: opacity > 0 ? "visible" : "hidden",
        transition: "transform 0.1s ease-out"
      }}
      className="absolute inset-0"
    >
      {children}
    </div>
  );
};
