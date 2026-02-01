"use client";

import { useRef, useEffect } from "react";

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: Particle[] = [];
        let explosions: Explosion[] = [];
        let animationFrameId: number;
        let mouse = { x: -1000, y: -1000 };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
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
                this.vx = (Math.random() - 0.5) * 0.5; // Slower, calmer base movement
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 1.5 + 0.5;
                this.color = Math.random() > 0.5 ? "rgba(59, 130, 246, " : "rgba(147, 51, 234, "; // Blue or Purple
                this.density = Math.random() * 20 + 1;
            }

            update() {
                // Mouse Interaction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;

                // Gravity Radius (Attract interaction)
                const maxDistance = 250;

                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    const directionX = forceDirectionX * force * this.density * 0.5;
                    const directionY = forceDirectionY * force * this.density * 0.5;
                    this.vx += directionX * 0.02;
                    this.vy += directionY * 0.02;
                }

                // Friction
                this.vx *= 0.98;
                this.vy *= 0.98;

                // Base movement
                this.x += this.vx;
                this.y += this.vy;

                // Boundary wrap
                if (this.x < 0) { this.x = canvas!.width; this.vx *= -1; }
                if (this.x > canvas!.width) { this.x = 0; this.vx *= -1; }
                if (this.y < 0) { this.y = canvas!.height; this.vy *= -1; }
                if (this.y > canvas!.height) { this.y = 0; this.vy *= -1; }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

                // Dynamic opacity based on speed
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                const opacity = Math.min(speed * 0.5 + 0.2, 0.8);
                ctx.fillStyle = this.color + opacity + ")";
                ctx.fill();

                // Connect to mouse
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = this.color + (1 - dist / 150) * 0.2 + ")";
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        class Explosion {
            x: number;
            y: number;
            particles: { x: number, y: number, vx: number, vy: number, life: number, color: string }[];

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.particles = [];
                for (let i = 0; i < 20; i++) {
                    this.particles.push({
                        x: x,
                        y: y,
                        vx: (Math.random() - 0.5) * 10,
                        vy: (Math.random() - 0.5) * 10,
                        life: 1.0,
                        color: Math.random() > 0.5 ? "255, 255, 255" : "59, 130, 246"
                    });
                }
            }

            update() {
                this.particles.forEach(p => {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vx *= 0.95;
                    p.vy *= 0.95;
                    p.life -= 0.03;
                });
            }

            draw() {
                if (!ctx) return;
                this.particles.forEach(p => {
                    if (p.life > 0) {
                        ctx.fillStyle = `rgba(${p.color}, ${p.life})`;
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                        ctx.fill();
                    }
                });
            }

            isDead() {
                return this.particles.every(p => p.life <= 0);
            }
        }

        const init = () => {
            particles = [];
            const particleCount = Math.min(window.innerWidth / 5, 200); // Increased density
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear instead of trail for full screen performance

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            explosions.forEach((e, i) => {
                e.update();
                e.draw();
                if (e.isDead()) explosions.splice(i, 1);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        // Event Listeners
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        // Global click listener for explosions
        const handleClick = (e: MouseEvent) => {
            explosions.push(new Explosion(e.clientX, e.clientY));
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", handleClick);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
        />
    );
}
