"use client";

import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 240;

export function ImageSequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure we only attach scroll after mount / hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 1. Scroll Logic — only active after mount
  const { scrollYProgress } = useScroll({
    target: isMounted ? containerRef : undefined,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, TOTAL_FRAMES]);

  // Pre‑computed motion values for text overlays (hooks must be called unconditionally)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const marineOpacity = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.45], [0, 1, 1, 0]);
  const marineX = useTransform(scrollYProgress, [0.25, 0.45], [-50, 0]);
  const industrialOpacity = useTransform(scrollYProgress, [0.55, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
  const industrialX = useTransform(scrollYProgress, [0.55, 0.75], [50, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1]);
  const ctaScale = useTransform(scrollYProgress, [0.85, 1], [0.9, 1]);

  // 2. Preload Images
  useEffect(() => {
    const preloadImages = async () => {
      const loadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);
      let loadedCount = 0;

      const loadPromise = (index: number): Promise<void> => {
        return new Promise((resolve) => {
          const img = new window.Image();
          const paddedIndex = index.toString().padStart(3, "0");
          img.src = `/animation/ezgif-frame-${paddedIndex}.jpg`;
          img.onload = () => {
            loadedCount++;
            loadedImages[index - 1] = img;
            setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load frame ${paddedIndex}`);
            // Resolve anyway to prevent hanging
            resolve();
          };
        });
      };

      // Load in batches of 10 to prevent network choking
      const batchSize = 10;
      for (let i = 1; i <= TOTAL_FRAMES; i += batchSize) {
        const batch: Promise<void>[] = [];
        for (let j = 0; j < batchSize && i + j <= TOTAL_FRAMES; j++) {
          batch.push(loadPromise(i + j));
        }
        await Promise.all(batch);
      }

      imagesRef.current = loadedImages.filter(Boolean);
      setIsLoading(false);
    };

    preloadImages();
  }, []);

  // 3. Canvas Rendering
  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas || imagesRef.current.length === 0) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      const frameIdx = Math.max(0, Math.min(Math.floor(index) - 1, imagesRef.current.length - 1));
      const img = imagesRef.current[frameIdx];
      if (!img) return;

      const dpr = window.devicePixelRatio || 1;
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;

      // Only resize when dimensions change (avoids flicker)
      if (canvas.width !== canvasWidth * dpr || canvas.height !== canvasHeight * dpr) {
        canvas.width = canvasWidth * dpr;
        canvas.height = canvasHeight * dpr;
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, canvasWidth, canvasHeight);

      // Background to match frames
      context.fillStyle = "#e8ecef";
      context.fillRect(0, 0, canvasWidth, canvasHeight);

      // Cover‑fit
      const scale = Math.max(canvasWidth / img.width, canvasHeight / img.height);
      const x = (canvasWidth - img.width * scale) / 2;
      const y = (canvasHeight - img.height * scale) / 2;

      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    },
    []
  );

  useEffect(() => {
    if (isLoading) return;

    const unsubscribe = frameIndex.on("change", (latest) => {
      requestAnimationFrame(() => renderFrame(latest));
    });

    // Initial render
    renderFrame(frameIndex.get());

    return () => unsubscribe();
  }, [isLoading, frameIndex, renderFrame]);

  return (
    <div ref={containerRef} className="relative h-[400vh]" style={{ backgroundColor: "#e8ecef" }}>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center" style={{ backgroundColor: "#e8ecef" }}>
          <div className="mb-8 font-tech text-xs uppercase tracking-[0.5em] text-foreground/40">
            Initializing Engine Sequence
          </div>
          <div className="relative h-[2px] w-64 overflow-hidden rounded-full bg-foreground/10">
            <motion.div
              className="absolute inset-y-0 left-0 bg-foreground"
              animate={{ width: `${loadProgress}%` }}
              transition={{ ease: "easeOut", duration: 0.3 }}
            />
          </div>
          <div className="mt-4 font-display text-5xl text-foreground">
            {loadProgress}%
          </div>
        </div>
      )}

      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="h-full w-full" />

        {/* === TEXT OVERLAYS === */}

        {/* Section 1: Hero (0‑20%) */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <p className="font-tech text-sm uppercase tracking-[0.5em] text-foreground/40 mb-6">
            Revolutionizing Maritime Supply
          </p>
          <h2 className="font-display text-6xl md:text-8xl lg:text-[10vw] font-bold leading-none tracking-tighter text-foreground uppercase italic">
            DELTA <br className="md:hidden" /> IMPEX.
          </h2>
        </motion.div>

        {/* Section 2: Marine Precision (25‑45%) */}
        <motion.div
          className="absolute inset-y-0 left-0 flex flex-col justify-center px-12 md:px-24 max-w-2xl pointer-events-none"
          style={{ opacity: marineOpacity, x: marineX }}
        >
          <h3 className="font-display text-4xl md:text-6xl font-medium tracking-tighter text-foreground mb-6 uppercase italic">
            Marine <br /> Precision.
          </h3>
          <p className="font-sans text-xs uppercase tracking-widest text-foreground/50 leading-relaxed">
            Directly sourced. Rigorously tested. <br />
            Ensuring propulsion continuity in every port.
          </p>
        </motion.div>

        {/* Section 3: Industrial Scale (55‑75%) */}
        <motion.div
          className="absolute inset-y-0 right-0 flex flex-col justify-center items-end text-right px-12 md:px-24 max-w-2xl pointer-events-none"
          style={{ opacity: industrialOpacity, x: industrialX }}
        >
          <h3 className="font-display text-4xl md:text-6xl font-medium tracking-tighter text-foreground mb-6 uppercase italic">
            Industrial <br /> Scale.
          </h3>
          <p className="font-sans text-xs uppercase tracking-widest text-foreground/50 leading-relaxed">
            From auxiliary engines to high-pressure <br />
            RO membranes for global operations.
          </p>
        </motion.div>

        {/* Section 4: Final CTA (85‑100%) */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
          style={{ opacity: ctaOpacity, scale: ctaScale }}
        >
          <h2 className="font-display text-5xl md:text-7xl lg:text-[8vw] font-bold leading-none tracking-tighter text-foreground mb-12 uppercase italic">
            SOURCING <br /> EXCELLENCE.
          </h2>
          <motion.div
            className="pointer-events-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="/about"
              className="px-12 py-5 bg-foreground text-background font-bold uppercase tracking-[0.3em] text-sm rounded-full"
            >
              Explore Our Legacy
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
