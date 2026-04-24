"use client";

import { pipeline, RawImage, env } from "@huggingface/transformers";

if (typeof window !== "undefined") {
  env.allowLocalModels = false;
  env.allowRemoteModels = true;

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    const envAny = env as any;
    if (envAny.backends?.onnx?.wasm) {
      envAny.backends.onnx.wasm.numThreads = 1;
    }
  }
}

let segmenter: any = null;

export async function removeBackgroundClient(imageFile: File | Blob): Promise<Blob> {
  try {
    if (!segmenter) {
      segmenter = await pipeline("image-segmentation", "briaai/RMBG-1.4", {
        device: "webgpu",
      });
    }

    const url = URL.createObjectURL(imageFile);
    let image = await RawImage.fromURL(url);
    URL.revokeObjectURL(url);

    const MAX_DIM = 1024;
    if (image.width > MAX_DIM || image.height > MAX_DIM) {
      image = await image.resize(MAX_DIM, MAX_DIM);
    }

    const output = await segmenter(image);
    const mask = output[0].mask;

    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");

    if (!ctx) throw new Error("Could not get canvas context");

    const blob = await image.toBlob();
    const bitmap = await createImageBitmap(blob);
    ctx.drawImage(bitmap, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const maskCanvas = await mask.toCanvas();
    const maskCtx = maskCanvas.getContext("2d");

    if (!maskCtx) throw new Error("Could not get mask canvas context");

    const maskData = maskCtx.getImageData(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i + 3] = maskData.data[i];
    }

    ctx.putImageData(imageData, 0, 0);

    return new Promise((resolve, reject) => {
      canvas.toBlob((finalBlob) => {
        if (finalBlob) {
          resolve(finalBlob);
        } else {
          reject(new Error("Canvas toBlob failed"));
        }
      }, "image/png");
    });
  } catch (error: any) {
    segmenter = null;

    const isMemoryError =
      error.message?.toLowerCase().includes("memory") ||
      error.message?.toLowerCase().includes("range");

    if (isMemoryError) {
      throw new Error("MOBILE_MEMORY_ERROR");
    }

    throw new Error("DEVICE_UNSUPPORTED");
  }
}
