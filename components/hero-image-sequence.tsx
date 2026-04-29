"use client";

import React, { useEffect, useRef, useState } from "react";

interface HeroImageSequenceProps {
  totalFrames: number;
  framePrefix: string;
  frameSuffix?: string;
  extension: string;
  className?: string;
  scrollProgress?: number;
  autoPlay?: boolean;
}

export const HeroImageSequence: React.FC<HeroImageSequenceProps> = ({
  totalFrames,
  framePrefix,
  frameSuffix = "",
  extension,
  className,
  scrollProgress,
  autoPlay = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const frameRef = useRef(0);

  // Preload images
  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const preloadImages = async () => {
      for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        const frameIndex = i.toString().padStart(3, "0");
        const src = `${framePrefix}${frameIndex}${frameSuffix}.${extension}`;
        
        img.src = src;
        img.onload = () => {
          if (!isMounted) return;
          loadedCount++;
          if (loadedCount === totalFrames) {
            setImages(loadedImages);
            setIsLoading(false);
          }
        };
        img.onerror = () => {
          if (!isMounted) return;
          console.error(`Failed to load frame: ${src}`);
          setLoadError(`Failed to load ${src}`);
          loadedCount++;
          if (loadedCount === totalFrames) {
            setImages(loadedImages);
            setIsLoading(false);
          }
        };
        loadedImages.push(img);
      }
    };

    preloadImages();
    return () => { isMounted = false; };
  }, [totalFrames, framePrefix, frameSuffix, extension]);

  // Animation logic
  useEffect(() => {
    if (isLoading || images.length === 0) return;

    const renderFrame = (index: number) => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (!canvas || !context) return;

      const img = images[Math.floor(index) % totalFrames];
      if (img && (img.complete || img.naturalWidth > 0)) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 1.1; 
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        context.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };

    let animationFrameId: number;

    if (scrollProgress !== undefined) {
      renderFrame(scrollProgress * (totalFrames - 1));
    } else if (autoPlay) {
      const loop = () => {
        renderFrame(frameRef.current);
        frameRef.current += 0.5;
        animationFrameId = requestAnimationFrame(loop);
      };
      loop();
    }

    const handleResize = () => {
      if (canvasRef.current) {
        const parent = canvasRef.current.parentElement;
        if (parent) {
          canvasRef.current.width = parent.clientWidth * (window.devicePixelRatio || 1);
          canvasRef.current.height = parent.clientHeight * (window.devicePixelRatio || 1);
          renderFrame(scrollProgress !== undefined ? scrollProgress * (totalFrames - 1) : frameRef.current);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [images, isLoading, totalFrames, scrollProgress, autoPlay]);

  return (
    <div 
      className={`relative w-full h-full overflow-hidden flex items-center justify-center ${className}`}
      style={{ clipPath: 'inset(0 0 10% 0)' }}
    >
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-50 gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent-blue border-t-transparent shadow-lg"></div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Initializing Engine Sequence...</p>
        </div>
      )}
      {loadError && !isLoading && images.length === 0 && (
        <div className="text-red-500 text-xs p-4 text-center bg-red-50 rounded-xl border border-red-100">
          Error loading animation frames. Please check console.
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};
