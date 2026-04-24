"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Crop, X } from "lucide-react";
import getCroppedImg from "@/lib/utils/cropImage";

interface CropModalProps {
  image: string;
  onCropComplete: (croppedImage: File) => void;
  onCancel: () => void;
  aspect?: number;
}

const ASPECT_RATIOS = [
  { label: "Original", value: undefined },
  { label: "1:1", value: 1 / 1 },
  { label: "4:3", value: 4 / 3 },
  { label: "3:2", value: 3 / 2 },
  { label: "16:9", value: 16 / 9 },
  { label: "9:16", value: 9 / 16 },
];

export default function CropModal({
  image,
  onCropComplete,
  onCancel,
  aspect: initialAspect = 4 / 3,
}: CropModalProps) {
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(initialAspect);

  const getCenteredCrop = useCallback(
    (imageWidth: number, imageHeight: number) => {
      let baseWidth = imageWidth;
      let baseHeight = imageHeight;

      if (aspect) {
        const imageRatio = imageWidth / imageHeight;
        if (imageRatio > aspect) {
          baseHeight = imageHeight;
          baseWidth = baseHeight * aspect;
        } else {
          baseWidth = imageWidth;
          baseHeight = baseWidth / aspect;
        }
      }

      const cropWidth = Math.max(1, Math.round(baseWidth / zoom));
      const cropHeight = Math.max(1, Math.round(baseHeight / zoom));

      const maxShiftX = Math.max(0, (imageWidth - cropWidth) / 2);
      const maxShiftY = Math.max(0, (imageHeight - cropHeight) / 2);

      const x = Math.round((imageWidth - cropWidth) / 2 + (offsetX / 100) * maxShiftX);
      const y = Math.round((imageHeight - cropHeight) / 2 + (offsetY / 100) * maxShiftY);

      return { x, y, width: cropWidth, height: cropHeight };
    },
    [aspect, zoom, offsetX, offsetY]
  );

  const handleCrop = async () => {
    const img = new window.Image();
    img.src = image;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Unable to load image for crop"));
    });

    const pixelCrop = getCenteredCrop(img.naturalWidth, img.naturalHeight);
    const croppedImage = await getCroppedImg(image, pixelCrop);
    if (croppedImage) {
      onCropComplete(croppedImage);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative flex h-[85vh] w-full max-w-2xl flex-col overflow-hidden bg-white shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-border p-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 text-primary">
                <Crop className="h-5 w-5" />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Crop Image</h2>
            </div>
            <button onClick={onCancel} className="text-muted-foreground transition-colors hover:text-red-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto border-b border-border bg-muted/10 p-4">
            <span className="mr-2 shrink-0 text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Ratio</span>
            {ASPECT_RATIOS.map((ratio) => (
              <button
                key={ratio.label}
                onClick={() => setAspect(ratio.value)}
                className={`shrink-0 px-4 py-2 text-[8px] font-bold uppercase tracking-widest transition-all ${
                  aspect === ratio.value
                    ? "bg-primary text-white shadow-lg"
                    : "border border-border bg-white text-muted-foreground hover:border-accent hover:text-accent"
                }`}
              >
                {ratio.label}
              </button>
            ))}
          </div>

          <div className="relative flex-grow overflow-hidden bg-muted/20">
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img
                src={image}
                alt="Crop preview"
                className="max-h-full max-w-full object-contain"
                style={{ transform: `scale(${zoom}) translate(${offsetX * 0.4}px, ${offsetY * 0.4}px)` }}
              />
            </div>
          </div>

          <div className="space-y-4 border-t border-border bg-white p-6">
            <div className="flex items-center gap-4">
              <span className="w-12 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Zoom</span>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-label="Zoom"
                onChange={(e) => setZoom(Number(e.target.value))}
                className="h-1 flex-grow cursor-pointer appearance-none rounded-full bg-muted accent-primary"
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="w-12 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">X</span>
              <input
                type="range"
                value={offsetX}
                min={-100}
                max={100}
                step={1}
                aria-label="Horizontal crop offset"
                onChange={(e) => setOffsetX(Number(e.target.value))}
                className="h-1 flex-grow cursor-pointer appearance-none rounded-full bg-muted accent-primary"
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="w-12 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Y</span>
              <input
                type="range"
                value={offsetY}
                min={-100}
                max={100}
                step={1}
                aria-label="Vertical crop offset"
                onChange={(e) => setOffsetY(Number(e.target.value))}
                className="h-1 flex-grow cursor-pointer appearance-none rounded-full bg-muted accent-primary"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={onCancel}
                className="flex-1 border border-border py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:bg-muted/10"
              >
                Cancel
              </button>
              <button
                onClick={handleCrop}
                className="flex flex-1 items-center justify-center gap-2 bg-primary py-4 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-accent"
              >
                <Check className="h-4 w-4" /> Save Crop
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
