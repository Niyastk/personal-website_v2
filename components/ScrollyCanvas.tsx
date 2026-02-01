"use client";

import { useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function ScrollyCanvas({ children }: { children?: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Total frames
    const frameCount = 120; // Updated based on actual asset count

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];

            const promises = Array.from({ length: frameCount }).map((_, i) => {
                return new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    const frameIndex = String(i).padStart(3, "0");
                    img.src = `/sequence/frame_${frameIndex}.webp`;
                    img.onload = () => {
                        loadedImages[i] = img;
                        resolve();
                    };
                    img.onerror = (e) => {
                        console.error(`Failed to load frame ${i} (${img.src})`, e);
                        resolve(); // Resolve anyway to avoid blocking
                    };
                });
            });

            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map scroll (0-1) to frame index (0 - frameCount-1)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx || !images[index]) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw image with "object-fit: cover" logic
        const img = images[index];

        // Calculate aspect ratios
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            // Canvas is wider than image
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgRatio;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        } else {
            // Canvas is taller than image
            drawHeight = canvas.height;
            drawWidth = canvas.height * imgRatio;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (!isLoaded) return;
        const frame = Math.round(latest);
        requestAnimationFrame(() => renderFrame(frame));
    });

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                // Set canvas internal resolution to match display size
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Re-render current frame if possible, or wait for scroll
                if (isLoaded && images.length > 0) {
                    const currentScroll = frameIndex.get();
                    renderFrame(Math.round(currentScroll));
                }
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial size

        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded]);

    return (
        <div ref={containerRef} className="h-[500vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {!isLoaded && <div className="absolute inset-0 flex items-center justify-center text-white">Loading Sequence...</div>}
                <canvas ref={canvasRef} className="block w-full h-full" />
            </div>
            {children}
        </div>
    );
}
