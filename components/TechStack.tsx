"use client";

import { motion } from "framer-motion";

const technologies = [
    "Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js", "Python", "AWS", "Docker", "GraphQL", "PostgreSQL"
];

export default function TechStack() {
    return (
        <section className="py-20 relative z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10 pointer-events-none" />

            <div className="flex">
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop"
                    }}
                    className="flex whitespace-nowrap gap-16"
                >
                    {[...technologies, ...technologies, ...technologies].map((tech, index) => (
                        <div key={index} className="flex items-center gap-4 group">
                            <span className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 transition-all duration-300 group-hover:from-white/80 group-hover:to-white/40 cursor-default">
                                {tech}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
