"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let mouse = { x: -100, y: -100 };
        let particles: { x: number, y: number, vx: number, vy: number, life: number, size: number, color: string }[] = [];
        let shockwaves: { x: number, y: number, radius: number, maxRadius: number, life: number, color: string, width: number }[] = [];

        let animationFrameId: number;
        let hue = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resize);
        resize();

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            // Spawn trail particles
            for (let i = 0; i < 3; i++) {
                particles.push({
                    x: mouse.x + (Math.random() - 0.5) * 4,
                    y: mouse.y + (Math.random() - 0.5) * 4,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    life: 1.0,
                    size: Math.random() * 2 + 0.5,
                    color: `hsl(${hue}, 100%, 70%)`
                });
            }
        };

        const handleClick = (e: MouseEvent) => {
            // 1. Shockwave
            shockwaves.push({
                x: e.clientX,
                y: e.clientY,
                radius: 0,
                maxRadius: 100,
                life: 1.0,
                color: "#fff",
                width: 2
            });

            // 2. Particle Explosion
            const particleCount = 30;
            for (let i = 0; i < particleCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const velocity = Math.random() * 5 + 2; // Fast burst
                particles.push({
                    x: e.clientX,
                    y: e.clientY,
                    vx: Math.cos(angle) * velocity,
                    vy: Math.sin(angle) * velocity,
                    life: 1.0,
                    size: Math.random() * 3 + 2,
                    color: Math.random() > 0.5 ? "#ffffff" : `hsl(${hue + 180}, 100%, 60%)` // White + Complementary color
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("click", handleClick);

        document.body.style.cursor = 'none';

        const animate = () => {
            // Clear canvas completely to avoid haze
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            hue += 1;

            // --- Update & Draw Particles ---
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.95; // Friction
                p.vy *= 0.95;
                p.life -= 0.02;
                p.size *= 0.95;

                if (p.life <= 0) {
                    particles.splice(i, 1);
                    i--;
                    continue;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                // Only glow for larger particles to save perf
                if (p.size > 2) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = p.color;
                }
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            // --- Update & Draw Shockwaves ---
            for (let i = 0; i < shockwaves.length; i++) {
                const s = shockwaves[i];
                s.radius += (s.maxRadius - s.radius) * 0.1;
                s.life -= 0.05;

                if (s.life <= 0) {
                    shockwaves.splice(i, 1);
                    i--;
                    continue;
                }

                ctx.beginPath();
                ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(255, 255, 255, ${s.life})`;
                ctx.lineWidth = s.width;
                ctx.stroke();
            }

            // Draw "Head" 
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = "#fff";
            ctx.shadowBlur = 15;
            ctx.shadowColor = "#fff";
            ctx.fill();

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", handleClick);
            document.body.style.cursor = 'auto';
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[9999] mix-blend-screen"
        />
    );
}
