"use client";

import { useRef, useEffect } from "react";

export default function InteractiveShowcase() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;
        let mouse = { x: -1000, y: -1000 };

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = 500; // Fixed height for this section
        };
        window.addEventListener("resize", resize);
        resize();

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;
            baseX: number;
            baseY: number;
            density: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.baseX = this.x;
                this.baseY = this.y;
                this.vx = (Math.random() - 0.5) * 1.5;
                this.vy = (Math.random() - 0.5) * 1.5;
                this.size = Math.random() * 2 + 1;
                this.color = Math.random() > 0.5 ? "rgba(59, 130, 246, " : "rgba(147, 51, 234, "; // Blue or Purple
                this.density = Math.random() * 30 + 1;
            }

            update() {
                // Mouse Interaction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;

                // Gravity Radius
                const maxDistance = 200;

                if (distance < maxDistance) {
                    // Pull towards mouse
                    const force = (maxDistance - distance) / maxDistance;
                    const directionX = forceDirectionX * force * this.density;
                    const directionY = forceDirectionY * force * this.density;
                    this.vx += directionX * 0.05;
                    this.vy += directionY * 0.05;
                }

                // Friction to slow down
                this.vx *= 0.95;
                this.vy *= 0.95;

                // Base movement
                this.x += this.vx + (Math.random() - 0.5) * 0.5;
                this.y += this.vy + (Math.random() - 0.5) * 0.5;

                // Boundary wrap
                if (this.x < 0) this.x = canvas!.width;
                if (this.x > canvas!.width) this.x = 0;
                if (this.y < 0) this.y = canvas!.height;
                if (this.y > canvas!.height) this.y = 0;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                // Vary opacity based on speed
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                const opacity = Math.min(speed * 0.2 + 0.3, 1);
                ctx.fillStyle = this.color + opacity + ")";
                ctx.fill();

                // Draw connections to mouse if close
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = this.color + (1 - dist / 150) * 0.5 + ")";
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        const init = () => {
            particles = [];
            const particleCount = Math.min(window.innerWidth / 5, 200); // Responsive count
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            // Trail effect
            ctx.fillStyle = "rgba(10, 10, 10, 0.2)"; // Adjust alpha for trail length
            ctx.fillRect(0, 0, canvas.width, canvas.height); // Use fillRect instead of clearRect for trails

            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        // Event Listeners
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className="relative z-20 h-[500px] w-full overflow-hidden border-y border-white/5">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" />

            {/* Overlay Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <h3 className="text-white/20 text-4xl font-black uppercase tracking-[0.5em] animate-pulse">
                    Interactive Core
                </h3>
                <p className="text-white/10 mt-4 font-mono text-sm">
                    Move cursor to interact with the neural network
                </p>
            </div>
        </section>
    );
}
