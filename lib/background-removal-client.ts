"use client";

export async function removeBackgroundClient(imageFile: File | Blob): Promise<Blob> {
  const objectUrl = URL.createObjectURL(imageFile);
  try {
    const img = new window.Image();
    img.src = objectUrl;

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Failed to load image"));
    });

    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get canvas context");

    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data, width, height } = imageData;

    // Fast heuristic: estimate background color from four corners.
    const corners = [
      0,
      (width - 1) * 4,
      ((height - 1) * width) * 4,
      (((height - 1) * width) + (width - 1)) * 4,
    ];

    let r = 0;
    let g = 0;
    let b = 0;
    for (const i of corners) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }
    r /= corners.length;
    g /= corners.length;
    b /= corners.length;

    const threshold = 42;
    for (let i = 0; i < data.length; i += 4) {
      const dr = data[i] - r;
      const dg = data[i + 1] - g;
      const db = data[i + 2] - b;
      const distance = Math.sqrt(dr * dr + dg * dg + db * db);

      if (distance < threshold) {
        data[i + 3] = 0;
      }
    }

    ctx.putImageData(imageData, 0, 0);

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas toBlob failed"));
      }, "image/png");
    });
  } catch (error: any) {
    const isMemoryError =
      error.message?.toLowerCase().includes("memory") ||
      error.message?.toLowerCase().includes("range");
    if (isMemoryError) throw new Error("MOBILE_MEMORY_ERROR");
    throw new Error("DEVICE_UNSUPPORTED");
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
